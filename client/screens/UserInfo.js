import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  Button,
  TextInput,
} from 'react-native';
import Navbar from '../components/Navbar';
import { GET_EMAIL, UPDATE_USER } from '../queries/userInfo';
import { useQuery, useMutation } from '@apollo/client';

export default function UserInfo({ navigation, route }) {
  const email = route.params.email.current ;

  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState({
    firstLineAddress: '',
    secondLineAddress: '',
    city: '',
    postcode: '',
    country: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [id, setID] = useState('');
  const [changeUser, changed] = useMutation(UPDATE_USER);
  const user = useQuery(GET_EMAIL, {
    variables: { email: email },
  });

  useEffect(() => {
    if (user.data) {
      setPhoneNumber(user.data.get_user_by_email.phoneNumber);
      setID(user.data.get_user_by_email.id);
      setAddress({
        firstLineAddress: user.data.get_user_by_email.address.firstLineAddress,
        secondLinAddress: user.data.get_user_by_email.address.secondLineAddress,
        city: user.data.get_user_by_email.address.city,
        postcode: user.data.get_user_by_email.address.postcode,
        country: user.data.get_user_by_email.address.country,
      });
      return;
    }
  }, [user]);

  useEffect(() => {
    if (changed.data) {
      setPhoneNumber(changed.data.update_user.phoneNumber);
      setID(changed.data.update_user.id);
      setAddress({
        firstLineAddress: changed.data.update_user.address.firstLineAddress,
        secondLineAddress: changed.data.update_user.address.secondLineAddress,
        city: changed.data.update_user.address.city,
        postcode: changed.data.update_user.address.postcode,
        country: changed.data.update_user.address.country,
      });
      return;
    }
  }, [changed]);

  function toggle() {
    if (editMode) {
      const queryVariables = {
        userId: id,
        user: {
          phoneNumber:phoneNumber,
          email:email,
          password:"feXoIik8"
        }
      };
      changeUser({variables:queryVariables});
    }
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