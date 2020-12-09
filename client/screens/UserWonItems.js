import React, { useState, useEffect, useCallback } from 'react';
import {
  Image,
  SafeAreaView,
  LayoutAnimation,
  StyleSheet,
  View,
  Text,
  ScrollView,
  UIManager,
  TouchableOpacity,
  Platform,
  RefreshControl,
} from 'react-native';
import Navbar from '../components/Navbar';
import { Icon } from 'native-base';
import { WON_ITEM_LIST, DELETE_ITEM } from '../queries/userWonItems';
import { useLazyQuery, useMutation } from '@apollo/client';

export default function UsersItems({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(true);
  const [getItems, { data }] = useLazyQuery(WON_ITEM_LIST, {
    fetchPolicy: 'cache-and-network',
  });
  const [refresh, setRefresh] = useState(false);
  const [itemList, setItemList] = useState(null);

  useEffect(() => {
    setIsLoading(false);
    getItems();
  }, []);

  function deleteItem (id) {
    console.log('deleteItem: ', id);
    console.log('deleteItem: ', itemList);

    setItemList(items => {
      return items.reduce((acc, current)=>{
        if (current.props.id !== id) acc.push(current);
        return acc
      }, []);
    });
  }

  useEffect(() => {
    if (data&&data.won_item_list&&data.won_item_list.length) {
      console.log(data.won_item_list)
      setItemList(data.won_item_list.map((item) => (
        <Panel
          key={item.id}
          id={item.id}
          name={item.name}
          price={item.minimumBid}
          user={item.user}
          deleteItem={deleteItem}
        />
      )));
    } else {
      setItemList(null);
    }
  }, [data]);

  const onRefresh = useCallback(() => {
    setRefresh(true);

    setTimeout(() => {
      getItems();
      setRefresh(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Navbar navigation={navigation} canGoBack={true} />
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }
      >
        {itemList}
      </ScrollView>
    </SafeAreaView>
  );
}

function Panel(props) {

  const [deleteItemById, { data }] = useMutation(DELETE_ITEM);

  useEffect(()=>{
    if (data) {
      if (data.delete_item_by_id) {
        console.log(props.id)
        props.deleteItem(props.id)
      }
    }
  }, [data])

  function handleDelete() {
    const deleteVariables = {
      itemId: props.id
    };
    deleteItemById({ variables: deleteVariables });
  }

  return (
    <SafeAreaView
      style={{
        borderWidth: 5,
        borderStyle: 'solid',
        borderColor: '#118AB2',
        width: '100%',
        marginTop: 15,
      }}
    >
      <View style={styles2.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <View style={{ marginRight: 'auto' }}>
            <Text style={styles2.titleText}>{props.name}</Text>
            <Text>{props.price + '€'}</Text>
            <Text>{props.user.firstName+' '+props.user.lastName}</Text>
            <TouchableOpacity style={styles2.delete} onPress={handleDelete}>
              <Icon type="MaterialCommunityIcons" name="trash-can" style={{ fontSize: 16, color: 'white'}}/>
              <Text style={{color: 'white', marginLeft: 5}}>DELETE</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginRight: 'auto' ,borderLeftWidth: 1, paddingLeft:5}}>
            <Text style={{fontWeight: 'bold'}}>{props.user.phoneNumber}</Text>
            <Text>{props.user.address.firstLineAddress}</Text>
            {props.user.address.secondLineAddress?<Text>{props.user.address.secondLineAddress}</Text>:null}
            <Text>{props.user.address.city}</Text>
            <Text>{props.user.address.postcode}</Text>
            <Text>{props.user.address.country}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
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

const styles2 = StyleSheet.create({
  container: {
    width: '100%',
    flexShrink: 0,
    padding: 10,
  },
  titleText: {
    flexShrink: 0,
    width: '95%',
    fontSize: 22,
    fontWeight: 'bold',
    width: '100%',
  },
  header: {
    alignSelf: 'flex-start',
    backgroundColor: '#00C793',
    marginTop: 10,
  },
  headerText: {
    fontWeight: '500',
    padding: 10,
    color: 'white',
    fontSize: 18,
  },
  textBoxes: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#EF476F',
    padding: 10,
    marginBottom: 5,
  },
  text: {
    width: '95%',
    fontSize: 16,
  },
  content: {
    width: '95%',
    backgroundColor: '#fff',
  },
  timer: {
    borderLeftWidth: 1,
    padding: 3,
  },
  delete: {
    flexDirection: 'row',
    padding: 5,
    backgroundColor: '#EF476F',
    justifyContent: 'center',
    alignItems: 'center',
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
