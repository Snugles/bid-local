import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
} from 'react-native';

export default function UserInfo() {
  const [username, setUsername] = useState('');
  
  function login () {
    return;
  }

  return (
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
  );
}

const styles = StyleSheet.create({
  container: {
    width:'95%',
    alignSelf:'center'
  },
  headers : {
    fontWeight: 'bold',
    fontSize:'16px',
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