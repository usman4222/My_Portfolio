import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Chip, IconButton, Modal, Tooltip } from "@mui/material";

import { Heading } from "../components";
import {
  empty,
  p1,
  p2,
  p3,
  p4,
  p5,
  p6,
  p7,
  p8
} from "../assets";
import {
  Close,
  Fullscreen,
  FullscreenExit,
  East,
  West,
  Visibility,
  GitHub,
} from "@mui/icons-material";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSpring } from "react-spring";
import VanillaTilt from "vanilla-tilt";

const Work = () => {
  const imageContainerRef = useRef(null);
  const sectionRef = useRef();
  const tiltRefs = Array.from({ length: initialProjects.length }, () =>
    useRef(null)
  );
  const circleRefs = Array.from({ length: 5 }, () => useRef(null));
  const techs = [
    { label: "All", value: "all" },
    { label: "MERN", value: "mern" },
    { label: "Next.JS", value: "next.js" },
    { label: "React.JS", value: "react.js" },
    { label: "ShadCN UI", value: "shadcnui" },
    { label: "Tailwind CSS", value: "tailwindcss" },
    { label: "HTML CSS JS", value: "htmlcssjs" },
    { label: "Third Party API", value: "thirdpartyapi" },
    { label: "MongoDB", value: "mongodb" },
    { label: "Prisma", value: "prisma" },
    { label: "Stripe", value: "stripe" },
  ];
  const sizes = [
    { label: "All", value: "all" },
    { label: "Large", value: "large" },
    { label: "Medium", value: "medium" },
    { label: "Small", value: "small" },
  ];

  const [showImageModal, setShowImageModal] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [currentImage, setCurrentImage] = useState({});
  const [currentSlideIndex, setCurrentSlideIndex] = useState(null);
  const [projects, setProjects] = useState(initialProjects);
  const [sectionScrolledHeight, setSectionScrolledHeight] = useState(0);
  const [sizeFilters, setSizeFilters] = useState(["all"]);
  const [techFilters, setTechFilters] = useState(["all"]);

  useEffect(() => {
    const updateHeight = () => {
      const heightInVh =
        (sectionRef.current.offsetHeight / window.innerHeight) * 100;
      const sectionOffsetTop = sectionRef.current.offsetTop;
      const scrollPosition = window.scrollY - sectionOffsetTop;
      const scrolledPercentage =
        (scrollPosition /
          (sectionRef.current.offsetHeight - window.innerHeight)) *
        100;

      setSectionScrolledHeight(scrolledPercentage);
      sectionRef.current.style.top = `-${heightInVh - 100}vh`;
    };
    updateHeight();

    window.addEventListener("scroll", updateHeight);
    window.addEventListener("resize", updateHeight);

    return () => {
      window.removeEventListener("scroll", updateHeight);
      window.removeEventListener("resize", updateHeight);
    };
  }, []);
  useEffect(() => {
    imageContainerRef.current?.swiper?.slideTo(currentImage.index);
  }, [currentImage]);
  useEffect(() => {
    circleRefs.map((circleRef) => {
      if (circleRef.current) {
        VanillaTilt.init(circleRef.current, {
          max: 25,
          speed: 400,
          glare: true,
          "max-glare": 0.5,
        });

        return () => {
          circleRef.current?.vanillaTilt?.destroy();
        };
      }
    });
  }, []);
  useEffect(() => {
    setProjects((prevProjects) => {
      if (
        (techFilters.includes("all") || techFilters.length === 0) &&
        (sizeFilters.includes("all") || sizeFilters.length === 0)
      ) {

        techFilters.length === 0 && setTechFilters(["all"]);
        sizeFilters.length === 0 && setSizeFilters(["all"]);
        return initialProjects;
      } else {

        return prevProjects.filter((project) => {
          const techFilterCondition =
            techFilters.includes("all") || techFilters.length === 0
              ? true
              : project.technologies.some((tech) => techFilters.includes(tech));

          const sizeFilterCondition =
            sizeFilters.includes("all") || sizeFilters.length === 0
              ? true
              : sizeFilters.includes(project.size);

          return techFilterCondition && sizeFilterCondition;
        });
      }
    });
  }, [techFilters, sizeFilters]);

  const imageClick = (image) => {
    setShowImageModal(true);
    setCurrentImage(image);
  };

  const moveForward = (index) => {
    if (imageContainerRef.current !== null) {
      initialProjects.length == index
        ? imageContainerRef.current.swiper.slideTo(0) 
        : imageContainerRef.current.swiper.slideTo(index); 
    }
  };

  const moveBack = (index) => {
    if (imageContainerRef.current !== null) {
      index < 0
        ? imageContainerRef.current.swiper.slideTo(initialProjects.length) 
        : imageContainerRef.current.swiper.slideTo(index);
    }
  };

  const handleFilter = (type, value) => {
    // variant: 'add' | 'remove'
    if (type === "size") {
      setSizeFilters((prevFilters) => {
        const isExist = prevFilters.includes(value);
        if (isExist) {
          return prevFilters.filter((filter) => filter !== value);
        } else {
          return [...prevFilters, value];
        }
      });
    } else {
      setTechFilters((prevFilters) => {
        const isExist = prevFilters.includes(value);
        if (isExist) {
          return prevFilters.filter((filter) => filter !== value);
        } else {
          return [...prevFilters, value];
        }
      });
    }
  };

  const Project = ({ project, tiltRef, index }) => {
    useEffect(() => {
      if (tiltRef.current) {
        VanillaTilt.init(tiltRef.current, {
          max: 25,
          speed: 400,
          glare: true,
          "max-glare": 0.5,
        });

        return () => {
          tiltRef.current?.vanillaTilt?.destroy(); // Cleanup on component unmount
        };
      }
    }, []);
    return (
      <motion.div
        ref={tiltRef}
        className="w-full md:h-[20rem] sm:h-[17.5rem] h-[15rem] relative flex justify-center items-center "
      >
        <div
          className="relative cursor-pointer rounded-xl overflow-hidden w-full h-full "
          onClick={() => imageClick(project)}
        >
          <motion.img
            key={index}
            whileHover={{ scale: [1, 1] }}
            transition={{ duration: 1 }}
            src={project.image}
            alt="image6"
            className="bg-gray w-full h-full "
          />
        </div>
      </motion.div>
    );
  };

  return (
    <section
      ref={sectionRef}
      name="work"
      className="bg-black flex flex-col justify-between gap-[0rem] z-10 w-full items-center px-[14px] py-[7rem] sticky top-0 sm:px-[3rem] sm:py-[7rem] md:px-14 md:py-[10rem] lg:px-16 "
    >
      {/* Bubbles */}
      <div
        ref={circleRefs[0]}
        style={{ clipPath: `circle(50% at 100% 0%)` }}
        className="absolute top-0 left-0 bg-green h-full sm:w-screen w-full overflow-hidden shadow-2xl transition-all duration-100"
      />
      <div
        ref={circleRefs[1]}
        style={{ clipPath: `circle(8% at 10% 15%)` }}
        className="absolute top-0 left-0 bg-green h-full sm:w-screen w-full overflow-hidden shadow-2xl transition-all duration-100"
      />
      <div
        ref={circleRefs[2]}
        style={{ clipPath: `circle(20% at 10% 50%)` }}
        className="absolute top-0 left-0 bg-white h-full sm:w-screen w-full overflow-hidden shadow-2xl transition-all duration-100"
      />
      <div
        ref={circleRefs[3]}
        style={{ clipPath: `circle(2% at 5% 85%)` }}
        className="absolute top-0 left-0 bg-green h-full sm:w-screen w-full overflow-hidden shadow-2xl transition-all duration-100"
      />
      <div
        ref={circleRefs[4]}
        style={{ clipPath: `circle(5% at 90% 60%)` }}
        className="absolute top-0 left-0 bg-white h-full sm:w-screen w-full overflow-hidden shadow-2xl transition-all duration-100"
      />

      <Heading
        subHeading="recent work"
        heading="Take a look at some of my latest projects!"
        subHeadingColor="black"
        headingColor="white"
      />

      <div className="flex flex-col items-center pt-[6rem] ">
        <div className="space-y-2">
          <div className="flex flex-wrap justify-center gap-2">
            {techs.map((tech, index) => (
              <button
                onClick={() => handleFilter("tech", tech.value)}
                key={index}
                className={`${techFilters.includes(tech.value)
                    ? "bg-white text-black"
                    : "bg-black text-white hover:bg-white hover:text-black"
                  } border border-white rounded-full px-4 py-1 z-50 transition-colors `}
              >
                {tech.label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {sizes.map((size, index) => (
              <button
                onClick={() => handleFilter("size", size.value)}
                key={index}
                className={`${sizeFilters.includes(size.value)
                    ? "bg-white text-black"
                    : "bg-black text-white hover:bg-white hover:text-black transition-all"
                  } border border-white rounded-full px-4 py-1 z-50 transition-colors `}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>
        <motion.div
          whileInView={{ translateY: [200, 0], opacity: [0.9, 1] }}
          transition={{ duration: 0.3, type: "just" }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 lg:w-[80%] md:w-[88%] sm:w-[95%] w-full relative z-10 sm:pt-8 pt-4 lg:px-0 md:px-0 "
        >
          {projects.length == 0 && (
            <div className="py-10 flex flex-col items-center justify-center w-full col-span-2 ">
              <div className="relative h-[24rem] w-[24rem]">
                <img
                  src={empty}
                  alt="Empty"
                  className="grayscale w-full h-full "
                />
              </div>
              <p className="text-xl text-textGray">No projects found.</p>
              <button
                onClick={() => {
                  setTechFilters(["all"]);
                  setSizeFilters(["all"]);
                }}
                className="font-bold text-white mt-4 underline"
              >
                Reset Filters
              </button>
            </div>
          )}
          {projects.map((project, index) => (
            <Project
              key={index}
              project={project}
              tiltRef={tiltRefs[index]}
              index={index}
            />
          ))}
        </motion.div>
      </div>

      {/* image showing modal */}
      <Modal
        open={showImageModal}
        onClose={() => setShowImageModal(false)}
        className=" flex justify-center items-center "
      >
        <div
          className={`relative flex flex-col justify-between md:gap-0 md:pb-0 sm:gap-[1rem] gap-[3rem] p-[1rem] bg-lightGray ${fullScreen ? "w-[100%] h-[100%]" : "w-[80%] h-[80%]"
            } `}
        >
          {/* top bar - icons */}
          <div className="flex justify-between px-[1rem] pb-[8px]  ">
            <p className="text-textGray text-[20px] ">
              {currentImage.index + 1}/{initialProjects.length}
            </p>
            <div className="flex justify-between items-center gap-[1rem] ">
              {fullScreen ? (
                <FullscreenExit
                  onClick={() => setFullScreen(false)}
                  className="cursor-pointer text-textGray text-[24px] "
                />
              ) : (
                <Fullscreen
                  onClick={() => setFullScreen(true)}
                  className="cursor-pointer text-textGray text-[24px] "
                />
              )}
              <Close
                onClick={() => setShowImageModal(false)}
                className="cursor-pointer text-textGray text-[24px] "
              />
            </div>
          </div>

          <Swiper
            ref={imageContainerRef}
            slidesPerView={1}
            spaceBetween={10}
            initialSlide={currentImage.index}
            pagination={{ clickable: true }}
            // modules={[Pagination]}
            className=" text-center h-fit w-full text-lightGray pb-[3rem] md:py-0 sm:py-[4rem] py-[6rem] "
            onSlideChange={(swiper) => {
              setCurrentSlideIndex(swiper.activeIndex);
              setCurrentImage(initialProjects[swiper.activeIndex]);
            }}
          >
            {initialProjects.map((project, index) => (
              <SwiperSlide key={index} className=" ">
                <div className="md:h-full md:gap-0 sm:h-full sm:gap-0 h-full gap-[10px] w-full flex justify-between items-center ">
                  <button onClick={() => moveBack(currentSlideIndex - 1)}>
                    {" "}
                    <West className="text-white  md:text-[32px] sm:text-[24px] text-[20px] " />
                  </button>
                  <div className=" flex justify-center items-center md:h-fit sm:h-fit h-full ">
                    <img
                      src={project.image}
                      className={`${fullScreen
                          ? " md:h-[25rem] sm:h-[20rem] h-full "
                          : "md:h-[20rem] sm:h-[16rem] h-full "
                        } w-auto `}
                    />
                  </div>
                  <button onClick={() => moveForward(currentSlideIndex + 1)}>
                    {" "}
                    <East className="text-white  md:text-[32px] sm:text-[24px] text-[20px] " />
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* detail text */}
          <div className="flex flex-col items-center justify-center pb-4 py-2 ">
            <div className="flex justify-between items-center gap-2 w-full max-w-[600px] ">
              <h4 className="text-white capitalize sm:text-[20px] ">
                {currentImage.heading}
              </h4>
              <Tooltip title="Visit" placement="top">
                <a
                  href={currentImage.src}
                  target="_blank"
                  className="cursor-pointer w-[26px] h-[26px] flex justify-center items-center rounded-full transition-all text-white border-[1px] border-white font-light hover:bg-orange hover:text-white "
                >
                  <Visibility style={{ fontSize: "16px" }} />
                </a>
              </Tooltip>
            </div>
            <p className="text-textGray max-w-[600px] w-auto text-center sm:text-[18px] ">
              {currentImage.detail}
            </p>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default Work;


const initialProjects = [
  {
    index: 0,
    createdAt: "2024",
    image: p1,
    src: "https://apps.coinmath.org",
    heading: "Coin Math",
    subHeading: "Mining App",
    detail:
      " I developed CoinMath, a mining app using React, Tailwind, and Firebase. It offers a simple way for users to grow digital assets with a user-friendly interface and secure OTP email verification. Users can create profiles, generate referral codes, and boost mining rates with more referrals. The app runs on a 24-hour mining cycle, rewarding users daily, and includes a blog for community engagement. An admin panel ensures easy content and user management. With over 30,000 active users, CoinMath highlights my ability to build scalable digital solutions.",
    size: "large",
    technologies: [
      "mern",
      "react.js",
      "tailwindcss",
      "express.js",
      "node.js",
      "mongodb",
    ],
  },
  {
    index: 1,
    createdAt: "2024",
    image: p2,
    src: "https://swiftcart-store.vercel.app/",
    heading: "SwiftCart Store",
    subHeading: "An ecommerce site",
    detail:
      "An ecommerce website built to provide a seamless shopping experience. It is designed with simplicity and functionality in mind, ensuring a smooth and enjoyable shopping journey for users. The key features includes cart funtionality, displaying multiple billboards and respective categories, related products, featured products, authentication, filters, payment method integration",
    size: "large",
    technologies: ["next.js", "shadcnui", "tailwindcss", ],
  },
  {
    index: 2,
    createdAt: "2024",
    image: p3,
    src: "https://9tailstechnologies.com",
    heading: "9TailsTech",
    subHeading: "Company Portfolio",
    detail:
      "Welcome to my Company Portfolio, a frontend showcase built with React and Tailwind CSS. Explore our services, projects, team, and contact information in a visually appealing and intuitive format. Reach out to us for collaboration opportunities.",
    size: "large",
    technologies: ["next.js", "shadcnui", "tailwindcss",],
  },
  {
    index: 3,
    createdAt: "2024",
    image: p4,
    src: "https://enfotrix.com",
    heading: "Enfotrix",
    subHeading: "Tech Company",
    detail:
      "Enfotrix is a technology company dedicated to helping businesses thrive through innovative digital solutions. I designed and developed the Enfotrix website, focusing on creating a clean and user-friendly experience that aligns with the company’s modern approach. This project allowed me to showcase my skills in web design and development, emphasizing simplicity and functionality to best represent Enfotrix's mission and services.",
    size: "large",
    technologies: ["next.js"],
  },
  {
    index: 4,
    createdAt: "2024",
    image: p5,
    src: "https://essenctia.com",
    heading: "Essenctia",
    subHeading: "Essence of innovation",
    detail:
      "Essenctia is committed to creating outstanding flavor solutions that elevate our customers' products and brands. With a blend of expertise, creativity, and passion, we develop unique and memorable flavor experiences that captivate consumers and build brand loyalty. I designed and developed the Essenctia website, ensuring it reflects the brand’s dedication to quality and innovation. This project highlights my ability to create a visually appealing, intuitive site that effectively communicates Essenctia’s mission to deliver flavor solutions that stand out in the market.",
    size: "medium",
    technologies: ["react.js"],
  },
  {
    index: 5,
    createdAt: "2023",
    image: p6,
    src: "https://sms-v2.vercel.app/",
    heading: "Soriic(Email: soriic@gmail.com, Password: 123)",
    subHeading: "An Employee and expense management system.",
    detail:
      "The Office Management System integrates robust attendance and financial management features with user authentication via JWT tokens. Built using the MERN stack (MongoDB, Express.js, React, Node.js), this system allows administrators to efficiently manage employee records, mark attendance, and access detailed reports upon verification. With secure access to revenue and expense data, it empowers informed decision-making. The JWT-based authentication fosters accountability and operational efficiency, ensuring only authorized users access sensitive information, thereby driving organizational success. This project demonstrates my expertise in full-stack development, emphasizing security, usability, and data-driven management.",
    size: "medium",
    technologies: ["react.js","node.js", "express.js", "mongodb"],
  },
  {
    index: 6,
    createdAt: "2023",
    image: p7,
    src: "https://naumanch.netlify.app/",
    heading: "Portfolio Website",
    subHeading: "Portfolio Website",
    detail:
      "The Portfolio Website of a Full Stack Developer, built in React and Framer Motion, showcases the skills, testimonials and projects. With an intuitive interface and smooth animations, the website demonstrates the expertise in front-end and back-end technologies. Visitors can explore detailed project descriptions and examples of the work, making it an impressive representation of affective abilities to potential employers and clients",
    size: "medium",
    technologies: ["mern", "react.js", "express.js", "node.js", "mongodb"],
  },
  {
    index: 7,
    createdAt: "2023",
    image: p8,
    src: "https://book-store-app-six-mocha.vercel.app/",
    heading: "Book Store",
    subHeading: "Book Store App",
    detail:
      "This is a full-stack Book Store application built using the MERN stack (MongoDB, Express.js, React, Node.js). It allows users to browse, add, and manage their book collections with real-time data synchronization. I developed this app from scratch, implementing features such as book management, and a responsive front-end, demonstrating my skills in both front-end and back-end development.",
    size: "small",
    technologies: ["mern", "react.js", "express.js", "node.js", "mongodb"],
  }
];
