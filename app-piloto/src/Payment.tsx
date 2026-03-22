// Payment.tsx (updated)
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { useCart } from './context/CartContext';
import { useState } from 'react';

export default function Payment({ navigation, route }: any) {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<string>('credit');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const total = getTotalPrice();
  const deliveryFee = 5.00;
  const finalTotal = total + deliveryFee;

  const handleConfirmPayment = () => {
    if (paymentMethod === 'credit' || paymentMethod === 'debit') {
      if (!cardNumber || !cardName || !expiryDate || !cvv) {
        Alert.alert('Erro', 'Preencha todos os dados do cartão');
        return;
      }
      
      if (cardNumber.replace(/\s/g, '').length < 16) {
        Alert.alert('Erro', 'Número do cartão inválido');
        return;
      }
      
      if (cvv.length < 3) {
        Alert.alert('Erro', 'CVV inválido');
        return;
      }
    }

    // Preparar os detalhes do pedido para a tela de confirmação
    const orderDetails = {
      items: cartItems,
      subtotal: total,
      deliveryFee: deliveryFee,
      total: finalTotal,
      paymentMethod: paymentMethod,
      orderDate: new Date().toISOString(),
    };

    // Limpar o carrinho
    clearCart();
    
    // Navegar para a tela de confirmação
    navigation.replace('OrderConfirmation', { orderDetails });
  };

  // Função para formatar o número do cartão com espaços
  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g);
    if (chunks) {
      return chunks.join(' ');
    }
    return text;
  };

  // Função para formatar a data de validade
  const formatExpiryDate = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return text;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Pagamento</Text>
          <Text style={styles.headerSubtitle}>Revise seu pedido e escolha a forma de pagamento</Text>
        </View>

        {/* Resumo do pedido */}
        <View style={styles.summaryCard}>
          <Text style={styles.sectionTitle}>Resumo do Pedido</Text>
          
          {cartItems.map((item) => (
            <View key={item.product.id} style={styles.orderItem}>
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
            <Text style={styles.totalValue}>R$ {total.toFixed(2)}</Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Taxa de entrega</Text>
            <Text style={styles.totalValue}>R$ {deliveryFee.toFixed(2)}</Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.grandTotalLabel}>Total</Text>
            <Text style={styles.grandTotalValue}>R$ {finalTotal.toFixed(2)}</Text>
          </View>
        </View>

        {/* Formas de pagamento */}
        <View style={styles.paymentCard}>
          <Text style={styles.sectionTitle}>Forma de Pagamento</Text>

          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === 'credit' && styles.paymentOptionSelected,
            ]}
            onPress={() => setPaymentMethod('credit')}
          >
            <Text style={styles.paymentOptionText}>💳 Cartão de Crédito</Text>
            {paymentMethod === 'credit' && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === 'debit' && styles.paymentOptionSelected,
            ]}
            onPress={() => setPaymentMethod('debit')}
          >
            <Text style={styles.paymentOptionText}>💳 Cartão de Débito</Text>
            {paymentMethod === 'debit' && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === 'cash' && styles.paymentOptionSelected,
            ]}
            onPress={() => setPaymentMethod('cash')}
          >
            <Text style={styles.paymentOptionText}>💰 Dinheiro</Text>
            {paymentMethod === 'cash' && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>

          {/* Cartão de crédito/débito fields */}
          {(paymentMethod === 'credit' || paymentMethod === 'debit') && (
            <View style={styles.cardFields}>
              <TextInput
                style={styles.input}
                placeholder="Número do cartão"
                value={cardNumber}
                onChangeText={(text) => setCardNumber(formatCardNumber(text))}
                keyboardType="numeric"
                maxLength={19}
              />
              <TextInput
                style={styles.input}
                placeholder="Nome no cartão"
                value={cardName}
                onChangeText={setCardName}
              />
              <View style={styles.rowInputs}>
                <TextInput
                  style={[styles.input, styles.halfInput]}
                  placeholder="Validade (MM/AA)"
                  value={expiryDate}
                  onChangeText={(text) => setExpiryDate(formatExpiryDate(text))}
                  maxLength={5}
                />
                <TextInput
                  style={[styles.input, styles.halfInput]}
                  placeholder="CVV"
                  value={cvv}
                  onChangeText={setCvv}
                  keyboardType="numeric"
                  maxLength={4}
                  secureTextEntry
                />
              </View>
            </View>
          )}
        </View>

        {/* Botões */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Voltar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirmPayment}
          >
            <Text style={styles.confirmButtonText}>
              Confirmar Pagamento - R$ {finalTotal.toFixed(2)}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Styles permanecem os mesmos...
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#E53935',
    padding: 20,
    paddingTop: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  summaryCard: {
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
  paymentCard: {
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
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 12,
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
  paymentOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    marginBottom: 10,
  },
  paymentOptionSelected: {
    borderColor: '#E53935',
    backgroundColor: '#fff5f5',
  },
  paymentOptionText: {
    fontSize: 16,
    color: '#333',
  },
  checkmark: {
    fontSize: 18,
    color: '#E53935',
    fontWeight: 'bold',
  },
  cardFields: {
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  rowInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 15,
    gap: 10,
    marginBottom: 20,
  },
  backButton: {
    flex: 1,
    backgroundColor: '#999',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  confirmButton: {
    flex: 2,
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});