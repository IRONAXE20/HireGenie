type Props = {
  query: string;
  location: string;
  experienceLevel: string;
  postedWithin: string;
  searching: boolean;
  onQueryChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onExperienceChange: (value: string) => void;
  onPostedWithinChange: (value: string) => void;
  onSearch: () => void;
};

export default function CustomSearch({
  query,
  location,
  experienceLevel,
  searching,
  onQueryChange,
  onLocationChange,
  onExperienceChange,
  onSearch,
  postedWithin,
onPostedWithinChange,
}: Props) {

  return (

    <div className="space-y-5">

      {/* Job Title */}
      <div>

        <label className="block mb-2 text-sm text-zinc-400">
          Job Title
        </label>

        <input
          type="text"
          placeholder="Python Developer"
          value={query}
          onChange={(e) =>
            onQueryChange(e.target.value)
          }
          className="
            w-full
            bg-zinc-800
            border border-zinc-700
            rounded-xl
            px-4
            py-3
            outline-none
            focus:border-orange-500
          "
        />

      </div>

      {/* Location */}
      <div>

        <label className="block mb-2 text-sm text-zinc-400">
          Location
        </label>

        <input
          type="text"
          placeholder="Mumbai"
          value={location}
          onChange={(e) =>
            onLocationChange(e.target.value)
          }
          className="
            w-full
            bg-zinc-800
            border border-zinc-700
            rounded-xl
            px-4
            py-3
            outline-none
            focus:border-orange-500
          "
        />

      </div>
      {/* Experience Level */}
      <div>
          
        <label className="block mb-2 text-sm text-zinc-400">
          Experience Level
        </label>
          
        <select
          value={experienceLevel}
          onChange={(e) =>
            onExperienceChange(e.target.value)
          }
          className="
            w-full
            bg-zinc-800
            border border-zinc-700
            rounded-xl
            px-4
            py-3
            outline-none
            focus:border-orange-500
          "
        >
      
          <option>Any</option>
          <option>Internship</option>
          <option>Entry Level</option>
          <option>Mid Level</option>
          <option>Senior Level</option>
      
        </select>
      
      </div>

      {/* Posted Within */}
      <div>
            
        <label className="block mb-2 text-sm text-zinc-400">
          Posted Within
        </label>
            
        <select
          value={postedWithin}
          onChange={(e) =>
            onPostedWithinChange(e.target.value)
          }
          className="
            w-full
            bg-zinc-800
            border border-zinc-700
            rounded-xl
            px-4
            py-3
            outline-none
            focus:border-orange-500
          "
        >
      
          <option>Any Time</option>
          <option>1 Day</option>
          <option>3 Days</option>
          <option>7 Days</option>
          <option>14 Days</option>
          <option>30 Days</option>
      
        </select>
      
      </div>

      {/* Search Button */}
      <button
        onClick={onSearch}
        disabled={searching}
        className="
          w-full
          bg-orange-500
          hover:bg-orange-600
          transition-all
          py-3
          rounded-xl
          font-semibold
        "
      >
        {searching
          ? "Searching..."
          : "Search Jobs"}
      </button>

    </div>

  );
}