import { API_URL } from "@/constants/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useState } from "react";

export interface CartItem {
    _id: number;
    name: string;
    price: number;
    quantity: number;
}

interface CartContextType {
    cart: any;
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    setCart: React.Dispatch<React.SetStateAction<any>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<any>({items: []});
    
    const addToCart = async (item: CartItem) => {        
        setCart({...cart, items: [...cart.items, item]});

        const token = await AsyncStorage.getItem("token");
        fetch(`${API_URL}/cart/${item._id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ quantity: item.quantity || 1 }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erro ao atualizar o carrinho");
                }
                return response.json();
            })
            .then((data) => console.log("Carrinho atualizado no back-end:", data))
            .catch((error) => console.error("Erro ao atualizar o carrinho:", error));
    };

    const removeFromCart = async (id: number) => {    
        setCart({
            ...cart,
            items: cart.items.filter((item: any) => item.productId._id !== id),
        });

        const token = await AsyncStorage.getItem("token");
        fetch(`${API_URL}/cart/orders/${cart._id}/items/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erro ao remover o item do carrinho");
                }
                return response.json();
            })
            .then((data) => console.log("Item removido do carrinho:", data))
            .catch((error) => console.error("Erro ao remover o item do carrinho:", error));
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, setCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart deve ser usado dentro de um CartProvider");
    }
    return context;
};
