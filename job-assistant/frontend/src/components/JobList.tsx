import JobCard from "./JobCard";
import JobSkeleton from "./JobSkeleton";

type Job = {
  title: string;
  company: string;
  location: string;
  score?: number;
  link?: string;
};

export default function JobList({
  jobs,
  loading,
  keywords,
  savedPage = false,
}: {
  jobs: Job[];
  loading: boolean;
  keywords: string;
  savedPage?: boolean;
}) {

  // Loading State
  if (loading) {

    return (

      <div className="space-y-4">

        {[1, 2, 3].map((item) => (
          <JobSkeleton key={item} />
        ))}

      </div>

    );
  }

  // Empty State
  if (jobs.length === 0) {

    return (

      <div
        className="
          bg-zinc-900
          border border-zinc-800
          rounded-2xl
          p-16
          flex
          flex-col
          items-center
          justify-center
          text-center
        "
      >

        <div className="text-6xl mb-6">
          Lets Start!
        </div>

        <h3 className="text-2xl font-semibold mb-3">
          Ready to Find Jobs
        </h3>

        <p className="text-zinc-400 max-w-md">
          Upload your resume and let AI
          analyze your skills to find
          the most relevant opportunities.
        </p>

      </div>

    );
  }

  // Jobs List
  return (

    <div className="mt-8 space-y-4">

      {jobs.map((job, index) => (
        <JobCard
        key={index}
        job={job}
        keywords={keywords}
        savedPage={savedPage}
      />
      ))}

    </div>

  );
}