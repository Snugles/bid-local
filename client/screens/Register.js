import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { Item, Input, Label, Button } from 'native-base';
// import { SIGN_IN } from '../queries/login';
import { useMutation } from '@apollo/client';

export default function Register({ navigation, route }) {
  const [initialEmail, setInitialEmail] = useState('');
  const { token } = route.params;
  const [signIn, { data, error }] = useMutation(SIGN_IN);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('error: ', error);
    if (data && data.sign_in) {
      console.log(data);
      token.current = data.sign_in.token;
      navigation.navigate('Home');
    }
  }, [data, error]);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  function sendDetails() {
    register({
      variables: {
        firstName: firstName,
        lastName: lastName,
        password: 'user',
        email: email,
        phoneNumber: phoneNumber,
        firstLineAddress: firstLineAddress,
        secondLineAddress: secondLineAddress,
        city: city,
        postcode: postcode,
        country: country,
      },
    });
  }

  if (isLoading) {
    return (
      <ImageBackground
        style={{ flex: 1 }}
        source={require('../assets/register.jpg')}
      />
    );
  } else {
    return (
      <ImageBackground
        style={{ flex: 1 }}
        source={require('../assets/register.jpg')}
      >
        <View style={styles.logo}>
          <Image
            style={styles.logoPic}
            source={require('../assets/logo.png')}
          />
        </View>
        <View style={styles.title}>
          <Text style={styles.title}>Register</Text>
        </View>
        <View style={styles.container}>
          <Item floatingLabel style={styles.labelContainer}>
            <Label style={styles.label}>Email</Label>
            <Input
              onChangeText={(text) => setInitialEmail(text)}
              value={initialEmail}
              style={{ color: 'white', fontFamily: 'Roboto_medium' }}
            />
          </Item>
          <Item floatingLabel last style={styles.labelContainer}>
            <Label style={styles.label}>Password</Label>
            <Input style={{ color: 'white', fontFamily: 'Roboto_medium' }} />
          </Item>
          <View>
            <Button rounded onPress={sendDetails} style={styles.button}>
              <Text
                style={{
                  fontFamily: 'Roboto_medium',
                  fontSize: 20,
                  color: 'white',
                }}
              >
                Register
              </Text>
            </Button>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  headers: {
    fontWeight: 'bold',
    fontSize: 16,
    justifyContent: 'center',
  },
  textBoxes: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#EF476F',
    padding: 10,
    marginBottom: 10,
    height: 60,
  },
  button: {
    justifyContent: 'center',
    padding: 16,
    alignSelf: 'center',
    width: '40%',
    marginTop: 30,
    backgroundColor: '#118AB2',
    fontFamily: 'Roboto_medium',
  },
  logo: {
    marginBottom: '5%',
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  logoPic: {
    width: '50%',
    resizeMode: 'contain',
  },
  label: {
    fontFamily: 'Roboto_medium',
    color: 'white',
  },
  labelContainer: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Roboto_medium',
    fontSize: 30,
    color: 'white',
    marginBottom: '5%',
  },
});
