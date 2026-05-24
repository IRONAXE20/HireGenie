"use client";

import { useEffect, useState } from "react";

import JobList from "@/components/JobList";

export default function SavedJobsPage() {

  const [jobs, setJobs] =
    useState<any[]>([]);

  useEffect(() => {

    const savedJobs =
      JSON.parse(
        localStorage.getItem(
          "savedJobs"
        ) || "[]"
      );

    setJobs(savedJobs);

  }, []);

  return (

    <main className="min-h-screen bg-black text-white p-8">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-bold mb-8">
          Saved Jobs
        </h1>

        <JobList
          jobs={jobs}
          loading={false}
          keywords=""
          savedPage={true}
        />

      </div>

    </main>

  );
}