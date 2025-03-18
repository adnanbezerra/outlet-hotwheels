import { Ionicons } from "@expo/vector-icons";
import { router, Tabs } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

export default function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="home"
                options={{
                    title: "Outlet Hotwheels",
                    headerStyle: {
                        backgroundColor: "#CE3E2F",
                    },
                    headerTintColor: "#fff",
                    tabBarStyle: {
                        display: "none",
                    },
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => router.push("/shopping-cart")}
                        >
                            <Ionicons
                                name="cart"
                                size={24}
                                color="#fff"
                                style={{ paddingRight: 15 }}
                            />
                        </TouchableOpacity>
                    ),
                }}
            />
            <Tabs.Screen
                name="product/[id]"
                options={{
                    title: "Ver Produto",
                    headerStyle: {
                        backgroundColor: "#CE3E2F",
                    },
                    headerTintColor: "#fff",
                    tabBarStyle: {
                        display: "none",
                    },
                }}
            />
            <Tabs.Screen
                name="shopping-cart"
                options={{
                    title: "Carrinho de compras",
                    headerStyle: {
                        backgroundColor: "#CE3E2F",
                    },
                    headerTintColor: "#fff",
                    tabBarStyle: {
                        display: "none",
                    },
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => router.push("/home")}
                        >
                            <Ionicons
                                name="arrow-back"
                                size={24}
                                color="#fff"
                                style={{ paddingLeft: 15, paddingRight: 15 }}
                            />
                        </TouchableOpacity>
                    ),
                }}
            />
            <Tabs.Screen
                name="checkout"
                options={{
                    title: "Fazer pagamento",
                    headerStyle: {
                        backgroundColor: "#CE3E2F",
                    },
                    headerTintColor: "#fff",
                    tabBarStyle: {
                        display: "none",
                    },
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => router.push("/(tabs)/shopping-cart")}
                        >
                            <Ionicons
                                name="arrow-back"
                                size={24}
                                color="#fff"
                                style={{ marginRight: 15 }}
                            />
                        </TouchableOpacity>
                    ),
                }}
            />
        </Tabs>
    );
}
