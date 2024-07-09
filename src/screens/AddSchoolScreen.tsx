import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  RadioButton,
  Snackbar,
  Text,
  TextInput,
} from 'react-native-paper';

import { useAppContext } from '../components/AppContext';

export default function AddSchoolScreen() {
  const { onAddSchool } = useAppContext();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [isEligible, setIsEligible] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  async function save() {
    await onAddSchool(name, address, isEligible);

    setName('');
    setAddress('');
    setIsEligible(false);
    setIsSaved(true);
  }

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          mode="outlined"
          label="Nama Sekolah"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          mode="outlined"
          label="Alamat Sekolah"
          value={address}
          onChangeText={setAddress}
          style={styles.input}
        />
        <View>
          <Text variant="bodyLarge">Apakah layak menerima bantuan?</Text>
          <RadioButton.Group
            value={isEligible === true ? 'yes' : 'no'}
            onValueChange={value => {
              setIsEligible(value === 'yes' ? true : false);
            }}>
            <RadioButton.Item label="Layak" value="yes" />
            <RadioButton.Item label="Tidak Layak" value="no" />
          </RadioButton.Group>
        </View>
      </View>
      <View>
        <Button
          mode="contained"
          disabled={name.length === 0 && address.length === 0}
          style={styles.button}
          onPress={save}>
          Simpan
        </Button>
        <Snackbar visible={isSaved} onDismiss={() => setIsSaved(false)}>
          Data sekolah berhasil disimpan.
        </Snackbar>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    padding: 4,
    borderRadius: 8,
  },
});
