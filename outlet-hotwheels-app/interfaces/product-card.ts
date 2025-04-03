export interface IProductCard {
    _id: number;
    name: string;
    price: number;
    description: string;
    image: {
        contentType: string;
        base64Image: string;
    };
    stars: number;
    onAddToCart?: () => void;
}
