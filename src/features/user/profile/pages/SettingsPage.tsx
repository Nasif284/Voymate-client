"use client";
import { useEffect, useMemo, useState } from "react";
import { SettingsData } from "../interfaces/profile.interface";
import ResetPasswordModal from "../components/ResetPasswordModal";
import VerificationSection from "../components/VerificationSection";
import PrivacyControlsCard from "../components/settings/PrivacyControlsCard";
import SecuritySettingsCard from "../components/settings/SecuritySettingsCard";
import DangerZoneCard from "../components/settings/DangerZoneCard";
import { useGetSettings, useUpdateSettings } from "../hooks/profile.hooks";

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section
      className={`bg-white p-6 rounded-2xl border border-[#bec9c3]/10 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] ${className}`}
    >
      {children}
    </section>
  );
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
    isPhoneVerified: false,
  });

  useEffect(() => {
    if (data?.data) {
      setSettings(data.data);
    }
  }, [data]);

  const hasSettingsChanges = useMemo(() => {
    if (!settings || !initialSettings) return false;
    return JSON.stringify(settings) !== JSON.stringify(initialSettings);
  }, [settings, initialSettings]);

  const handleSave = () => {
    update.mutate(settings);
  };

  const handleDeactivate = () => {
    if (window.confirm("Are you sure you want to deactivate your account?")) {
      // API call placeholder
    }
  };

  const handleDelete = () => {
    if (
      window.confirm(
        "This action is permanent. Are you absolutely sure you want to delete your account?"
      )
    ) {
      // API call placeholder
    }
  };

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
          <span className="text-xs sm:text-sm font-semibold text-[#181d1a]">
            Unsaved changes
          </span>

          <button
            type="button"
            onClick={() => setSettings(initialSettings!)}
            className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl border border-[#bec9c3] text-xs sm:text-sm font-semibold text-[#404944] hover:bg-[#f1f4f1] transition-all cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
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
            {/* Verification Status */}
            <Card>
              <VerificationSection
                verifiedPhone={settings.phone!}
                phoneVerified={settings.isPhoneVerified}
              />
            </Card>

            {/* Privacy Controls & Security */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PrivacyControlsCard settings={settings} onChange={setSettings} />
              <SecuritySettingsCard
                onResetPasswordClick={() => setShowResetPasswordModal(true)}
              />
            </div>

            {/* Danger Zone */}
            <DangerZoneCard
              onDeactivate={handleDeactivate}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </main>

      {showResetPasswordModal && (
        <ResetPasswordModal onClose={() => setShowResetPasswordModal(false)} />
      )}
    </>
  );
}
