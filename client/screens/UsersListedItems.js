import React, { useState, useEffect, useCallback } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import Panel from '../components/ItemPanel.js'
import { Icon } from 'native-base';
import Navbar from '../components/Navbar';
import { GET_USER_ITEMS } from '../queries/usersListedItems';
import { useLazyQuery } from '@apollo/client';
import bidSubscription from '../queries/subscription';

export default function UsersItems({ navigation, route }) {
  bidSubscription();
  const [isLoading, setIsLoading] = useState(true);
  const [getItems, { loading, error, data }] = useLazyQuery(GET_USER_ITEMS, {
    fetchPolicy: 'cache-and-network',
  });
  const [refresh, setRefresh] = useState(false);
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    setIsLoading(false);
    getItems();
  }, []);

  useEffect(() => {
    if (data) {
      setItemList(data.get_user_info.item);
    }
  }, [data]);

  const onRefresh = useCallback(() => {
    setRefresh(true);

    setTimeout(() => {
      getItems();
      setRefresh(false);
    }, 2000);
  }, []);

  function deleteItem (id) {

    setItemList(items => {
      return items.reduce((acc, current)=>{
        if (current.id !== id) acc.push(current);
        return acc
      }, []);
    });
  }

  if (loading)
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.loading}>Loading...</Text>
        <Image source={require('../assets/ecommerce.gif')} />
      </SafeAreaView>
    );
  if (error) return <Text>Error: {error}</Text>;

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.loading}>Loading...</Text>
        <Image source={require('../assets/ecommerce.gif')} />
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={{flex: 1}}>
        <Navbar navigation={navigation} canGoBack={true} />
        <ScrollView
          style={styles.container}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
          }
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AddItem');
            }}
            style={styles.box}
          >
            <Text style={styles.text}>Add additional item</Text>
            <Icon
              type="MaterialCommunityIcons"
              name="plus"
              style={{ color: 'white', fontSize: 70 }}
            />
          </TouchableOpacity>
          {itemList.length > 0
            ? itemList.map((item) => (
                <Panel
                  deleteItem={deleteItem}
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  description={item.description}
                  deadline={item.auctionEnd}
                  price={item.minimumBid}
                />
              ))
            : null}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: '100%',
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 15,
  },
  box: {
    paddingLeft: 15,
    height: 100,
    width: '100%',
    flexShrink: 0,
    backgroundColor: '#0C637F',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 22,
    textAlign: 'center',
  },
  itemImage: {
    width: 50,
    height: 50,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
});