import { Link } from "react-router-dom";


export default function Explore() {

    // Update the page title
    document.title = `Nirlipta Yoga | Explore Yoga Practices`;

    // Scroll top when click on Link
    function scrollTopFunc() {
        window.scrollTo({
            top: -10,
            behavior: 'instant'
        });
    }

    return (
        <div className="w-full">

            {/* Header */}
            <div className="relative sm:mx-auto mx-3 pt-[50px] pb-[100px] mt-10 rounded-xl  text-white bg-cover bg-center shadow-lg"
                 style={{
                     backgroundImage: `url(https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)` // Replace with an appropriate yoga header image
                 }}>
                <div className="absolute inset-0 bg-black bg-opacity-80 sm:bg-opacity-70 rounded-xl"></div> {/* Optional overlay for better text readability */}

                {/* Header section */}
                <div className="relative container text-center header py-5 mt-6 z-10">
                    <h1 className="sm:text-5xl text-5xl my-16 font-bold capitalize">Explore Yoga Practices</h1>
                    <p className="w-[60%] mx-auto">Dive into the transformative world of yoga with our curated practices, including poses, meditation, breathing exercises, and workshops.</p>
                </div>
            </div>

            <section className="container mx-auto px-4 md:px-6 py-12 md:py-20 lg:py-28 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Yoga Poses */}
                <Link to="yoga-poses" onClick={scrollTopFunc}>
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                        <img
                            src="src/assets/explore/yoga1.jpg"  // Replace with a yoga pose image
                            alt="Yoga Poses"
                            width={600}
                            height={400}
                            className="w-full h-64 object-cover"
                        />
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">Yoga Poses</h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-4">
                                Explore various poses for flexibility, strength, and balance.
                            </p>
                        </div>
                    </div>
                </Link>

                {/* Meditation Practices */}
                <Link to="meditation" onClick={scrollTopFunc}>
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                        <img
                            src="src/assets/explore/yoga-meditation.jpg"  // Replace with a meditation image
                            alt="Meditation Practices"
                            width={600}
                            height={400}
                            className="w-full h-64 object-cover"
                        />
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">Meditation Practices</h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-4">
                                Find guided meditation techniques for peace and mindfulness.
                            </p>
                        </div>
                    </div>
                </Link>

                {/* Breathing Exercises */}
                <Link to="breathing-exercises" onClick={scrollTopFunc}>
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                        <img
                            src="src/assets/explore/yoga-breathing.jpg"  // Replace with an image related to pranayama or breathing exercises
                            alt="Breathing Exercises"
                            width={600}
                            height={400}
                            className="w-full h-64 object-cover"
                        />
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">Breathing Exercises</h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-4">
                                Learn Pranayama techniques for better focus and energy.
                            </p>
                        </div>
                    </div>
                </Link>

                {/* Workshops & Retreats */}
                <Link to="workshops-retreats" onClick={scrollTopFunc}>
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                        <img
                            src="src/assets/explore/yoga-workshop.jpg"  // Replace with an image of yoga workshops or retreats
                            alt="Workshops & Retreats"
                            width={600}
                            height={400}
                            className="w-full h-64 object-cover"
                        />
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">Workshops & Retreats</h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-4">
                                Join yoga workshops and retreats for a holistic experience.
                            </p>
                        </div>
                    </div>
                </Link>

                {/* Yoga Accessories */}
                <Link to="yoga-accessories" onClick={scrollTopFunc}>
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                        <img
                            src="src/assets/explore/yoga-mat.jpg"  // Replace with an image of yoga mats, blocks, straps, etc.
                            alt="Yoga Accessories"
                            width={600}
                            height={400}
                            className="w-full h-64 object-cover"
                        />
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">Yoga Accessories</h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-4">
                                Explore mats, blocks, straps, and other essentials.
                            </p>
                        </div>
                    </div>
                </Link>

            </section>
        </div>
    )
}
