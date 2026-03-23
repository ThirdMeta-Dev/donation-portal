// Thin utility layer — actual persistence is handled by the backend API
// See lib/api.ts for donationApi.save(), donationApi.getMine(), donationApi.getAll()

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
}

export function generateReceiptNo(): string {
  const year = new Date().getFullYear();
  const num = Math.floor(100000 + Math.random() * 900000);
  return `AKF-${year}-${num}`;
}

export function generatePaymentId(): string {
  return `pay_${Math.random().toString(36).substr(2, 14).toUpperCase()}`;
}

// No-op: data now lives in Supabase backend
export function seedDemoDonations() {}
export function getDonations(): Donation[] { return []; }
export function getDonationsByUser(_userId: string): Donation[] { return []; }
export function saveDonation(_donation: Donation) {}
