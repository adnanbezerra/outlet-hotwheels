import { IProductCard } from "@/components/ProductCard";
import { useState, useEffect } from "react";

const useProducts = () => {
    const [products, setProducts] = useState<IProductCard[]>([
        {
            id: 1,
            title: "Prodvcto 01",
            price: 1000,
            stars: 4.7,
            description:
                "Um carrinho Hot Wheels preto esportivo, com design aerodinâmico e detalhes agressivos.",
            image: "https://images.tcdn.com.br/img/img_prod/639703/carrinhos_basicos_hot_wheels_mattel_ref_c4982_4897_2_20200331171200.jpg",
        },
    ]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // setLoading(true);
        // fetch("https://api.example.com/products")
        //     .then((response) => response.json())
        //     .then((data: IProductCard[]) => {
        //         setProducts(data);
        //         setLoading(false);
        //     })
        //     .catch((err) => {
        //         setError("Failed to fetch products");
        //         setLoading(false);
        //     });
    }, []);

    return { products, loading, error };
};

export default useProducts;
