import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

// UI
import { Newsletter, Reviews } from "@/components";

// // SERVICES
// import { getLikes } from '@/backend/services/products/getLikes';
//
// // STATES
// import useUserId from '@/lib/states/userId';
// import useIsLiked from '@/lib/states/useIsLiked';
import Jewellery from "@/components/jewellery/Jewellery.tsx";


export default function JewelleryDetails() {
    const { id: productId } = useParams(); // Ensure this matches the route definition

    if (!productId) {
        return <div>Error: No product ID provided</div>; // Handle cases where productId is undefined
    }

    return (
        <div className="md:container container-fluid">
            <Jewellery productId={productId} /> {/* Pass the productId */}
            <Reviews />
            {/*<MorePerfumes />*/}
            {/*<Partners />*/}
            <Newsletter />
        </div>
    );
}
