"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/Navbar";

import api from "@/lib/api";

export default function InterviewPage() {

  const [savedJobs, setSavedJobs] =
    useState<any[]>([]);

  const [selectedJob, setSelectedJob] =
    useState<any>(null);

  const [prep, setPrep] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // Load saved jobs
  useEffect(() => {

    const jobs =
      JSON.parse(
        localStorage.getItem(
          "savedJobs"
        ) || "[]"
      );

    setSavedJobs(jobs);

  }, []);

  const handleGeneratePrep =
    async () => {

      if (!selectedJob) return;

      try {

        setLoading(true);

        const response =
          await api.post(
            "/interview/prep",
            {
              job: selectedJob,
            }
          );

        setPrep(
          response.data.prep
        );

      } catch (error) {

        console.error(error);

        alert(
          "Interview prep failed"
        );

      } finally {

        setLoading(false);

      }
    };

  return (

    <main className="min-h-screen bg-black text-white">

      <div className="max-w-7xl mx-auto p-8">


        {/* PAGE HEADER */}
        <div className="mb-10">

          <h1 className="text-6xl font-bold">
            Interview Preparaion
          </h1>

          <p className="text-zinc-400 mt-3 text-lg">
            Generate AI-powered interview
            questions from saved jobs.
          </p>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT PANEL */}
          <div
            className="
              bg-zinc-900
              p-6
              rounded-2xl
              h-fit
            "
          >

            <h2 className="text-2xl font-semibold mb-6">
              Saved Jobs
            </h2>

            <div className="space-y-3">

              {savedJobs.map(
                (job, index) => (

                  <button
                    key={index}
                    onClick={() =>
                      setSelectedJob(job)
                    }
                    className={`
                      w-full
                      text-left
                      p-4
                      rounded-xl
                      transition-all
                      border
                      ${
                        selectedJob?.link ===
                        job.link
                          ? "bg-orange-500 border-orange-400"
                          : "bg-zinc-800 border-zinc-700 hover:border-orange-500"
                      }
                    `}
                  >

                    <h3 className="font-semibold">
                      {job.title}
                    </h3>

                    <p className="text-sm text-zinc-300 mt-1">
                      {job.company}
                    </p>

                  </button>

                )
              )}

            </div>

            {/* GENERATE BUTTON */}
            <button
              onClick={
                handleGeneratePrep
              }
              disabled={
                !selectedJob || loading
              }
              className="
                mt-6
                w-full
                bg-blue-600
                hover:bg-blue-700
                disabled:opacity-50
                transition-all
                py-3
                rounded-xl
                font-semibold
              "
            >
              {loading
                ? "Generating..."
                : "Generate Interview Prep"}
            </button>

          </div>

          {/* RIGHT PANEL */}
          <div className="lg:col-span-2">

            <div
              className="
                bg-zinc-900
                rounded-2xl
                p-8
                min-h-[500px]
                border border-zinc-800
              "
            >

              {!prep ? (

                <div
                  className="
                    h-full
                    flex
                    items-center
                    justify-center
                    text-zinc-500
                    text-lg
                  "
                >
                  Select a saved job and
                  generate interview prep.
                </div>

              ) : (

                <div>

                  <h2
                    className="
                      text-3xl
                      font-bold
                      mb-6
                      text-blue-400
                    "
                  >
                    AI Interview Prep
                  </h2>

                  <div
                    className="
                      whitespace-pre-line
                      leading-8
                      text-zinc-300
                    "
                  >
                    {prep}
                  </div>

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}