import { useState, useMemo } from "react";
import { State, City } from "country-state-city";
import { UseFormSetValue } from "react-hook-form";
import { useReverseGeoCode } from "@/src/hooks/api/location.hooks";

interface UseProfileLocationCascadeParams {
  nationality?: string;
  state?: string;
  setValue: UseFormSetValue<any>;
}

export const useProfileLocationCascade = ({
  nationality,
  state,
  setValue,
}: UseProfileLocationCascadeParams) => {
  const [stateCode, setStateCode] = useState("");
  const [isAutoFilling, setIsAutoFilling] = useState(false);
  const { mutateAsync: reverseGeoCode } = useReverseGeoCode();

  const regions = useMemo(
    () => (nationality ? State.getStatesOfCountry(nationality) : []),
    [nationality]
  );

  const currentRegion = regions.find(
    (r) => r.name === state || r.isoCode === stateCode
  );
  const effectiveStateCode = stateCode || currentRegion?.isoCode || "";

  const cities = useMemo(
    () =>
      nationality && effectiveStateCode
        ? City.getCitiesOfState(nationality, effectiveStateCode)
        : [],
    [nationality, effectiveStateCode]
  );

  const handleAutoLocation = () => {
    setIsAutoFilling(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const res = await reverseGeoCode({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });

          const countryCode = res.data.countryCode;
          const states = countryCode ? State.getStatesOfCountry(countryCode) : [];

          const matchedState = states.find(
            (s) =>
              s.isoCode.toUpperCase() === res.data.stateCode?.toUpperCase() ||
              s.name.toLowerCase() === res.data.state?.toLowerCase()
          );

          const resolvedStateCode = matchedState?.isoCode ?? res.data.stateCode ?? "";
          const resolvedStateName = matchedState?.name ?? res.data.state ?? "";

          const stateCities =
            countryCode && resolvedStateCode
              ? City.getCitiesOfState(countryCode, resolvedStateCode)
              : [];

          const matchedCity = stateCities.find(
            (c) =>
              c.name.toLowerCase() === res.data.district?.toLowerCase() ||
              c.name.toLowerCase() === res.data.city?.toLowerCase()
          );

          const resolvedCityName =
            matchedCity?.name ?? res.data.district ?? res.data.city ?? "";

          setValue("nationality", countryCode, { shouldValidate: true });
          setStateCode(resolvedStateCode);
          setValue("state", resolvedStateName, { shouldValidate: true });
          setValue("city", resolvedCityName, { shouldValidate: true });
        } catch (error) {
          console.error("Auto-location failed:", error);
        } finally {
          setIsAutoFilling(false);
        }
      },
      (err) => {
        console.error("Geolocation error:", err);
        setIsAutoFilling(false);
      }
    );
  };

  const handleNationalityChange = (val: string) => {
    setValue("nationality", val, { shouldValidate: true });
    if (!isAutoFilling) {
      setValue("state", "");
      setValue("city", "");
      setStateCode("");
    }
  };

  const handleStateChange = (val: string) => {
    const selectedRegion = regions.find((r) => r.name === val);
    setValue("state", val, { shouldValidate: true });
    setStateCode(selectedRegion?.isoCode ?? "");
    if (!isAutoFilling) {
      setValue("city", "");
    }
  };

  const handleCityChange = (val: string) => {
    setValue("city", val, { shouldValidate: true });
  };

  return {
    stateCode,
    setStateCode,
    isAutoFilling,
    regions,
    cities,
    handleAutoLocation,
    handleNationalityChange,
    handleStateChange,
    handleCityChange,
  };
};
