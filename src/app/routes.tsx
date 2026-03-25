import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { CausesPage } from "./pages/CausesPage";
import { DonatePage } from "./pages/DonatePage";
import { PaymentPage } from "./pages/PaymentPage";
import { ThankYouPage } from "./pages/ThankYouPage";
import { AuthPage } from "./pages/AuthPage";
import { AuthCallbackPage } from "./pages/AuthCallbackPage";
import { DonorDashboard } from "./pages/DonorDashboard";
import { AdminDashboard } from "./pages/AdminDashboard";
// LMS imports — hidden until re-enabled
// import { LMSLandingPage } from "./pages/LMSLandingPage";
// import { LMSDashboard } from "./pages/LMSDashboard";
// import { CourseDetailPage } from "./pages/CourseDetailPage";
// import { CoursePlayerPage } from "./pages/CoursePlayerPage";
// import { CertificatePage } from "./pages/CertificatePage";
import { LegalPage } from "./pages/LegalPage";
import { Variation2Page } from "./pages/Variation2Page";
import { Variation3Page } from "./pages/Variation3Page";
import { HomeNew1 } from "./pages/HomeNew1";
import { HomeV2Page } from "./pages/HomeV2Page";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center px-4">
        <div className="text-8xl mb-4">🙏</div>
        <h1 className="text-slate-900 text-3xl mb-3" style={{ fontWeight: 800 }}>Page Not Found</h1>
        <p className="text-slate-500 mb-6">The page you're looking for doesn't exist yet.</p>
        <a href="/" className="bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition-colors inline-block" style={{ fontWeight: 600 }}>Back to Home</a>
      </div>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      // Primary home (HomeV2 is the default)
      { index: true, Component: HomeV2Page },
      { path: "home-v2", Component: HomeV2Page },
      // Legacy home pages (kept for reference)
      { path: "home-new-1", Component: HomeNew1 },
      { path: "home-legacy", Component: HomePage },
      // App routes
      { path: "about", Component: AboutPage },
      { path: "causes", Component: CausesPage },
      { path: "donate", Component: DonatePage },
      { path: "payment", Component: PaymentPage },
      { path: "thank-you", Component: ThankYouPage },
      { path: "auth", Component: AuthPage },
      { path: "auth/callback", Component: AuthCallbackPage },
      // Dashboards
      { path: "dashboard", Component: DonorDashboard },
      { path: "admin", Component: AdminDashboard },
      // LMS — hidden until re-enabled
      // { path: "lms", Component: LMSLandingPage },
      // { path: "lms/course/:id", Component: CourseDetailPage },
      // { path: "lms/dashboard", Component: LMSDashboard },
      // { path: "lms/learn/:courseId", Component: CoursePlayerPage },
      // { path: "lms/certificate/:courseId", Component: CertificatePage },
      // Legal
      { path: "privacy", Component: LegalPage },
      { path: "terms", Component: LegalPage },
      { path: "cookies", Component: LegalPage },
      { path: "refund", Component: LegalPage },
      { path: "*", Component: NotFound },
    ],
  },
  // Standalone pages (no Root layout)
  { path: "/variation-2", Component: Variation2Page },
  { path: "/variation-3", Component: Variation3Page },
]);
