import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { Item, Input, Label, Button } from 'native-base';
import { SIGN_IN } from '../queries/login';
import { useMutation } from '@apollo/client';

export default function Login({ navigation, route }) {
  const [initialEmail, setInitialEmail] = useState('');
  const { token } = route.params;
  const [signIn, { data, error }] = useMutation(SIGN_IN);
  const [isLoading, setIsLoading] = useState(true);
  const [password, setPassword] =useState('');

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

  function login() {
    signIn({ variables: { email: initialEmail, password: password } });
  }

  function register() {
    navigation.navigate('Register');
  }

  if (isLoading) {
    return (
      <ImageBackground
        style={{ flex: 1 }}
        source={require('../assets/login-background-keyboard.jpg')}
      />
    );
  } else {
    return (
      <ImageBackground
        style={{ flex: 1 }}
        source={require('../assets/login-background-keyboard.jpg')}
      >
        <View style={styles.logo}>
          <Image
            style={styles.logoPic}
            source={require('../assets/logo.png')}
          />
        </View>
        <View style={styles.title}>
          <Text style={styles.title}>Sign In</Text>
        </View>
        <View style={styles.container}>
          <Item floatingLabel style={styles.labelContainer}>
            <Label style={styles.label}>{'   '}Email</Label>
            <Input
              keyboardType='email-address'
              autoCapitalize='none'
              onChangeText={(text) => setInitialEmail(text)}
              value={initialEmail}
              style={{ color: 'white', fontFamily: 'Roboto_medium' }}
            />
          </Item>
          <Item floatingLabel style={styles.labelContainer}>
            <Label style={styles.label}>Password</Label>
            <Input
              secureTextEntry={true}
              autoCapitalize='none'
              onChangeText={(text) => setPassword(text)}
              value ={password}
              style={{ color: 'white', fontFamily: 'Roboto_medium' }}/>
          </Item>
          <View>
            <Button rounded onPress={login} style={styles.button}>
              <Text
                style={{
                  fontFamily: 'Roboto_medium',
                  fontSize: 20,
                  color: 'white',
                }}
              >
                Login
              </Text>
            </Button>
          </View>
          <TouchableOpacity style={styles.register} onPress={register}>
            <Text style={styles.register}>Not signed up? Register here</Text>
          </TouchableOpacity>
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
  register: {
    marginTop: '5%',
    alignItems: 'center',
    color: 'white',
    fontFamily: 'Roboto_medium',
    fontFamily: 'Roboto_medium',
  },
});
