type Props = {
  keywords: string;
  searching: boolean;
  onSearch: () => void;
};

export default function KeywordsBox({
  keywords,
  searching,
  onSearch,
}: Props) {

  return (

    <div className="mt-6">

      <h3 className="text-xl font-semibold mb-2">
        Extracted Keywords
      </h3>

      <div className="
          bg-zinc-800
          p-4
          rounded-xl
          flex
          flex-wrap
          gap-2
        ">
        
          {keywords
            .split(",")
            .map((keyword, index) => (
            
              <span
                key={index}
                className="
                  bg-zinc-700
                  px-3
                  py-1
                  rounded-full
                  text-sm
                  text-zinc-200
                "
              >
                {keyword.trim()}
              </span>
        
            ))}
        
        </div>

      <button
        onClick={onSearch}
        disabled={searching}
        className="bg-blue-600 px-5 py-2 rounded-lg mt-4"
      >
        {searching
          ? "Searching..."
          : "Find Matching Jobs"}
      </button>

    </div>

  );
}