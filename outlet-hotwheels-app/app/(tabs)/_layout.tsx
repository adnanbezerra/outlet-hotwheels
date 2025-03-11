import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
    const colorScheme = useColorScheme();

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
                name="explore"
                options={{
                    title: "Explore",
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
