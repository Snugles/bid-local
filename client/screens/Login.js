import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
} from 'react-native';
import { GET_USER_BY_EMAIL } from '../queries/login'
import { useLazyQuery } from '@apollo/client';
import Navbar from '../components/Navbar';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [getID,{data,error,loading}] = useLazyQuery(GET_USER_BY_EMAIL);
  const [id, SetID] =useState('');
  
  useEffect(()=>{
    console.log('loading: ',loading);
    console.log('error: ',error);
    console.log('data: ',data);
    if (data) {
      SetID(data);
    }
  }, [loading, data, error]);

  function login () {
    console.log('called')
    getID( {variables:{ email:email }} );
  }

  return (
    <>
    <Navbar navigation={navigation} canGoBack={true}/>
    <View style={styles.container}>
      <Text style={styles.headers}>
        Email:
      </Text>
      <TextInput 
        style={styles.textBoxes}
        onChangeText={text => setEmail(text)}
        value={email}/>
      <Button
        title='Login'
        onPress={login}
        color= '#0C637F'/>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    justifyContent: 'center',
  },
  headers : {
    fontWeight: 'bold',
    fontSize: 16,
    justifyContent:'center'
  },
  textBoxes: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#EF476F',
    padding:10,
    marginBottom:10
  },
  Button:{
    flex: 1,
    justifyContent: "center",
    padding: 16,
  }
});