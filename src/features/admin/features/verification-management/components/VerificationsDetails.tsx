"use client";
import React from "react";
import { getStatus, timeAgo } from "./QueueCard";
import { GetVerificationDetailsResponseDTO } from "../interfaces/interfaces";
import VerificationAiAnalysisCard from "./VerificationAiAnalysisCard";
import VerificationDocumentViewer from "./VerificationDocumentViewer";
import VerificationActionFooter from "./VerificationActionFooter";
import { Check, X, Mail, Phone, CreditCard, Calendar, Clock } from "lucide-react";
import { useAdminAuthStore } from "@/src/store/adminAuth.store";
import { canManageVerifications } from "../../../utils/admin-rbac.utils";

function formatDate(d: Date | string): string {
  return new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatDateTime(d: Date | string): string {
  return new Date(d).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

interface VerificationDetailProps {
  detail: GetVerificationDetailsResponseDTO;
  onApprove: () => void;
  onReject: (reason: string) => void;
  onRequestResubmit: (reason: string) => void;
  isActioning: boolean;
}

export default function VerificationDetail({
  detail,
  onApprove,
  onReject,
  onRequestResubmit,
  isActioning,
}: VerificationDetailProps) {
  const admin = useAdminAuthStore((state) => state.admin);
  const canManage = canManageVerifications(admin?.role);

  const { user, verification, documents, aiAnalysis, extractedData, timeline } = detail;
  const status = getStatus(verification.status.code);
  const isPending =
    verification.status.code === "pending" || verification.status.code === "under_review";

  const verifyItems = [
    { icon: <Mail className="w-3.5 h-3.5" />, label: "Email", ok: user.isEmailVerified },
    { icon: <Phone className="w-3.5 h-3.5" />, label: "Phone", ok: user.isPhoneVerified },
    { icon: <CreditCard className="w-3.5 h-3.5" />, label: "ID", ok: user.isIdVerified },
  ];

  const extractedRows = [
    { label: "Full Name", value: extractedData.fullName },
    { label: "Document Number", value: extractedData.documentNumber },
    { label: "Nationality", value: extractedData.nationality },
    { label: "Gender", value: extractedData.gender },
    {
      label: "Date of Birth",
      value: extractedData.dateOfBirth ? formatDate(extractedData.dateOfBirth) : null,
    },
    { label: "Issuing Country", value: extractedData.issuingCountry },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 [&::-webkit-scrollbar]:hidden">
        {/* User profile card */}
        <section className="bg-white rounded-xl p-5 border border-[#bec9c3]/15 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#c9eadb] flex-shrink-0">
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-lg font-black text-[#005440]">
                  {user.fullName.slice(0, 2).toUpperCase()}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h3 className="text-base font-bold text-[#1c1c1a]">{user.fullName}</h3>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${status.badge}`}
                >
                  {status.label}
                </span>
              </div>
              <p className="text-xs text-[#6f7a74] mb-2">
                {user.email} · {user.phone ?? "No phone"}
              </p>
              <div className="flex items-center gap-3 text-[10px] text-[#6f7a74] flex-wrap">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> Joined {formatDate(user.joinedAt)}
                </span>
                <span>·</span>
                <span>{user.accountAgeInDays} days old account</span>
                {user.country && (
                  <>
                    <span>·</span>
                    <span>{user.country}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Verification chips */}
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#f6f3ef]">
            {verifyItems.map(({ icon, label, ok }) => (
              <span
                key={label}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                  ok ? "bg-[#c9eadb] text-[#005440]" : "bg-[#e5e2de] text-[#6f7a74]"
                }`}
              >
                {icon} <span>{label}</span>{" "}
                {ok ? (
                  <Check className="w-3 h-3 text-[#005440]" />
                ) : (
                  <X className="w-3 h-3 text-[#6f7a74]" />
                )}
              </span>
            ))}
            <span className="ml-auto text-[10px] text-[#6f7a74] flex items-center gap-1">
              <Clock className="w-3 h-3" /> Submitted {timeAgo(verification.submittedAt)}
            </span>
          </div>
        </section>

        {/* Document images */}
        <VerificationDocumentViewer documents={documents} />

        {/* AI analysis */}
        <VerificationAiAnalysisCard aiAnalysis={aiAnalysis} />

        {/* Extracted data table */}
        <section className="bg-white rounded-xl overflow-hidden border border-[#bec9c3]/15 shadow-sm">
          <div className="bg-[#ebe8e4] px-5 py-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#3f4944]">
              Extracted Data
            </h4>
          </div>
          <table className="w-full text-xs">
            <tbody>
              {extractedRows
                .filter((r) => r.value)
                .map(({ label, value }) => (
                  <tr
                    key={label}
                    className="border-b border-[#f6f3ef] last:border-0 hover:bg-[#f6f3ef] transition-colors"
                  >
                    <th className="px-5 py-3 text-left font-semibold text-[#6f7a74] w-2/5">
                      {label}
                    </th>
                    <td className="px-5 py-3 font-bold text-[#1c1c1a]">{value}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>

        {/* Timeline */}
        <section className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#3f4944]">
            Timeline
          </h4>
          <div className="relative">
            <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-[#bec9c3]/30" />
            <div className="space-y-3">
              {timeline.map((item, i) => (
                <div key={item.id} className="flex gap-4 items-start">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 z-10 ${
                      i === 0 ? "bg-[#0f6e56] text-white" : "bg-[#e5e2de] text-[#6f7a74]"
                    }`}
                  >
                    {i === 0 ? (
                      <Check className="w-3 h-3" strokeWidth={3} />
                    ) : (
                      <span className="w-2 h-2 bg-[#bec9c3] rounded-full" />
                    )}
                  </div>
                  <div className="flex-1 pb-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="text-xs font-bold text-[#1c1c1a]">{item.title}</p>
                      <span className="text-[10px] text-[#6f7a74] flex-shrink-0">
                        {formatDateTime(item.createdAt)}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#6f7a74] mt-0.5 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Review / Rejection notes */}
        {verification.reviewNotes && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-blue-700">
            <p className="font-bold mb-1">Reviewer Notes</p>
            <p className="leading-relaxed">{verification.reviewNotes}</p>
          </div>
        )}
        {verification.rejectionReason && (
          <div className="bg-[#ffdad6]/40 border border-[#ba1a1a]/20 rounded-xl p-4 text-xs text-[#ba1a1a]">
            <p className="font-bold mb-1">Rejection Reason</p>
            <p className="leading-relaxed">{verification.rejectionReason}</p>
          </div>
        )}
      </div>

      {/* Action footer */}
      {isPending && (
        <VerificationActionFooter
          canManage={canManage}
          adminRole={admin?.role}
          isActioning={isActioning}
          onApprove={onApprove}
          onReject={onReject}
          onRequestResubmit={onRequestResubmit}
        />
      )}
    </div>
  );
}
