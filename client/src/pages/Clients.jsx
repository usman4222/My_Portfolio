import {
  Apple,
  AlternateEmail,
  BubbleChart,
  Google,
  Shield,
  YouTube,
  West,
  East,
} from "@mui/icons-material";
import { person3, muneeb, huzaifa } from "../assets";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Heading } from "../components";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
// import { Autoplay, Pagination, Navigation } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect } from "react";

const Clients = () => {
  //////////////////////////////////////// VARIABLES //////////////////////////////////////////////
  const sectionRef = useRef();
  const testimonialRef = useRef(null);

  //////////////////////////////////////// STATES //////////////////////////////////////////////
  const [currentSlideIndex, setCurrentSlideIndex] = useState(null);

  //////////////////////////////////////// USE EFFECT //////////////////////////////////////////////
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
  //////////////////////////////////////// FUNCTIOSN //////////////////////////////////////////////
  const moveForward = (index) => {
    if (testimonialRef.current !== null) {
      testimonialsArr.length == index
        ? testimonialRef.current.swiper.slideTo(0) 
        : testimonialRef.current.swiper.slideTo(index); 
    }
  };

  const moveBack = (index) => {
    if (testimonialRef.current !== null) {
      index < 0
        ? testimonialRef.current.swiper.slideTo(testimonialsArr.length) 
        : testimonialRef.current.swiper.slideTo(index); 
    }
  };

  return (
    <section
      ref={sectionRef}
      name="clients"
      className="
            flex flex-col justify-between items-center gap-[5rem] z-10 w-full bg-silver pb-[10rem]
            px-[14px] py-[7rem] sticky top-0
            sm:px-[3rem] sm:py-[7rem]
            md:px-[64px] md:py-[10rem]
        "
    >
      {/* clients icon */}
      <div className="w-full flex flex-col justify-between items-center gap-[4rem] ">
        <Heading
          subHeading="Client Feedback"
          heading="What People Are Saying About My Work"
          subHeadingColor="green"
          headingColor="black"
        /> 
       </div>

      {/* testimonials */}
      <motion.div
        whileInView={{ y: [0, 1], opacity: [0, 1] }}
        transition={{ duration: 0.3 }}
        className="flex justify-between items-center w-full "
      >
        <Swiper
          ref={testimonialRef}
          slidesPerView={1}
          spaceBetween={10}
          pagination={{ clickable: true }}
          // modules={[Pagination]}
          className=" text-center w-full text-lightGray pb-[3rem] "
          onSlideChange={(swiper) => setCurrentSlideIndex(swiper.activeIndex)}
        >
          {testimonialsArr.map((testimonial, index) => (
            <SwiperSlide
              key={index}
              className="flex  flex-col justify-between items-center text-[20px] w-fit md:gap-[3rem] sm:gap-[2rem] gap-[1rem] "
            >
              <div className="w-full flex justify-between items-center ">
                <button onClick={() => moveBack(currentSlideIndex - 1)}>
                  {" "}
                  <West className="text-black  md:text-[32px] sm:text-[24px] text-[20px] " />
                </button>
                <p className=" text-textGray lg:w-[70%] md:text-[32px] md:p-0 sm:text-[24px] sm:p-0 text-[16px] md:px-[10px] sm:px-[10px] px-[2px] ">
                  {testimonial.text}
                </p>
                <button onClick={() => moveForward(currentSlideIndex + 1)}>
                  {" "}
                  <East className="text-black  md:text-[32px] sm:text-[24px] text-[20px] " />
                </button>
              </div>
              <div className="flex flex-col justify-center items-center mt-4 ">
                <img
                  src={testimonial.image}
                  alt=""
                  style={{ width: "5rem", height: "5rem" }}
                  className="rounded-full object-cover md:w-[6rem] md:h-[6rem] sm:w-[5rem] sm:h-[5rem] w-[5rem] h-[5rem]  "
                />
                <h5 className="md:text-[24px] sm:text-[22px] text-[18px] font-semibold ">
                  {testimonial.name}
                </h5>
                <h6 className="md:text-[20px] sm:text-[18px] text-[14px] font-medium ">
                  {testimonial.designation}
                </h6>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      {/* vertical line */}
      <div className="absolute bottom-0 right-[50%] transform translate-x-[-50%] flex justify-between gap-[2rem] ">
        <hr className="h-[7rem] w-[4px] bg-green " />
      </div>
    </section>
  );
};

export default Clients;

const testimonialsArr = [
  {
    name: "Huzaifa Ramzan",
    image: huzaifa,
    text: "Working with Nauman was a great experience. He really knows the stuff and gets things done efficiently. Would definitely work together again!",
    company: "Upwork Client",
    title: "Product Manager",
    associatedProject: "CRM",
  },
  {
    name: "Hamza Zulfiqar",
    image: person3,
    text: "Collaborating with Nauman was a pleasure. His expertise and dedication to delivering results stood out.",
    company: "Upwork Client",
    title: "Product Manager",
    associatedProject: "SwiftCart",
  },
  {
    name: "Muneeb",
    image: muneeb,
    text: "Solid collaboration with the developer. They efficiently translated my concept into a functional project. There were some minor hiccups, but overall, a good experience.",
    company: "Linkedin Client",
    title: "Product Manager",
    associatedProject: "DoctorGuide",
  },
];

const clientsIcon = [
  { icon: Apple },
  { icon: AlternateEmail },
  { icon: BubbleChart },
  { icon: Google },
  { icon: Shield },
  { icon: AlternateEmail },
  { icon: YouTube },
  { icon: BubbleChart },
  { icon: Google },
];
