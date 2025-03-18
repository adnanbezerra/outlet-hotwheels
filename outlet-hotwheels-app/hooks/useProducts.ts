import { IProductCard } from '@/interfaces/product-card';
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
        {
            id: 2,
            title: "Prodvcto 02",
            price: 2000,
            stars: 3.8,
            description:
                "Um carrinho Hot Wheels verde do balacobaco, com design aerodinâmico e detalhes alienígenas.",
            image: "https://static3.tcdn.com.br/img/img_prod/460977/carrinho_hot_wheels_set_com_5_carros_track_builder_system_b_24497_5_20171006111843.jpg",
        },
        {
            id: 3,
            title: "Prodvcto 03",
            price: 3000,
            stars: 4.0,
            description:
                "Um carrinho Hot Wheels roxo esportivo, com design de tradicional muscle car americano e detalhes radicais.",
            image: "https://a-static.mlcdn.com.br/1500x1500/kit-10-carrinhos-hot-wheels-mattel-54886/magazineluiza/181071100/5877e4200ec7e8de4d72b9dda4fc19dc.jpg",
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
