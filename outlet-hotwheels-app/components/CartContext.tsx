import React, { createContext, useContext, useState } from "react";

// Interface para representar um item no carrinho
interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

// Interface para o tipo de contexto do carrinho
interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
}

// Criação do contexto do carrinho
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provedor do contexto do carrinho
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    // Função para adicionar um item ao carrinho
    const addToCart = (item: CartItem) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
            if (existingItem) {
                // Se o item já existe, aumenta a quantidade
                return prevCart.map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                // Se o item não existe, adiciona ao carrinho com quantidade 1
                return [...prevCart, { ...item, quantity: 1 }];
            }
        });
    };

    // Função para remover um item do carrinho
    const removeFromCart = (id: number) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    // Função para limpar o carrinho
    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
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
