import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const Footer = () => {
    const router = useRouter();

    return (
        <View style={styles.footer}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => router.replace("/welcome")}
            >
                <Ionicons name="home-outline" size={24} color="#fff" />
                <Text style={styles.buttonText}>Welcome</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => router.replace("/shoppingCart")}
            >
                <Ionicons name="cart-outline" size={24} color="#fff" />
                <Text style={styles.buttonText}>Carrinho</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#CE3E2F",
        paddingVertical: 10,
        position: "absolute",
        bottom: 0,
        width: "100%",
    },
    button: {
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 12,
        marginTop: 5,
    },
});

export default Footer;