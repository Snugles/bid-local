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

  const [phoneNumber, setPhoneNumber] = useState('07425 058395');
  const [editMode, setEditMode] = useState(false);
  const { data, error, loading } = useQuery(GET_EMAIL, {
    variables: { email: email },
  });

  useEffect(() => {
    console.log(loading);
    console.log(error);
    if (data) {
      setPhoneNumber(data.get_user_by_email.phoneNumber);

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
        {/* <Text style={styles.headers}>Username:</Text>
        {editMode ? (
          <TextInput
            style={styles.textBoxes}
            onChangeText={(text) => setUsername(text)}
            value={username}
          />
        ) : (
          <Text style={styles.displayText}>{username}</Text>
        )} */}
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
