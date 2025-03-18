import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

const login = () => {
    const router = useRouter();
    
    // Estados para os campos e mensagens de erro
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [cpf, setCpf] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    // Função para validar CPF (simples, pode ser melhorada para validação completa)
    const validateCPF = (cpf) => {
        const cpfRegex = /^[0-9]{11}$/;
        return cpfRegex.test(cpf);
    };

    // Função para validar o email
    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailRegex.test(email);
    };

    // Função para verificar se o formulário pode ser enviado
    const isFormValid = () => {
        if (!fullName || fullName.length < 2) return false;
        if (!email || !validateEmail(email)) return false;
        if (!cpf || !validateCPF(cpf)) return false;
        if (!password || !confirmPassword || password !== confirmPassword) return false;
        return true;
    };

    const handleSubmit = () => {
        if (isFormValid()) {
            router.replace("/(tabs)/home");
        } else {
            setErrorMessage("Preencha todos os campos corretamente.");
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
                    ></Image>
                    <Text style={styles.title}>Outlet Hotwheels</Text>
                </View>
                
                <TextInput
                    style={styles.input}
                    placeholder="Nome completo*"
                    value={fullName}
                    onChangeText={setFullName}
                />
                {fullName && fullName.length < 2 && <Text style={styles.errorText}>Nome completo deve ter pelo menos 2 caracteres</Text>}
                
                <TextInput
                    style={styles.input}
                    placeholder="E-mail"
                    value={email}
                    onChangeText={setEmail}
                />
                {email && !validateEmail(email) && <Text style={styles.errorText}>E-mail inválido</Text>}

                <TextInput
                    style={styles.input}
                    placeholder="CPF"
                    value={cpf}
                    onChangeText={setCpf}
                    keyboardType="numeric"
                />
                {cpf && !validateCPF(cpf) && <Text style={styles.errorText}>CPF inválido</Text>}

                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirme a senha"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                />
                
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={handleSubmit}
                    disabled={!isFormValid()}
                >
                    <Text>Cadastro</Text>
                </TouchableOpacity>

                {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

                <TouchableOpacity
                    style={styles.registerButton}
                    onPress={() => router.replace("/login")} // Redireciona para a tela de login
                >
                    <Text>Voltar para o login</Text>
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
        paddingLeft: 10,
    },
    errorText: {
        color: "red",
        fontSize: 12,
        marginBottom: 5,
    },
});

export default login;
