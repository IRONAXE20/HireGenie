"use client";

import { useEffect, useState } from "react";

import api from "@/lib/api";

import ResumeUpload from "@/components/ResumeUpload";

export default function ResumePage() {

  const [file, setFile] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [resumeText, setResumeText] =
    useState("");

  const [savedJobs, setSavedJobs] =
    useState<any[]>([]);

  const [selectedJob, setSelectedJob] =
    useState<any>(null);

  const [atsResult, setAtsResult] =
    useState("");

  const [optimizing, setOptimizing] =
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

  // Upload Resume
  const handleUpload = async () => {

    if (!file) return;

    try {

      setLoading(true);

      const formData =
        new FormData();

      formData.append(
        "file",
        file
      );

      const response =
        await api.post(
          "/resume/analyze",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      setResumeText(
        response.data.text
      );


    } catch (error) {

      console.error(error);

      alert(
        "Resume upload failed"
      );

    } finally {

      setLoading(false);

    }
  };

  // ATS Analysis
  const handleATSAnalysis =
    async () => {

      if (!resumeText) {

        alert(
          "Please analyze resume first"
        );

        return;
      }

      if (!selectedJob) {

        alert(
          "Please select a saved job"
        );

        return;
      }

      try {

        setOptimizing(true);

        const response =
          await api.post(
            "/resume-optimizer/optimize",
            {
              resume_text:
                resumeText,
              job: selectedJob,
            }
          );

        setAtsResult(
          response.data.result
        );

      } catch (error) {

        console.error(error);

        alert(
          "ATS analysis failed"
        );

      } finally {

        setOptimizing(false);

      }
    };

  return (

    <main className="min-h-screen bg-black text-white">

      <div className="max-w-7xl mx-auto p-8">

        {/* HEADER */}
        <div className="mb-10">

          <h1 className="text-6xl font-bold">
            Resume Analysis
          </h1>

          <p className="text-zinc-400 mt-3 text-lg">
            Optimize your resume for
            specific saved jobs using AI.
          </p>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT PANEL */}
          <div
            className="
              bg-zinc-900
              p-8
              rounded-2xl
              h-fit
            "
          >

            <h2 className="text-3xl font-semibold mb-6">
              Upload Resume
            </h2>

            {/* Resume Upload */}
            <ResumeUpload
              loading={loading}
              onUpload={handleUpload}
              onFileChange={setFile}
              selectedFile={file}
            />

            {/* Saved Jobs */}
            <div
              className="
                mt-8
                bg-zinc-800
                p-5
                rounded-2xl
              "
            >

              <h3 className="text-xl font-semibold mb-4">
                Target Saved Job
              </h3>

              <div
                className="
                  space-y-3
                  max-h-80
                  overflow-y-auto
                "
              >

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
                        border
                        transition-all
                        ${
                          selectedJob?.title ===
                          job.title
                            ? "bg-orange-500 border-orange-400"
                            : "bg-zinc-700 border-zinc-600 hover:border-orange-500"
                        }
                      `}
                    >

                      <h4 className="font-semibold">
                        {job.title}
                      </h4>

                      <p
                        className="
                          text-sm
                          text-zinc-300
                          mt-1
                        "
                      >
                        {job.company}
                      </p>

                    </button>

                  )
                )}

              </div>

              {/* Selected Job */}
              {selectedJob && (

                <div
                  className="
                    mt-4
                    p-4
                    bg-green-600/20
                    border border-green-500
                    rounded-xl
                  "
                >

                  <p className="font-semibold">
                    Selected Job:
                  </p>

                  <p className="mt-1 text-sm">
                    {selectedJob.title}
                  </p>

                </div>

              )}

              {/* Analyze Button */}
              <button
                onClick={
                  handleATSAnalysis
                }
                disabled={optimizing}
                className="
                  mt-5
                  w-full
                  bg-green-600
                  hover:bg-green-700
                  transition-all
                  py-3
                  rounded-xl
                  font-semibold
                "
              >
                {optimizing
                  ? "Analyzing..."
                  : "Analyze ATS Match"}
              </button>

            </div>

          </div>

          {/* RIGHT PANEL */}
          <div className="lg:col-span-2">

            {!atsResult ? (

              <div
                className="
                  bg-zinc-900
                  border border-zinc-800
                  rounded-2xl
                  p-10
                  min-h-[600px]
                  flex
                  items-center
                  justify-center
                  text-zinc-500
                  text-xl
                  text-center
                "
              >
                Upload your resume and
                select a saved job to
                generate ATS analysis and
                AI resume optimization.
              </div>

            ) : (

              <div
                className="
                  bg-zinc-900
                  border border-zinc-800
                  rounded-2xl
                  p-8
                "
              >

                <h2
                  className="
                    text-3xl
                    font-bold
                    mb-6
                    text-green-400
                  "
                >
                  ATS Resume Analysis
                </h2>

                <div
                  className="
                    whitespace-pre-line
                    leading-8
                    text-zinc-300
                  "
                >
                  {atsResult}
                </div>

              </div>

            )}

          </div>

        </div>

      </div>

    </main>

  );
}