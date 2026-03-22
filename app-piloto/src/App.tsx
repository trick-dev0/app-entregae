// App.tsx (updated with OrderConfirmation)
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, Text, Image, View } from 'react-native';
import { CartProvider } from '../src/context/CartContext';
import { useCart } from '../src/context/CartContext';

import Login from './Login';
import Home from './Home';
import Store from './Store';
import Cart from './Cart';
import Payment from './Payment';
import OrderConfirmation from './OrderConfirmation'; // Adicionar import

const Stack = createNativeStackNavigator();

// Componente para o ícone do carrinho
function CartIcon({ navigation }: any) {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Cart')}
      style={{ marginRight: 15 }}
    >
      <Text style={{ fontSize: 24 }}>🛒</Text>
      {totalItems > 0 && (
        <Text
          style={{
            position: 'absolute',
            right: -8,
            top: -5,
            backgroundColor: '#E53935',
            color: '#fff',
            fontSize: 12,
            borderRadius: 10,
            paddingHorizontal: 4,
            minWidth: 18,
            textAlign: 'center',
          }}
        >
          {totalItems}
        </Text>
      )}
    </TouchableOpacity>
  );
}

// Componente para a logo do cabeçalho
function HeaderLogo() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image
        source={require('../assets/Logo.png')}
        style={{
          width: 100,
          height: 100,
          resizeMode: 'contain',
        }}
      />
    </View>
  );
}

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Home"
            component={Home}
            options={({ navigation }) => ({
              headerShown: true,
              headerTitle: () => <HeaderLogo />,
              headerLeft: () => null,
              headerRight: () => <CartIcon navigation={navigation} />,
            })}
          />

          <Stack.Screen
            name="Store"
            component={Store}
            options={({ navigation }) => ({
              headerShown: true,
              headerTitle: () => <HeaderLogo />,
              headerLeft: () => null,
              headerRight: () => <CartIcon navigation={navigation} />,
            })}
          />

          <Stack.Screen
            name="Cart"
            component={Cart}
            options={{
              headerShown: true,
              headerTitle: () => <HeaderLogo />,
              headerLeft: () => null,
            }}
          />

          <Stack.Screen
            name="Payment"
            component={Payment}
            options={{
              headerShown: true,
              headerTitle: () => <HeaderLogo />,
              headerLeft: () => null,
            }}
          />

          {/* Adicionar tela de confirmação */}
          <Stack.Screen
            name="OrderConfirmation"
            component={OrderConfirmation}
            options={{
              headerShown: true,
              headerTitle: () => <HeaderLogo />,
              headerLeft: () => null,
              gestureEnabled: false, // Impede voltar com gesto
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}