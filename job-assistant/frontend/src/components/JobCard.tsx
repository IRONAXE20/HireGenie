"use client";

import { useState } from "react";

import api from "@/lib/api";

type Job = {
  title: string;
  company: string;
  location: string;
  score?: number;
  link?: string;
  ai_analysis?: string;
};

export default function JobCard({
  job,
  keywords,
  savedPage = false,
}: {
  job: Job;
  keywords: string;
  savedPage?: boolean;
}) {

  const [showFit, setShowFit] =
    useState(false);

  const [analysis, setAnalysis] =
    useState("");

  const [analyzing, setAnalyzing] =
    useState(false);
  const handleSaveJob = () => {

  const existingJobs =
    JSON.parse(
      localStorage.getItem(
        "savedJobs"
      ) || "[]"
    );

  // Avoid duplicates
  const alreadySaved =
    existingJobs.some(
      (savedJob: Job) =>
        savedJob.link === job.link
    );

  if (alreadySaved) {

    alert("Job already saved");

    return;
  }

  existingJobs.push(job);

  localStorage.setItem(
    "savedJobs",
    JSON.stringify(existingJobs)
  );

  alert("Job saved successfully");
};
  
  const handleRemoveJob = () => {

  const savedJobs =
    JSON.parse(
      localStorage.getItem(
        "savedJobs"
      ) || "[]"
    );

  const updatedJobs =
    savedJobs.filter(
      (savedJob: Job) =>
        savedJob.link !== job.link
    );

  localStorage.setItem(
    "savedJobs",
    JSON.stringify(updatedJobs)
  );

  window.location.reload();
};

  const handleAnalyze = async () => {

    // Toggle if already loaded
    if (analysis) {

      setShowFit(!showFit);

      return;
    }

    try {

      setAnalyzing(true);

      const response = await api.post(
        "/jobs/analyze",
        {
          keywords,
          job,
        }
      );

      setAnalysis(
        response.data.analysis
      );

      setShowFit(true);

    } catch (error) {

      console.error(error);

      alert("AI analysis failed");

    } finally {

      setAnalyzing(false);

    }
  };

  return (

    <div
      className="
        bg-zinc-800
        p-6
        rounded-2xl
        border border-zinc-700
        hover:border-orange-500
        transition-all
        duration-300
        hover:scale-[1.01]
      "
    >

      {/* TOP SECTION */}
      <div
        className="
          flex
          justify-between
          items-start
          gap-4
        "
      >

        <div>

          <h3 className="text-2xl font-bold">
            {job.title}
          </h3>

          <p className="text-zinc-400 mt-1">
            {job.company}
          </p>

          <p className="text-zinc-500 text-sm mt-1">
            {job.location}
          </p>

        </div>

        {/* MATCH SCORE */}
        <div
          className="
            bg-orange-500/20
            text-orange-400
            px-4
            py-2
            rounded-xl
            font-semibold
            whitespace-nowrap
          "
        >
          {keywords
            ? `${job.score ?? 0}%`
            : "Match"}
        </div>

      </div>

      {/* ACTIONS */}
      <div className="mt-6 flex flex-wrap gap-3">

        {/* VIEW JOB */}
        {job.link && (

          <a
            href={job.link}
            target="_blank"
            rel="noopener noreferrer"
            className="
              bg-orange-500
              hover:bg-orange-600
              transition-all
              px-5
              py-2
              rounded-xl
              font-medium
            "
          >
            View Job →
          </a>
          
        )}
        {savedPage ? (

  <button
    onClick={handleRemoveJob}
    className="
      bg-red-500
      hover:bg-red-600
      transition-all
      px-5
      py-2
      rounded-xl
      font-medium
    "
  >
    Remove Job
  </button>

) : (

  <button
    onClick={handleSaveJob}
    className="
      bg-zinc-700
      hover:bg-zinc-600
      transition-all
      px-5
      py-2
      rounded-xl
      font-medium
    "
  >
    Save Job
  </button>

)}
        {/* AI BUTTONS */}
        {keywords && !savedPage &&(

          <button
            onClick={handleAnalyze}
            disabled={analyzing}
            className="
              bg-zinc-700
              hover:bg-zinc-600
              transition-all
              px-5
              py-2
              rounded-xl
              font-medium
            "
          >
            {analyzing
              ? "Analyzing..."
              : "Why Suitable"}
          </button>

        )}

      </div>

      {/* AI ANALYSIS */}
      {showFit && analysis && (

        <div
          className="
            mt-5
            bg-zinc-900
            border border-zinc-700
            rounded-2xl
            p-5
          "
        >

          <h4
            className="
              text-lg
              font-semibold
              mb-3
              text-orange-400
            "
          >
            AI Career Analysis
          </h4>

          <div
            className="
              text-zinc-300
              leading-7
              whitespace-pre-line
            "
          >
            {analysis}
          </div>

        </div>

      )}

    </div>

  );
}