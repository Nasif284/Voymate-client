import { appStore, blog, friends, other, search, social } from "@/src/assets/icons";
import { Option } from "../interfaces/interfaces";

const options: Option[] = [
  {
    id: "FRIENDS_FAMILY",
    label: "Friends or Family",
    icon: friends,
  },
  {
    id: "SOCIAL_MEDIA",
    label: "Social Media",
    icon: social,
  },
  {
    id: "SEARCH_ENGINE",
    label: "Search Engine",
    icon: search,
  },
  {
    id: "TRAVEL_BLOG",
    label: "Travel Blog or Article",
    icon: blog,
  },
  {
    id: "APP_STORE",
    label: "App Store",
    icon: appStore,
  },
  {
    id: "OTHER",
    label: "Other",
    icon: other,
  },
];

const SourceOptions = ({ selected, onSelect }: { selected: string; onSelect: (id: string) => void }) => {

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
      {options.map((opt) => {
        const isSelected = selected === opt.id;
        return (
          <button key={opt.id} onClick={() => onSelect(opt.id)} className={`flex items-center gap-4 p-4 rounded-xl text-left transition-all active:scale-[0.98] ${isSelected ? "bg-white ring-2 ring-[#005440]" : "bg-[#e0e3e0] hover:bg-[#f1f4f1]"}`}>
            <div className={`w-10 h-10 flex items-center justify-center rounded-lg flex-shrink-0 ${isSelected ? "bg-[#0f6e56] text-white" : "bg-[#e5e9e5] text-[#3f4944]"}`}>{opt.icon}</div>
            <span className={`text-sm font-semibold ${isSelected ? "text-[#005440]" : "text-[#181d1a] font-medium"}`}>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default SourceOptions;
