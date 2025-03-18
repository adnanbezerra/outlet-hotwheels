import { Tabs } from "expo-router";
import React from "react";

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
        </Tabs>
    );
}
