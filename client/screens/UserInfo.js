import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Button,
  TextInput,
} from 'react-native';
import Navbar from '../components/Navbar';
import { GET_EMAIL } from '../queries/userInfo.query';
import { useQuery } from '@apollo/client';

export default function UserInfo({ navigation, route }) {
  const { email } = route.params;

  // const [username, setUsername] = useState('snuglywugly');

  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState({
    firstLineAddress: '',
    secondLineAddress: '',
    city: '',
    postcode: '',
    country: '',
  });
  const [editMode, setEditMode] = useState(false);
  const { data, error, loading } = useQuery(GET_EMAIL, {
    variables: { email: email },
  });

  useEffect(() => {
    console.log(loading);
    console.log(error);
    if (data) {
      setPhoneNumber(data.get_user_by_email.phoneNumber);
      setAddress({
        firstLineAddress: data.get_user_by_email.firstLineAddress,
        secondLineAddress: data.get_user_by_email.secondLineAddress,
        city: data.get_user_by_email.city,
        postcode: data.get_user_by_email.postcode,
        country: data.get_user_by_email.country,
      });

      console.log(data);
    }
  }, [loading, data, error]);

  function toggle() {
    setEditMode(!editMode);
  }

  return (
    <>
      <Navbar navigation={navigation} canGoBack={true} />
      <ScrollView style={styles.container}>
        <Text style={styles.headers}>Email:</Text>
        {editMode ? (
          <TextInput
            style={styles.textBoxes}
            onChangeText={(text) => {}}
            value={email}
          />
        ) : (
          <Text style={styles.displayText}>{email}</Text>
        )}
        <Text style={styles.headers}>Phone Number:</Text>
        {editMode ? (
          <TextInput
            style={styles.textBoxes}
            onChangeText={(text) => setPhoneNumber(text)}
            value={phoneNumber}
          />
        ) : (
          <Text style={styles.displayText}>{phoneNumber}</Text>
        )}
        <Text style={styles.headers}>Address:</Text>
        {editMode ? (
          <>
            <TextInput
              style={styles.textBoxes}
              onChangeText={(text) => setAddress({ firstLineAddress: text })}
              value={address.firstLineAddress}
            />
            <TextInput
              style={styles.textBoxes}
              onChangeText={(text) => setAddress({ secondLineAddress: text })}
              value={address.secondLineAddress}
            />
            <TextInput
              style={styles.textBoxes}
              onChangeText={(text) => setAddress({ city: text })}
              value={address.city}
            />
            <TextInput
              style={styles.textBoxes}
              onChangeText={(text) => setAddress({ postcode: text })}
              value={address.postcode}
            />
            <TextInput
              style={styles.textBoxes}
              onChangeText={(text) => setAddress({ country: text })}
              value={address.country}
            />
          </>
        ) : (
          <>
            <Text style={styles.displayText}>{address.firstLineAddress}</Text>
            <Text style={styles.displayText}>{address.secondLineAddress}</Text>
            <Text style={styles.displayText}>{address.city}</Text>
            <Text style={styles.displayText}>{address.postcode}</Text>
            <Text style={styles.displayText}>{address.country}</Text>
          </>
        )}
        {editMode ? (
          <Button
            title="Press to Save Changes"
            onPress={toggle}
            color="#EF476F"
          />
        ) : (
          <Button
            title="Press to Edit Details"
            onPress={toggle}
            color="#0C637F"
          />
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  headers: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  displayText: {
    width: '100%',
    padding: 11,
    marginBottom: 10,
  },
  textBoxes: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#EF476F',
    width: '100%',
    padding: 10,
    marginBottom: 10,
  },
  Button: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    width: '50%',
  },
});
