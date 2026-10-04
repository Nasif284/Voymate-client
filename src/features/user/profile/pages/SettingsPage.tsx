"use client";
import { useEffect, useMemo, useState } from "react";
import { BlockedUser, SettingsData } from "../interfaces/profile.interface";
import Toggle from "../components/Toggle";
import ResetPasswordModal from "../components/ResetPasswordModal";
import { useGetSettings, useUpdateSettings } from "../hooks/profile.hooks";
import { useDebounce } from "@/src/hooks/debounce.hook";
import VerificationSection from "../components/VerificationSection";
const INITIAL_BLOCKED: BlockedUser[] = [
  {
    id: 1,
    name: "Jason V.",
    blockedOn: "Blocked on Mar 12, 2024",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC91ZzDGGCbp-b6BHp_ZjD3cwo83TgLOYLZs1kqNzMldAs3D9OZaaQPUt9IBohcR6FM8arMc5lKBJI0Ktr1oDxFXNVtHSLjOAgIkbz7SUByEn3GnFKtIK6Wfvk1B3QgXEK3r_qCACbgFw2EMdXoYwQqSUf3DAiJANXiaG4FdDVTjf1O15Q2MrDK7OgNM4NwFw0wyycpRunWgtX7fsT5KfmR0dD-K65_MD5-Hz0VMZdy3h20T4x5Yei1dtEiHgYu23EGQ8sZVe1-LXc",
  },
  {
    id: 2,
    name: "Elena K.",
    blockedOn: "Blocked on Jan 05, 2024",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDHeR5MaMrgzNa9BdpCjZPzbDgl_wo1JL-L-7XGoHbOdSP34lDipUCdLwgTJY7XjIO0P6tIW9eD1DFobBxVy16VZkbsX9n4KUyV_n9Ep18y09xVJ6kD0IIz_79lTcRP3t2DGLwfGufxOn_s3PTlmF6JeQ99BMR-2MLj2iaBLnG2bYr3EI3KptcdXZvBgoJXoCTT_t9oITW-I6Kb-P47Rvzg5o7arPXgiYdHvoOEPUVkY00Il3MZ8t-00tkLYwDOe_5_aAFEM5u6ZYs",
  },
];
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`bg-white p-6 rounded-2xl border border-[#bec9c3]/10 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] ${className}`}>{children}</section>;
}

export default function SettingsPage() {
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);

  const { data, isLoading } = useGetSettings();
  const update = useUpdateSettings();
  const initialSettings = data?.data;
  const [settings, setSettings] = useState<SettingsData>({
    profileVisibilityCode: "",
    requestsFromCode: "",
    showOnlineStatus: true,
    showTravelingStatus: true,
    phone: "",
    isPhoneVerified:false
  });
  useEffect(() => {
    if (data?.data) {
      console.log(data.data);
      setSettings(data.data);
    }
  }, [data]);

  const [blockedUsers, setBlockedUsers] = useState<BlockedUser[]>(INITIAL_BLOCKED);
  const [reportQuery, setReportQuery] = useState("");

  const hasSettingsChanges = useMemo(() => {
    if (!settings || !initialSettings) return false;
    return JSON.stringify(settings) !== JSON.stringify(initialSettings);
  }, [settings, initialSettings]);
  const handleSave = () => {
    update.mutate(settings);
  };
  function handleUnblock(id: number) {
    setBlockedUsers((prev) => prev.filter((u) => u.id !== id));
  }

  function handleDeactivate() {
    if (window.confirm("Are you sure you want to deactivate your account?")) {
      // call API
    }
  }

  function handleDelete() {
    if (window.confirm("This action is permanent. Are you absolutely sure you want to delete your account?")) {
      // call API
    }
  }
  if (isLoading) {
    return (
      <main className="ml-0 lg:ml-64 pt-14 sm:pt-20 flex h-screen items-center justify-center bg-[#f7faf6]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#005440]/20 border-t-[#005440]" />
          <p className="text-xs font-medium text-[#404944]">Loading settings...</p>
        </div>
      </main>
    );
  }

  return (
    <>
      {hasSettingsChanges && (
        <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3 sm:py-4 bg-white rounded-2xl shadow-2xl border border-[#bec9c3]/30 animate-in slide-in-from-bottom-5 duration-200">
          <span className="text-xs sm:text-sm font-semibold text-[#181d1a]">Unsaved changes</span>

          <button
            onClick={() => setSettings(initialSettings!)}
            className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl border border-[#bec9c3] text-xs sm:text-sm font-semibold text-[#404944] hover:bg-[#f1f4f1] transition-all cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={update.isPending}
            className="px-4 py-1.5 sm:px-5 sm:py-2 rounded-xl bg-[#005440] text-white text-xs sm:text-sm font-bold shadow-xs hover:bg-[#003e2f] active:scale-95 disabled:opacity-50 transition-all cursor-pointer"
          >
            {update.isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      )}
      <main className="ml-0 lg:ml-64 pt-14 sm:pt-20 pb-20 lg:pb-12 min-h-screen bg-[#f7faf6]">
        <div className="p-4 sm:p-8">
          <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">

            {/* ── Verification Status ───────────────────────────────── */}
            <Card>
              <VerificationSection verifiedPhone={settings.phone!} phoneVerified={settings.isPhoneVerified} />
            </Card>

            {/* ── Privacy Controls ──────────────────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <h2 className="text-lg font-bold mb-6 font-headline">Privacy controls</h2>
                <div className="space-y-5">
                  {/* Who can see profile */}
                  <div>
                    <label className="block text-xs font-bold text-[#3f4944] mb-2 px-1">Who can see my profile</label>
                    <div className="relative">
                      <select
                        value={settings.profileVisibilityCode}
                        onChange={(e) => setSettings((prev) => ({ ...prev, profileVisibilityCode: e.target.value }))}
                        className="w-full h-12 px-4 pr-10 rounded-xl border border-transparent bg-[#e0e3e0] text-sm font-semibold text-[#181d1a] focus:bg-white focus:ring-2 focus:ring-[#005440]/20 focus:border-[#005440] transition-all cursor-pointer outline-none appearance-none"
                      >
                        <option value={"CONNECTED_ONLY"}>Connected Only</option>
                        <option value={"VERIFIED_ONLY"}>Verified Only</option>
                        <option value={"EVERYONE"}>Everyone</option>
                      </select>
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#3f4944]">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Allow requests from */}
                  <div>
                    <label className="block text-xs font-bold text-[#3f4944] mb-2 px-1">Allow buddy requests from</label>
                    <div className="relative">
                      <select
                        value={settings.requestsFromCode}
                        onChange={(e) => setSettings((prev) => ({ ...prev, requestsFromCode: e.target.value }))}
                        className="w-full h-12 px-4 pr-10 rounded-xl border border-transparent bg-[#e0e3e0] text-sm font-semibold text-[#181d1a] focus:bg-white focus:ring-2 focus:ring-[#005440]/20 focus:border-[#005440] transition-all cursor-pointer outline-none appearance-none"
                      >
                        <option value={"EVERYONE"}>Everyone</option>
                        <option value={"VERIFIED_ONLY"}>Verified Only</option>
                        <option value={"NOBODY"}>Nobody</option>
                      </select>
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#3f4944]">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Toggle: Online status */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm font-medium">Show online status</span>
                    <Toggle enabled={settings.showOnlineStatus} onChange={(status) => setSettings((prev) => ({ ...prev, showOnlineStatus: status }))} />
                  </div>

                  {/* Toggle: Currently traveling */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Show currently traveling</span>
                    <Toggle enabled={settings.showTravelingStatus} onChange={(status) => setSettings((prev) => ({ ...prev, showTravelingStatus: status }))} />
                  </div>
                </div>
              </Card>

              {/* ── Security ──────────────────────────────────────── */}
            </div>
            <Card>
              <div className="mb-6">
                <h2 className="text-lg font-bold font-headline">Security</h2>
                <p className="text-xs text-[#3f4944] mt-1">Manage your account security and password.</p>
              </div>
              <div className="flex items-center justify-between py-4 border-t border-[#bec9c3]/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0f6e56]/10 flex items-center justify-center text-[#005440]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold">Password</p>
                    <p className="text-[10px] text-[#3f4944]">Last changed 3 months ago</p>
                  </div>
                </div>
                <button onClick={() => setShowResetPasswordModal(true)} className="px-4 py-2 text-xs font-bold text-[#005440] border border-[#005440]/30 hover:bg-[#0f6e56]/5 rounded-lg transition-colors">
                  Reset Password
                </button>
              </div>
            </Card>
            {/* ── Blocked Users ─────────────────────────────────────── */}
            {/* <Card>
              <h2 className="text-lg font-bold mb-6 font-headline">Blocked users</h2>
              {blockedUsers.length === 0 ? (
                <p className="text-sm text-[#3f4944] py-4">No blocked users.</p>
              ) : (
                <div className="divide-y divide-[#bec9c3]/10">
                  {blockedUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-3">
                        <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                        <div>
                          <p className="text-sm font-bold">{user.name}</p>
                          <p className="text-[10px] text-[#3f4944]">{user.blockedOn}</p>
                        </div>
                      </div>
                      <button onClick={() => handleUnblock(user.id)} className="px-4 py-2 text-xs font-bold text-[#005440] bg-[#0f6e56]/10 hover:bg-[#0f6e56]/20 rounded-lg transition-colors">
                        Unblock
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </Card> */}

            {/* ── Reporting ─────────────────────────────────────────── */}
            {/* <Card>
              <h2 className="text-lg font-bold mb-6 font-headline">Reporting</h2>
              <div className="space-y-6">
                <div className="max-w-xl">
                  <h3 className="text-sm font-bold mb-2">Report a user</h3>
                  <p className="text-xs text-[#3f4944] mb-4">If you&apos;ve had a negative experience with someone, let us know. We take safety seriously.</p>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400">
                      {" "}
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </svg>
                    </span>
                    <input type="text" value={reportQuery} onChange={(e) => setReportQuery(e.target.value)} placeholder="Search for a user to report..." className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#bec9c3]/30 bg-[#f1f4f1] text-sm focus:ring-2 focus:ring-[#005440]/20 focus:border-[#005440] outline-none transition-all text-[#181d1a] placeholder:text-[#3f4944]/60" />
                  </div>
                </div>

                <div className="w-full max-w-md bg-[#f1f4f1] p-4 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#e0e3e0] rounded-full flex items-center justify-center text-stone-500">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                        <line x1="4" y1="22" x2="4" y2="15" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-bold">Your reports</p>
                      <p className="text-[10px] text-[#3f4944]">0 active reports</p>
                    </div>
                  </div>
                  <button className="text-xs font-bold text-[#3f4944] hover:text-[#005440] underline transition-colors">View history</button>
                </div>
              </div>
            </Card> */}

            {/* ── Danger Zone ───────────────────────────────────────── */}
            <section className="bg-red-50/50 p-6 rounded-2xl border border-[#ba1a1a]/10">
              <h2 className="text-lg font-bold text-[#ba1a1a] mb-2 font-headline">Danger Zone</h2>
              <p className="text-xs text-stone-500 mb-6">Once you delete your account, there is no going back. Please be certain.</p>
              <div className="flex flex-wrap gap-4">
                <button onClick={handleDeactivate} className="px-6 py-3 rounded-xl text-sm font-bold text-[#ba1a1a] bg-transparent hover:bg-[#ba1a1a]/5 transition-all">
                  Deactivate account
                </button>
                <button onClick={handleDelete} className="px-6 py-3 rounded-xl text-sm font-bold text-white bg-[#ba1a1a] hover:bg-red-700 transition-all shadow-lg shadow-[#ba1a1a]/20">
                  Delete account permanently
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>

      {showResetPasswordModal && <ResetPasswordModal onClose={() => setShowResetPasswordModal(false)} />}
    </>
  );
}
