import React, { useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image,
    Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = async () => {
        try {
            const response = await fetch("http://localhost:3000/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                Alert.alert("Sucesso", data.message);
                // Salve o token JWT (exemplo usando AsyncStorage)
                await AsyncStorage.setItem("token", data.token);
                router.replace("/(tabs)/home"); // Redireciona para a página inicial
            } else {
                setErrorMessage(data.error || "Erro ao fazer login");
            }
        } catch (error) {
            console.error("Erro:", error);
            setErrorMessage("Erro ao conectar ao servidor");
        }
    };

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
                    />
                    <Text style={styles.title}>Outlet Hotwheels</Text>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="E-mail"
                    textContentType="emailAddress"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    textContentType="password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                {errorMessage ? (
                    <Text style={styles.errorText}>{errorMessage}</Text>
                ) : null}
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={handleLogin}
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
    logo: {
        width: 200,
        height: 100,
    },
    textContainer: {
        alignItems: "center",
    },
    logoContainer: {
        marginBottom: 24,
        alignItems: "center",
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
        marginBottom: 10,
        borderColor: "#fff",
        backgroundColor: "#fff",
        borderRadius: 5,
        width: 200,
        padding: 10,
    },
    errorText: {
        color: "red",
        marginBottom: 10,
    },
});

export default Login;