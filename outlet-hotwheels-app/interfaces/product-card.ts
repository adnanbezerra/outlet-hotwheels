export interface IProductCard {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
    stars: number;
    onAddToCart: () => void;
}