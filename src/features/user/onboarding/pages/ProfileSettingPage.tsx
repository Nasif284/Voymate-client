import ProfileSettingForm from "../components/ProfileSettingForm";


export default function ProfileSettingPage() {
  return (
    <main className="flex-grow flex flex-col items-center justify-start py-6 px-3 sm:px-6 md:py-16">
      <div className="max-w-[640px] w-full bg-white p-4 sm:p-8 md:p-12 rounded-2xl border border-[#bec9c3]/10 shadow-sm">
        <div className="mb-6 sm:mb-10 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-headline text-[#181d1a] tracking-tight mb-2 sm:mb-3">
            Build your traveler profile
          </h1>
          <p className="text-[#3f4944] leading-relaxed text-sm sm:text-base">This helps others know who you are before connecting.</p>
        </div>
        <ProfileSettingForm />
      </div>
      <div className="mt-8 sm:mt-12 mb-6 sm:mb-8 text-center">
        <p className="text-[#3f4944] font-headline font-bold text-xs sm:text-sm tracking-widest uppercase">Step 2 of 4</p>
      </div>
    </main>
  );
}

