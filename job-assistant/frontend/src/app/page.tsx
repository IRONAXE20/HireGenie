import Link from "next/link";

export default function HomePage() {

  return (

    <main className="
      min-h-[80vh]
      flex
      flex-col
      items-center
      justify-center
      text-center
    ">

      <h1 className="text-7xl font-bold mb-6">
        HireGenie
      </h1>

      <p className="
        text-zinc-400
        text-xl
        max-w-2xl
        mb-10
      ">
        AI-powered platform for resume
        analysis, intelligent job search,
        interview preparation, and career
        growth.
      </p>

      <Link
        href="/jobs"
        className="
          bg-orange-500
          hover:bg-orange-600
          transition-all
          px-8
          py-4
          rounded-2xl
          text-lg
          font-semibold
        "
      >
        Start Exploring Jobs →
      </Link>

    </main>

  );
}