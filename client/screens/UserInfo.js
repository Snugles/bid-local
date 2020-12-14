import React, { useState, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  ScrollView,
  Button,
  TextInput,
  SafeAreaView,
} from 'react-native';
import Navbar from '../components/Navbar';
import { GET_USER_INFO, UPDATE_USER, UPDATE_ADDRESS } from '../queries/userInfo';
import { useQuery, useMutation } from '@apollo/client';

export default function UserInfo({ navigation, route }) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
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
  const [changeUserAddress, changedAddress] = useMutation(UPDATE_ADDRESS);
  const user = useQuery(GET_USER_INFO);

  useEffect(()=>{
    console.log('address: ', address);
  }, [address]);

  useEffect(() => {
    if (user.data) {
      setEmail(user.data.get_user_info.email);
      setPhoneNumber(
        user.data.get_user_info.phoneNumber
          ? user.data.get_user_info.phoneNumber
          : '',
      );
      setID(user.data.get_user_info.id);
      setAddress(
        user.data.get_user_info.address
          ? {
              firstLineAddress:
                user.data.get_user_info.address.firstLineAddress,
              secondLineAddress:
                user.data.get_user_info.address.secondLineAddress,
              city: user.data.get_user_info.address.city,
              postcode: user.data.get_user_info.address.postcode,
              country: user.data.get_user_info.address.country,
            }
          : {
              firstLineAddress: '',
              secondLineAddress: '',
              city: '',
              postcode: '',
              country: '',
            },
      );
      return;
    }
  }, [user]);

  useEffect(() => {
    if (changed.data) {
      setPhoneNumber(changed.data.update_user.phoneNumber);
      setID(changed.data.update_user.id);
      return;
    }
  }, [changed]);

  useEffect(() => {
    if (changedAddress.data) {
      setAddress({
        firstLineAddress: changedAddress.data.update_address.firstLineAddress,
        secondLineAddress: changedAddress.data.update_address.secondLineAddress,
        city: changedAddress.data.update_address.city,
        postcode: changedAddress.data.update_address.postcode,
        country: changedAddress.data.update_address.country,
      });
      return;
    }
  }, [changedAddress]);


  function toggle() {
    if (editMode) {
      const queryVariables = {
        user: {
          phoneNumber: phoneNumber,
          email: email,
          password: 'pass',
        },
      };
      changeUser({ variables: queryVariables });
      changeUserAddress({ variables: {
        addressId: user.data.get_user_info.address.id,
        address: address
      } })
    }
    setEditMode(!editMode);
  }

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.loading}>Loading...</Text>
        <Image source={require('../assets/ecommerce.gif')} />
      </SafeAreaView>
    );
  } else {
    return (
      <>
        <Navbar navigation={navigation} canGoBack={true} />
        <ScrollView style={styles.container}>
          <Text style={styles.headers}>Email:</Text>
          {editMode ? (
            <TextInput
              style={styles.textBoxes}
              onChangeText={(text) => {setEmail(text)}}
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
                onChangeText={(text) => setAddress(addr => ({...addr, firstLineAddress: text }))}
                value={address.firstLineAddress}
              />
              <Text style={styles.headers}>Second Address:</Text>
              <TextInput
                style={styles.textBoxes}
                onChangeText={(text) => setAddress(addr => ({...addr, secondLineAddress: text }))}
                value={address.secondLineAddress}
              />
              <Text style={styles.headers}>City:</Text>
              <TextInput
                style={styles.textBoxes}
                onChangeText={(text) => setAddress(addr => ({...addr, city: text }))}
                value={address.city}
              />
              <Text style={styles.headers}>Postcode:</Text>
              <TextInput
                style={styles.textBoxes}
                onChangeText={(text) => setAddress(addr => ({...addr, postcode: text}))}
                value={address.postcode}
              />
              <Text style={styles.headers}>Country:</Text>
              <TextInput
                style={styles.textBoxes}
                onChangeText={(text) => setAddress(addr => ({...addr, country: text }))}
                value={address.country}
              />
            </>
          ) : (
            <>
              <Text style={styles.displayText}>{address.firstLineAddress}</Text>
              {address.secondLineAddress
                ?
                <>
                  <Text style={styles.headers}>Second Address:</Text>
                  <Text style={styles.displayText}>
                    {address.secondLineAddress}
                  </Text>
                </>
                : null
              }
              <Text style={styles.headers}>City:</Text>
              <Text style={styles.displayText}>{address.city}</Text>
              <Text style={styles.headers}>Postcode:</Text>
              <Text style={styles.displayText}>{address.postcode}</Text>
              <Text style={styles.headers}>Country:</Text>
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
  loadingContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    fontFamily: 'Roboto_medium',
  },
  loading: {
    fontFamily: 'Roboto_medium',
    fontSize: 50,
    color: '#67A036',
    marginTop: '60%',
    textAlign: 'center',
    marginBottom: '-40%',
    zIndex: 1,
  },
});
