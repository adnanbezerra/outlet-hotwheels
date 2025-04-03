import { API_URL } from "@/constants/api";
import { IProductCard } from "@/interfaces/product-card";
import { useState, useEffect } from "react";

const useProducts = () => {
    const [products, setProducts] = useState<IProductCard[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        fetch(`${API_URL}/product`)
            .then((response) => {
                console.log({ response });

                return response.json();
            })
            .then((data: IProductCard[]) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((err) => {
                setError("Failed to fetch products");
                setLoading(false);
            });
    }, []);

    return { products, loading, error };
};

export default useProducts;
