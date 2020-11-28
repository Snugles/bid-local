import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, ImageBackground, Dimensions, TextInput } from 'react-native';
import Carousel from 'react-native-snap-carousel';

export default function Item() {

  const [offerBid, setOfferBid] = useState('');

  const windowWidth = Dimensions.get('window').width;

  const data = {
    title: 'Item Title',
    startingPrice: '20€',
    images: [require('../assets/item-test-1.jpg'),require('../assets/item-test-2.jpg'),require('../assets/item-test-3.jpg')],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque suscipit, eros at scelerisque convallis, risus felis tristique tortor, non mattis elit nulla vitae libero. Aliquam sollicitudin ex pellentesque tempus cursus. Etiam fermentum nisi tincidunt, tincidunt elit ac, malesuada dui. Nunc tempus fermentum volutpat. Aenean accumsan nisi vitae volutpat tristique.',
    sellerInfo: {
      username: 'username',
      email: 'user@email.com',
      telephone: '1234569732'
    }
  }

  const imageList = ({item,index}) => {
    return (
      <ImageBackground style={styles.itemImage} resizeMode='contain' source={item}></ImageBackground>
    )
  }

  function handleCurrency (input) {
    console.log(input);
    if (input) {
      if (input.search(/[^0-9,]/g) === -1) { // if string only contains (0123456789,)
        if(input.indexOf(',') !== -1) {
          input = input.slice(0, input.indexOf(',')+3)
          if (input.search(/(,).*\1/g) === -1) { // if string doesn't contains multiple commas
            setOfferBid(input);
          }
        } else {
          setOfferBid(input);
        }
      } else {
        console.log('invalid character');
      }
    } else {
      setOfferBid(input);
    }
  }


  return (
    <ScrollView style={styles.container}>
      <Carousel
        containerCustomStyle={{backgroundColor: '#06D6A0', paddingVertical: 10}}
        layout={"default"}
        data={data.images}
        sliderWidth={windowWidth}
        itemWidth={windowWidth-windowWidth/6}
        renderItem={imageList}
      />
      <View style={styles.itemInfo} >
        <Text style={styles.itemTitle} >{data.title}</Text>
        <Text style={styles.itemPrice} >{data.startingPrice}</Text>
        <View style={styles.time}>
          <Text style={{color: 'white', fontSize: 16}} >Time Left:</Text>
          <Text style={{color: 'white', fontSize: 25}}>02:56</Text>
        </View>
        <View style={styles.bidView}>
          <TextInput
            style={styles.bidInput}
            value={offerBid}
            onChangeText={(text) => handleCurrency(text)}
            keyboardType='numeric'
            placeholder='0,00'
          />
          <Text style={styles.bidCurrency}>€</Text>
        </View>
        
        <Text style={{fontWeight: '700', fontSize: 18}} >Item Description:</Text>
        <Text style={{fontSize: 16}} >{data.description}</Text>
        <View style={styles.userInfo} >
            <Text style={{fontWeight: '700', fontSize: 18}} >Seller Info</Text>
            <Text style={{fontSize: 16}} ><Text style={{fontWeight: '700'}}>Username:</Text> {data.sellerInfo.username}</Text>
            <Text style={{fontSize: 16}} ><Text style={{fontWeight: '700'}}>Email:</Text> {data.sellerInfo.email}</Text>
            <Text style={{fontSize: 16}} ><Text style={{fontWeight: '700'}}>Tel:</Text> {data.sellerInfo.telephone}</Text>
          </View>
      </View>

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    marginTop: 80
  },
  itemImage: {
    width: '100%',
    height: 300,
    backgroundColor: 'black'
  },
  itemInfo: {
    width: '100%',
    padding: 15,
  },
  itemTitle: {
    fontSize: 25,
    fontWeight: '600'
  },
  itemPrice: {
    fontSize: 20,
    color: '#666666'
  },
  time: {
    justifyContent: 'center',
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: '#0C637F',
    padding: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  bidView: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  bidInput: {
    flex: 1,
    fontSize: 25,
    padding: 10,
  },
  bidCurrency: {
    fontSize: 25,
    padding: 10,
  },
  userInfo: {
    marginTop: 20,
  }
});