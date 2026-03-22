// OrderConfirmation.tsx
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert
} from 'react-native';
import { useEffect } from 'react';

export default function OrderConfirmation({ navigation, route }: any) {
  const { orderDetails } = route.params;

  useEffect(() => {
    // Opcional: Limpar o carrinho quando a tela é carregada
    // O carrinho já deve ter sido limpo no Payment
  }, []);

  const formatDate = () => {
    const now = new Date();
    return now.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getPaymentMethodText = (method: string) => {
    switch (method) {
      case 'credit':
        return 'Cartão de Crédito';
      case 'debit':
        return 'Cartão de Débito';
      case 'cash':
        return 'Dinheiro';
      default:
        return method;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.successContainer}>
          <View style={styles.successIcon}>
            <Text style={styles.checkmark}>✓</Text>
          </View>
          <Text style={styles.successTitle}>Pedido Confirmado!</Text>
          <Text style={styles.successMessage}>
            Seu pedido foi recebido e está sendo preparado
          </Text>
        </View>

        <View style={styles.orderInfoCard}>
          <Text style={styles.sectionTitle}>Detalhes do Pedido</Text>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Número do Pedido:</Text>
            <Text style={styles.infoValue}>#{Math.floor(Math.random() * 10000)}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Data:</Text>
            <Text style={styles.infoValue}>{formatDate()}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Forma de Pagamento:</Text>
            <Text style={styles.infoValue}>
              {getPaymentMethodText(orderDetails.paymentMethod)}
            </Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.subsectionTitle}>Itens do Pedido:</Text>
          
          {orderDetails.items.map((item: any, index: number) => (
            <View key={index} style={styles.orderItem}>
              <View style={styles.orderItemInfo}>
                <Text style={styles.orderItemName}>
                  {item.product.name} x {item.quantity}
                </Text>
                <Text style={styles.orderItemStore}>{item.storeName}</Text>
              </View>
              <Text style={styles.orderItemPrice}>
                R$ {(item.product.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          ))}

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal</Text>
            <Text style={styles.totalValue}>R$ {orderDetails.subtotal.toFixed(2)}</Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Taxa de entrega</Text>
            <Text style={styles.totalValue}>R$ {orderDetails.deliveryFee.toFixed(2)}</Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.grandTotalLabel}>Total</Text>
            <Text style={styles.grandTotalValue}>R$ {orderDetails.total.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.deliveryInfoCard}>
          <Text style={styles.sectionTitle}>Informações de Entrega</Text>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>⏱️ Tempo estimado:</Text>
            <Text style={styles.infoValue}>30-45 minutos</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>📍 Endereço:</Text>
            <Text style={styles.infoValue}>Rua Principal, 123 - Centro</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>📞 Contato:</Text>
            <Text style={styles.infoValue}>(11) 99999-9999</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.trackButton}
            onPress={() => {
              // Aqui você pode implementar o rastreamento do pedido
              Alert.alert('Rastreamento', 'Em breve você poderá rastrear seu pedido!');
            }}
          >
            <Text style={styles.trackButtonText}>Acompanhar Pedido</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => {
              // Navegar para Home e limpar o histórico
              navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
              });
            }}
          >
            <Text style={styles.homeButtonText}>Voltar para o Início</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  successContainer: {
    backgroundColor: '#4CAF50',
    padding: 30,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkmark: {
    fontSize: 50,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  successMessage: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
  },
  orderInfoCard: {
    backgroundColor: '#fff',
    margin: 15,
    marginTop: 15,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  deliveryInfoCard: {
    backgroundColor: '#fff',
    margin: 15,
    marginTop: 0,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    marginTop: 5,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    width: 120,
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 12,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  orderItemInfo: {
    flex: 1,
  },
  orderItemName: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  orderItemStore: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  orderItemPrice: {
    fontSize: 14,
    color: '#E53935',
    fontWeight: 'bold',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 14,
    color: '#666',
  },
  totalValue: {
    fontSize: 14,
    color: '#333',
  },
  grandTotalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  grandTotalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E53935',
    marginTop: 8,
  },
  buttonContainer: {
    padding: 15,
    gap: 10,
    marginBottom: 20,
  },
  trackButton: {
    backgroundColor: '#E53935',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  trackButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  homeButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  homeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});