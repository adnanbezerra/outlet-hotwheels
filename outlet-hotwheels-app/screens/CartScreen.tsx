import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Definir os parâmetros das telas da navegação
type RootStackParamList = {
    CartScreen: undefined;
    CheckoutScreen: undefined; // Adicione outras telas conforme necessário
};

// Definir o tipo correto para a navegação
type NavigationProp = StackNavigationProp<RootStackParamList, 'CartScreen'>;

const CartScreen = () => {
    const navigation = useNavigation<NavigationProp>();

    // Exemplo de dados do carrinho para evitar erro
    const cart = [
        { id: 1, name: 'Produto 1' },
        { id: 2, name: 'Produto 2' },
        // Adicione mais itens conforme necessário
    ];

    const renderItem = ({ item }: { item: { id: number; name: string } }) => (
        <Text>{item.name}</Text>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Carrinho</Text>
            {/* FlatList para exibir os itens do carrinho */}
            <FlatList
                data={cart}
                renderItem={renderItem}
                keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
            />
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
