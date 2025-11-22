import { useEffect } from "react";
import { MainLayout } from "@/components/Layouts/MainLayout/MainLayout";

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">

    <div
      className="
        pointer-events-none
        absolute
        -right-[200px]
        -top-[100px]
        w-[2500px]
        h-[700px]
        rounded-[90%]
        bg-black
        shadow-[inset_-100px__0_100px_0_#00629C]
      "
    />
    <MainLayout>




        <div className="relative ">
          {/* header */}
          <div className="mx-auto max-w-8xl px-4 pt-10 pb-12">
            <h1 className="text-[100px] leading-[20px] sm:text-6xl font-extrabold tracking-tight text-[#00629C]">
              about us
            </h1>
            <p className="mt-6 max-w-8xl font-semibold text-[30px] leading-[36px] opacity-90">
              The NU IEEE Student Branch (NU IEEE SB) is a vibrant community of engineering students
              at Nazarbayev University, dedicated to advancing knowledge in electrical, computer,
              and engineering fields. As part of the global IEEE network, we aim to connect students
              with industry leaders and provide opportunities for hands-on learning.
            </p>
            <p className="mt-4 max-w-8xl text-[30px] leading-[36px] font-semibold opacity-90">
              Through workshops, hackathons, field trips, and networking events, we help students
              apply their academic knowledge to real-world challenges. Our goal is to foster
              innovation, leadership, and collaboration, while preparing the next generation of
              engineers for successful careers.
            </p>
          </div>

          {/* stats */}
          <div className="mx-auto max-w-8xl px-4 py-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="px-6 py-8 text-center">
                <p className="text-[30px] opacity-100 font-semibold tracking-tight text-[#00629C]">
                  active members
                </p>
                <p className="mt-2 text-[70px] font-semibold">46</p>
              </div>
              <div className="px-6 py-8 text-center">
                <p className="text-[30px] opacity-100 font-semibold tracking-tight text-[#00629C]">
                  events handled
                </p>
                <p className="mt-2 text-[70px] font-semibold">??</p>
              </div>
              <div className="px-6 py-8 text-center">
                <p className="text-[30px] opacity-100 font-semibold tracking-tight text-[#00629C]">
                  hackathons
                </p>
                <p className="mt-2 text-[70px] font-semibold">1</p>
              </div>
            </div>
          </div>

          {/* mentor */}
          <div className="mx-auto max-w-8xl px-4 py-6">
            <h2 className="text-[40px] leading-[20px] sm:text-4xl font-bold mb-4 text-[#00629C]">
              our mentor
            </h2>

            <div className="max-w-8xl">
              <p className="text-[30px] opacity-90 font-semibold">
                Dr. Muhammad Tahir Akhtar is a distinguished electrical engineering researcher with
                strong international background (Pakistan, Japan, UAE, UK, USA, Kazakhstan). His work
                spans algorithmic and system design in signal processing, active noise cancellation,
                and biomedical acoustics. Currently an Associate Professor at Nazarbayev University,
                he continues to supervise PhD students and publish extensively.
              </p>

              <a
                href="https://www.linkedin.com/in/muhammad-tahir-akhtar-12221a74?originalSubdomain=kz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[22px] inline-block mt-3 underline opacity-90 hover:opacity-100"
              >
                LinkedIn Profile
              </a>
            </div>
          </div>

          {/* timeline */}
          <div className="mx-auto max-w-8xl px-4 py-10">
            <h2 className="text-[40px] sm:text-4xl font-extrabold mb-6 text-[#00629C]">
              timeline of the student branch
            </h2>

            <div className="relative ml-4">
              <div className="absolute left-1 top-6 bottom-6 w-[3px] bg-white/70" />

              <ol className="text-[30px]">
                {[
                  ["2017", "IEEE NU SB was established"],
                  ["2018", ""],
                  ["2019", ""],
                  ["2020", ""],
                  ["2021", "SB resumed its activity"],
                  ["2022", ""],
                  ["2023", ""],
                  ["2024", ""],
                  [
                    "2025",
                    "A first-ever hackathon by the IEEE NU SB was organized; the website was created",
                  ],
                ].map(([year, text]) => (
                  <li key={year} className="relative mb-6 ml-6">
                    <span className="absolute -left-6 mt-3 h-3 w-3 rounded-full bg-white/80" />
                    <div className="flex gap-8">
                      <div className="w-16 font-bold">{year}:</div>
                      <div className="opacity-100 font-extralight">
                        {text || <span className="opacity-50">&nbsp;</span>}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <p className="mt-3 text-[30px] italic opacity-100 text-right text-[#FFFFFF]">
              to be continued...
            </p>
          </div>

          {/* gallery */}
          <div className="mx-auto max-w-8xl px-4 pb-16">
            <h2 className="text-[40px] sm:text-4xl leading-[20px] font-extrabold mb-6 text-[#00629C]">
              photo gallery
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="">
                  {/* <Image
                    src={`/gallery/${String(i + 1).padStart(2, "0")}.jpg`}
                    alt={`gallery ${i + 1}`}
                    fill
                    className="object-cover"
                  /> */}
                </div>
              ))}
            </div>
          </div>
        </div>
    
    </MainLayout>
  </div>
  );
}
