import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, Dimensions, TouchableOpacity } from 'react-native'
import Navbar from '../components/Navbar';

const windowWidth = Dimensions.get('window').width;


export default function AddItem({ navigation }) {
  const [title, setTitle] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [description, setDescription] = React.useState('');

  const images=[
    {
      image:require('../assets/item-test-1.jpg'),
    },
    {
      image:require('../assets/item-test-2.jpg'),
    },
    {
      image:require('../assets/item-test-3.jpg'),
    },
    {
      image:require('../assets/plus.png'),
    }
  ];

  return (
    <>
    <Navbar navigation={navigation} canGoBack={true}/>
    <ScrollView style={styles.container} contentContainerStyle={{alignItems: 'center',}}>
      <Text>
        Title:
      </Text>
      <TextInput 
      style={styles.textBoxes}
      onChangeText={text => setTitle(text)}/>
      <Text>
        Starting Price:
      </Text>
      <TextInput 
      style={styles.textBoxes}
      onChangeText={text => setPrice(text)}/>
      <Text>
        Description:
      </Text>
      <TextInput 
      style={styles.textBoxes}
      onChangeText={text => setDescription(text)}/>
      <View style={styles.itemView}>
        {images.map((image, index)=>(
        <TouchableOpacity key={index}>
        <Image 
          style={styles.itemImage}
          source={image.image}/>
        </TouchableOpacity>))}
      </View>
    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  textBoxes: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#EF476F',
    width: '90%',
    padding:10,
    marginBottom: 15,
  },
  itemView: {
    width: '100%',
    marginBottom: 15,
    flexShrink:0,
    flexDirection:'row',
    justifyContent:'space-evenly',
    flexWrap:'wrap',
    padding:20,
  },
  itemImage: {
    flexShrink:0,
    width: 100,
    height:100,
  },

});