// src/Cart.tsx
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { useCart } from './context/CartContext';
import { useLayoutEffect } from 'react';

export default function Cart({ navigation }: any) {
    const {
        cartItems,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
    } = useCart();

useLayoutEffect(() => {
  navigation.setOptions({
    title: 'Meu Carrinho',
    headerShown: true,
    headerLeft: () => null, // Remove o botão de voltar
  });
}, [navigation]);

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            Alert.alert('Carrinho vazio', 'Adicione itens ao carrinho antes de finalizar.');
            return;
        }

        // Navigate to payment screen instead of showing alert
        navigation.navigate('Payment');
    };

if (cartItems.length === 0) {
    return (
        <SafeAreaView style={styles.emptyContainer}>
            <Text style={styles.emptyText}>🛒 Seu carrinho está vazio</Text>
            <TouchableOpacity
                style={styles.shopButton}
                onPress={() => navigation.navigate('Main')} // ← ALTERADO PARA 'Main'
            >
                <Text style={styles.shopButtonText}>Continuar Comprando</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.cartList}>
                {cartItems.map((item) => (
                    <View key={item.product.id} style={styles.cartItem}>
                        <View style={styles.itemInfo}>
                            <Text style={styles.itemName}>{item.product.name}</Text>
                            <Text style={styles.itemStore}>{item.storeName}</Text>
                            <Text style={styles.itemPrice}>
                                R$ {item.product.price.toFixed(2)}
                            </Text>
                        </View>

                        <View style={styles.quantityControls}>
                            <TouchableOpacity
                                style={styles.quantityButton}
                                onPress={() => updateQuantity(item.product.id, item.quantity - 1)}
                            >
                                <Text style={styles.quantityButtonText}>-</Text>
                            </TouchableOpacity>

                            <Text style={styles.quantity}>{item.quantity}</Text>

                            <TouchableOpacity
                                style={styles.quantityButton}
                                onPress={() => updateQuantity(item.product.id, item.quantity + 1)}
                            >
                                <Text style={styles.quantityButtonText}>+</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.removeButton}
                                onPress={() => removeFromCart(item.product.id)}
                            >
                                <Text style={styles.removeButtonText}>Remover</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.footer}>
                <View style={styles.totalSection}>
                    <Text style={styles.totalText}>Total:</Text>
                    <Text style={styles.totalPrice}>R$ {getTotalPrice().toFixed(2)}</Text>
                </View>

                <View style={styles.totalSection}>
                    <Text style={styles.totalText}>Itens:</Text>
                    <Text style={styles.totalItems}>{getTotalItems()}</Text>
                </View>

                <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
                    <Text style={styles.checkoutButtonText}>Finalizar Pedido</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.clearButton} onPress={clearCart}>
                    <Text style={styles.clearButtonText}>Limpar Carrinho</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    emptyText: {
        fontSize: 18,
        color: '#666',
        marginBottom: 20,
    },
    shopButton: {
        backgroundColor: '#E53935',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 10,
    },
    shopButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cartList: {
        flex: 1,
        padding: 20,
    },
    cartItem: {
        backgroundColor: '#F8F8F8',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    itemInfo: {
        marginBottom: 10,
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    itemStore: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#E53935',
    },
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    quantityButton: {
        backgroundColor: '#E53935',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityButtonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    quantity: {
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 15,
    },
    removeButton: {
        backgroundColor: '#ff6b6b',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 5,
    },
    removeButtonText: {
        color: '#fff',
        fontSize: 14,
    },
    footer: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        backgroundColor: '#fff',
    },
    totalSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    totalText: {
        fontSize: 18,
        color: '#666',
    },
    totalPrice: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#E53935',
    },
    totalItems: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    checkoutButton: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 15,
    },
    checkoutButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    clearButton: {
        backgroundColor: '#ff6b6b',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    clearButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});