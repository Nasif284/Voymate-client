"use client";

import { useState, ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import DestinationAutocomplete from "../../onboarding/components/DestinationsAutoComplete";
import { createTripSchema } from "../../onboarding/validators/tripPlan.validator";
import { editTripSchema } from "../../onboarding/validators/editTrip.validator";
import BudgetStyleSelector from "./BudgetStyleSelector";
import TripStyleSelector from "./TripStyleSelector";
import { Calendar, CalendarRange, ArrowRight, ArrowLeft } from "lucide-react";

export interface TripPlanFormProps {
  showDestination?: boolean;
  showNavigation?: boolean;
  initialValues?: {
    dateFrom?: string;
    dateTo?: string;
    budgetStyle?: string;
    travelStyleCode?: string;
  };
  onSubmit: (data: any) => void | Promise<void>;
  isPending?: boolean;
  requireDirty?: boolean;
  submitButtonText?: ReactNode;
  submitPendingText?: ReactNode;
}

export default function TripPlanForm({
  showDestination = true,
  showNavigation = false,
  initialValues,
  onSubmit,
  isPending = false,
  requireDirty = false,
  submitButtonText,
  submitPendingText,
}: Readonly<TripPlanFormProps>) {
  const [search, setSearch] = useState("");
  const today = new Date().toISOString().split("T")[0];

  const schema = showDestination ? createTripSchema : editTripSchema;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      budgetStyle: initialValues?.budgetStyle
        ? initialValues.budgetStyle.toUpperCase()
        : "MODERATE",
      travelStyleCode: initialValues?.travelStyleCode
        ? initialValues.travelStyleCode.toUpperCase()
        : "ADVENTURE",
      dateFrom: initialValues?.dateFrom ?? "",
      dateTo: initialValues?.dateTo ?? "",
    },
  });

  const budgetCategory = watch("budgetStyle");
  const tripStyle = watch("travelStyleCode");
  const dateFrom = watch("dateFrom");

  const inputBase =
    "w-full h-10 sm:h-12 pl-9 sm:pl-11 pr-3 sm:pr-4 bg-[#e0e3e0] rounded-xl border-none outline-none " +
    "focus:ring-2 focus:ring-[#005440] focus:bg-white transition-all placeholder:text-[#6f7a74] " +
    "text-[#181d1a] text-xs sm:text-sm font-medium cursor-pointer";

  return (
    <div className={showNavigation ? "" : "p-4 sm:p-6 text-start"}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
        {showDestination && (
          <div className="space-y-1.5 sm:space-y-2">
            <label className="block text-xs sm:text-sm font-bold text-[#3f4944] uppercase tracking-wider font-headline">
              Destination
            </label>
            <div>
              <DestinationAutocomplete
                value={search}
                onChange={setSearch}
                onSelect={(destination) => {
                  setValue("destination", destination, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
              />
              {(errors as Record<string, any>).destination && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  Please select a destination
                </p>
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
          <div className="space-y-1.5 sm:space-y-2">
            <label className="block text-xs sm:text-sm font-bold text-[#3f4944] uppercase tracking-wider font-headline">
              Departure
            </label>
            <div
              className="relative group cursor-pointer"
              onClick={(e) => {
                const input = e.currentTarget.querySelector("input");
                if (input && "showPicker" in input) {
                  try {
                    input.showPicker();
                  } catch (err) {
                    console.error(err);
                  }
                }
              }}
            >
              <div className="absolute inset-y-0 left-3 sm:left-4 flex items-center pointer-events-none text-[#3f4944] group-focus-within:text-[#005440] transition-colors z-10">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#3f4944]" />
              </div>
              <input
                min={today}
                type="date"
                {...register("dateFrom")}
                className={inputBase}
                onClick={(e) => {
                  if ("showPicker" in e.currentTarget) {
                    try {
                      e.currentTarget.showPicker();
                    } catch (err) {
                      console.error(err);
                    }
                  }
                }}
              />
            </div>
            {errors.dateFrom && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.dateFrom.message as string}
              </p>
            )}
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <label className="block text-xs sm:text-sm font-bold text-[#3f4944] uppercase tracking-wider font-headline">
              Return
            </label>
            <div
              className="relative group cursor-pointer"
              onClick={(e) => {
                const input = e.currentTarget.querySelector("input");
                if (input && "showPicker" in input) {
                  try {
                    input.showPicker();
                  } catch (err) {
                    console.error(err);
                  }
                }
              }}
            >
              <div className="absolute inset-y-0 left-3 sm:left-4 flex items-center pointer-events-none text-[#3f4944] group-focus-within:text-[#005440] transition-colors z-10">
                <CalendarRange className="w-4 h-4 sm:w-5 sm:h-5 text-[#3f4944]" />
              </div>
              <input
                min={dateFrom || today}
                type="date"
                {...register("dateTo")}
                className={inputBase}
                onClick={(e) => {
                  if ("showPicker" in e.currentTarget) {
                    try {
                      e.currentTarget.showPicker();
                    } catch (err) {
                      console.error(err);
                    }
                  }
                }}
              />
            </div>
            {errors.dateTo && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.dateTo.message as string}
              </p>
            )}
          </div>
        </div>

        {/* Budget Style Radio Cards */}
        <BudgetStyleSelector
          value={budgetCategory}
          onChange={(code) =>
            setValue("budgetStyle", code, {
              shouldValidate: true,
              shouldDirty: true,
            })
          }
        />

        {/* Travel Style Selector */}
        <TripStyleSelector
          value={tripStyle}
          onChange={(code) =>
            setValue("travelStyleCode", code, {
              shouldValidate: true,
              shouldDirty: true,
            })
          }
        />

        {showNavigation ? (
          <div className="flex flex-wrap items-center justify-between pt-6 sm:pt-8 border-t border-[#bec9c3]/20 gap-3">
            <Link
              href="/onboarding/travel-style"
              className="inline-flex items-center gap-1.5 text-[#3f4944] font-bold text-sm hover:text-[#0f6e56] transition-colors px-3 py-2 min-h-[44px]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Link>

            <div className="flex items-center gap-3 sm:gap-4 ml-auto">
              <Link
                href="/"
                className="text-xs sm:text-sm font-bold text-[#6f7a74] hover:text-[#0f6e56] transition-colors px-2 py-2 min-h-[44px] flex items-center"
              >
                Skip for now
              </Link>

              <button
                type="submit"
                disabled={isPending}
                className={`group h-12 px-4 sm:px-5 rounded-xl font-bold text-white shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-70 disabled:pointer-events-none flex items-center justify-center gap-2 text-sm sm:text-base ${
                  isPending
                    ? "bg-[#0f6e56]/70"
                    : "bg-[#0f6e56] hover:bg-[#005440]"
                }`}
              >
                {isPending ? (
                  submitPendingText ?? (
                    <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  )
                ) : (
                  <>
                    <span>{submitButtonText ?? "Create my plan"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-end border-t border-[#bec9c3]/20 pt-4 sm:pt-6">
            <button
              type="submit"
              disabled={(requireDirty && !isDirty) || isPending}
              className={`
                w-full sm:w-auto sm:min-w-[200px]
                h-11 sm:h-12
                px-6
                rounded-xl
                text-xs sm:text-sm
                text-white
                font-bold
                transition-all
                flex items-center justify-center
                gap-2
                ${
                  requireDirty && !isDirty
                    ? "bg-gray-300 cursor-not-allowed"
                    : isPending
                    ? "bg-[#addbd0] cursor-wait"
                    : "bg-[#0f6e56] hover:opacity-90 active:scale-95 shadow-md cursor-pointer"
                }
              `}
            >
              {isPending ? (
                submitPendingText ?? "Submitting..."
              ) : (
                <>
                  <span>{submitButtonText ?? "Save Changes"}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
