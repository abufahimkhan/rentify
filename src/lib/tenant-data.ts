export type Role = "landlord" | "tenant";
export type Screen = "dashboard" | "flats" | "bills" | "chat" | "profile" | "tenants";
export type TenantStatus = "active" | "notice" | "left";

export interface TenantRecord {
  id: string;
  name: string;
  phone: string;
  flat: string;
  rent: number;
  status: TenantStatus;
  initials: string;
  tone: string;
  familyMembers: number;
  emergencyPhone: string;
  voterId: string;
}

export const flats = [
  { id: "1", no: "A-101", floor: "1st floor", rent: 18500, status: "occupied", tenant: "Arif Hossain" },
  { id: "2", no: "A-102", floor: "1st floor", rent: 18000, status: "vacant", tenant: null },
  { id: "3", no: "B-201", floor: "2nd floor", rent: 22000, status: "occupied", tenant: "Nusrat Jahan" },
  { id: "4", no: "B-202", floor: "2nd floor", rent: 21500, status: "maintenance", tenant: null },
  { id: "5", no: "C-301", floor: "3rd floor", rent: 24000, status: "occupied", tenant: "Sabbir Ahmed" },
  { id: "6", no: "C-302", floor: "3rd floor", rent: 23500, status: "occupied", tenant: "Mehedi Hasan" },
] as const;

export const tenants: TenantRecord[] = [
  { id: "1", name: "Arif Hossain", phone: "01712 345 678", flat: "A-101", rent: 18500, status: "active", initials: "AH", tone: "bg-emerald-100 text-emerald-700", familyMembers: 4, emergencyPhone: "01911 223 344", voterId: "1987654321098" },
  { id: "2", name: "Nusrat Jahan", phone: "01819 876 543", flat: "B-201", rent: 22000, status: "active", initials: "NJ", tone: "bg-violet-100 text-violet-700", familyMembers: 3, emergencyPhone: "01722 334 455", voterId: "2876543210987" },
  { id: "3", name: "Sabbir Ahmed", phone: "01675 221 890", flat: "C-301", rent: 24000, status: "notice", initials: "SA", tone: "bg-amber-100 text-amber-700", familyMembers: 5, emergencyPhone: "01833 445 566", voterId: "3765432109876" },
  { id: "4", name: "Mehedi Hasan", phone: "01988 443 211", flat: "C-302", rent: 23500, status: "active", initials: "MH", tone: "bg-sky-100 text-sky-700", familyMembers: 2, emergencyPhone: "01644 556 677", voterId: "4654321098765" },
  { id: "5", name: "Farhan Ahmed", phone: "01744 902 118", flat: "Unassigned", rent: 19000, status: "active", initials: "FA", tone: "bg-teal-100 text-teal-700", familyMembers: 3, emergencyPhone: "01955 667 788", voterId: "5543210987654" },
  { id: "6", name: "Samia Islam", phone: "01855 730 442", flat: "Unassigned", rent: 20500, status: "active", initials: "SI", tone: "bg-rose-100 text-rose-700", familyMembers: 2, emergencyPhone: "01766 778 899", voterId: "6432109876543" },
];

export const bills = [
  { id: "1", tenant: "Arif Hossain", flat: "A-101", total: 21550, paid: 21550, status: "paid", due: "10 Aug" },
  { id: "2", tenant: "Nusrat Jahan", flat: "B-201", total: 25400, paid: 12000, status: "partial", due: "10 Aug" },
  { id: "3", tenant: "Sabbir Ahmed", flat: "C-301", total: 27680, paid: 0, status: "overdue", due: "10 Aug" },
  { id: "4", tenant: "Mehedi Hasan", flat: "C-302", total: 26820, paid: 26820, status: "paid", due: "10 Aug" },
] as const;

export const conversations = [
  { id: "1", name: "Arif Hossain", flat: "A-101", initials: "AH", preview: "Thank you, I have sent the rent.", time: "10:24 AM", unread: 0, tone: "bg-emerald-100 text-emerald-700" },
  { id: "2", name: "Nusrat Jahan", flat: "B-201", initials: "NJ", preview: "Can you please check the water line?", time: "Yesterday", unread: 2, tone: "bg-violet-100 text-violet-700" },
  { id: "3", name: "Sabbir Ahmed", flat: "C-301", initials: "SA", preview: "I will pay the bill on Sunday.", time: "Sun", unread: 0, tone: "bg-amber-100 text-amber-700" },
] as const;

export const money = (amount: number, bn = false) =>
  new Intl.NumberFormat(bn ? "bn-BD" : "en-BD", { maximumFractionDigits: 0 }).format(amount);
