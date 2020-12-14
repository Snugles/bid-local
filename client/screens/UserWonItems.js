import React, { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
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
  }
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
    fontSize: 18,
    fontWeight: 'bold',
    width: '100%',
  },
  delete: {
    flexDirection: 'row',
    padding: 5,
    backgroundColor: '#EF476F',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});
