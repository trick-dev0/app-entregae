// Payment.tsx (corrigido)
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import { useState } from 'react';
import { useCart } from './context/CartContext';

export default function Payment({ navigation }: any) {
  const { cartItems, getTotalPrice, clearCart } = useCart(); // Adicionado clearCart
  const [selectedPayment, setSelectedPayment] = useState('');

  const deliveryFee = 5.00;
  const subtotal = getTotalPrice();
  const total = subtotal + deliveryFee;

  const paymentMethods = [
    { id: 'credit', name: '💳 Cartão de Crédito' },
    { id: 'debit', name: '💳 Cartão de Débito' },
    { id: 'pix', name: '💠 Pix' },
    { id: 'cash', name: '💵 Dinheiro' },
  ];

  const handleConfirmPayment = () => {
    if (!selectedPayment) {
      Alert.alert('Erro', 'Selecione uma forma de pagamento');
      return;
    }

    const orderDetails = {
      items: cartItems,
      paymentMethod: selectedPayment,
      subtotal: subtotal,
      deliveryFee: deliveryFee,
      total: total,
      orderDate: new Date().toISOString(),
    };

    // Limpar o carrinho antes de navegar
    clearCart();

    // Navegar para a confirmação
    navigation.replace('OrderConfirmation', { orderDetails });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backText}>← Voltar</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Pagamento</Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.sectionTitle}>Resumo do Pedido</Text>
          <View style={styles.summaryRow}>
            <Text>Subtotal</Text>
            <Text>R$ {subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text>Taxa de Entrega</Text>
            <Text>R$ {deliveryFee.toFixed(2)}</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalPrice}>R$ {total.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.paymentCard}>
          <Text style={styles.sectionTitle}>Forma de Pagamento</Text>
          {paymentMethods.map(method => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.paymentOption,
                selectedPayment === method.id && styles.paymentOptionSelected
              ]}
              onPress={() => setSelectedPayment(method.id)}
            >
              <Text style={styles.paymentText}>{method.name}</Text>
              {selectedPayment === method.id && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirmPayment}
        >
          <Text style={styles.confirmButtonText}>Confirmar Pedido</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff'
  },
  backButton: {
    padding: 8
  },
  backText: {
    fontSize: 16,
    color: '#E53935'
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginRight: 40
  },
  summaryCard: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 12
  },
  paymentCard: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 12
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  totalRow: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee'
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E53935'
  },
  paymentOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 12
  },
  paymentOptionSelected: {
    borderColor: '#4CAF50',
    backgroundColor: '#e8f5e9'
  },
  paymentText: {
    fontSize: 16
  },
  checkmark: {
    fontSize: 18,
    color: '#4CAF50',
    fontWeight: 'bold'
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center'
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  }
});