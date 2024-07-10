import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  RadioButton,
  Snackbar,
  Text,
  TextInput,
} from 'react-native-paper';

import { useAppContext } from '../components/AppContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export default function AddSchoolScreen({
  route,
  navigation,
}: NativeStackScreenProps<any, 'AddSchool'>) {
  const school = route.params?.school;
  const { onAddSchool, onUpdateSchool } = useAppContext();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [isEligible, setIsEligible] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (school) {
      setName(school.name);
      setAddress(school.address);
      setIsEligible(school.isEligible);

      navigation.setOptions({ title: 'Edit Sekolah' });
    }
  }, [navigation, school]);

  async function save() {
    if (school) {
      school.name = name;
      school.address = address;
      school.isEligible = isEligible;

      await onUpdateSchool(school);
    } else {
      await onAddSchool(name, address, isEligible);
    }

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
          {school
            ? 'Sekolah berhasil diperbarui.'
            : 'Sekolah berhasil ditambahkan.'}
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
