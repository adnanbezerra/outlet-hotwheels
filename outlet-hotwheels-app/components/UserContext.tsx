import React, { createContext, useEffect, useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { API_URL } from "@/constants/api";

type User = {
    _id: string;
    name: string;
    email: string;
};

type UserContextType = {
    user: User | null;
    loading: boolean;
    setUser: (user: User | null) => void;
    logout: () => void;
};

const UserContext = createContext<UserContextType>({
    user: null,
    loading: true,
    setUser: () => {},
    logout: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const loadUserData = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            if (token && !user) {
                const response = await fetch(`${API_URL}/user/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Erro ao buscar usuário");
                }

                const data: User = await response.json();
                setUser(data);
            }
        } catch (error) {
            console.error("Erro ao carregar dados do usuário:", error);
            Alert.alert(
                "Erro",
                "Não foi possível carregar as informações do usuário."
            );
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUserData();
    }, []);

    const logout = async () => {
        await AsyncStorage.removeItem("token");
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, loading, setUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
