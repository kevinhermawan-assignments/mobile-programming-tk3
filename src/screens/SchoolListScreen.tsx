import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Card, FAB, Text } from 'react-native-paper';

import { useAppContext } from '../components/AppContext';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export default function SchoolListScreen({
  navigation,
}: NativeStackScreenProps<any, 'SchoolList'>) {
  const { schools } = useAppContext();

  return (
    <View style={styles.container}>
      <FlatList
        data={schools}
        keyExtractor={item => item.getId()}
        renderItem={({ item }) => (
          <Card
            mode="outlined"
            onPress={() => {
              navigation.navigate('SchoolDetail', { school: item });
            }}
            style={styles.card}>
            <Card.Content>
              <Text variant="titleMedium">{item.getName()}</Text>
              <Text variant="bodyMedium">{item.getAddress()}</Text>
            </Card.Content>
          </Card>
        )}
        style={styles.list}
      />
      <FAB
        mode="flat"
        label="Tambah Sekolah"
        onPress={() => navigation.navigate('AddSchool')}
        style={styles.fab}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
    padding: 16,
  },
  card: {
    borderColor: '#E0E0E0',
    marginBottom: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 8,
    bottom: 8,
  },
});
