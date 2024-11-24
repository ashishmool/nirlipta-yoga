// import {Brands, Features, Hero, MoreProducts, Newsletter} from "@/components";
// import {Explore} from "@/components";
import Workshops from "@/components/common/Workshops.tsx";
import Journey from "@/components/common/Journey.tsx";
import Retreats from "@/components/common/Retreats.tsx";
import Partners from "@/components/common/Partners.tsx";

export default function Home() {

    return (
        <div className="md:container container-fluid mt-4">
            <Journey/>
            <Workshops/>
            <Retreats/>
            <Partners />


            {/*<Explore/>*/}
            {/*<Hero />*/}
            {/*<Features />*/}
            {/*<MoreProducts />*/}

            {/*<Newsletter />*/}
        </div>
    );

}
