import {Brands, Explore, Features, Hero, MoreProducts, Newsletter} from "@/components";
import OnlineCourses from "@/components/common/OnlineCourses.tsx";
import Journey from "@/components/common/Journey.tsx";
import Retreats from "@/components/common/Retreats.tsx";
import Partners from "@/components/common/Partners.tsx";

export default function Home() {

    return (
        <div className="md:container container-fluid mt-4">
            <Journey/>
            <OnlineCourses/>
            <Explore/>
            <Retreats/>
            <Partners />
            {/*<Hero />*/}
            {/*<Features />*/}
            {/*<MoreProducts />*/}

            {/*<Newsletter />*/}
        </div>
    );

}
