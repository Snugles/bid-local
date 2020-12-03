import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, ImageBackground, Dimensions } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Navbar from '../components/Navbar';
import { GET_USERS } from '../queries/test'
import { useQuery } from '@apollo/client';

const windowWidth = Dimensions.get('window').width;

export default function Home({ navigation }) {
  const { loading, error, data } = useQuery(GET_USERS);

  useEffect(()=>{
    console.log('loading: ',loading);
    console.log('error: ',error);
    console.log('data: ',data);
  }, [loading, data, error]);

  const categories = [
    'Houses',
    'Electronics',
    'Motorcycles'
  ];

  const mockdata = [
    {
      title: 'Item Title 1',
      startingPrice: '20€',
      image: require('../assets/item-test-1.jpg'),
      itemId: 'd15da980-9d9e-4b5a-8b1c-f4c3223ea2a6',
    },
    {
      title: 'Item Title 2',
      startingPrice: '25€',
      image: require('../assets/item-test-2.jpg'),
      itemId: 'd4f446d7-9805-4214-995c-65e1a4744799',
    },
    {
      title: 'Item Title 3',
      startingPrice: '13€',
      image: require('../assets/item-test-3.jpg'),
      itemId: 'd15da980-9d9e-4b5a-8b1c-f4c3223ea2a6',
    },
  ];

  const [currentCategory, setCurrentCategory] = useState(categories[0]);

  const itemList = mockdata.map( (item, index) => (
    <TouchableWithoutFeedback key={index} onPress={()=>{navigation.navigate('Item', {id: item.itemId})}}>
      <View style={styles.itemView}>
        <ImageBackground style={styles.itemImage} resizeMode='cover' source={item.image}>
          <Text style={styles.itemTime}>04:45</Text>
        </ImageBackground>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemPrice}>{item.startingPrice}</Text>
      </View>
    </TouchableWithoutFeedback>
  ));

  const categoryList = categories.map(cat => (
    {
      label: cat.charAt(0).toUpperCase() + cat.slice(1),
      value: cat
    }
  ));

  return (
    <>
    <Navbar navigation={navigation} canGoBack={false}/>
    <ScrollView style={styles.container}>
      <View style={styles.homeContent}>
        <Text style={styles.categoryTitle}>Category:</Text>
        <DropDownPicker
          items={categoryList}
          defaultValue={categories[0]}
          containerStyle={{
            height: 40,
            marginBottom: 20,
          }}
          style={{
            backgroundColor: '#06D6A0',
            borderWidth: 0,
          }}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          arrowColor='white'
          arrowSize={20}
          labelStyle={{
            fontSize: 22,
            color: 'white',
          }}
          dropDownStyle={{
            backgroundColor: '#06D6A0',
            borderWidth: 0,
            borderTopWidth: 1,
            borderColor: 'white'
          }}
          onChangeItem={cat => setCurrentCategory(cat.value)}
        />
        <View style={styles.homeItems}>
          {itemList}
        </View>
      </View>
    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  categoryTitle: {
    fontSize: 22,
    marginBottom: 5,
  },
  homeContent: {
    flex: 1,
    padding: 15,
    flexDirection: 'column',
  },
  homeItems: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  itemView: {
    width: (windowWidth-45)/2,
    marginBottom: 15,
  },
  itemImage: {
    width: '100%',
    height: (windowWidth-45)/2,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  itemTime: {
    padding: 5,
    fontSize: 16,
    backgroundColor: '#0C637F88',
    color: 'white',
  },
  itemTitle: {
    fontSize: 20,
  },
  itemPrice: {
    fontSize: 16,
    color: '#666666',
  },
});