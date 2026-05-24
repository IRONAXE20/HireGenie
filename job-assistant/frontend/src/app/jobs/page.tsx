"use client";

import { useState } from "react";

import api from "@/lib/api";

import ResumeUpload from "@/components/ResumeUpload";
import KeywordsBox from "@/components/KeywordsBox";
import JobList from "@/components/JobList";
import CustomSearch from "@/components/CustomSearch";
export default function Home() {

    const [file, setFile] = useState<File | null>(null);
  
    const [loading, setLoading] = useState(false);
  
    const [keywords, setKeywords] = useState("");
  
    const [jobs, setJobs] = useState<any[]>([]);
  
    const [searching, setSearching] = useState(false);
  
    const [mode, setMode] = useState<
      "resume" | "custom"
    >("resume");
    const [customQuery, setCustomQuery] = useState("");

    const [customLocation, setCustomLocation] = useState("");
    
    const [experienceLevel, setExperienceLevel] =
     useState("Any");
    const [postedWithin, setPostedWithin] =
     useState("Any Time");
    // Resume Upload
    const handleUpload = async () => {

    if (!file) return;

    setLoading(true);

    const formData = new FormData();

    formData.append("file", file);

    try {

      const response = await api.post(
        "/resume/analyze",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setKeywords(response.data.keywords);

      // clear previous jobs on new resume upload
      setJobs([]);

    } catch (error) {

      console.error(error);

      alert("Upload failed");

    } finally {

      setLoading(false);

    }
  };

  // Job Search
  const handleJobSearch = async () => {

    if (!keywords) return;

    setSearching(true);

    try {

      const cleanedKeywords = keywords.replace(/\n/g, " ");

      const keywordList = cleanedKeywords
        .split(",")
        .map((k) => k.trim())
        .filter((k) => k.length > 0)
        .slice(0, 1);

      const query = keywordList.join(" ");

      console.log("Searching for:", query);

      const response = await api.get(
        `/jobs/search?query=${encodeURIComponent(query)}`
      );

      setJobs(response.data.jobs);

    } catch (error) {

      console.error(error);

      alert("Job search failed");

    } finally {

      setSearching(false);

    }
  };
  const handleCustomSearch = async () => {

      if (!customQuery) return;

      setSearching(true);

      try {

        const finalQuery =
          experienceLevel === "Any"
            ? customQuery
            : `${experienceLevel} ${customQuery}`;

        const response = await api.get(
          `/jobs/search?query=${encodeURIComponent(
            finalQuery
          )}&location=${encodeURIComponent(
            customLocation
          )}&postedWithin=${encodeURIComponent(
            postedWithin
          )}`
        );

        setJobs(response.data.jobs);

      } catch (error) {

        console.error(error);

        alert("Custom search failed");

      } finally {

        setSearching(false);

      }
  };
  return (

    <main className="min-h-screen bg-black text-white">

      <div className="max-w-6xl mx-auto p-8">

        {/* Header */}
        <div className="mb-10">

          <h1 className="text-6xl font-bold">
            Job Assistant AI
          </h1>

          <p className="text-zinc-400 mt-3 text-lg">
            AI-powered Resume Analysis & Job Matching
          </p>

        </div>

        {/* Main Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT PANEL */}
          <div className="
            lg:col-span-1
            bg-zinc-900
            p-8
            rounded-2xl
            shadow-2xl
            h-fit
            sticky
            top-8
          ">
          
            <div className="mb-6">

              <h2 className="text-3xl font-semibold mb-6">
                Job Search
              </h2>

              {/* Tabs */}
              <div className="flex gap-3">

                <button
                  onClick={() => setMode("resume")}
                  className={`
                    flex-1
                    py-3
                    rounded-xl
                    transition-all
                    font-medium
                    ${
                      mode === "resume"
                        ? "bg-orange-500 text-white"
                        : "bg-zinc-800 text-zinc-400"
                    }
                  `}
                >
                  Resume Based
                </button>
                
                <button
                  onClick={() => setMode("custom")}
                  className={`
                    flex-1
                    py-3
                    rounded-xl
                    transition-all
                    font-medium
                    ${
                      mode === "custom"
                        ? "bg-orange-500 text-white"
                        : "bg-zinc-800 text-zinc-400"
                    }
                  `}
                >
                  Custom Search
                </button>
                
              </div>
                
            </div>

            {mode === "resume" && (
              <>
                {/* Upload */}
                <ResumeUpload
                  loading={loading}
                  onUpload={handleUpload}
                  onFileChange={setFile}
                  selectedFile={file}
                />

                {/* Keywords */}
                {keywords && (
                  <KeywordsBox
                    keywords={keywords}
                    searching={searching}
                    onSearch={handleJobSearch}
                  />
                )}

              </>
            )}

            {mode === "custom" && (

              <CustomSearch
                  query={customQuery}
                  location={customLocation}
                  experienceLevel={experienceLevel}
                  postedWithin={postedWithin}
                  searching={searching}
                  onQueryChange={setCustomQuery}
                  onLocationChange={setCustomLocation}
                  onExperienceChange={setExperienceLevel}
                  onPostedWithinChange={setPostedWithin}
                  onSearch={handleCustomSearch}
                />

            )}

          </div>
          
          {/* RIGHT PANEL */}
          <div className="lg:col-span-2">
          
            <div className="flex items-center justify-between mb-6">
          
              <h2 className="text-3xl font-semibold">
                Matching Jobs
              </h2>
          
              <div className="
                bg-zinc-900
                px-4
                py-2
                rounded-xl
                text-zinc-400
              ">
                {jobs.length} Jobs
              </div>
          
            </div>
          
            <JobList
              jobs={jobs}
              loading={searching}
              keywords={keywords}
            />
          
          </div>
          
        </div>

      </div>

    </main>
  );
}