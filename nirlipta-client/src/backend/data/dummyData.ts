// src/constants/dummyData.ts

export const dummyCategories = [
    {
        $id: '1',
        name: 'Chains',
    },
    {
        $id: '2',
        name: 'Earrings',
    },
    {
        $id: '3',
        name: 'Bracelets',
    },
    {
        $id: '4',
        name: 'Bangles',
    },
    {
        $id: '5',
        name: 'Necklace Sets',
    },
    {
        $id: '6',
        name: 'Pendant Sets',
    },
    {
        $id: '7',
        name: 'Mangalsutras',
    },
    {
        $id: '8',
        name: 'Rings',
    },

];

export const dummyProducts = [
    {
        $id: '1',
        categoryId: 5,
        title: 'Gold Necklace',
        price: 199.99,
        // discountPrice: 129.99,
        size: ['Small', 'Medium', 'Large'],
        description: 'This elegant Gold Necklace features a sleek, timeless design, perfect for any occasion. Crafted with high-quality gold, it adds a touch of luxury and sophistication to your style. Versatile and chic, it’s a must-have accessory for any jewelry collection.\n' +
            '\n',
        photos: [
            "https://jewelemarket.com/cdn/shop/files/12031656PK_ad780c54-d854-4d47-b2b7-1f77c7bef4cd.jpg",
            "https://d25g9z9s77rn4i.cloudfront.net/uploads/product/1319/1707458088_cc796b60a4380f62df7c.png",
            "https://rupashreejewellers.com/wp-content/uploads/2020/10/nt12c.jpg"
        ],
        store: {
            name: 'Zainab Zalal',
        },
    },
    {
        $id: '2',
        categoryId: 8,
        title: 'Silver Ring',
        price: 89.99,
        discountPrice: 59.99,
        size: ['Small', 'Medium', 'Large'],
        photos: [
            "https://www.truesilver.co.in/cdn/shop/files/01_34475c02-ae7f-47d6-aa33-9304a425d497.jpg",
            "https://d25g9z9s77rn4i.cloudfront.net/uploads/product/1319/1707458088_cc796b60a4380f62df7c.png",
            "https://rupashreejewellers.com/wp-content/uploads/2020/10/nt12c.jpg"
        ],
        store: {
            name: 'Bulgari',
        },
    },
    {
        $id: '3',
        categoryId: 3,
        title: 'Platinum Bracelet',
        price: 299.99,
        discountPrice: 199.99,
        size: ['Medium', 'Large'],
        photos: [
            "https://menofplatinum.com/wp-content/uploads/2024/09/platinum-intersecting-bracelet-1.png",
            "https://d25g9z9s77rn4i.cloudfront.net/uploads/product/1319/1707458088_cc796b60a4380f62df7c.png",
            "https://rupashreejewellers.com/wp-content/uploads/2020/10/nt12c.jpg"
        ],
        store: {
            name: 'Cartier',
        },
    },
    {
        $id: '4',
        categoryId: 2,
        title: 'Diamond Earrings',
        price: 499.99,
        discountPrice: 349.99,
        size: ['Small', 'Medium'],
        photos: [
            "https://www.fionadiamonds.com/cdn/shop/files/babapiyush_2_carat_white_heart_diamond_solitaire_earring_plac_1_1_bac7827d-8267-4033-9e88-76c06c9ea337_550x.png",
            "https://d25g9z9s77rn4i.cloudfront.net/uploads/product/1319/1707458088_cc796b60a4380f62df7c.png",
            "https://rupashreejewellers.com/wp-content/uploads/2020/10/nt12c.jpg"
        ],
        store: {
            name: 'Tiffany & Co.',
        },
    },
    {
        $id: '5',
        categoryId: 6,
        title: 'Emerald Pendant',
        price: 399.99,
        discountPrice: 299.99,
        size: ['Medium', 'Large'],
        photos: [
            "https://jbrjeweler.com/cdn/shop/files/14k-gold-oval-cut-gemstone-emerald-pendant-chain-dainty-anniversary-necklace-jbr-jeweler-2.jpg",
            "https://d25g9z9s77rn4i.cloudfront.net/uploads/product/1319/1707458088_cc796b60a4380f62df7c.png",
            "https://rupashreejewellers.com/wp-content/uploads/2020/10/nt12c.jpg"
        ],
        store: {
            name: 'Van Cleef & Arpels',
        },
    },
    {
        $id: '6',
        categoryId: 8,
        title: 'Ruby Ring',
        price: 249.99,
        discountPrice: 219.99,
        size: ['Small', 'Medium'],
        photos: [
            "https://penfine.com/cdn/shop/products/il_fullxfull.5525943142_oqwk.jpg",
            "https://d25g9z9s77rn4i.cloudfront.net/uploads/product/1319/1707458088_cc796b60a4380f62df7c.png",
            "https://rupashreejewellers.com/wp-content/uploads/2020/10/nt12c.jpg"
        ],
        store: {
            name: 'Harry Winston',
        },
    },
    {
        $id: '7',
        categoryId: 5,
        title: 'Sapphire Necklace',
        price: 599.99,
        discountPrice: 429.99,
        size: ['Large'],
        photos: [
            "https://annazuckerman.com/cdn/shop/products/Arabella23necklacesb_eedc3ea4-bc91-45df-9b78-15605f3f7d01.jpg",
            "https://d25g9z9s77rn4i.cloudfront.net/uploads/product/1319/1707458088_cc796b60a4380f62df7c.png",
            "https://rupashreejewellers.com/wp-content/uploads/2020/10/nt12c.jpg"
        ],
        store: {
            name: 'Chopard',
        },
    },
    {
        $id: '8',
        categoryId: 2,
        title: 'Pearl Earrings',
        price: 149.99,
        discountPrice: 129.99,
        size: ['Small', 'Medium'],
        photos: [
            "https://d25g9z9s77rn4i.cloudfront.net/uploads/product/60/1680017075_a5d4ca8feba0d3f130e6.jpg",
            "https://d25g9z9s77rn4i.cloudfront.net/uploads/product/1319/1707458088_cc796b60a4380f62df7c.png",
            "https://rupashreejewellers.com/wp-content/uploads/2020/10/nt12c.jpg"
        ],
        store: {
            name: 'Chanel',
        },
    },

];


// src/data/dummyData.js



export const dummyStore = {
    id: 1,
    name: "Luxury Jewelry Store",
    location: "123 Jewel St, New York, NY",
};

export const dummyLikes = {
    productId: 1,
    isLiked: false,
};

export const dummyCart = {
    items: [],
};

export const mockAddToCart = (productId) => {
    // Mock adding to cart
    console.log(`Added product ${productId} to cart`);
    dummyCart.items.push(productId);
};

export const mockUpdateIsLiked = (productId, isLiked) => {
    // Mock updating like status
    console.log(`Product ${productId} liked status is now ${isLiked}`);
    dummyLikes.isLiked = isLiked;
};

export const mockGetProduct = (id: string) => {
    console.log(dummyProducts); // Debug
    return dummyProducts.find(product => product.$id === id) || null;
};


export const mockGetStore = (storeId) => {
    return dummyStore;
};

export const mockGetLikes = (productId) => {
    return dummyLikes;
};

