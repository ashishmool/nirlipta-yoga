import React from "react";
import fotoJourney from "../../assets/journey.jpg";
// import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog.tsx";
// import {Button} from "@/components/ui/button.tsx";
// import Auth from "../auth/Auth.tsx";
// import { FaUserPlus } from 'react-icons/fa'; // Importing the Font Awesome icon
// import Signup from "../auth/Signup";
import DirectSignup from "@/components/auth/DirectSignup.tsx";


const cards = [
    {
        title: "Specialized Instructors",
        quantity: 3,
        bgColor: "bg-[#B8978C]",
        textColor: "text-white",
    },
    {
        title: "Courses",
        quantity: 12,
        bgColor: "bg-[#9B6763]",
        textColor: "text-white",
    },
    {
        title: "Enrolled Students",
        quantity: 32,
        bgColor: "bg-[#A38F85]",
        textColor: "text-white",
    },
];

const Journey: React.FC = () => {
    return (

        <section className="flex flex-col md:flex-row items-center justify-between mx-auto max-w-5xl px-4 py-20">
            {/* Text Section */}
            <div className="max-w-lg text-center md:text-left">
                <h1 className="text-4xl font-light mb-4 relative">
                    Start Your Yoga Journey
                    {/*<span className="absolute -bottom-6 -left-6 w-20 h-20 bg-[#B8978C] blur-xl rounded-full -z-10"></span>*/}
                </h1>
                <p className="mb-6 text-gray-700">
                    Whether you're a beginner or experienced, we offer personalized
                    classes, expert guidance, and a supportive community. ✨🧘‍♀️️
                </p>

                {/* Statistics */}
                <ul className="flex flex-wrap justify-center md:justify-start gap-4 mt-8 mb-4">
                    {cards.map((card) => (
                        <li
                            key={card.title}
                            className={`flex flex-col items-center justify-center w-32 h-32 rounded-md text-center ${card.bgColor} ${card.textColor}`}
                        >
                            <p className="text-2xl font-bold">{card.quantity}</p>
                            <p>{card.title}</p>
                        </li>
                    ))}
                </ul>
                <ul className="flex flex-wrap justify-center md:justify-start mb-8">
                    <DirectSignup/>
                </ul>




            </div>

            {/* Image Section */}
            <div className="relative w-full max-w-md mt-10 md:mt-0">
                <div className="absolute -top-6 left-0 text-xs opacity-70">
                    <span className="block"><strong>Photo: Nivedita Pradhan | </strong>20.10.2024</span>

                </div>
                <div className="relative">
                    <div className="absolute top-16 -left-2 w-12 h-40 bg-gray-300 rounded-tr-[4rem]"></div>
                    <div className="absolute bottom-0 -right-2 w-12 h-40 bg-gray-300 rounded-bl-[4rem]"></div>
                    <img
                        src={fotoJourney}
                        alt="Nirlipta"
                        className="relative z-10 w-full h-auto rounded-tr-[4rem] object-cover"
                    />
                </div>

            </div>





        </section>
    );
};

export default Journey;
