import { useMutation, useQuery } from '@apollo/client';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Dimensions, Image,




  ImageBackground,



  RefreshControl, SafeAreaView,




  ScrollView, StyleSheet,
  Text,




  TextInput,
  TouchableHighlight, View
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Navbar from '../components/Navbar';
import Timer from '../components/Timer';
import { GET_ITEM_BY_ID, PLACE_A_BID } from '../queries/item';
import bidSubscription from '../queries/subscription';

export default function Item({ navigation, route }) {
  bidSubscription();
  const windowWidth = Dimensions.get('window').width;
  const [offerBid, setOfferBid] = useState('');
  const [images, setImages] = useState([]);
  const [typeError, setTypeError] =useState('');

  const [changeItem, changedItem] = useMutation(PLACE_A_BID);
  const { loading, error, data } = useQuery(GET_ITEM_BY_ID, {
    variables: {
      id: route.params.id,
    },
  });

  const { email } = route.params;
  const [refresh, setRefresh] = useState(false);
  const onRefresh = useCallback(() => {
    setRefresh(true);

    setTimeout(() => {
      setRefresh(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (data) {
      if (data.get_item_by_Id.picUrl3 !== '')
        setImages([
          {uri:data.get_item_by_Id.picUrl1},
          {uri:data.get_item_by_Id.picUrl2},
          {uri:data.get_item_by_Id.picUrl3}]);
      else if (data.get_item_by_Id.picUrl2 !== '')
        setImages([
          {uri:data.get_item_by_Id.picUrl1},
          {uri:data.get_item_by_Id.picUrl2}]);
      else setImages([{uri:data.get_item_by_Id.picUrl1}]);
    }
  }, [data]);

  const imageList = ({ item, index }) => {
    return (
      <ImageBackground
        key={index}
        style={styles.itemImage}
        resizeMode="contain"
        source={item}
      />
    );
  };

  function LatestBid() {
    const mutationVariables = {
      itemId: route.params.id,
      biddingPrice: offerBid,
    };
    console.log(mutationVariables)
    changeItem({variables:mutationVariables});
  }

  function handleCurrency(input) {
    setTypeError('');
    if (input) {
      if (input.search(/[^0-9,]/g) === -1) {
        // if string only contains (0123456789,)
        if (input.indexOf(',') !== -1) {
          input = input.slice(0, input.indexOf(',') + 3);
          if (input.search(/(,).*\1/g) === -1) {
            // if string doesn't contains multiple commas
            setOfferBid(input);
          }
        } else {
          setOfferBid(input);
        }
      } else {
        setTypeError('Invalid Character');
      }
    } else {
      setOfferBid(input);
    }
  }

  if (loading)
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.loading}>Loading...</Text>
        <Image source={require('../assets/ecommerce.gif')} />
      </SafeAreaView>
    );
  if (error) return <Text>Error: {error}</Text>;

  return (
    <>
      <Navbar navigation={navigation} canGoBack={true} />
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }
      >
        <Carousel
          containerCustomStyle={{
            backgroundColor: '#06D6A0',
            paddingVertical: 10,
          }}
          layout={'default'}
          data={images}
          sliderWidth={windowWidth}
          itemWidth={windowWidth - windowWidth / 6}
          renderItem={imageList}
        />
        <View style={styles.itemInfo}>
          <Text style={styles.itemTitle}>{data.get_item_by_Id.name}</Text>
          <Text style={styles.itemPrice}>{data.get_item_by_Id.minimumBid}€</Text>
          <View style={styles.time}>
            <Text style={{ color: 'white', fontSize: 16 }}>Time Left:</Text>
            <Timer style={{ color: 'white', fontSize: 25 }} deadline={data.get_item_by_Id.auctionEnd}/>
          </View>
          <View style={styles.bidView}>
            <View style={styles.bidBorder}>
              <TextInput
                style={styles.bidInput}
                value={offerBid}
                onChangeText={(text) => handleCurrency(text)}
                keyboardType="numeric"
              />
              <Text style={styles.bidCurrency}>€</Text>
            </View>
            <TouchableHighlight
              style={styles.bidButton}
              onPress={() => {
                LatestBid();
              }}
            >
              <Text style={{ fontSize: 16, color: 'white' }}>MAKE OFFER</Text>
            </TouchableHighlight>
          </View>
          {typeError ? (
            <Text style={{ color: 'red', fontSize: 25 }}>{typeError}</Text>
          ) : null}

          <Text style={{ fontWeight: '700', fontSize: 18 }}>
            Item Description:
          </Text>
          <Text style={{ fontSize: 16 }}>
            {data.get_item_by_Id.description}
          </Text>
          <View style={styles.userInfo}>
            <Text style={{ fontWeight: '700', fontSize: 18 }}>Seller Info</Text>
            <Text style={{ fontSize: 16 }}>
              <Text style={{ fontWeight: '700' }}>Name: </Text>
              {data.get_item_by_Id.user.firstName}{' '}
              {data.get_item_by_Id.user.lastName}
            </Text>
            <Text style={{ fontSize: 16 }}>
              <Text style={{ fontWeight: '700' }}>Email: </Text>
              {data.get_item_by_Id.user.email}
            </Text>
            <Text style={{ fontSize: 16 }}>
              <Text style={{ fontWeight: '700' }}>Tel: </Text>
              {data.get_item_by_Id.user.phoneNumber}
            </Text>
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
  itemImage: {
    width: '100%',
    height: 300,
    backgroundColor: 'black',
  },
  itemInfo: {
    width: '100%',
    padding: 15,
  },
  itemTitle: {
    fontSize: 25,
    fontWeight: '600',
  },
  itemPrice: {
    fontSize: 20,
    color: '#666666',
  },
  time: {
    justifyContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0C637F',
    padding: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  bidView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    marginBottom: 20,
  },
  bidBorder: {
    borderWidth: 1,
    borderColor: 'gray',
    flex: 1,
    flexDirection: 'row',
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
  bidButton: {
    justifyContent: 'center',
    backgroundColor: '#06D6A0',
    padding: 10,
  },
  userInfo: {
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    fontFamily: 'Roboto_medium',
  },
  loading: {
    fontFamily: 'Roboto_medium',
    fontSize: 50,
    color: '#67A036',
    marginTop: '60%',
    textAlign: 'center',
    marginBottom: '-40%',
    zIndex: 1,
  },
});
