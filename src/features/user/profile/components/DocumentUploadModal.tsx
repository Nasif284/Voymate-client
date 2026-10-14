"use client";

import { useState, useEffect } from "react";
import {
  DocType,
  DocumentUploadModalProps,
  MAX_SIZE_MB,
  UploadedFile,
  UploadStep,
} from "../interfaces/profile.interface";
import StepDots from "./DotSteps";
import UploadZone from "./UploadZone";
import { useSubmitVerifyDocs } from "../hooks/profile.hooks";
import DocumentTypeStep, {
  DOC_CONFIG,
} from "./document-upload/DocumentTypeStep";
import DocumentReviewStep from "./document-upload/DocumentReviewStep";
import DocumentSuccessStep from "./document-upload/DocumentSuccessStep";
import { ArrowLeft, X, Info } from "lucide-react";

export default function DocumentUploadModal({
  onClose,
  onSuccess,
}: Readonly<DocumentUploadModalProps>) {
  const [step, setStep] = useState<UploadStep>("select_type");
  const [docType, setDocType] = useState<DocType | null>(null);
  const [frontFile, setFrontFile] = useState<UploadedFile | null>(null);
  const [backFile, setBackFile] = useState<UploadedFile | null>(null);

  const selectedDoc = DOC_CONFIG.find((d) => d.id === docType);
  const hasTwoSides = selectedDoc?.hasTwoSides ?? false;

  const STEPS: UploadStep[] = hasTwoSides
    ? ["select_type", "upload_front", "upload_back", "review", "success"]
    : ["select_type", "upload_front", "review", "success"];
  const stepIndex = STEPS.indexOf(step);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  function handleFile(file: File, side: "front" | "back") {
    const preview = file.type.startsWith("image/")
      ? URL.createObjectURL(file)
      : "";
    const uploaded: UploadedFile = { file, preview, side };
    if (side === "front") setFrontFile(uploaded);
    else setBackFile(uploaded);
  }

  function removeFile(side: "front" | "back") {
    if (side === "front") {
      if (frontFile) URL.revokeObjectURL(frontFile.preview);
      setFrontFile(null);
    } else {
      if (backFile) URL.revokeObjectURL(backFile.preview);
      setBackFile(null);
    }
  }

  const submit = useSubmitVerifyDocs();

  async function handleSubmit() {
    if (!docType || !frontFile) return;
    const formData = new FormData();
    formData.append("documentTypeCode", docType);
    formData.append("front", frontFile.file);
    if (backFile) formData.append("back", backFile.file);
    submit.mutate(formData, {
      onSuccess: () => {
        setStep("success");
      },
    });
  }

  function goNext() {
    if (step === "select_type" && docType) setStep("upload_front");
    else if (step === "upload_front")
      setStep(hasTwoSides ? "upload_back" : "review");
    else if (step === "upload_back") setStep("review");
    else if (step === "review") handleSubmit();
  }

  function goBack() {
    if (step === "upload_front") setStep("select_type");
    else if (step === "upload_back") setStep("upload_front");
    else if (step === "review")
      setStep(hasTwoSides ? "upload_back" : "upload_front");
  }

  const canProceed =
    (step === "select_type" && !!docType) ||
    (step === "upload_front" && !!frontFile) ||
    (step === "upload_back" && !!backFile) ||
    step === "review";

  function handleBackdrop(e: React.MouseEvent) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={handleBackdrop}
    >
      <div className="bg-[#f7faf6] w-full max-w-[560px] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border border-[#bec9c3]/30 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <header className="flex items-center justify-between px-8 pt-8 pb-0">
          <div className="flex items-center gap-3">
            {step !== "select_type" && step !== "success" && (
              <button
                onClick={goBack}
                aria-label="Back"
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#e0e3e0] transition-colors text-[#3f4944] cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <div>
              <h2 className="text-2xl font-extrabold font-headline text-[#005440] tracking-tight leading-none">
                {step === "select_type" && "Verify Identity"}
                {step === "upload_front" && "Upload Front"}
                {step === "upload_back" && "Upload Back"}
                {step === "review" && "Review & Submit"}
                {step === "success" && "Submitted!"}
              </h2>
              {step !== "success" && (
                <p className="text-xs text-[#3f4944] mt-1">
                  {step === "select_type" && "Choose your ID document type"}
                  {step === "upload_front" && `Front of your ${selectedDoc?.label}`}
                  {step === "upload_back" && `Back of your ${selectedDoc?.label}`}
                  {step === "review" && "Make sure both sides are clear and legible"}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#e0e3e0] transition-colors text-[#3f4944] shrink-0 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </header>

        {/* Step dots */}
        {step !== "success" && (
          <div className="px-8 pt-6">
            <StepDots total={STEPS.length} current={stepIndex} />
          </div>
        )}

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto px-8 pb-8 [&::-webkit-scrollbar]:hidden">
          {step === "select_type" && (
            <DocumentTypeStep docType={docType} onSelect={(t) => setDocType(t)} />
          )}

          {step === "upload_front" && (
            <div className="space-y-6">
              <UploadZone
                side="front"
                file={frontFile}
                onFile={handleFile}
                onRemove={removeFile}
              />
              <p className="text-xs text-[#3f4944] flex items-start gap-2 bg-[#f1f4f1] p-3 rounded-xl">
                <Info className="w-4 h-4 text-[#005440] shrink-0 mt-0.5" />
                <span>
                  Ensure the document is flat, well-lit, and all four corners are visible. Max file size {MAX_SIZE_MB} MB.
                </span>
              </p>
            </div>
          )}

          {step === "upload_back" && (
            <div className="space-y-6">
              <UploadZone
                side="back"
                file={backFile}
                onFile={handleFile}
                onRemove={removeFile}
              />
              <p className="text-xs text-[#3f4944] flex items-start gap-2 bg-[#f1f4f1] p-3 rounded-xl">
                <Info className="w-4 h-4 text-[#005440] shrink-0 mt-0.5" />
                <span>Flip the document and capture the back side clearly.</span>
              </p>
            </div>
          )}

          {step === "review" && (
            <DocumentReviewStep
              frontFile={frontFile}
              backFile={backFile}
              hasTwoSides={hasTwoSides}
              docLabel={selectedDoc?.label || "Document"}
            />
          )}

          {step === "success" && (
            <DocumentSuccessStep
              docLabel={selectedDoc?.label || "Document"}
              onDone={() => {
                if (docType) onSuccess?.(docType);
                onClose();
              }}
            />
          )}
        </div>

        {/* Footer Actions */}
        {step !== "success" && (
          <footer className="px-8 pb-8 pt-2 border-t border-[#bec9c3]/10 shrink-0">
            <button
              type="button"
              onClick={goNext}
              disabled={!canProceed || submit.isPending}
              className="w-full h-14 bg-[#005440] text-white font-bold text-base rounded-xl
                hover:bg-[#003e2f] active:scale-[0.98] transition-all cursor-pointer
                disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center gap-3 shadow-lg shadow-[#005440]/20"
            >
              {submit.isPending ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Uploading…</span>
                </>
              ) : step === "review" ? (
                "Submit for verification"
              ) : (
                "Continue"
              )}
            </button>
          </footer>
        )}
      </div>
    </div>
  );
}
