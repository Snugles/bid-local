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
  TextInput,
  Button,
  RefreshControl,
} from 'react-native';
import { Icon } from 'native-base';
import Navbar from '../components/Navbar';
import Timer from '../components/Timer';
import { GET_USER_ITEMS, UPDATE_ITEM } from '../queries/usersListedItems';
import { useLazyQuery, useMutation } from '@apollo/client';

export default function UsersItems({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(true);
  const [getItems, { loading, error, data }] = useLazyQuery(GET_USER_ITEMS, {
    fetchPolicy: 'cache-and-network',
  });
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getItems();
  }, []);

  const onRefresh = useCallback(() => {
    setRefresh(true);

    setTimeout(() => {
      getItems();
      setRefresh(false);
    }, 2000);
  }, []);

  useEffect(() => {
    setIsLoading(false);
  }, []);

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
      <SafeAreaView>
        <Navbar navigation={navigation} canGoBack={true} />
        <ScrollView
          style={styles.container}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
          }
        >
          <Button
            title="Refresh"
            onPress={() => {
              getItems();
            }}
            color="#0C637F88"
          />
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
          {data
            ? data.get_user_info.item.map((item) => (
                <Panel
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  description={item.description}
                  deadline={new Date('December 5, 2020 12:00:00')}
                  price={item.minPrice}
                />
              ))
            : null}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

function Panel(props) {
  const [listDataSource, setListDataSource] = useState([
    {
      isExpanded: false,
    },
  ]);
  const [layoutHeight, setLayoutHeight] = useState(0);
  const [title, setTitle] = useState(props.name);
  const [description, setDescription] = useState(props.description);
  const [changeItem, { data, error, loading }] = useMutation(UPDATE_ITEM);

  useEffect(() => {
    if (listDataSource[0].isExpanded) {
      setLayoutHeight(null);
    } else {
      setLayoutHeight(0);
    }
  }, [listDataSource[0].isExpanded]);

  function saveChanges() {
    const queryVariables = {
      itemId: props.id,
      item: {
        name: title,
        minPrice: props.price,
        description: description,
      },
    };

    changeItem({ variables: queryVariables });
  }

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const updateLayout = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...listDataSource];

    array.map((value, placeindex) =>
      placeindex === index
        ? (array[placeindex]['isExpanded'] = !array[placeindex]['isExpanded'])
        : (array[placeindex]['isExpanded'] = false),
    );
    setListDataSource(array);
  };

  return (
    <SafeAreaView
      style={{
        flexShrink: 0,
        borderWidth: 5,
        borderStyle: 'solid',
        borderColor: '#00C793',
        width: '95%',
        margin: 10,
      }}
    >
      <View style={styles2.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexShrink: 0 }}>
            <Text style={styles2.titleText}>{title}</Text>
            <Text>{props.price + '€'}</Text>
          </View>
          <View style={styles2.timer}>
            <Text>Time:</Text>
            <Timer deadline={props.deadline} />
          </View>
        </View>
        <ScrollView>
          <ExpandableComponent
            saveChanges={saveChanges}
            description={description}
            title={title}
            setTitle={setTitle}
            setDescription={setDescription}
            onClickFunction={() => {
              updateLayout(0);
            }}
            listDataSource={listDataSource}
            layoutHeight={layoutHeight}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const ExpandableComponent = ({
  saveChanges,
  onClickFunction,
  title,
  description,
  layoutHeight,
  setDescription,
  setTitle,
}) => {
  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onClickFunction}
        style={styles2.header}
      >
        <Text style={styles2.header}>TOUCH HERE TO EDIT</Text>
      </TouchableOpacity>
      <View
        style={{
          height: layoutHeight,
          overflow: 'hidden',
        }}
      >
        <View>
          <Text>Title</Text>
          <TextInput
            style={styles2.textBoxes}
            value={title}
            onChangeText={(text) => {
              setTitle(text);
            }}
          ></TextInput>
          <Text>Description</Text>
          <TextInput
            style={styles2.textBoxes}
            value={description}
            onChangeText={(text) => setDescription(text)}
          ></TextInput>
        </View>
        <Button title="Save Changes" onPress={saveChanges} color="#0C637F" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    flexShrink: 0,
  },
  box: {
    paddingLeft: 15,
    margin: 10,
    height: 100,
    width: '95%',
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
    width: '95%',
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
    width: '95%',
    fontSize: 16,
    fontWeight: '500',
  },
  textBoxes: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#EF476F',
    padding: 10,
    marginBottom: 3,
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
