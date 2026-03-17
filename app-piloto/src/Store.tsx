import { SafeAreaView } from 'react-native-safe-area-context';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity
} from 'react-native';

export default function Store({ route, navigation }: any) {
    // Recebe os dados da loja específica
    const { store } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header com imagem de fundo */}
                <View style={styles.headerContainer}>
                    <Image
                        source={store.image}
                        style={styles.headerImage}
                    />
                    
                    {/* Botão voltar */}
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

                {/* Conteúdo da loja */}
                <View style={styles.contentContainer}>
                    {/* Card da loja */}
                    <View style={[styles.storeCard, { backgroundColor: store.color }]}>
                        <Image
                            source={store.image}
                            style={styles.storeLogo}
                        />
                        <View style={styles.storeInfo}>
                            <Text style={styles.storeName}>{store.name}</Text>
                            <Text style={styles.storeId}>ID: #{store.id}</Text>
                            <Text style={styles.storeStatus}>● Aberto agora</Text>
                        </View>
                    </View>

                    {/* Informações detalhadas */}
                    <View style={styles.infoSection}>
                        <Text style={styles.sectionTitle}>Informações da Loja</Text>
                        
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>📍 Endereço:</Text>
                            <Text style={styles.infoValue}>Rua Principal, 123</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>🕐 Horário:</Text>
                            <Text style={styles.infoValue}>18:00 - 23:30</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>📞 Telefone:</Text>
                            <Text style={styles.infoValue}>(11) 99999-9999</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>💰 Taxa entrega:</Text>
                            <Text style={styles.infoValue}>R$ 5,00</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>🛵 Tempo entrega:</Text>
                            <Text style={styles.infoValue}>30-45 min</Text>
                        </View>
                    </View>

                    {/* Categorias */}
                    <View style={styles.categoriesSection}>
                        <Text style={styles.sectionTitle}>Categorias</Text>
                        <View style={styles.categoriesContainer}>
                            <View style={styles.categoryTag}>
                                <Text style={styles.categoryText}>Hambúrgueres</Text>
                            </View>
                            <View style={styles.categoryTag}>
                                <Text style={styles.categoryText}>Porções</Text>
                            </View>
                            <View style={styles.categoryTag}>
                                <Text style={styles.categoryText}>Bebidas</Text>
                            </View>
                            <View style={styles.categoryTag}>
                                <Text style={styles.categoryText}>Sobremesas</Text>
                            </View>
                        </View>
                    </View>

                    {/* Cardápio */}
                    <View style={styles.menuSection}>
                        <Text style={styles.sectionTitle}>Cardápio</Text>
                        
                        {/* Produto 1 */}
                        <View style={styles.productCard}>
                            <View style={styles.productInfo}>
                                <Text style={styles.productName}>X-Burger</Text>
                                <Text style={styles.productDescription}>Pão, hambúrguer, queijo, alface, tomate</Text>
                                <Text style={styles.productPrice}>R$ 25,90</Text>
                            </View>
                            <TouchableOpacity style={styles.addButton}>
                                <Text style={styles.addButtonText}>+</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Produto 2 */}
                        <View style={styles.productCard}>
                            <View style={styles.productInfo}>
                                <Text style={styles.productName}>X-Salada</Text>
                                <Text style={styles.productDescription}>Pão, hambúrguer, queijo, alface, tomate, milho</Text>
                                <Text style={styles.productPrice}>R$ 28,90</Text>
                            </View>
                            <TouchableOpacity style={styles.addButton}>
                                <Text style={styles.addButtonText}>+</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Produto 3 */}
                        <View style={styles.productCard}>
                            <View style={styles.productInfo}>
                                <Text style={styles.productName}>Batata Frita</Text>
                                <Text style={styles.productDescription}>Porção de batata frita crocante</Text>
                                <Text style={styles.productPrice}>R$ 15,90</Text>
                            </View>
                            <TouchableOpacity style={styles.addButton}>
                                <Text style={styles.addButtonText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Botão de ação */}
                    <TouchableOpacity style={styles.actionButton}>
                        <Text style={styles.actionButtonText}>Fazer pedido</Text>
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
        height: 200,
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
        backgroundColor: 'rgba(0,0,0,0.6)',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        zIndex: 10
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600'
    },
    storeInfoOverlay: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: 15,
        borderRadius: 10
    },
    storeNameOverlay: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center'
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
        padding: 20
    },
    storeCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    storeLogo: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: 15
    },
    storeInfo: {
        flex: 1
    },
    storeName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4
    },
    storeId: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4
    },
    storeStatus: {
        fontSize: 14,
        color: '#4CAF50',
        fontWeight: '600'
    },
    infoSection: {
        marginBottom: 20
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15
    },
    infoRow: {
        flexDirection: 'row',
        marginBottom: 10
    },
    infoLabel: {
        fontSize: 15,
        color: '#666',
        width: 120
    },
    infoValue: {
        fontSize: 15,
        color: '#333',
        flex: 1
    },
    categoriesSection: {
        marginBottom: 20
    },
    categoriesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    categoryTag: {
        backgroundColor: '#F0F0F0',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 8,
        marginBottom: 8
    },
    categoryText: {
        color: '#666',
        fontSize: 14
    },
    menuSection: {
        marginBottom: 20
    },
    productCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10
    },
    productInfo: {
        flex: 1
    },
    productName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4
    },
    productDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#E53935'
    },
    addButton: {
        backgroundColor: '#E53935',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15
    },
    addButtonText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        lineHeight: 28
    },
    actionButton: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 30
    },
    actionButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    }
});