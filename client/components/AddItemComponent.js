import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, Dimensions, TouchableOpacity } from 'react-native'

const windowWidth = Dimensions.get('window').width;


export default function AddItem() {
  const [title, setTitle] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [description, setDescription] = React.useState('');

  const images=[
    {
      key:0,
      image:require('../assets/item-test-1.jpg'),
    },
    {
      key:1,
      image:require('../assets/item-test-2.jpg'),
    },
    {
      key:2,
      image:require('../assets/item-test-3.jpg'),
    },
    {
      key:4,
      image:require('../assets/plus.png'),
    }
  ];

  return (
    <ScrollView style={styles.container}>
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
        {images.map(image=>(
        <TouchableOpacity>
        <Image 
          key={image.key}
          style={styles.itemImage}
          source={image.image}/>
        </TouchableOpacity>))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width:'95%'
  },
  textBoxes: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#EF476F',
    width: '95%',
    padding:10
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