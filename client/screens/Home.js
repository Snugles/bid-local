import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  Dimensions,
  Image,
  SafeAreaView,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Navbar from '../components/Navbar';
import Timer from '../components/Timer';
import { GET_CATEGORIES, GET_ITEMS } from '../queries/home';
import { useQuery, useLazyQuery } from '@apollo/client';

const windowWidth = Dimensions.get('window').width;

export default function Home({ navigation, route }) {
  const [currentCategory, setCurrentCategory] = useState('ALL');
  const categories = useQuery(GET_CATEGORIES);
  const [getItems, items] = useLazyQuery(GET_ITEMS);
  const [isLoading, setIsLoading] = useState(true);

  const { email } = route.params;

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    // setIsLoading(false);
  }, []);

  useEffect(() => {
    if (categories.data) {
      getItems();
    }
  }, [categories]);

  useEffect(() => {
    console.log(currentCategory);
  }, [currentCategory]);

  const categ = ['ALL', 'ELECTRONICS', 'HOUSES', 'VEHICLES'];

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

  if (categories.loading) return <Text>Loading...</Text>;
  if (categories.error) {
    console.log('error', categories.error);
    return <Text>Error: </Text>;
  }

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loading}>Loading...</Text>
        <Image source={require('../assets/ecommerce.gif')} />
      </SafeAreaView>
    );
  } else {
    return (
      <>
        <Navbar navigation={navigation} canGoBack={false} />
        <ScrollView style={styles.container}>
          <View style={styles.homeContent}>
            <Text style={styles.categoryTitle}>Category:</Text>
            <DropDownPicker
              items={[{ name: 'ALL' }, ...categories.data.get_categories].map(
                (cat) => ({
                  label: cat.name.charAt(0) + cat.name.slice(1).toLowerCase(),
                  value: cat.name,
                }),
              )}
              defaultValue={'ALL'}
              containerStyle={{
                height: 40,
                marginBottom: 20,
              }}
              style={{
                backgroundColor: '#06D6A0',
                borderWidth: 0,
                fontFamily: 'Roboto_medium',
              }}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              arrowColor="white"
              arrowSize={20}
              labelStyle={{
                fontSize: 22,
                color: 'white',
                fontFamily: 'Roboto_medium',
              }}
              dropDownStyle={{
                backgroundColor: '#06D6A0',
                borderWidth: 0,
                borderTopWidth: 1,
                borderColor: 'white',
              }}
              onChangeItem={(cat) => setCurrentCategory(cat.value)}
            />
            <View style={styles.homeItems}>
              {items.data
                ? items.data.get_items.map((item, index) => (
                    <TouchableWithoutFeedback
                      key={index}
                      onPress={() => {
                        navigation.navigate('Item', { id: item.id });
                      }}
                    >
                      <View style={styles.itemView}>
                        <ImageBackground
                          style={styles.itemImage}
                          resizeMode="cover"
                          source={{ uri:item.picUrl1 }}
                        >
                          <Timer
                            style={styles.itemTime}
                            deadline={new Date('December 25, 2020 12:00:00')}
                          />
                        </ImageBackground>
                        <Text style={styles.itemTitle}>{item.name}</Text>
                        <Text style={styles.itemPrice}>{item.minPrice}€</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  ))
                : null}
            </View>
          </View>
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    fontFamily: 'Roboto_medium',
  },
  categoryTitle: {
    fontSize: 22,
    marginBottom: 5,
    fontFamily: 'Roboto_medium',
  },
  homeContent: {
    flex: 1,
    padding: 15,
    flexDirection: 'column',
    fontFamily: 'Roboto_medium',
  },
  homeItems: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    fontFamily: 'Roboto_medium',
  },
  itemView: {
    width: (windowWidth - 45) / 2,
    marginBottom: 15,
    fontFamily: 'Roboto_medium',
  },
  itemImage: {
    width: '100%',
    height: (windowWidth - 45) / 2,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    fontFamily: 'Roboto_medium',
  },
  itemTime: {
    padding: 5,
    fontSize: 16,
    backgroundColor: '#0C637F88',
    color: 'white',
    fontFamily: 'Roboto_medium',
  },
  itemTitle: {
    fontSize: 20,
    fontFamily: 'Roboto_medium',
  },
  itemPrice: {
    fontSize: 16,
    color: '#666666',
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
