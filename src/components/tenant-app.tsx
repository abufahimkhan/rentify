"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowLeft, Bell, Building2, CalendarDays, Check, ChevronDown, ChevronRight,
  CircleDollarSign, Clock3, Home, Languages, LayoutDashboard, LogOut,
  Mail, MessageCircle, MoreHorizontal, Phone, Plus, Search, Send, Settings,
  ShieldCheck, Sparkles, Sun, Moon, User, UserRoundPlus, Users, WalletCards, Wrench, X,
  PanelLeftClose, PanelLeftOpen, Eye, Pencil, Trash2, UsersRound, PhoneCall, IdCard,
} from "lucide-react";
import { createContext, FormEvent, ReactNode, useContext, useEffect, useState } from "react";
import { bills, conversations, flats, money, Role, Screen, TenantRecord, tenants } from "@/lib/tenant-data";

type Locale = "en" | "bn";
type AccountProfile = { name: string; phone: string; email: string };

const bnText: Record<string, string> = {
  "Renting made simple": "ভাড়া ব্যবস্থাপনা সহজ হোক", Landlord: "বাড়িওয়ালা", Tenant: "ভাড়াটিয়া", "Property owner": "সম্পত্তির মালিক",
  "Rent collection": "ভাড়া সংগ্রহ", "৳70,320 of ৳92,000 collected": "৳৭০,৩২০ / ৳৯২,০০০ সংগ্রহ হয়েছে", "2 payments still pending": "২টি পেমেন্ট এখনও বাকি",
  "Collapse sidebar": "সাইডবার বন্ধ করুন", "Expand sidebar": "সাইডবার খুলুন", "Change language": "ভাষা পরিবর্তন করুন", "Use light theme": "হালকা থিম ব্যবহার করুন", "Use dark theme": "ডার্ক থিম ব্যবহার করুন", Notifications: "নোটিফিকেশন",
  "4 tenants": "৪ জন ভাড়াটিয়া", "52.6% of total": "মোটের ৫২.৬%", "2 bills pending": "২টি বিল বাকি", "1 vacant · 1 repair": "১টি খালি · ১টি মেরামতাধীন",
  "Keep your property up to date": "আপনার সম্পত্তির তথ্য হালনাগাদ রাখুন", "Rent payment received": "ভাড়া পরিশোধ পাওয়া গেছে", "New message from Nusrat": "নুসরাতের নতুন মেসেজ", "Water line issue · 1 hr ago": "পানির লাইনের সমস্যা · ১ ঘণ্টা আগে", "Flat B-202 in maintenance": "ফ্ল্যাট B-202 মেরামতাধীন", "Updated yesterday": "গতকাল হালনাগাদ হয়েছে",
  "Welcome back, Arif": "স্বাগতম, আরিফ", "Here is your home and payment summary.": "আপনার বাসা ও পেমেন্টের সারসংক্ষেপ।", "Total to pay this month": "এই মাসে মোট পরিশোধ", Rent: "ভাড়া", Utilities: "ইউটিলিটি", "Due date": "পরিশোধের তারিখ", "Pay now": "এখন পরিশোধ করুন", "My flat": "আমার ফ্ল্যাট", "Message landlord": "বাড়িওয়ালাকে মেসেজ করুন", "Usually replies within an hour": "সাধারণত এক ঘণ্টার মধ্যে উত্তর দেন",
  "All flats": "সব ফ্ল্যাট", "Manage occupancy, rent and maintenance in one place.": "দখল, ভাড়া ও রক্ষণাবেক্ষণ এক জায়গায় পরিচালনা করুন।", "Search by flat or tenant...": "ফ্ল্যাট বা ভাড়াটিয়া খুঁজুন...", Occupied: "দখলকৃত", Vacant: "খালি", Maintenance: "মেরামতাধীন", "Current tenant": "বর্তমান ভাড়াটিয়া", Change: "পরিবর্তন", "Assign tenant": "ভাড়াটিয়া বরাদ্দ করুন", "per month": "প্রতি মাস",
  "4 current tenants across your property.": "আপনার সম্পত্তিতে ৪ জন বর্তমান ভাড়াটিয়া।", "Search tenants...": "ভাড়াটিয়া খুঁজুন...", Active: "সক্রিয়", Notice: "নোটিশ", Left: "চলে গেছেন", "Monthly rent": "মাসিক ভাড়া", Status: "অবস্থা",
  "Monthly bills": "মাসিক বিল", "My bills": "আমার বিল", "Track rent and utility payments for every tenant.": "প্রতিটি ভাড়াটিয়ার ভাড়া ও ইউটিলিটি পেমেন্ট দেখুন।", "Your rent and utility history.": "আপনার ভাড়া ও ইউটিলিটি ইতিহাস।", "Total billed": "মোট বিল", Outstanding: "বকেয়া", "Search tenant...": "ভাড়াটিয়া খুঁজুন...", Paid: "পরিশোধিত", Partial: "আংশিক", Overdue: "বকেয়া", "View details": "বিস্তারিত দেখুন", Total: "মোট",
  Messages: "মেসেজ", "Search conversations": "কথোপকথন খুঁজুন", Today: "আজ", "Write a message...": "মেসেজ লিখুন...", Read: "পড়া হয়েছে", Now: "এখন",
  Profile: "প্রোফাইল", "account": "অ্যাকাউন্ট", "Edit profile": "প্রোফাইল সম্পাদনা", "Phone number": "ফোন নম্বর", "Email address": "ইমেইল ঠিকানা", "Account security": "অ্যাকাউন্ট নিরাপত্তা", "Password and sign-in": "পাসওয়ার্ড ও সাইন-ইন", Preferences: "পছন্দসমূহ", "Notifications and billing": "নোটিফিকেশন ও বিলিং", Language: "ভাষা", "Choose the language you are most comfortable with.": "আপনার সুবিধাজনক ভাষা নির্বাচন করুন।", English: "ইংরেজি", "Log out": "লগ আউট",
  "Your current home and tenancy details.": "আপনার বর্তমান বাসা ও ভাড়ার তথ্য।", "Living since": "বসবাস শুরু", "Property contact": "সম্পত্তির যোগাযোগ", "1st floor": "১ম তলা", "Current home": "বর্তমান বাসা",
  paid: "পরিশোধিত", active: "সক্রিয়", occupied: "দখলকৃত", partial: "আংশিক", notice: "নোটিশ সময়কাল", maintenance: "মেরামতাধীন", unpaid: "অপরিশোধিত", overdue: "বকেয়া", vacant: "খালি", left: "চলে গেছেন", Available: "উপলভ্য",
  "Choose a tenant for Flat": "ফ্ল্যাটের জন্য ভাড়াটিয়া নির্বাচন করুন", "Search tenants by name...": "নাম দিয়ে ভাড়াটিয়া খুঁজুন...", "No tenants found": "কোনো ভাড়াটিয়া পাওয়া যায়নি", "Try a different name.": "অন্য নাম দিয়ে চেষ্টা করুন।", "Add a new tenant": "নতুন ভাড়াটিয়া যোগ করুন",
  "Saved successfully": "সফলভাবে সংরক্ষিত", "Add new tenant": "নতুন ভাড়াটিয়া যোগ করুন", "Add new flat": "নতুন ফ্ল্যাট যোগ করুন", "Your demo data is ready to connect to an API.": "ডেমো ডেটা API-এর সাথে সংযোগের জন্য প্রস্তুত।", "Enter the tenant details below.": "নিচে ভাড়াটিয়ার তথ্য দিন।", "Enter the flat details below.": "নিচে ফ্ল্যাটের তথ্য দিন।", Done: "সম্পন্ন", "Full name": "পুরো নাম", "Flat number": "ফ্ল্যাট নম্বর", Floor: "তলা", "Save tenant": "ভাড়াটিয়া সংরক্ষণ", "Save flat": "ফ্ল্যাট সংরক্ষণ",
  "You’re all caught up": "সব নোটিফিকেশন দেখা হয়েছে", "No new notifications right now.": "এই মুহূর্তে নতুন নোটিফিকেশন নেই।", All: "সব",
  "Total family members": "মোট পরিবারের সদস্য", "Emergency number": "জরুরি ফোন নম্বর", "Voter ID number": "ভোটার আইডি নম্বর", "Assigned flat": "বরাদ্দকৃত ফ্ল্যাট", "Store identity, household and emergency information.": "পরিচয়, পরিবার ও জরুরি যোগাযোগের তথ্য সংরক্ষণ করুন।",
  "Edit tenant": "ভাড়াটিয়া সম্পাদনা", "Update tenant": "ভাড়াটিয়া হালনাগাদ", Cancel: "বাতিল", "Delete tenant?": "ভাড়াটিয়া মুছে ফেলবেন?", "will be removed from this list.": "এই তালিকা থেকে মুছে যাবে।", Delete: "মুছুন",
  "Edit your profile": "আপনার প্রোফাইল সম্পাদনা করুন", "Update the details connected to your RENTIFY account.": "আপনার RENTIFY অ্যাকাউন্টের তথ্য হালনাগাদ করুন।", "Save changes": "পরিবর্তন সংরক্ষণ করুন",
};

const LanguageContext = createContext({ locale: "en" as Locale, tr: (text: string) => text });
const useLanguage = () => useContext(LanguageContext);

const copy = {
  en: {
    dashboard: "Dashboard", flats: "Flats", bills: "Bills", chat: "Messages", profile: "Profile", tenants: "Tenants",
    welcome: "Good morning, Rahman", sub: "Here’s what’s happening with your property.", month: "August 2026",
    expected: "Expected rent", collected: "Collected", due: "Total due", occupied: "Occupied flats",
    quick: "Quick actions", addTenant: "Add tenant", addFlat: "Add flat", overdue: "Needs attention",
    viewAll: "View all", recent: "Recent activity", search: "Search", all: "All", vacant: "Vacant", maintenance: "Maintenance",
  },
  bn: {
    dashboard: "ড্যাশবোর্ড", flats: "ফ্ল্যাট", bills: "বিল", chat: "মেসেজ", profile: "প্রোফাইল", tenants: "ভাড়াটিয়া",
    welcome: "সুপ্রভাত, রহমান", sub: "আপনার সম্পত্তির আজকের অবস্থা এক নজরে।", month: "আগস্ট ২০২৬",
    expected: "প্রত্যাশিত ভাড়া", collected: "সংগৃহীত", due: "মোট বকেয়া", occupied: "দখলকৃত ফ্ল্যাট",
    quick: "দ্রুত কাজ", addTenant: "ভাড়াটিয়া যোগ করুন", addFlat: "ফ্ল্যাট যোগ করুন", overdue: "মনোযোগ প্রয়োজন",
    viewAll: "সব দেখুন", recent: "সাম্প্রতিক কার্যক্রম", search: "খুঁজুন", all: "সব", vacant: "খালি", maintenance: "মেরামত",
  },
} as const;

const nav = [
  { key: "dashboard", href: "/dashboard", icon: LayoutDashboard },
  { key: "flats", href: "/flats", icon: Building2 },
  { key: "tenants", href: "/tenants", icon: Users },
  { key: "bills", href: "/bills", icon: WalletCards },
  { key: "chat", href: "/chat", icon: MessageCircle },
  { key: "profile", href: "/profile", icon: User },
] as const;

export default function TenantApp({ screen }: { screen: Screen }) {
  const pathname = usePathname();
  const router = useRouter();
  const [locale, setLocale] = useState<Locale>("en");
  const [role, setRole] = useState<Role>("landlord");
  const [modal, setModal] = useState<"tenant" | "flat" | null>(null);
  const [notice, setNotice] = useState(0);
  const [dark, setDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [profile, setProfile] = useState<AccountProfile>({ name: "Mohammad Rahman", phone: "01711 456 789", email: "rahman@example.com" });
  const t = copy[locale];
  const title = t[screen as keyof typeof t] ?? screen;
  const tr = (text: string) => locale === "bn" ? (bnText[text] ?? text) : text;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDark(localStorage.getItem("rentify-theme") === "dark");
      setLocale(localStorage.getItem("rentify-language") === "bn" ? "bn" : "en");
      setRole(localStorage.getItem("rentify-role") === "tenant" ? "tenant" : "landlord");
      const storedProfile = localStorage.getItem("rentify-profile");
      if (storedProfile) setProfile(JSON.parse(storedProfile) as AccountProfile);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  function toggleTheme() {
    setDark((current) => {
      const next = !current;
      localStorage.setItem("rentify-theme", next ? "dark" : "light");
      return next;
    });
  }

  function changeLocale(next: Locale) {
    setLocale(next);
    localStorage.setItem("rentify-language", next);
  }

  function saveProfile(next: AccountProfile) {
    setProfile(next);
    localStorage.setItem("rentify-profile", JSON.stringify(next));
  }

  function logout() {
    ["token", "user", "rentify-role"].forEach((key) => localStorage.removeItem(key));
    router.replace("/signin");
  }

  return (
    <LanguageContext.Provider value={{ locale, tr }}>
    <div className={`tenant-app min-h-dvh bg-[#f5f7f6] text-[#142820] selection:bg-emerald-200 ${dark ? "dark-mode" : ""}`}>
      <aside className={`sidebar-shell fixed inset-y-0 left-0 z-30 hidden border-r border-[#e1e8e4] bg-white px-4 py-6 transition-[width] duration-300 lg:flex lg:flex-col ${sidebarOpen ? "w-[268px]" : "w-[88px]"}`}>
        <div className="flex items-center justify-between gap-2"><Brand markOnly={!sidebarOpen} /></div>
        <div className={`mt-8 ${sidebarOpen ? "block" : "hidden"}`}>
          <RoleSwitch role={role} setRole={setRole} compact />
        </div>
        <nav className={`${sidebarOpen ? "mt-7" : "mt-8"} space-y-1`}>
          {nav.map((item) => {
            const active = pathname === item.href;
            return <NavLink key={item.key} item={item} active={active} label={t[item.key]} compact={!sidebarOpen} />;
          })}
        </nav>
        <div className={`rent-collection-card mt-auto overflow-hidden rounded-2xl border p-5 ${sidebarOpen ? "block" : "hidden"}`}>
          <div className="flex items-start justify-between gap-3">
            <div className="rent-collection-icon flex size-10 items-center justify-center rounded-xl"><Sparkles size={18} /></div>
            <span className="rent-collection-value text-lg font-bold">76%</span>
          </div>
          <p className="mt-5 text-sm font-bold">{tr("Rent collection")}</p>
          <p className="mt-1 text-xs leading-5">{tr("৳70,320 of ৳92,000 collected")}</p>
          <div className="rent-collection-track mt-4 h-2 rounded-full"><div className="rent-collection-progress h-full w-[76%] rounded-full" /></div>
          <p className="mt-2 text-[11px]">{tr("2 payments still pending")}</p>
        </div>
        <div className="relative mt-4"><button onClick={() => setAccountMenuOpen(!accountMenuOpen)} className={`flex w-full items-center rounded-xl py-2.5 text-left hover:bg-white/10 ${sidebarOpen ? "gap-3 px-3" : "justify-center px-0"}`} aria-label="Open account menu" aria-expanded={accountMenuOpen}>
          <Avatar initials={profile.name.split(" ").map((part) => part[0]).join("").slice(0, 2)} tone="bg-[#dff2e9] text-[#12704b]" />
          {sidebarOpen && <><span className="min-w-0 flex-1"><span className="block truncate text-sm font-semibold">{profile.name}</span><span className="block text-xs text-[#71847d]">{tr("Property owner")}</span></span><MoreHorizontal size={18} className="text-white/70" /></>}
        </button>{accountMenuOpen && <div className={`account-menu absolute bottom-[calc(100%+.5rem)] z-50 w-56 overflow-hidden rounded-2xl border border-[#dfe7e3] bg-white p-1.5 text-[#243b32] shadow-[0_18px_45px_rgba(5,35,24,.22)] ${sidebarOpen ? "left-0" : "left-[calc(100%+.75rem)] bottom-0"}`}><div className="border-b border-[#e7ece9] px-3 py-2.5"><p className="truncate text-sm font-bold">{profile.name}</p><p className="truncate text-[11px] text-[#71847d]">{profile.email}</p></div><Link onClick={() => setAccountMenuOpen(false)} href="/profile" className="account-menu-item"><User size={16} /> {tr("Profile")}</Link><Link onClick={() => setAccountMenuOpen(false)} href="/profile" className="account-menu-item"><Settings size={16} /> {tr("Preferences")}</Link><button onClick={logout} className="account-menu-item danger w-full"><LogOut size={16} /> {tr("Log out")}</button></div>}</div>
      </aside>

      <div className={`transition-[padding] duration-300 ${sidebarOpen ? "lg:pl-[268px]" : "lg:pl-[88px]"}`}>
        <header className="sticky top-0 z-20 border-b border-[#e4eae7] bg-white/90 backdrop-blur-xl">
          <div className="flex h-[74px] w-full items-center gap-3 px-4 sm:px-7 lg:px-9">
            <div className="lg:hidden"><Brand markOnly /></div>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="header-sidebar-toggle hidden size-10 shrink-0 place-items-center rounded-xl border border-[#dfe7e3] bg-white lg:grid" aria-label={tr(sidebarOpen ? "Collapse sidebar" : "Expand sidebar")} title={tr(sidebarOpen ? "Collapse sidebar" : "Expand sidebar")}><span className={`transition-transform duration-300 ${sidebarOpen ? "rotate-0" : "rotate-180"}`}>{sidebarOpen ? <PanelLeftClose size={19} /> : <PanelLeftOpen size={19} />}</span></button>
            {screen === "tenants" && <Link href="/dashboard" aria-label="Back" className="grid size-9 place-items-center rounded-xl border border-[#dfe7e3]"><ArrowLeft size={18} /></Link>}
            <h1 className="flex-1 text-lg font-bold tracking-[-0.02em] sm:text-xl">{title}</h1>
            <RoleSwitch role={role} setRole={setRole} />
            <button onClick={() => changeLocale(locale === "en" ? "bn" : "en")} className="flex h-10 items-center gap-2 rounded-xl border border-[#dfe7e3] bg-white px-3 text-xs font-bold transition hover:border-[#178157]" aria-label={tr("Change language")}>
              <Languages size={17} /><span className="hidden sm:inline">{locale === "en" ? "বাংলা" : "EN"}</span>
            </button>
            <button onClick={toggleTheme} className="grid size-10 place-items-center rounded-xl border border-[#dfe7e3] bg-white" aria-label={tr(dark ? "Use light theme" : "Use dark theme")} title={tr(dark ? "Use light theme" : "Use dark theme")}>
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button onClick={() => setNotice((v) => v + 1)} className="relative grid size-10 place-items-center rounded-xl border border-[#dfe7e3] bg-white" aria-label={tr("Notifications")}>
              <Bell size={18} />
              <span className="absolute right-2 top-2 size-2 rounded-full border-2 border-white bg-[#e65c4f]" />
            </button>
          </div>
        </header>

        <main className="w-full px-4 pb-28 pt-6 sm:px-7 lg:px-9 lg:pb-10 lg:pt-8">
          {notice > 0 && <Toast onClose={() => setNotice(0)} />}
          {screen === "dashboard" && (role === "landlord" ? <LandlordDashboard t={t} locale={locale} setModal={setModal} /> : <TenantDashboard locale={locale} />)}
          {screen === "flats" && <Flats locale={locale} setModal={setModal} role={role} />}
          {screen === "tenants" && <Tenants locale={locale} t={t} setModal={setModal} />}
          {screen === "bills" && <Bills locale={locale} role={role} />}
          {screen === "chat" && <Chat role={role} />}
          {screen === "profile" && <Profile locale={locale} setLocale={changeLocale} role={role} profile={profile} onSave={saveProfile} onLogout={logout} />}
        </main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-30 flex h-[76px] items-center justify-around border-t border-[#dfe7e3] bg-white/95 px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden">
        {nav.map((item) => {
          const Icon = item.icon; const active = pathname === item.href;
          return <Link key={item.key} href={item.href} className={`flex min-w-12 flex-col items-center gap-1 rounded-xl px-1 py-2 text-[10px] font-semibold ${active ? "text-[#118057]" : "text-[#73857e]"}`}><span className={`grid size-8 place-items-center rounded-xl ${active ? "bg-[#e4f5ed]" : ""}`}><Icon size={19} strokeWidth={active ? 2.5 : 2} /></span>{t[item.key]}</Link>;
        })}
      </nav>
      {modal && <AddModal type={modal} onClose={() => setModal(null)} />}
    </div>
    </LanguageContext.Provider>
  );
}

function Brand({ markOnly = false }: { markOnly?: boolean }) {
  const { tr } = useLanguage();
  return <div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-[13px] bg-white text-[#137e56] shadow-[0_6px_18px_rgba(8,48,31,.2)]"><Building2 size={21} /></span>{!markOnly && <span><strong className="block text-lg leading-5 tracking-[-.03em]">RENTIFY</strong><span className="text-xs text-white/70">{tr("Renting made simple")}</span></span>}</div>;
}

function RoleSwitch({ role, setRole, compact = false }: { role: Role; setRole: (r: Role) => void; compact?: boolean }) {
  const { tr } = useLanguage();
  return <div className={`role-switch ${compact ? "flex w-full" : "hidden min-w-[190px] sm:flex"} items-center gap-1 rounded-xl p-1 text-xs font-bold`}>
    {(["landlord", "tenant"] as const).map((r) => <button key={r} onClick={() => setRole(r)} className={`min-w-0 flex-1 rounded-lg px-3 py-2.5 text-center capitalize transition ${role === r ? "active bg-white text-[#137e56] shadow-sm" : "text-[#71847d]"}`}>{tr(r === "landlord" ? "Landlord" : "Tenant")}</button>)}
  </div>;
}

function NavLink({ item, active, label, compact }: { item: typeof nav[number]; active: boolean; label: string; compact?: boolean }) {
  const Icon = item.icon;
  return <Link href={item.href} title={compact ? label : undefined} className={`flex items-center rounded-xl py-3 text-sm font-semibold transition ${compact ? "justify-center px-0" : "gap-3 px-3"} ${active ? "bg-[#eaf6f0] text-[#117b53]" : "text-[#5f736b] hover:bg-[#f5f7f6] hover:text-[#142820]"}`}><Icon size={20} strokeWidth={active ? 2.5 : 2} />{!compact && label}{item.key === "chat" && !compact && <span className="ml-auto grid size-5 place-items-center rounded-full bg-[#168159] text-[10px] text-white">2</span>}</Link>;
}

function LandlordDashboard({ t, locale, setModal }: { t: typeof copy.en | typeof copy.bn; locale: Locale; setModal: (v: "tenant" | "flat") => void }) {
  const bn = locale === "bn";
  const { tr } = useLanguage();
  return <>
    <section className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div><p className="mb-1 text-sm font-medium text-[#6e8179]">{t.month}</p><h2 className="text-2xl font-bold tracking-[-.04em] sm:text-[30px]">{t.welcome} 👋</h2><p className="mt-2 text-sm text-[#6e8179]">{t.sub}</p></div>
      <button className="flex h-11 w-fit items-center gap-2 rounded-xl border border-[#dce6e1] bg-white px-4 text-sm font-semibold shadow-sm"><CalendarDays size={17} className="text-[#168159]" />{t.month}<ChevronDown size={15} /></button>
    </section>
    <section className="grid grid-cols-2 gap-3 xl:grid-cols-4">
      <Metric icon={<CircleDollarSign />} label={t.expected} value={`৳${money(92_000, bn)}`} hint={tr("4 tenants")} tone="emerald" />
      <Metric icon={<Check />} label={t.collected} value={`৳${money(48_370, bn)}`} hint={tr("52.6% of total")} tone="blue" progress={53} />
      <Metric icon={<Clock3 />} label={t.due} value={`৳${money(43_630, bn)}`} hint={tr("2 bills pending")} tone="red" />
      <Metric icon={<Building2 />} label={t.occupied} value={bn ? "৪ / ৬" : "4 / 6"} hint={tr("1 vacant · 1 repair")} tone="amber" />
    </section>
    <section className="mt-7 grid gap-6 xl:grid-cols-[1.45fr_.9fr]">
      <div className="rounded-3xl border border-[#e1e8e4] bg-white p-5 shadow-[0_2px_10px_rgba(20,40,32,.03)] sm:p-6">
        <SectionTitle title={t.overdue} action={<Link href="/bills">{t.viewAll}</Link>} />
        <div className="mt-5 space-y-3">
          {bills.filter((b) => b.status !== "paid").map((bill) => <div key={bill.id} className="group flex items-center gap-3 rounded-2xl border border-[#e7ece9] p-3.5 transition hover:border-[#b8d9ca] hover:bg-[#fbfdfc]"><Avatar initials={bill.tenant.split(" ").map((x) => x[0]).join("")} tone={bill.status === "overdue" ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-600"} /><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{bill.tenant}</p><p className="mt-0.5 text-xs text-[#74867f]">Flat {bill.flat} · Due {bill.due}</p></div><div className="text-right"><p className="text-sm font-bold">৳{money(bill.total - bill.paid, bn)}</p><Status value={bill.status} /></div><ChevronRight size={17} className="hidden text-[#91a099] sm:block" /></div>)}
        </div>
      </div>
      <div className="space-y-6">
        <div className="rounded-3xl bg-[#173d31] p-5 text-white shadow-[0_14px_34px_rgba(23,61,49,.16)] sm:p-6">
          <h3 className="font-bold">{t.quick}</h3><p className="mt-1 text-xs text-white/60">{tr("Keep your property up to date")}</p>
          <div className="mt-5 grid grid-cols-2 gap-3"><QuickButton icon={<UserRoundPlus />} label={t.addTenant} onClick={() => setModal("tenant")} /><QuickButton icon={<Plus />} label={t.addFlat} onClick={() => setModal("flat")} /></div>
        </div>
        <div className="rounded-3xl border border-[#e1e8e4] bg-white p-5"><SectionTitle title={t.recent} /><div className="mt-4 space-y-4"><Activity tone="bg-emerald-50 text-emerald-600" icon={<Check size={15} />} title={tr("Rent payment received")} note="Arif · ৳21,550 · 12 min ago" /><Activity tone="bg-sky-50 text-sky-600" icon={<MessageCircle size={15} />} title={tr("New message from Nusrat")} note={tr("Water line issue · 1 hr ago")} /><Activity tone="bg-amber-50 text-amber-600" icon={<Wrench size={15} />} title={tr("Flat B-202 in maintenance")} note={tr("Updated yesterday")} /></div></div>
      </div>
    </section>
  </>;
}

function TenantDashboard({ locale }: { locale: Locale }) {
  const bn = locale === "bn";
  const { tr } = useLanguage();
  return <div className="w-full">
    <div className="mb-7"><p className="text-sm font-medium text-[#6e8179]">{locale === "bn" ? "আগস্ট ২০২৬" : "August 2026"}</p><h2 className="mt-1 text-2xl font-bold tracking-[-.04em] sm:text-[30px]">{tr("Welcome back, Arif")} 👋</h2><p className="mt-2 text-sm text-[#6e8179]">{tr("Here is your home and payment summary.")}</p></div>
    <section className="overflow-hidden rounded-[28px] bg-[#173d31] p-6 text-white shadow-[0_18px_50px_rgba(23,61,49,.18)] sm:p-8"><div className="flex items-start justify-between"><div><p className="text-sm text-white/65">{tr("Total to pay this month")}</p><p className="mt-2 text-3xl font-bold tracking-tight">৳{money(21_550, bn)}</p></div><Status value="unpaid" /></div><div className="my-6 h-px bg-white/10" /><div className="grid grid-cols-3 gap-4 text-sm"><div><p className="text-white/55">{tr("Rent")}</p><p className="mt-1 font-semibold">৳{money(18_500, bn)}</p></div><div><p className="text-white/55">{tr("Utilities")}</p><p className="mt-1 font-semibold">৳{money(3_050, bn)}</p></div><div><p className="text-white/55">{tr("Due date")}</p><p className="mt-1 font-semibold">10 Aug</p></div></div><button className="mt-7 h-12 w-full rounded-xl bg-[#ecb85b] font-bold text-[#273526] transition hover:bg-[#f1c675]">{tr("Pay now")}</button></section>
    <section className="mt-6 grid gap-4 sm:grid-cols-2"><Link href="/flats" className="flex items-center gap-4 rounded-2xl border border-[#e1e8e4] bg-white p-5"><span className="grid size-11 place-items-center rounded-xl bg-emerald-50 text-emerald-700"><Home /></span><span className="flex-1"><b className="block text-sm">{tr("My flat")} · A-101</b><span className="text-xs text-[#71847d]">{tr("1st floor")} · Green View House</span></span><ChevronRight size={18} /></Link><Link href="/chat" className="flex items-center gap-4 rounded-2xl border border-[#e1e8e4] bg-white p-5"><span className="grid size-11 place-items-center rounded-xl bg-sky-50 text-sky-700"><MessageCircle /></span><span className="flex-1"><b className="block text-sm">{tr("Message landlord")}</b><span className="text-xs text-[#71847d]">{tr("Usually replies within an hour")}</span></span><ChevronRight size={18} /></Link></section>
  </div>;
}

function Flats({ locale, setModal, role }: { locale: Locale; setModal: (v: "flat") => void; role: Role }) {
  const { tr } = useLanguage();
  const [filter, setFilter] = useState("all"); const [query, setQuery] = useState("");
  const [assignFlatId, setAssignFlatId] = useState<string | null>(null);
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const tenantFor = (flat: typeof flats[number]) => assignments[flat.id] ?? flat.tenant;
  const shown = flats.filter((f) => {
    const tenantName = tenantFor(f);
    const displayStatus = tenantName && f.status === "vacant" ? "occupied" : f.status;
    return (filter === "all" || displayStatus === filter) && (f.no.toLowerCase().includes(query.toLowerCase()) || tenantName?.toLowerCase().includes(query.toLowerCase()));
  });
  if (role === "tenant") return <TenantFlat />;
  return <><PageIntro title={tr("All flats")} subtitle={tr("Manage occupancy, rent and maintenance in one place.")} action={<button onClick={() => setModal("flat")} className="primary-btn"><Plus size={18} /> {copy[locale].addFlat}</button>} />
    <Toolbar query={query} setQuery={setQuery} placeholder={tr("Search by flat or tenant...")} filters={["all", "occupied", "vacant", "maintenance"]} filter={filter} setFilter={setFilter} />
    <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{shown.map((flat) => { const assignedTenant = tenantFor(flat); const displayStatus = assignedTenant && flat.status === "vacant" ? "occupied" : flat.status; return <div key={flat.id} className="rounded-3xl border border-[#e0e8e4] bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(20,40,32,.08)]"><div className="flex items-start justify-between"><span className="grid size-11 place-items-center rounded-2xl bg-[#eaf6f0] text-[#137e56]"><Building2 size={21} /></span><Status value={displayStatus} /></div><div className="mt-5 flex items-end justify-between"><div><h3 className="text-xl font-bold">{locale === "bn" ? "ফ্ল্যাট" : "Flat"} {flat.no}</h3><p className="mt-1 text-xs text-[#71847d]">{flat.floor}</p></div><p className="font-bold">৳{money(flat.rent, locale === "bn")}<span className="text-xs font-normal text-[#71847d]"> /{tr("per month")}</span></p></div><div className="my-4 h-px bg-[#edf1ef]" />{assignedTenant ? <div className="flex items-center gap-3"><Avatar initials={assignedTenant.split(" ").map((x) => x[0]).join("")} tone="bg-slate-100 text-slate-600" small /><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{assignedTenant}</p><p className="text-xs text-[#7b8c85]">{tr("Current tenant")}</p></div><button onClick={() => setAssignFlatId(flat.id)} className="text-xs font-bold text-[#137e56]">{tr("Change")}</button></div> : <button onClick={() => setAssignFlatId(flat.id)} className="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#bdd4c9] text-sm font-semibold text-[#137e56]"><UserRoundPlus size={16} /> {tr("Assign tenant")}</button>}</div>; })}</div>
    {assignFlatId && <AssignTenantModal flatNo={flats.find((f) => f.id === assignFlatId)?.no ?? ""} assignedIds={Object.values(assignments)} onClose={() => setAssignFlatId(null)} onAssign={(tenantName) => { setAssignments((current) => ({ ...current, [assignFlatId]: tenantName })); setAssignFlatId(null); }} />}
  </>;
}

function Tenants({ locale, setModal }: { locale: Locale; t: typeof copy.en | typeof copy.bn; setModal: (v: "tenant") => void }) {
  const { tr } = useLanguage();
  void setModal;
  const [records, setRecords] = useState<TenantRecord[]>(() => tenants.map((tenant) => ({ ...tenant })));
  const [query, setQuery] = useState(""); const [filter, setFilter] = useState("all");
  const [formTenant, setFormTenant] = useState<TenantRecord | "new" | null>(null);
  const [viewTenant, setViewTenant] = useState<TenantRecord | null>(null);
  const [deleteTenant, setDeleteTenant] = useState<TenantRecord | null>(null);
  const shown = records.filter((x) => (filter === "all" || x.status === filter) && (x.name.toLowerCase().includes(query.toLowerCase()) || x.phone.includes(query)));
  function saveTenant(record: TenantRecord) { setRecords((current) => current.some((item) => item.id === record.id) ? current.map((item) => item.id === record.id ? record : item) : [record, ...current]); setFormTenant(null); }
  return <><PageIntro title={copy[locale].tenants} subtitle={`${records.length} ${locale === "bn" ? "জন ভাড়াটিয়া" : "tenants across your property."}`} action={<button onClick={() => setFormTenant("new")} className="primary-btn"><UserRoundPlus size={18} /> {copy[locale].addTenant}</button>} /><Toolbar query={query} setQuery={setQuery} placeholder={tr("Search tenants...")} filters={["all", "active", "notice", "left"]} filter={filter} setFilter={setFilter} />
    <div className="mt-6 overflow-hidden rounded-3xl border border-[#e1e8e4] bg-white"><div className="hidden grid-cols-[1.45fr_.55fr_.65fr_.55fr_.65fr] gap-4 border-b bg-[#f8faf9] px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-[#819089] md:grid"><span>{tr("Tenant")}</span><span>{locale === "bn" ? "ফ্ল্যাট" : "Flat"}</span><span>{tr("Monthly rent")}</span><span>{tr("Status")}</span><span className="text-right">Actions</span></div>{shown.map((tenant) => <div key={tenant.id} className="flex items-center gap-3 border-b border-[#edf1ef] p-4 last:border-0 md:grid md:grid-cols-[1.45fr_.55fr_.65fr_.55fr_.65fr] md:gap-4 md:px-5"><button onClick={() => setViewTenant(tenant)} className="flex min-w-0 items-center gap-3 text-left"><Avatar initials={tenant.initials} tone={tenant.tone} /><div className="min-w-0"><p className="truncate text-sm font-bold">{tenant.name}</p><p className="text-xs text-[#74867f]">{tenant.phone} · {tenant.familyMembers} family</p></div></button><p className="hidden text-sm font-semibold md:block">{tenant.flat === "Unassigned" ? tr("Available") : tenant.flat}</p><p className="ml-auto text-sm font-bold md:ml-0">৳{money(tenant.rent, locale === "bn")}</p><div className="hidden md:block"><Status value={tenant.status} /></div><div className="hidden justify-end gap-1 md:flex"><button onClick={() => setViewTenant(tenant)} className="tenant-action" aria-label="View tenant"><Eye size={16} /></button><button onClick={() => setFormTenant(tenant)} className="tenant-action" aria-label="Edit tenant"><Pencil size={16} /></button><button onClick={() => setDeleteTenant(tenant)} className="tenant-action danger" aria-label="Delete tenant"><Trash2 size={16} /></button></div><button onClick={() => setViewTenant(tenant)} className="md:hidden"><ChevronRight size={17} /></button></div>)}</div>
    {formTenant && <TenantCrudModal tenant={formTenant === "new" ? null : formTenant} onClose={() => setFormTenant(null)} onSave={saveTenant} />}
    {viewTenant && <TenantDetailModal tenant={viewTenant} onClose={() => setViewTenant(null)} onEdit={() => { setFormTenant(viewTenant); setViewTenant(null); }} />}
    {deleteTenant && <ConfirmDeleteTenant tenant={deleteTenant} onClose={() => setDeleteTenant(null)} onConfirm={() => { setRecords((current) => current.filter((item) => item.id !== deleteTenant.id)); setDeleteTenant(null); }} />}
  </>;
}

function Bills({ locale, role }: { locale: Locale; role: Role }) {
  const { tr } = useLanguage();
  const [filter, setFilter] = useState("all"); const [query, setQuery] = useState(""); const ownBills = role === "tenant" ? bills.slice(0, 1) : bills;
  const shown = ownBills.filter((b) => (filter === "all" || b.status === filter) && b.tenant.toLowerCase().includes(query.toLowerCase()));
  const total = shown.reduce((a, b) => a + b.total, 0); const paid = shown.reduce((a, b) => a + b.paid, 0);
  return <><PageIntro title={tr(role === "tenant" ? "My bills" : "Monthly bills")} subtitle={tr(role === "tenant" ? "Your rent and utility history." : "Track rent and utility payments for every tenant.")} action={<button className="secondary-btn"><CalendarDays size={17} /> {locale === "bn" ? "আগস্ট ২০২৬" : "August 2026"} <ChevronDown size={15} /></button>} />
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3"><MiniMetric label={tr("Total billed")} value={`৳${money(total, locale === "bn")}`} /><MiniMetric label={copy[locale].collected} value={`৳${money(paid, locale === "bn")}`} positive /><MiniMetric label={tr("Outstanding")} value={`৳${money(total - paid, locale === "bn")}`} warn /></div>
    {role === "landlord" && <Toolbar query={query} setQuery={setQuery} placeholder={tr("Search tenant...")} filters={["all", "paid", "partial", "overdue"]} filter={filter} setFilter={setFilter} />}
    <div className="mt-6 grid gap-4 xl:grid-cols-2">{shown.map((bill) => <div key={bill.id} className="rounded-3xl border border-[#e0e8e4] bg-white p-5"><div className="flex items-start gap-3"><Avatar initials={bill.tenant.split(" ").map((x) => x[0]).join("")} tone="bg-[#eaf6f0] text-[#137e56]" /><div className="flex-1"><p className="text-sm font-bold">{bill.tenant}</p><p className="text-xs text-[#71847d]">{locale === "bn" ? "ফ্ল্যাট" : "Flat"} {bill.flat} · {tr("Due date")} {bill.due}</p></div><Status value={bill.status} /></div><div className="my-5 grid grid-cols-3 rounded-2xl bg-[#f6f8f7] p-4 text-sm"><div><p className="text-xs text-[#7a8b84]">{tr("Rent")}</p><b>৳{money(bill.total - 3050)}</b></div><div><p className="text-xs text-[#7a8b84]">{tr("Utilities")}</p><b>৳{money(3050)}</b></div><div><p className="text-xs text-[#7a8b84]">{tr("Total")}</p><b>৳{money(bill.total)}</b></div></div><div className="flex items-center justify-between"><p className="text-xs text-[#71847d]">{tr("Paid")} <b className="text-[#173d31]">৳{money(bill.paid)}</b></p><button className="text-sm font-bold text-[#137e56]">{tr("View details")} →</button></div></div>)}</div>
  </>;
}

function Chat({ role }: { role: Role }) {
  const { tr } = useLanguage();
  const [active, setActive] = useState(0); const [messages, setMessages] = useState(["Assalamu alaikum, I wanted to let you know the water pressure is low today.", "Wa alaikum assalam. Thank you for telling me. I’ll send someone to check it this afternoon."]); const [draft, setDraft] = useState("");
  const selected = role === "tenant" ? { name: "M. Rahman", flat: "Landlord", initials: "MR", tone: "bg-emerald-100 text-emerald-700" } : conversations[active];
  function send(e: FormEvent) { e.preventDefault(); if (draft.trim()) { setMessages([...messages, draft.trim()]); setDraft(""); } }
  return <div className="-mx-4 -my-6 h-[calc(100dvh-146px)] sm:mx-0 sm:my-0 sm:h-[calc(100dvh-134px)]"><div className="grid h-full overflow-hidden border-[#e1e8e4] bg-white sm:rounded-3xl sm:border lg:grid-cols-[330px_1fr]">
    {role === "landlord" && <aside className="hidden border-r border-[#e7ece9] lg:block"><div className="p-5"><h2 className="text-xl font-bold">{tr("Messages")}</h2><div className="relative mt-4"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a9993]" size={17} /><input className="h-10 w-full rounded-xl bg-[#f4f7f5] pl-10 pr-3 text-sm outline-none" placeholder={tr("Search conversations")} /></div></div>{conversations.map((c, i) => <button key={c.id} onClick={() => setActive(i)} className={`flex w-full items-center gap-3 border-t border-[#edf1ef] p-4 text-left ${active === i ? "bg-[#edf8f3]" : "hover:bg-[#fafcfb]"}`}><Avatar initials={c.initials} tone={c.tone} /><span className="min-w-0 flex-1"><span className="flex justify-between"><b className="text-sm">{c.name}</b><small className="text-[10px] text-[#819089]">{c.time}</small></span><span className="mt-1 flex items-center"><span className="truncate text-xs text-[#71847d]">{c.preview}</span>{c.unread > 0 && <i className="ml-2 grid size-5 shrink-0 place-items-center rounded-full bg-[#168159] text-[10px] not-italic text-white">{c.unread}</i>}</span></span></button>)}</aside>}
    <section className="flex min-w-0 flex-col"><div className="flex h-[68px] shrink-0 items-center gap-3 border-b px-4 sm:px-5"><Avatar initials={selected.initials} tone={selected.tone} /><div className="flex-1"><p className="text-sm font-bold">{selected.name}</p><p className="flex items-center gap-1 text-[11px] text-[#71847d]"><span className="size-1.5 rounded-full bg-emerald-500" /> {selected.flat}</p></div><button className="grid size-9 place-items-center rounded-xl border"><Phone size={17} /></button><button className="grid size-9 place-items-center rounded-xl border"><MoreHorizontal size={18} /></button></div>
      <div className="flex-1 overflow-y-auto bg-[#f7f9f8] p-4 sm:p-6"><p className="mb-6 text-center text-[10px] font-bold uppercase tracking-wider text-[#91a099]">{tr("Today")}</p><div className="space-y-4"><Bubble text={messages[0]} mine={role === "tenant"} time="9:42 AM" /><Bubble text={messages[1]} mine={role === "landlord"} time="9:48 AM" />{messages.slice(2).map((m, i) => <Bubble key={i} text={m} mine time={tr("Now")} />)}</div></div>
      <form onSubmit={send} className="flex shrink-0 gap-3 border-t bg-white p-3 sm:p-4"><input value={draft} onChange={(e) => setDraft(e.target.value)} className="h-12 flex-1 rounded-xl border border-[#dfe7e3] bg-[#fafcfb] px-4 text-sm outline-none focus:border-[#168159]" placeholder={tr("Write a message...")} /><button className="grid size-12 place-items-center rounded-xl bg-[#168159] text-white"><Send size={19} /></button></form></section>
  </div></div>;
}

function Profile({ locale, setLocale, role, profile, onSave, onLogout }: { locale: Locale; setLocale: (l: Locale) => void; role: Role; profile: AccountProfile; onSave: (profile: AccountProfile) => void; onLogout: () => void }) {
  const { tr } = useLanguage();
  const [editing, setEditing] = useState(false);
  return <div className="w-full"><div className="rounded-3xl border border-[#e1e8e4] bg-white p-6 sm:p-8"><div className="flex flex-col items-center text-center sm:flex-row sm:text-left"><Avatar initials={profile.name.split(" ").map((part) => part[0]).join("").slice(0, 2)} tone="bg-[#dff3e9] text-[#137e56]" large /><div className="mt-4 sm:ml-5 sm:mt-0"><h2 className="text-xl font-bold">{profile.name}</h2><p className="mt-1 text-sm capitalize text-[#71847d]">{tr(role === "landlord" ? "Landlord" : "Tenant")} {tr("account")}</p></div><button onClick={() => setEditing(true)} className="secondary-btn mt-5 sm:ml-auto sm:mt-0"><Pencil size={16} /> {tr("Edit profile")}</button></div></div>
    <div className="mt-5 overflow-hidden rounded-3xl border border-[#e1e8e4] bg-white"><InfoRow icon={<Phone />} label={tr("Phone number")} value={profile.phone} /><InfoRow icon={<Mail />} label={tr("Email address")} value={profile.email} /><InfoRow icon={<ShieldCheck />} label={tr("Account security")} value={tr("Password and sign-in")} arrow /><InfoRow icon={<Settings />} label={tr("Preferences")} value={tr("Notifications and billing")} arrow /></div>
    <div className="mt-5 rounded-3xl border border-[#e1e8e4] bg-white p-5 sm:p-6"><h3 className="font-bold">{tr("Language")}</h3><p className="mt-1 text-xs text-[#71847d]">{tr("Choose the language you are most comfortable with.")}</p><div className="mt-4 grid grid-cols-2 gap-3">{(["en", "bn"] as const).map((l) => <button key={l} onClick={() => setLocale(l)} className={`flex h-14 items-center justify-between rounded-xl border px-4 text-sm font-bold ${locale === l ? "border-[#168159] bg-[#eef8f3] text-[#137e56]" : "border-[#e1e8e4]"}`}><span>{l === "en" ? tr("English") : "বাংলা"}</span>{locale === l && <Check size={18} />}</button>)}</div></div>
    <button onClick={onLogout} className="mt-5 flex h-13 w-full items-center justify-center gap-2 rounded-2xl border border-red-100 bg-red-50 font-bold text-red-600"><LogOut size={18} /> {tr("Log out")}</button>
    {editing && <EditProfileModal profile={profile} onClose={() => setEditing(false)} onSave={(next) => { onSave(next); setEditing(false); }} />}
  </div>;
}

function TenantFlat() {
  const { locale, tr } = useLanguage();
  return <div className="w-full"><PageIntro title={tr("My flat")} subtitle={tr("Your current home and tenancy details.")} /><div className="rounded-[28px] bg-[#173d31] p-6 text-white sm:p-8"><div className="flex items-start justify-between"><span className="grid size-12 place-items-center rounded-2xl bg-white/10"><Home /></span><Status value="occupied" /></div><h2 className="mt-8 text-3xl font-bold">{locale === "bn" ? "ফ্ল্যাট" : "Flat"} A-101</h2><p className="mt-2 text-sm text-white/60">{tr("1st floor")} · Green View House</p><div className="mt-7 grid grid-cols-2 gap-4 border-t border-white/10 pt-6"><div><p className="text-xs text-white/50">{tr("Monthly rent")}</p><p className="mt-1 font-bold">৳18,500</p></div><div><p className="text-xs text-white/50">{tr("Living since")}</p><p className="mt-1 font-bold">{locale === "bn" ? "জানুয়ারি ২০২৫" : "January 2025"}</p></div></div></div><div className="mt-5 rounded-3xl border border-[#e1e8e4] bg-white p-6"><h3 className="font-bold">{tr("Property contact")}</h3><div className="mt-4 flex items-center gap-3"><Avatar initials="MR" tone="bg-emerald-100 text-emerald-700" /><div className="flex-1"><p className="text-sm font-bold">Mohammad Rahman</p><p className="text-xs text-[#71847d]">{tr("Landlord")} · 01711 456 789</p></div><Link href="/chat" className="grid size-10 place-items-center rounded-xl bg-[#eaf6f0] text-[#137e56]"><MessageCircle size={18} /></Link></div></div></div>;
}

function Metric({ icon, label, value, hint, tone, progress }: { icon: ReactNode; label: string; value: string; hint: string; tone: string; progress?: number }) { const tones: Record<string, string> = { emerald: "bg-emerald-50 text-emerald-600", blue: "bg-sky-50 text-sky-600", red: "bg-red-50 text-red-500", amber: "bg-amber-50 text-amber-600" }; return <div className="rounded-2xl border border-[#e1e8e4] bg-white p-4 shadow-[0_2px_8px_rgba(20,40,32,.025)] sm:p-5"><div className="flex items-center gap-3"><span className={`grid size-9 shrink-0 place-items-center rounded-xl [&>svg]:size-[18px] ${tones[tone]}`}>{icon}</span><p className="text-xs font-medium text-[#71847d]">{label}</p></div><p className="mt-4 text-xl font-bold tracking-[-.03em] sm:text-2xl">{value}</p>{progress ? <div className="mt-3"><div className="h-1 rounded-full bg-[#edf2ef]"><div style={{ width: `${progress}%` }} className="h-full rounded-full bg-sky-500" /></div><p className="mt-2 text-[10px] text-[#819089]">{hint}</p></div> : <p className="mt-2 text-[10px] text-[#819089]">{hint}</p>}</div>; }
function MiniMetric({ label, value, positive, warn }: { label: string; value: string; positive?: boolean; warn?: boolean }) { return <div className="rounded-2xl border border-[#e1e8e4] bg-white p-4 sm:p-5"><p className="text-xs text-[#71847d]">{label}</p><p className={`mt-2 text-lg font-bold sm:text-xl ${positive ? "text-[#137e56]" : warn ? "text-[#d45e4d]" : ""}`}>{value}</p></div>; }
function SectionTitle({ title, action }: { title: string; action?: ReactNode }) { return <div className="flex items-center justify-between"><h3 className="font-bold tracking-[-.02em]">{title}</h3>{action && <div className="text-xs font-bold text-[#137e56]">{action}</div>}</div>; }
function QuickButton({ icon, label, onClick }: { icon: ReactNode; label: string; onClick: () => void }) { return <button onClick={onClick} className="flex min-h-24 flex-col items-start justify-between rounded-2xl bg-white/10 p-4 text-left text-sm font-semibold transition hover:bg-white/15"><span className="grid size-8 place-items-center rounded-lg bg-white/10 [&>svg]:size-[17px]">{icon}</span>{label}</button>; }
function Activity({ tone, icon, title, note }: { tone: string; icon: ReactNode; title: string; note: string }) { return <div className="flex gap-3"><span className={`grid size-8 shrink-0 place-items-center rounded-xl ${tone}`}>{icon}</span><div><p className="text-xs font-bold">{title}</p><p className="mt-1 text-[10px] text-[#819089]">{note}</p></div></div>; }
function Avatar({ initials, tone, small, large }: { initials: string; tone: string; small?: boolean; large?: boolean }) { return <span className={`grid shrink-0 place-items-center rounded-full font-bold ${tone} ${large ? "size-20 text-xl" : small ? "size-9 text-[10px]" : "size-11 text-xs"}`}>{initials}</span>; }
function Status({ value }: { value: string }) { const { tr } = useLanguage(); const map: Record<string, string> = { paid: "bg-emerald-50 text-emerald-700", active: "bg-emerald-50 text-emerald-700", occupied: "bg-emerald-50 text-emerald-700", partial: "bg-amber-50 text-amber-700", notice: "bg-amber-50 text-amber-700", maintenance: "bg-amber-50 text-amber-700", unpaid: "bg-red-50 text-red-600", overdue: "bg-red-50 text-red-600", vacant: "bg-sky-50 text-sky-700", left: "bg-slate-100 text-slate-600" }; return <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold capitalize ${map[value] ?? map.left}`}>{tr(value)}</span>; }
function PageIntro({ title, subtitle, action }: { title: string; subtitle: string; action?: ReactNode }) { return <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><h2 className="text-2xl font-bold tracking-[-.04em] sm:text-[28px]">{title}</h2><p className="mt-2 text-sm text-[#71847d]">{subtitle}</p></div>{action}</div>; }
function Toolbar({ query, setQuery, placeholder, filters, filter, setFilter }: { query: string; setQuery: (q: string) => void; placeholder: string; filters: string[]; filter: string; setFilter: (f: string) => void }) { const { tr } = useLanguage(); return <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div className="relative max-w-sm flex-1"><Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#87968f]" /><input value={query} onChange={(e) => setQuery(e.target.value)} className="h-11 w-full rounded-xl border border-[#dfe7e3] bg-white pl-10 pr-4 text-sm outline-none focus:border-[#168159]" placeholder={placeholder} /></div><div className="flex max-w-full gap-1 overflow-x-auto rounded-xl bg-[#e9eeeb] p-1">{filters.map((f) => <button key={f} onClick={() => setFilter(f)} className={`whitespace-nowrap rounded-lg px-3 py-2 text-[11px] font-bold capitalize ${filter === f ? "bg-white text-[#137e56] shadow-sm" : "text-[#6d8078]"}`}>{tr(f === "all" ? "All" : f)}</button>)}</div></div>; }
function Bubble({ text, mine, time }: { text: string; mine?: boolean; time: string }) { return <div className={`flex ${mine ? "justify-end" : "justify-start"}`}><div className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${mine ? "rounded-br-md bg-[#178157] text-white" : "rounded-bl-md bg-white text-[#294139]"}`}><p>{text}</p><p className={`mt-1 text-right text-[9px] ${mine ? "text-white/60" : "text-[#91a099]"}`}>{time}{mine && " · Read"}</p></div></div>; }
function InfoRow({ icon, label, value, arrow }: { icon: ReactNode; label: string; value: string; arrow?: boolean }) { return <div className="flex items-center gap-4 border-b border-[#edf1ef] p-5 last:border-0"><span className="grid size-10 place-items-center rounded-xl bg-[#f1f6f3] text-[#137e56] [&>svg]:size-[18px]">{icon}</span><div className="flex-1"><p className="text-xs text-[#71847d]">{label}</p><p className="mt-1 text-sm font-semibold">{value}</p></div>{arrow && <ChevronRight size={18} className="text-[#87968f]" />}</div>; }
function Toast({ onClose }: { onClose: () => void }) { const { tr } = useLanguage(); return <div className="fixed right-4 top-20 z-50 flex max-w-sm items-center gap-3 rounded-2xl border border-[#cce4d8] bg-white p-4 shadow-xl"><span className="grid size-9 place-items-center rounded-xl bg-emerald-50 text-emerald-600"><Check size={17} /></span><div><p className="text-sm font-bold">{tr("You’re all caught up")}</p><p className="text-xs text-[#71847d]">{tr("No new notifications right now.")}</p></div><button onClick={onClose}><X size={16} /></button></div>; }
function EditProfileModal({ profile, onClose, onSave }: { profile: AccountProfile; onClose: () => void; onSave: (profile: AccountProfile) => void }) { const { tr } = useLanguage(); function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); const data = new FormData(event.currentTarget); onSave({ name: String(data.get("name") ?? ""), phone: String(data.get("phone") ?? ""), email: String(data.get("email") ?? "") }); } return <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/55 backdrop-blur-sm sm:items-center sm:p-4" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><div className="w-full max-w-lg rounded-t-[28px] border border-[#dfe7e3] bg-white p-6 shadow-2xl sm:rounded-[28px] sm:p-7"><div className="flex items-start justify-between"><div><h2 className="text-xl font-bold">{tr("Edit your profile")}</h2><p className="mt-1 text-xs text-[#71847d]">{tr("Update the details connected to your RENTIFY account.")}</p></div><button onClick={onClose} className="grid size-9 place-items-center rounded-xl bg-[#f2f5f3]"><X size={17} /></button></div><form onSubmit={submit} className="mt-6 space-y-4"><Field label={tr("Full name")} name="name" defaultValue={profile.name} required /><Field label={tr("Phone number")} name="phone" defaultValue={profile.phone} required /><Field label={tr("Email address")} name="email" type="email" defaultValue={profile.email} required /><div className="flex gap-3 pt-2"><button type="button" onClick={onClose} className="secondary-btn flex-1">{tr("Cancel")}</button><button className="primary-btn flex-1 justify-center">{tr("Save changes")}</button></div></form></div></div>; }
function TenantCrudModal({ tenant, onClose, onSave }: { tenant: TenantRecord | null; onClose: () => void; onSave: (tenant: TenantRecord) => void }) {
  const { tr } = useLanguage();
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); const data = new FormData(event.currentTarget); const name = String(data.get("name") ?? "").trim(); onSave({ id: tenant?.id ?? String(Date.now()), name, phone: String(data.get("phone") ?? ""), flat: String(data.get("flat") ?? "Unassigned"), rent: Number(data.get("rent") ?? 0), status: String(data.get("status") ?? "active") as TenantRecord["status"], initials: name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase(), tone: tenant?.tone ?? "bg-emerald-100 text-emerald-700", familyMembers: Number(data.get("familyMembers") ?? 1), emergencyPhone: String(data.get("emergencyPhone") ?? ""), voterId: String(data.get("voterId") ?? "") }); }
  return <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/55 backdrop-blur-sm sm:items-center sm:p-4" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><div className="max-h-[92dvh] w-full max-w-2xl overflow-y-auto rounded-t-[28px] border border-[#dfe7e3] bg-white p-6 shadow-2xl sm:rounded-[28px] sm:p-7"><div className="flex items-start justify-between"><div><h2 className="text-xl font-bold">{tenant ? tr("Edit tenant") : tr("Add new tenant")}</h2><p className="mt-1 text-xs text-[#71847d]">{tr("Store identity, household and emergency information.")}</p></div><button onClick={onClose} className="grid size-9 place-items-center rounded-xl bg-[#f2f5f3]"><X size={17} /></button></div><form onSubmit={submit} className="mt-6 grid gap-4 sm:grid-cols-2"><Field label={tr("Full name")} name="name" defaultValue={tenant?.name} required /><Field label={tr("Phone number")} name="phone" defaultValue={tenant?.phone} required /><Field label={tr("Total family members")} name="familyMembers" type="number" min="1" defaultValue={tenant?.familyMembers ?? 1} required /><Field label={tr("Emergency number")} name="emergencyPhone" defaultValue={tenant?.emergencyPhone} required /><Field label={tr("Voter ID number")} name="voterId" defaultValue={tenant?.voterId} required /><Field label={tr("Monthly rent")} name="rent" type="number" min="0" defaultValue={tenant?.rent ?? 0} required /><Field label={tr("Assigned flat")} name="flat" defaultValue={tenant?.flat ?? "Unassigned"} /><label className="text-xs font-bold">{tr("Status")}<select name="status" defaultValue={tenant?.status ?? "active"} className="mt-2 h-11 w-full rounded-xl border border-[#dfe7e3] bg-white px-3 text-sm font-normal outline-none"><option value="active">{tr("active")}</option><option value="notice">{tr("notice")}</option><option value="left">{tr("left")}</option></select></label><div className="mt-2 flex gap-3 sm:col-span-2"><button type="button" onClick={onClose} className="secondary-btn flex-1">{tr("Cancel")}</button><button className="primary-btn flex-1 justify-center">{tenant ? tr("Update tenant") : tr("Save tenant")}</button></div></form></div></div>;
}
function Field({ label, name, defaultValue, type = "text", required, min }: { label: string; name: string; defaultValue?: string | number; type?: string; required?: boolean; min?: string }) { return <label className="text-xs font-bold">{label}<input name={name} type={type} min={min} required={required} defaultValue={defaultValue} className="mt-2 h-11 w-full rounded-xl border border-[#dfe7e3] bg-white px-3 text-sm font-normal outline-none focus:border-[#168159]" /></label>; }
function TenantDetailModal({ tenant, onClose, onEdit }: { tenant: TenantRecord; onClose: () => void; onEdit: () => void }) { const { tr } = useLanguage(); return <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/55 backdrop-blur-sm sm:items-center sm:p-4" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><div className="w-full max-w-lg rounded-t-[28px] border border-[#dfe7e3] bg-white p-6 shadow-2xl sm:rounded-[28px]"><div className="flex items-start justify-between"><div className="flex items-center gap-3"><Avatar initials={tenant.initials} tone={tenant.tone} large /><div><h2 className="text-xl font-bold">{tenant.name}</h2><p className="text-xs text-[#71847d]">{tenant.flat}</p></div></div><button onClick={onClose} className="grid size-9 place-items-center rounded-xl bg-[#f2f5f3]"><X size={17} /></button></div><div className="mt-6 grid grid-cols-2 gap-3"><Detail icon={<Phone />} label={tr("Phone number")} value={tenant.phone} /><Detail icon={<UsersRound />} label={tr("Total family members")} value={String(tenant.familyMembers)} /><Detail icon={<PhoneCall />} label={tr("Emergency number")} value={tenant.emergencyPhone} /><Detail icon={<IdCard />} label={tr("Voter ID number")} value={tenant.voterId} /></div><button onClick={onEdit} className="primary-btn mt-6 w-full justify-center"><Pencil size={17} /> {tr("Edit tenant")}</button></div></div>; }
function Detail({ icon, label, value }: { icon: ReactNode; label: string; value: string }) { return <div className="rounded-2xl bg-[#f5f8f6] p-4"><span className="text-[#168159] [&>svg]:size-4">{icon}</span><p className="mt-3 text-[11px] text-[#71847d]">{label}</p><p className="mt-1 break-all text-sm font-bold">{value}</p></div>; }
function ConfirmDeleteTenant({ tenant, onClose, onConfirm }: { tenant: TenantRecord; onClose: () => void; onConfirm: () => void }) { const { tr } = useLanguage(); return <div className="fixed inset-0 z-50 grid place-items-center bg-black/55 p-4 backdrop-blur-sm"><div className="w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-2xl"><span className="mx-auto grid size-12 place-items-center rounded-full bg-red-50 text-red-600"><Trash2 size={20} /></span><h2 className="mt-4 text-lg font-bold">{tr("Delete tenant?")}</h2><p className="mt-2 text-sm text-[#71847d]">{tenant.name} {tr("will be removed from this list.")}</p><div className="mt-6 flex gap-3"><button onClick={onClose} className="secondary-btn flex-1">{tr("Cancel")}</button><button onClick={onConfirm} className="flex h-11 flex-1 items-center justify-center rounded-xl bg-red-600 text-sm font-bold text-white">{tr("Delete")}</button></div></div></div>; }
function AssignTenantModal({ flatNo, assignedIds, onClose, onAssign }: { flatNo: string; assignedIds: string[]; onClose: () => void; onAssign: (tenantName: string) => void }) {
  const [query, setQuery] = useState("");
  const { locale, tr } = useLanguage();
  const available = tenants.filter((tenant) => tenant.name.toLowerCase().includes(query.toLowerCase()));
  return <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/55 p-0 backdrop-blur-sm sm:items-center sm:p-4" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <div className="w-full max-w-xl rounded-t-[28px] border border-[#dfe7e3] bg-white p-6 shadow-2xl sm:rounded-[28px] sm:p-7">
      <div className="flex items-start justify-between gap-4"><div><h2 className="text-xl font-bold">{tr("Assign tenant")}</h2><p className="mt-1 text-xs text-[#71847d]">{tr("Choose a tenant for Flat")} {flatNo}</p></div><button onClick={onClose} className="grid size-9 place-items-center rounded-xl bg-[#f2f5f3]"><X size={17} /></button></div>
      <div className="relative mt-5"><Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#819089]" /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} className="h-12 w-full rounded-xl border border-[#dfe7e3] bg-[#fafcfb] pl-11 pr-4 text-sm outline-none focus:border-[#168159]" placeholder={tr("Search tenants by name...")} /></div>
      <div className="mt-4 max-h-[360px] space-y-2 overflow-y-auto pr-1">{available.map((tenant) => { const unavailable = tenant.flat !== "Unassigned" || assignedIds.includes(tenant.name); return <button key={tenant.id} disabled={unavailable} onClick={() => onAssign(tenant.name)} className="flex w-full items-center gap-3 rounded-2xl border border-[#e3eae6] p-3.5 text-left transition enabled:hover:border-[#65a88a] enabled:hover:bg-[#f2faf6] disabled:cursor-not-allowed disabled:opacity-50"><Avatar initials={tenant.initials} tone={tenant.tone} /><span className="min-w-0 flex-1"><span className="block truncate text-sm font-bold">{tenant.name}</span><span className="block text-xs text-[#74867f]">{tenant.phone}</span></span><span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${unavailable ? "bg-slate-100 text-slate-600" : "bg-emerald-50 text-emerald-700"}`}>{unavailable ? `${locale === "bn" ? "ফ্ল্যাট" : "Flat"} ${tenant.flat}` : tr("Available")}</span>{!unavailable && <ChevronRight size={17} className="text-[#137e56]" />}</button>; })}{available.length === 0 && <div className="py-10 text-center"><Users className="mx-auto text-[#91a099]" /><p className="mt-3 text-sm font-bold">{tr("No tenants found")}</p><p className="mt-1 text-xs text-[#71847d]">{tr("Try a different name.")}</p></div>}</div>
      <div className="mt-5 border-t border-[#e7ece9] pt-4"><Link href="/tenants" className="flex h-11 items-center justify-center gap-2 rounded-xl border border-dashed border-[#a9cbbb] text-sm font-bold text-[#137e56]"><UserRoundPlus size={17} /> {tr("Add a new tenant")}</Link></div>
    </div>
  </div>;
}
function AddModal({ type, onClose }: { type: "tenant" | "flat"; onClose: () => void }) { const [saved, setSaved] = useState(false); const { tr } = useLanguage(); if (type === "tenant") return <TenantCrudModal tenant={null} onClose={onClose} onSave={onClose} />; return <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#10281f]/45 p-0 backdrop-blur-sm sm:items-center sm:p-4" onMouseDown={(e) => e.target === e.currentTarget && onClose()}><div className="w-full max-w-lg rounded-t-[28px] bg-white p-6 shadow-2xl sm:rounded-[28px] sm:p-7"><div className="flex items-start justify-between"><div><h2 className="text-xl font-bold">{tr(saved ? "Saved successfully" : "Add new flat")}</h2><p className="mt-1 text-xs text-[#71847d]">{tr(saved ? "Your demo data is ready to connect to an API." : "Enter the flat details below.")}</p></div><button onClick={onClose} className="grid size-9 place-items-center rounded-xl bg-[#f2f5f3]"><X size={17} /></button></div>{saved ? <div className="grid place-items-center py-12 text-center"><span className="grid size-16 place-items-center rounded-full bg-emerald-50 text-emerald-600"><Check size={28} /></span><button onClick={onClose} className="primary-btn mt-7">{tr("Done")}</button></div> : <form onSubmit={(e) => {e.preventDefault(); setSaved(true);}} className="mt-6 space-y-4"><label className="block text-xs font-bold">{tr("Flat number")}<input required className="mt-2 h-11 w-full rounded-xl border border-[#dfe7e3] px-3 text-sm font-normal outline-none focus:border-[#168159]" placeholder="e.g. D-401" /></label><div className="grid grid-cols-2 gap-3"><label className="block text-xs font-bold">{tr("Floor")}<input required className="mt-2 h-11 w-full rounded-xl border border-[#dfe7e3] px-3 text-sm font-normal outline-none focus:border-[#168159]" placeholder="4th floor" /></label><label className="block text-xs font-bold">{tr("Monthly rent")}<input required type="number" className="mt-2 h-11 w-full rounded-xl border border-[#dfe7e3] px-3 text-sm font-normal outline-none focus:border-[#168159]" placeholder="৳ 0" /></label></div><button className="primary-btn mt-2 w-full justify-center">{tr("Save flat")}</button></form>}</div></div>; }
