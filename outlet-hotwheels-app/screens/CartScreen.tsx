import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';


// Definir o tipo correto para a navegação
type NavigationProp = StackNavigationProp<RootStackParamList, 'CartScreen'>;

const CartScreen = () => {
    const navigation = useNavigation<NavigationProp>();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Carrinho</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('CheckoutScreen')}
            >
                <Text style={styles.buttonText}>Finalizar Compra</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#ff4500',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CartScreen;
