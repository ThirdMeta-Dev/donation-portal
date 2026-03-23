import { projectId, publicAnonKey } from "/utils/supabase/info";
import { supabase } from "./supabase";

const BASE = `https://${projectId}.supabase.co/functions/v1/make-server-a0af4170`;

// Module-level cached token — kept fresh by AuthContext via setCurrentToken()
let _token: string | null = null;

export function setCurrentToken(t: string | null): void {
  _token = t;
}

// ─── Token expiry check (with 60-second safety buffer) ────────────────────────
function isTokenExpired(token: string): boolean {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return true;
    const b64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = b64 + "=".repeat((4 - (b64.length % 4)) % 4);
    const payload = JSON.parse(atob(padded));
    // Expired or will expire within 60 seconds
    return !payload.exp || payload.exp < Math.floor(Date.now() / 1000) + 60;
  } catch {
    return true; // treat unreadable tokens as expired
  }
}

// ─── Resolve the freshest available user token ────────────────────────────────
async function resolveToken(): Promise<string | null> {
  // Fast path: cached token is still valid
  if (_token && !isTokenExpired(_token)) return _token;

  // Cached token missing or expired — read from Supabase session storage.
  // supabase.auth.getSession() reads localStorage; the background auto-refresh
  // timer keeps this fresh, so in most cases this will return a valid token.
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.access_token) {
      _token = session.access_token;
      console.log("[api] resolveToken: refreshed from getSession()");
      return _token;
    }
  } catch (e) {
    console.warn("[api] resolveToken: getSession() failed:", e);
  }
  return null;
}

// ─── Core fetch wrapper ───────────────────────────────────────────────────────
async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  requireAuth = false,
): Promise<T> {
  let token = await resolveToken();

  if (requireAuth && !token) {
    throw new Error("Not logged in. Please sign in and try again.");
  }

  // KEY FIX: always send publicAnonKey in Authorization (Supabase gateway only
  // validates this header — a stale/expired user JWT here causes "Invalid JWT").
  // Send the actual user JWT in the custom X-User-Token header instead.
  // The server reads X-User-Token first, then falls back to Authorization.
  const doFetch = (tok: string | null): Promise<Response> =>
    fetch(`${BASE}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${publicAnonKey}`,   // always valid for gateway
        ...(tok ? { "X-User-Token": tok } : {}),      // user identity
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

  let res = await doFetch(token);

  // On 401 from our server (not the gateway), attempt one token refresh and retry.
  // NOTE: the gateway now always gets publicAnonKey so it will never return
  // "Invalid JWT" — any 401 at this point is our own server's auth check.
  if (res.status === 401) {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.access_token) {
        _token = session.access_token;
        token = _token;
        console.log("[api] 401 retry with refreshed session token");
        res = await doFetch(token);
      }
    } catch (retryErr) {
      console.warn("[api] 401 retry failed:", retryErr);
    }
  }

  let json: any;
  try {
    json = await res.json();
  } catch {
    if (!res.ok) throw new Error(`Server error (${res.status})`);
    return {} as T;
  }

  if (!res.ok) {
    const msg = (json && (json.error || json.message)) || `Server error (${res.status})`;
    console.error(`[api] ${method} ${path} → ${res.status}: ${msg}`);
    throw new Error(msg);
  }

  return json as T;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────
export const authApi = {
  signup: (data: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    donorType?: string;
    country?: string;
  }) =>
    request<{ success: boolean; userId: string }>("POST", "/auth/signup", data),
};

// ─── Donations ────────────────────────────────────────────────────────────────
export const donationApi = {
  save: (donation: unknown) =>
    request<{ success: boolean; donation: Donation }>(
      "POST",
      "/donations",
      donation,
      false,
    ),
  saveFailed: (data: unknown) =>
    request<{ success: boolean }>("POST", "/donations/failed", data, false),
  getMine: () =>
    request<{ donations: Donation[] }>("GET", "/donations/mine", undefined, true),
  getAll: () =>
    request<{ donations: Donation[] }>("GET", "/donations", undefined, true),
  resendEmail: (donationId: string) =>
    request<{ success: boolean; sentTo: string }>(
      "POST",
      `/donations/${donationId}/resend-email`,
      {},
      true,
    ),
  updateDonation: (id: string, data: Partial<Donation>) =>
    request<{ success: boolean; donation: Donation }>(
      "PUT", `/donations/${id}`, data, true
    ),
};

// ─── Causes ───────────────────────────────────────────────────────────────────
export const causeApi = {
  getCauses: () =>
    request<{ causes: CauseFull[] }>("GET", "/causes"),
  getStats: () =>
    request<{ stats: Record<string, { raised: number; donors: number }> }>(
      "GET", "/causes/stats"
    ),
  getSettings: () =>
    request<{ settings: Record<string, { enable80G: boolean }> }>(
      "GET", "/causes/settings"
    ),
  toggle80G: (causeId: string, enable80G: boolean) =>
    request<{ success: boolean; causeId: string; enable80G: boolean }>(
      "POST", `/causes/${causeId}/toggle-80g`, { enable80G }, true
    ),
  createCause: (data: Partial<CauseFull>) =>
    request<{ success: boolean; cause: CauseFull }>(
      "POST", "/causes/admin", data, true
    ),
  updateCause: (id: string, data: Partial<CauseFull>) =>
    request<{ success: boolean; cause: CauseFull }>(
      "PUT", `/causes/admin/${id}`, data, true
    ),
  deleteCause: (id: string) =>
    request<{ success: boolean }>(
      "DELETE", `/causes/admin/${id}`, undefined, true
    ),
};

// ─── Admin Users ──────────────────────────────────────────────────────────────
export const adminApi = {
  getUsers: () =>
    request<{ users: AppUserRecord[] }>("GET", "/admin/users", undefined, true),
  toggleUser: (id: string, active: boolean) =>
    request<{ success: boolean; active: boolean }>(
      "POST",
      `/admin/users/${id}/toggle`,
      { active },
      true,
    ),
};

export interface AppUserRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  donorType: string;
  country: string;
  createdAt: string;
  active: boolean;
  isAdmin: boolean;
  lastSignIn: string | null;
}

// ─── LMS ──────────────────────────────────────────────────────────────────────
export const lmsApi = {
  getCourses: () => request<{ courses: Course[] }>("GET", "/lms/courses"),
  getCourse: (id: string) =>
    request<{ course: Course }>("GET", `/lms/courses/${id}`),
  enroll: (courseId: string) =>
    request<{ enrollment: Enrollment; alreadyEnrolled: boolean }>(
      "POST",
      "/lms/enroll",
      { courseId },
      true,
    ),
  getEnrollments: () =>
    request<{ enrollments: EnrollmentWithCourse[] }>(
      "GET",
      "/lms/enrollments",
      undefined,
      true,
    ),
  getEnrollment: (courseId: string) =>
    request<{ enrollment: Enrollment | null }>(
      "GET",
      `/lms/enrollment/${courseId}`,
      undefined,
      true,
    ),
  updateProgress: (courseId: string, lessonId: string, completed: boolean) =>
    request<{ enrollment: Enrollment }>(
      "POST",
      "/lms/progress",
      { courseId, lessonId, completed },
      true,
    ),
  submitQuiz: (courseId: string, answers: number[]) =>
    request<{ result: QuizResult; certificate: Certificate | null }>(
      "POST",
      "/lms/quiz/submit",
      { courseId, answers },
      true,
    ),
  getCertificate: (courseId: string) =>
    request<{ certificate: Certificate }>(
      "GET",
      `/lms/certificate/${courseId}`,
      undefined,
      true,
    ),
  getCertificates: () =>
    request<{ certificates: Certificate[] }>(
      "GET",
      "/lms/certificates",
      undefined,
      true,
    ),
  adminCreateCourse: (course: Partial<Course>) =>
    request<{ success: boolean; course: Course }>(
      "POST",
      "/lms/admin/courses",
      course,
      true,
    ),
  adminUpdateCourse: (id: string, updates: Partial<Course>) =>
    request<{ success: boolean; course: Course }>(
      "PUT",
      `/lms/admin/courses/${id}`,
      updates,
      true,
    ),
  adminDeleteCourse: (id: string) =>
    request<{ success: boolean }>(
      "DELETE",
      `/lms/admin/courses/${id}`,
      undefined,
      true,
    ),
  adminGetCourse: (id: string) =>
    request<{ course: Course }>(
      "GET",
      `/lms/admin/courses/${id}`,
      undefined,
      true,
    ),
};

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CauseFull {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  goal: number;
  raised: number;
  donors: number;
  impact: string;
  impactItems: string[];
  tag: string;
  urgent: boolean;
  enable80G: boolean;
  updates: { date: string; title: string; desc: string }[];
  createdAt: string;
  updatedAt: string;
}

export interface Donation {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  causeId: string;
  causeName: string;
  amount: number;
  currency: "INR" | "USD" | "GBP" | "EUR";
  frequency: "one-time" | "monthly" | "annually";
  donorType: "indian" | "nri" | "foreign";
  pan?: string;
  paymentId: string;
  status: "success" | "pending" | "failed";
  certificate80G: boolean;
  createdAt: string;
  receiptNo: string;
  impactDescription?: string;
  phone?: string;
  address?: string;
  country?: string;
}

export interface Lesson {
  id: string;
  title: string;
  type: "video" | "live" | "reading";
  duration: string;
  thumbnail: string;
  order: number;
  videoUrl?: string;
  content?: string;
  jitsiRoom?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
}

export interface QuizFull extends QuizQuestion {
  correctIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  questionCount?: number;
  passingScore: number;
  questions?: QuizQuestion[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  instructor: string;
  instructorBio: string;
  thumbnail: string;
  category: string;
  level: "beginner" | "intermediate" | "advanced";
  durationHours: number;
  lessons: Lesson[];
  quiz: Quiz;
  price: number;
  language: string;
  certificate: boolean;
  tags: string[];
  enrolledCount: number;
  rating: number;
}

export interface Enrollment {
  userId: string;
  courseId: string;
  enrolledAt: string;
  completedLessons: string[];
  quizScore: number | null;
  quizPassed?: boolean;
  certificateIssued?: boolean;
  lastLessonId?: string;
}

export interface EnrollmentWithCourse extends Enrollment {
  courseTitle?: string;
  courseThumbnail?: string;
  courseCategory?: string;
  courseLessonCount?: number;
}

export interface QuizResult {
  userId: string;
  courseId: string;
  score: number;
  passed: boolean;
  results: {
    questionId: string;
    selected: number;
    correct: boolean;
    correctIndex: number;
    explanation: string;
  }[];
  submittedAt: string;
  attempts: number;
}

export interface Certificate {
  id: string;
  userId: string;
  courseId: string;
  courseName: string;
  instructorName: string;
  recipientName: string;
  score: number;
  issuedAt: string;
}
