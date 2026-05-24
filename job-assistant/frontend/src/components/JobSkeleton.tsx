export default function JobSkeleton() {

  return (

    <div className="
      bg-zinc-800
      p-6
      rounded-2xl
      animate-pulse
      border border-zinc-700
    ">

      <div className="flex justify-between">

        <div className="space-y-3">

          <div className="
            h-6
            w-48
            bg-zinc-700
            rounded
          " />

          <div className="
            h-4
            w-32
            bg-zinc-700
            rounded
          " />

          <div className="
            h-4
            w-24
            bg-zinc-700
            rounded
          " />

        </div>

        <div className="
          h-10
          w-16
          bg-zinc-700
          rounded-xl
        " />

      </div>

      <div className="
        mt-6
        h-10
        w-32
        bg-zinc-700
        rounded-xl
      " />

    </div>

  );
}