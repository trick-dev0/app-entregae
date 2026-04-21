import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert
} from 'react-native';
import { getProductsByStoreId } from '../src/data/Products';
import { useCart } from './context/CartContext';

export default function Store({ route, navigation }: any) {
    // Pegamos os dados da loja passados pela navegação
    const { store } = route.params;
    
    // Buscamos os produtos vinculados a esta loja
    const storeProducts = getProductsByStoreId(store.id);
    
    // Funções do Carrinho
    const { addToCart, getTotalItems } = useCart();

    const handleAddToCart = (product: any) => {
        addToCart(product, store.id, store.name);
        Alert.alert('Sucesso', `${product.name} adicionado ao carrinho!`);
    };

    const handleCheckout = () => {
        if (getTotalItems() === 0) {
            Alert.alert('Carrinho vazio', 'Adicione itens ao carrinho antes de finalizar o pedido.');
            return;
        }
        navigation.navigate('Payment');
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                
                {/* Header com imagem de fundo */}
                <View style={styles.headerContainer}>
                    <Image
                        source={store.banner}
                        style={styles.headerImage}
                    />

                    {/* Botão voltar personalizado */}
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.backButtonText}>← Voltar</Text>
                    </TouchableOpacity>

                    {/* Informações sobrepostas na imagem */}
                    <View style={styles.storeInfoOverlay}>
                        <Text style={styles.storeNameOverlay}>{store.name}</Text>
                        <View style={styles.ratingContainer}>
                            <Text style={styles.rating}>★ 4.5</Text>
                            <Text style={styles.reviews}>(120 avaliações)</Text>
                        </View>
                    </View>
                </View>

                {/* Conteúdo da Loja */}
                <View style={styles.contentContainer}>
                    
                    {/* Seção de Informações corrigida conforme a imagem */}
                    <View style={styles.infoSection}>
                        <Text style={styles.sectionTitle}>Informações da Loja</Text>
                        
                        <View style={styles.infoRow}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.infoLabel}>📍 Endereço:</Text>
                            </View>
                            <Text style={styles.infoValue}>{store.address || "Rua Principal, 123"}</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.infoLabel}>🕒 Horário:</Text>
                            </View>
                            <Text style={styles.infoValue}>{store.openingHours || "18:00 - 23:30"}</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.infoLabel}>📞 Telefone:</Text>
                            </View>
                            <Text style={styles.infoValue}>{store.phone || "(11) 99999-9999"}</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.infoLabel}>💰 Taxa entrega:</Text>
                            </View>
                            <Text style={styles.infoValue}>R$ {store.deliveryFee?.toFixed(2) || "5,00"}</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.infoLabel}>🛵 Tempo entrega:</Text>
                            </View>
                            <Text style={styles.infoValue}>{store.deliveryTime || "30-45 min"}</Text>
                        </View>
                    </View>

                    {/* Listagem de Categorias e Produtos */}
                    {storeProducts?.categories.map((category: any) => (
                        <View key={category.id} style={styles.categoriesSection}>
                            <Text style={styles.categoryTitle}>{category.name}</Text>
                            
                            {category.products.map((product: any) => (
                                <View key={product.id} style={styles.productCard}>
                                    <View style={styles.productInfo}>
                                        <Text style={styles.productName}>{product.name}</Text>
                                        <Text style={styles.productDescription} numberOfLines={2}>
                                            {product.description}
                                        </Text>
                                        <Text style={styles.productPrice}>
                                            R$ {product.price.toFixed(2)}
                                        </Text>
                                    </View>
                                    
                                    <TouchableOpacity
                                        style={styles.addButton}
                                        onPress={() => handleAddToCart(product)}
                                    >
                                        <Text style={styles.addButtonText}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    ))}

                    {/* Botão de Finalização */}
                    <TouchableOpacity style={styles.actionButton} onPress={handleCheckout}>
                        <Text style={styles.actionButtonText}>
                            Fazer pedido {getTotalItems() > 0 ? `(${getTotalItems()} itens)` : ''}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    headerContainer: {
        height: 250,
        position: 'relative'
    },
    headerImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        zIndex: 10
    },
    backButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold'
    },
    storeInfoOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 20,
    },
    storeNameOverlay: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#fff',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    },
    rating: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#F4B400',
        marginRight: 8
    },
    reviews: {
        fontSize: 14,
        color: '#ddd'
    },
    contentContainer: {
        padding: 16
    },
    // ESTILOS DA SEÇÃO DE INFORMAÇÕES (BASEADO NA IMAGEM)
    infoSection: {
        backgroundColor: '#f2f2f2',
        borderRadius: 12,
        padding: 16,
        marginBottom: 25,
        elevation: 2, // Sombra leve no Android
        shadowColor: '#000', // Sombra leve no iOS
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15
    },
    infoRow: {
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'flex-start'
    },
    labelContainer: {
        width: 140, // Largura fixa para alinhar os dois pontos
    },
    infoLabel: {
        fontSize: 15,
        color: '#666',
        fontWeight: '600'
    },
    infoValue: {
        fontSize: 15,
        color: '#333',
        flex: 1, // Ocupa o restante da linha
    },
    // ESTILOS DOS PRODUTOS
    categoriesSection: {
        marginBottom: 25
    },
    categoryTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
        borderLeftWidth: 4,
        borderLeftColor: '#E53935',
        paddingLeft: 10
    },
    productCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#eee'
    },
    productInfo: {
        flex: 1
    },
    productName: {
        fontSize: 17,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4
    },
    productDescription: {
        fontSize: 13,
        color: '#777',
        marginBottom: 8,
        lineHeight: 18
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2E7D32' // Verde para o preço
    },
    addButton: {
        backgroundColor: '#E53935',
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
    },
    actionButton: {
        backgroundColor: '#4CAF50',
        padding: 18,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 40
    },
    actionButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    }
});