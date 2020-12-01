import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, ImageBackground, Dimensions } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Navbar from '../components/Navbar';

const windowWidth = Dimensions.get('window').width;

export default function Home({ navigation }) {
  const categories = [
    'Houses',
    'Electronics',
    'Motorcycles'
  ];

  const data = [
    {
      title: 'Item Title 1',
      startingPrice: '20€',
      image: require('../assets/item-test-1.jpg'),
    },
    {
      title: 'Item Title 2',
      startingPrice: '25€',
      image: require('../assets/item-test-2.jpg'),
    },
    {
      title: 'Item Title 3',
      startingPrice: '13€',
      image: require('../assets/item-test-3.jpg'),
    },
  ];

  const [currentCategory, setCurrentCategory] = useState(categories[0]);

  const itemList = data.map( (item, index) => (
    <View key={index} style={styles.itemView} onTouchStart={()=>{navigation.navigate('Item')}}>
      <ImageBackground style={styles.itemImage} resizeMode='cover' source={item.image}>
        <Text style={styles.itemTime}>04:45</Text>
      </ImageBackground>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemPrice}>{item.startingPrice}</Text>
    </View>
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