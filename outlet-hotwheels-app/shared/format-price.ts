export const formatPrice = (price: number): string => {
    return (price / 100).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
};
