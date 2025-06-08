import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/login';

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Pacifico': require('./assets/fonts/Pacifico-Regular.ttf'),
    'Roboto': require('./assets/fonts/Roboto-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null; // Ou um loading enquanto as fontes carregam
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}