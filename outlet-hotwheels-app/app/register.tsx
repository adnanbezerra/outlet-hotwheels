import React from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const login = () => {
    const router = useRouter();

    return (
        <LinearGradient
            colors={["#F8DA2F", "#CE3E2F"]}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
        >
            <View style={styles.textContainer}>
                <View style={styles.logoContainer}>
                    <Image
                        source={require("../assets/images/logo.png")}
                        style={styles.logo}
                    ></Image>
                    <Text style={styles.title}>Outlet Hotwheels</Text>
                </View>
                <TextInput style={styles.input} placeholder="Nome completo*" />
                <TextInput style={styles.input} placeholder="E-mail" />
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirme a senha"
                />
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={() => router.replace("/(tabs)/home")}
                >
                    <Text>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.registerButton}
                    onPress={() => router.replace("/register")}
                >
                    <Text>Cadastrar</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    textContainer: {
        alignItems: "center",
    },
    logoContainer: {
        marginBottom: 24,
        alignItems: "center",
    },
    logo: {
        width: 200,
        height: 100,
    },
    loginButton: {
        backgroundColor: "#fff",
        width: 200,
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    registerButton: {
        backgroundColor: "#fff",
        color: "#1D3D47",
        width: 200,
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    title: {
        color: "#fff",
        fontSize: 32,
    },
    subtitle: {
        color: "#fff",
        fontSize: 18,
        marginBottom: 24,
    },
    input: {
        width: 200,
        marginBottom: 10,
        borderColor: "#fff",
        backgroundColor: "#fff",
        borderRadius: 5,
    },
});

export default login;
