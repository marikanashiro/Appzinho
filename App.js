import { useFonts } from 'expo-font';
import Navigation from './src/navigation';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Pacifico': require('./assets/fonts/Pacifico-Regular.ttf'),
    'Roboto': require('./assets/fonts/Roboto-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null; // Ou um ActivityIndicator
  }

  return <Navigation />;
}