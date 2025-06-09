import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import DashboardScreen from '../screens/dashboard';
import LoginScreen from '../screens/login';
import PerfilScreen from '../screens/perfil';
import RegistroScreen from '../screens/registro';
import DetalhesScreen from '../screens/detalhes';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// Stack Navigator para Login e Registro
function AuthStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Registro" component={RegistroScreen} />
    </Stack.Navigator>
  );
}

// Stack Navigator para Dashboard e Detalhes
function MainStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Detalhes" component={DetalhesScreen} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Auth"
        screenOptions={{
          drawerStyle: { backgroundColor: '#D3D3D3', width: 240 },
          drawerLabelStyle: { color: '#9A554C' },
          headerShown: false,
        }}
      >
        <Drawer.Screen
          name="Auth"
          component={AuthStackNavigator}
          options={{
            drawerLabel: 'Login',
            drawerIcon: () => <Ionicons name="log-in" size={20} color="#9A554C" />,
          }}
        />
        <Drawer.Screen
          name="Main"
          component={MainStackNavigator}
          options={{
            drawerLabel: 'Início',
            drawerIcon: () => <Ionicons name="home" size={20} color="#9A554C" />,
          }}
        />
        <Drawer.Screen
          name="Perfil"
          component={PerfilScreen}
          options={{
            drawerLabel: 'Perfil',
            drawerIcon: () => <Ionicons name="person" size={20} color="#9A554C" />,
          }}
        />
        <Drawer.Screen
          name="Sair"
          component={LoginScreen}
          options={{
            drawerLabel: 'Sair',
            drawerIcon: () => <Ionicons name="exit" size={20} color="#9A554C" />,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}