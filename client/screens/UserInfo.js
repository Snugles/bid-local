import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Button,
  TextInput,
} from 'react-native';
import Navbar from '../components/Navbar';

export default function UserInfo({ navigation }) {
  const [username, setUsername] = useState('snuglywugly');
  const [email, SetEmail] = useState('email@gmail.com');
  const [phoneNumber, setPhoneNumber] = useState('07425 058395');
  const [editMode, setEditMode] = useState(false);

  function toggle () {
    setEditMode(!editMode);
  }
  
  return (
    <>
    <Navbar navigation={navigation} canGoBack={true}/>
    <ScrollView style={styles.container}>
      <Text style={styles.headers}>
        Username:
      </Text>
      {editMode ? 
        <TextInput 
          style={styles.textBoxes}
          onChangeText={text => setUsername(text)}
          value={username}/>
        :<Text style={styles.displayText}>{username}</Text>}
      <Text style={styles.headers}>
        Email:
      </Text>
        {editMode ? 
        <TextInput 
          style={styles.textBoxes}
          onChangeText={text => SetEmail(text)}
          value={email}/>
        :<Text style={styles.displayText}>{email}</Text>}
      <Text style={styles.headers}>
        Phone Number:
      </Text>
      {editMode ? 
      <TextInput 
        style={styles.textBoxes}
        onChangeText={text => setPhoneNumber(text)}
        value={phoneNumber}/> 
      :<Text style={styles.displayText}>{phoneNumber}</Text>}
      {editMode ? 
      <Button
        title='Press to Save Changes'
        onPress={toggle}
        color='#EF476F'/>
      :<Button
        title='Press to Edit Details'
        onPress={toggle}
        color= '#0C637F'/>}
    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  headers : {
    fontWeight: 'bold',
    fontSize: 16
  },
  displayText : {
    width: '100%',
    padding:11,
    marginBottom:10
  },
  textBoxes: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#EF476F',
    width: '100%',
    padding:10,
    marginBottom:10
  },
  Button:{
    flex: 1,
    justifyContent: "center",
    padding: 16,
    width:'50%'
  }
});