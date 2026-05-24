"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  {
    name: "Resume Analysis",
    href: "/resume",
  },
  {
    name: "Job Search",
    href: "/jobs",
  },
  {
    name: "Interview Prep",
    href: "/interview",
  },
  {
    name: "Saved Jobs",
    href: "/saved",
  },
];

export default function Navbar() {

  const pathname = usePathname();

  return (

    <div className="
      bg-zinc-900
      p-3
      rounded-2xl
      flex
      gap-3
      mb-8
    ">

      {tabs.map((tab) => {

        const active = pathname === tab.href;

        return (

          <Link
            key={tab.href}
            href={tab.href}
            className={`
              flex-1
              text-center
              py-3
              rounded-xl
              transition-all
              font-medium
              ${
                active
                  ? "bg-orange-500 text-white"
                  : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
              }
            `}
          >
            {tab.name}
          </Link>

        );
      })}

    </div>

  );
}