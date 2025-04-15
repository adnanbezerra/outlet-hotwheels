import { useCart } from "@/components/CartContext";
import { API_URL } from "@/constants/api";
import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRouter } from "expo-router";

const CheckoutScreen = () => {
    const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
    const [paymentConfirmed, setPaymentConfirmed] = useState(false);
    const [orderId] = useState("");
    const { cart } = useCart();

    const handlePaymentSelection = (method: string) => {
        setSelectedPayment(method);
    };

    const router = useRouter();

    const handleConfirmPayment = async () => {
        if (!selectedPayment) {
            console.error("Nenhum método de pagamento foi selecionado.");
            return;
        }

        console.log("clicou no pitoco");

        try {
            const token = await AsyncStorage.getItem("token");

            console.log({ token });

            const response = await fetch(`${API_URL}/orders/confirm-payment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    paymentDetails: { method: selectedPayment },
                }),
            });

            console.log({ response });

            const data = await response.json();

            console.log(data);

            setPaymentConfirmed(true);

            Alert.alert("Pagamento confirmado");
            router.push("/(tabs)/home");
        } catch (error) {
            console.error("Erro:", error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Pagamento</Text>

            <View style={styles.paymentContainer}>
                <Text style={styles.paymentTitle}>
                    Escolha o método de pagamento:
                </Text>
                <TouchableOpacity
                    style={[
                        styles.paymentButton,
                        selectedPayment === "credit" && styles.selectedButton,
                    ]}
                    onPress={() => handlePaymentSelection("credit")}
                >
                    <Text style={styles.paymentButtonText}>
                        Cartão de Crédito
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.paymentButton,
                        selectedPayment === "boleto" && styles.selectedButton,
                    ]}
                    onPress={() => handlePaymentSelection("boleto")}
                >
                    <Text style={styles.paymentButtonText}>
                        Boleto Bancário
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.paymentButton,
                        selectedPayment === "pix" && styles.selectedButton,
                    ]}
                    onPress={() => handlePaymentSelection("pix")}
                >
                    <Text style={styles.paymentButtonText}>Pix</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => {
                    handleConfirmPayment();
                }}
                disabled={!selectedPayment || paymentConfirmed}
            >
                <Text style={styles.confirmButtonText}>
                    {paymentConfirmed
                        ? "Pagamento efetuado"
                        : "Confirmar Pagamento"}
                </Text>
            </TouchableOpacity>

            <Image
                source={require("../../assets/images/logo.png")}
                style={styles.logo}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f9fa",
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#ff4500",
        marginBottom: 20,
        textAlign: "center",
    },
    paymentContainer: {
        backgroundColor: "#ffffff",
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    paymentTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#333",
    },
    paymentButton: {
        backgroundColor: "#ff4500",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 10,
    },
    selectedButton: {
        backgroundColor: "#28a745",
    },
    paymentButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    confirmButton: {
        backgroundColor: "#28a745",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 20,
    },
    confirmButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    logo: {
        width: 150,
        height: 75,
        alignSelf: "center",
        marginTop: 20,
    },
});

export default CheckoutScreen;
