import { FormatPaint, Campaign, Public, DeveloperBoard, ViewInAr, Inbox } from "@mui/icons-material"

import { Heading, ServiceCard } from "../components"
import { useEffect, useRef } from "react";



const Services = () => {

    //////////////////////////////////////// VARIABLES //////////////////////////////////////////////
    const sectionRef = useRef()

    //////////////////////////////////////// USE EFFECT //////////////////////////////////////////////
    useEffect(() => {
        const updateHeight = () => {
            const heightInVh = (sectionRef.current.offsetHeight / window.innerHeight) * 100;
            sectionRef.current.style.top = `-${heightInVh - 100}vh`;
        };
        updateHeight();
        window.addEventListener('scroll', updateHeight);

        return () => {
            window.removeEventListener('scroll', updateHeight);
        };
    }, []);

    return (
        <section ref={sectionRef} name="services" className="
            flex flex-col justify-between gap-[0rem] z-10 w-full
            bg-white sticky top-0
            px-[14px] py-[7rem]
            sm:px-[3rm] sm:py-[7rem]
            md:px-[64px] md:py-[10rem]
        "        >


            <Heading subHeading='What I Offer' heading='Everything You Need to Start and Grow Your Business is Here!' subHeadingColor='green' headingColor='black' />

            {/* all services cards */}
            <div className="w-full pt-[5rem] flex flex-wrap xl:px-[4rem] lg:px-0 md:px-0 sm:px-0  "            >
                {
                    servicesArr.map((service, index) => (
                        <ServiceCard key={index} service={service} />
                    ))
                }
            </div>


        </section>
    )
}


export default Services


const servicesArr = [
    {
        icon: FormatPaint,
        title: 'MERN Stack',
        text: 'Discover the power of MERN Stack Development through my expertise. With MongoDB\'s flexibility, Express.js\' efficient backend, React\'s engaging frontend, and Node.js\' scalable environment, I create a cohesive full-stack solution. Enhance your project with a technology stack that balances innovation and effectiveness.'
    },
    {
        icon: FormatPaint,
        title: 'Web Design',
        text: 'Explore the beauty of web design, where smooth user experiences blend with stunning visuals. My designs are more than just pixels; they are gateways to engagement and visual narratives. Enter a digital world where every click reveals a journey of creativity and innovation.'
    },
    {
        icon: Inbox,
        title: 'Frontend Development',
        text: 'Embark on a journey of Frontend Development excellence with me. I craft dynamic and responsive user interfaces that blend form with function. From pixel-perfect designs to seamless interactions, I create experiences that captivate and interfaces that resonate. Join me at the forefront of web innovation.'
    },
    {
        icon: Campaign,
        title: 'Backend Development',
        text: 'Explore the strong world of Backend Development with me. Every smooth user experience relies on a powerful and scalable backend. I create data-driven solutions to make sure your platform runs efficiently and securely. Let me help build the foundation of your digital goals, where innovation and reliability come together.'
    }, 
]