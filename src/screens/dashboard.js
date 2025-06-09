import React from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import usePetfinder from '../hooks/usePetfinder';
import AnimalCard from '../components/JS_animais';

export default function DashboardScreen() {
  const navigation = useNavigation();
  const { animals, loading, loadMoreAnimals } = usePetfinder();

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  if (loading && animals.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#9A554C" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuButton} onPress={openDrawer}>
        <Text style={styles.menuIcon}>☰</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Não compre, adote!</Text>
      <FlatList
        data={animals}
        renderItem={({ item }) => <AnimalCard animal={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMoreAnimals}
        onEndReachedThreshold={0.5}
        style={{ flex: 1 }} // Garante que o FlatList ocupe a altura total
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  menuButton: {
    position: 'absolute',
    top: 10,
    marginTop: 35,
    left: 17,
    zIndex: 1,
  },
  menuIcon: {
    fontSize: 24,
    marginTop: 35,
    color: '#9A554C',
  },
  title: {
    fontFamily: 'Pacifico',
    fontSize: 24,
    textAlign: 'center',
    color: '#9A554C',
    marginTop: 70,
    marginBottom: 37,
    width: '100%',
    paddingHorizontal: 20,
  },
  list: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
});