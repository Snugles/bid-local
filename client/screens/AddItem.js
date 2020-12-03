import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, Dimensions, TouchableOpacity, TouchableHighlight } from 'react-native'
import Navbar from '../components/Navbar';
import { CREATE_ITEM } from '../queries/addItem';
import { useMutation } from '@apollo/client';

const windowWidth = Dimensions.get('window').width;

export default function AddItem({ navigation }) {
  const [title, setTitle] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [createItem, {data, error, loading}] = useMutation(CREATE_ITEM);

  useEffect(()=>{
    console.log('loading: ',loading);
    console.log('error: ',error);
    console.log('data: ',data);

    if (data) {
      navigation.navigate('Item', {id: data.create_item.id});
    }

  }, [data]);

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

  function handleCurrency (input) {
    if (input) {
      if (input.search(/[^0-9,]/g) === -1) { // if string only contains (0123456789,)
        if(input.indexOf(',') !== -1) {
          input = input.slice(0, input.indexOf(',')+3)
          if (input.search(/(,).*\1/g) === -1) { // if string doesn't contains multiple commas
            setPrice(input);
          }
        } else {
          setPrice(input);
        }
      } else {
        console.log('invalid character');
      }
    } else {
      setPrice(input);
    }
  }

  function handleSubmit () {
    const queryVariables = {
      name: title,
      minPrice: parseInt(price),
      description: description,
      userId: "3a739a58-6189-45d7-bb1d-376569355ca8",
      categoryId: "2f4b1fff-6643-46fc-abee-40ddbd8896ae"
    };

    console.log(queryVariables);

    createItem({variables: queryVariables});
  }

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
      value={price}
      onChangeText={(text) => handleCurrency(text)}
      keyboardType='numeric'
      placeholder='0,00' />
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
      <TouchableHighlight style={styles.addItemButton} onPress={handleSubmit}>
        <Text style={{ fontSize: 18, color: 'white' }}>ADD ITEM</Text>
      </TouchableHighlight>
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
  addItemButton: {
    justifyContent: "center",
    backgroundColor: '#06D6A0',
    padding: 15,
    margin: 10,
  },
});