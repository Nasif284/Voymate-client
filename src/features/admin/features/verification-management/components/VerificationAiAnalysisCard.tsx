"use client";
import React from "react";
import RiskBadge from "./RiskBadge";
import AiCheckIcon from "./AiCheckicon";
import { VerificationAiAnalysisDTO } from "../interfaces/interfaces";

interface VerificationAiAnalysisCardProps {
  aiAnalysis: VerificationAiAnalysisDTO;
}

export const VerificationAiAnalysisCard: React.FC<VerificationAiAnalysisCardProps> = ({
  aiAnalysis,
}) => {
  return (
    <section className="bg-white rounded-xl p-5 border border-[#bec9c3]/15 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold uppercase tracking-widest text-[#3f4944]">
          AI Analysis
        </h4>
        <RiskBadge level={aiAnalysis.overallRiskLevel} />
      </div>

      {/* Score bars */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#f6f3ef] rounded-lg p-3">
          <p className="text-[10px] text-[#6f7a74] font-medium mb-1.5">Risk Score</p>
          <p className="text-2xl font-black text-[#1c1c1a]">
            {aiAnalysis.overallRiskScore ?? "—"}
            <span className="text-sm font-medium text-[#6f7a74]">/100</span>
          </p>
          {aiAnalysis.overallRiskScore !== null && (
            <div className="w-full h-1.5 bg-[#e5e2de] rounded-full mt-2">
              <div
                className={`h-full rounded-full ${
                  aiAnalysis.overallRiskScore < 30
                    ? "bg-[#005440]"
                    : aiAnalysis.overallRiskScore < 70
                    ? "bg-amber-500"
                    : "bg-[#ba1a1a]"
                }`}
                style={{ width: `${aiAnalysis.overallRiskScore}%` }}
              />
            </div>
          )}
        </div>
        <div className="bg-[#f6f3ef] rounded-lg p-3">
          <p className="text-[10px] text-[#6f7a74] font-medium mb-1.5">OCR Confidence</p>
          <p className="text-2xl font-black text-[#1c1c1a]">
            {aiAnalysis.ocrConfidence ?? "—"}
            <span className="text-sm font-medium text-[#6f7a74]">%</span>
          </p>
          {aiAnalysis.ocrConfidence !== null && (
            <div className="w-full h-1.5 bg-[#e5e2de] rounded-full mt-2">
              <div
                className="h-full bg-[#005440] rounded-full"
                style={{ width: `${aiAnalysis.ocrConfidence}%` }}
              />
            </div>
          )}
        </div>
      </div>

      {/* AI checks */}
      <div className="space-y-2">
        {Boolean(aiAnalysis.checks?.length) &&
          aiAnalysis.checks!.map((check, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-[#f6f3ef] rounded-lg">
              <AiCheckIcon status={check.status} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <p className="text-xs font-bold text-[#1c1c1a]">{check.title}</p>
                  {check.confidence !== undefined && (
                    <span className="text-[10px] text-[#6f7a74] flex-shrink-0">
                      {check.confidence}%
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[#6f7a74] leading-relaxed">
                  {check.message}
                </p>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default VerificationAiAnalysisCard;
