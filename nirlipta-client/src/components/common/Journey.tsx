import React, { useState } from "react";
import fotoJourney from "../../assets/journey.jpg";
import Signup from "@/components/auth/Signup.tsx";
import Login from "@/components/auth/Login.tsx"; // Assuming you have a Login component

const cards = [
    {
        title: "Community Members",
        quantity: 100,
        bgColor: "bg-[#B8978C]",
        textColor: "text-white",
    },
    {
        title: "Workshops",
        quantity: 12,
        bgColor: "bg-[#9B6763]",
        textColor: "text-white",
    },
    {
        title: "Retreats",
        quantity: 7,
        bgColor: "bg-[#A38F85]",
        textColor: "text-white",
    },
];

const Journey: React.FC = () => {
    const [isLogin, setIsLogin] = useState(false); // State to toggle between Login and Signup

    const handleSwitchToLogin = () => {
        setIsLogin(true); // Switch to login
    };

    const handleSwitchToSignup = () => {
        setIsLogin(false); // Switch to signup
    };

    return (
        <section className="flex flex-col md:flex-row items-center justify-between mx-auto max-w-5xl px-4 py-20">
            {/* Text Section */}
            <div className="max-w-lg text-center md:text-left">
                <h1 className="text-4xl font-light mb-4 relative">
                    Start Your Yoga Journey
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

                {/* Adjusted Signup Form Container */}
                <div className="flex justify-center md:justify-start mb-8 w-full">
                    <div className="w-full max-w-md"> {/* Ensure it takes full width on smaller screens */}
                        {/* Conditionally render Login or Signup */}
                        {isLogin ? (
                            <Login onClose={() => setIsLogin(false)} /> // Assuming you have an onClose prop in Login
                        ) : (
                            <Signup onSwitchToLogin={handleSwitchToLogin} />
                        )}
                    </div>
                </div>
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
