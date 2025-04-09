import { API_URL } from "@/constants/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useState } from "react";

// Interface para representar um item no carrinho
export interface CartItem {
    _id: number;
    name: string;
    price: number;
    quantity: number;
}

// Interface para o tipo de contexto do carrinho
interface CartContextType {
    cart: any;
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

// Criação do contexto do carrinho
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provedor do contexto do carrinho
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    // Função para adicionar um item ao carrinho
    const addToCart = async (item: CartItem) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((cartItem) => cartItem._id === item._id);
            if (existingItem) {
                // Atualiza a quantidade do item existente
                return prevCart.map((cartItem) =>
                    cartItem._id === item._id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                // Adiciona um novo item ao carrinho
                return [...prevCart, { ...item, quantity: 1 }];
            }
        });

        // Envia os dados para o back-end      
        const token = await AsyncStorage.getItem("token");
        fetch(`${API_URL}/cart/${item._id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ quantity: item.quantity || 1 }), // Certifique-se de enviar o userId
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

    // Função para remover um item do carrinho
    const removeFromCart = (id: number) => {
        setCart((prevCart) => prevCart.filter((item) => item._id !== id));
    };

    // Função para limpar o carrinho
    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, setCart }}>
            {children}
        </CartContext.Provider>
    );
};

// Hook personalizado para usar o contexto do carrinho
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart deve ser usado dentro de um CartProvider");
    }
    return context;
};
