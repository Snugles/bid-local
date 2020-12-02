import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
} from 'react-native';
import Navbar from '../components/Navbar';

export default function Login({ navigation }) {
  const [username, setUsername] = useState('');
  
  function login () {
    return;
  }

  return (
    <>
    <Navbar navigation={navigation} canGoBack={true}/>
    <View style={styles.container}>
      <Text style={styles.headers}>
        Username:
      </Text>
      <TextInput 
        style={styles.textBoxes}
        onChangeText={text => setUsername(text)}
        value={username}/>
      <Button
        title='Login'
        onPress={login()}
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