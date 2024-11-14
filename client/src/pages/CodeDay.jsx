import { Heading, ServiceCard } from "../components";
import { useEffect, useRef } from "react";

import code from "../assets/code.png";

const CodeDay = () => {

  const sectionRef = useRef();

  useEffect(() => {
    const updateHeight = () => {
      const heightInVh =
        (sectionRef.current.offsetHeight / window.innerHeight) * 100;
      sectionRef.current.style.top = `-${heightInVh - 100}vh`;
    };
    updateHeight();
    window.addEventListener("scroll", updateHeight);

    return () => {
      window.removeEventListener("scroll", updateHeight);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      name="services"
      className="
            flex flex-col justify-between gap-[0rem] z-10 w-full
            bg-[#2B2B2B] sticky top-0
            px-[14px] py-[7rem]
            sm:px-[3rm] sm:py-[7rem]
            md:px-[64px] md:py-[10rem]
        "
    >
      <Heading
        subHeading="Behind the Scenes"
        heading="A Snapshot of Progress"
        subHeadingColor="green"
        headingColor="white"
      />

      {/* all services cards */}
      <div className="w-full pt-[5rem] flex flex-wrap xl:px-[4rem] lg:px-0 md:px-0 sm:px-0  ">
        <div className="flex justify-center w-full  ">
          <img src={code} alt="code" />
        </div>
      </div>
    </section>
  );
};

export default CodeDay;
