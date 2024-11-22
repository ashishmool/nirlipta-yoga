import { databases } from "@/backend/configs/config";

type CreateProductDataTypes = {
    userId: string;
    title: string;
    description: string;
    price: string;
    size: string[];
    fragranceFamily: string;
    ingredients: string[];
    fragranceNotes: string[];
    usage: string;
    longevity: string;
    sillage: string;
    occasion: string;
    photos: string[];
    collection: string;
    store: string;
}

export async function updateProduct(productId: string, payload: CreateProductDataTypes) {

    let documentData = {
        userId: payload.userId,
        title: payload.title,
        description: payload.description,
        price: payload.price,
        size: payload.size,
        fragranceFamily: payload.fragranceFamily,
        ingredients: payload.ingredients,
        fragranceNotes: payload.fragranceNotes,
        usage: payload.usage,
        longevity: payload.longevity,
        sillage: payload.sillage,
        occasion: payload.occasion,
        photos: payload.photos,
        collection: payload.collection,
        store: payload.userId

    };

    const res = await databases.updateDocument(
        `${import.meta.env.VITE_DATABASES_MAIN}`,
        `${import.meta.env.VITE_COL_PRODUCTS}`,
        `${productId}`,
        documentData
    ).then((response) => {
        return response
    }).catch((err) => {

        return err
    })

    return res
}
