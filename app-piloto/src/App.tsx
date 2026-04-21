// App.tsx (corrigido)
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, Text, Image, View } from 'react-native';
import { CartProvider } from '../src/context/CartContext';
import { useCart } from '../src/context/CartContext';

import Login from './Login';
import Home from './Home';
import Store from './Store';
import Cart from './Cart';
import Payment from './Payment';
import OrderConfirmation from './OrderConfirmation';
import Account from './Account';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Componente para o ícone do carrinho no header (não será mais usado, mas mantido por precaução)
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

// Componente de navegação com abas inferiores (sem header)
function MainTabs() {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color}) => {
          let iconComponent;
          let label = '';
          
          if (route.name === 'HomeTab') {
            iconComponent = (
              <Image 
                source={require('../assets/icons/home.png')}
                style={{ 
                  width: 24, 
                  height: 24, 
                  tintColor: color,
                }}
              />
            );
            label = 'Início';
          } else if (route.name === 'CartTab') {
            iconComponent = (
              <Image 
                source={require('../assets/icons/cart.png')}
                style={{ 
                  width: 24, 
                  height: 24, 
                  tintColor: color,
                }}
              />
            );
            label = 'Carrinho';
          } else if (route.name === 'AccountTab') {
            iconComponent = (
              <Image 
                source={require('../assets/icons/usuario.png')}
                style={{ 
                  width: 24, 
                  height: 24, 
                  tintColor: color,
                }}
              />
            );
            label = 'Conta';
          }
          
          return (
            <View style={{ 
              position: 'relative', 
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 15
            }}>
              {iconComponent}
              <Text style={{ 
                fontSize: 12, 
                color: color, 
                marginTop: 4,
                fontWeight: focused ? '600' : '400',
              }}>
                {label}
              </Text>
              {route.name === 'CartTab' && totalItems > 0 && (
                <View style={{
                  position: 'absolute',
                  top: -5,
                  right: -8,
                  backgroundColor: '#E53935',
                  borderRadius: 10,
                  minWidth: 18,
                  height: 18,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <Text style={{
                    color: '#fff',
                    fontSize: 10,
                    fontWeight: 'bold',
                  }}>
                    {totalItems}
                  </Text>
                </View>
              )}
            </View>
          );
        },
        tabBarActiveTintColor: '#E53935',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          height: 70,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabel: () => null, // Desabilitar o label padrão
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={Home} 
        options={{
          title: 'Início',
        }}
      />
      <Tab.Screen 
        name="CartTab" 
        component={Cart} 
        options={{
          title: 'Carrinho',
        }}
      />
      <Tab.Screen 
        name="AccountTab" 
        component={Account} 
        options={{
          title: 'Minha Conta',
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {/* Tela de Login sem header */}
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />

          {/* Telas principais com Bottom Tabs - sem header */}
          <Stack.Screen
            name="Main"
            component={MainTabs}
            options={{ headerShown: false }}
          />

          {/* Telas que precisam ser acessadas via stack - sem header */}
          <Stack.Screen
            name="Store"
            component={Store}
            options={{ 
              headerShown: false 
            }}
          />

          <Stack.Screen
            name="Payment"
            component={Payment}
            options={{ 
              headerShown: false 
            }}
          />

          <Stack.Screen
            name="OrderConfirmation"
            component={OrderConfirmation}
            options={{ 
              headerShown: false,
              gestureEnabled: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}