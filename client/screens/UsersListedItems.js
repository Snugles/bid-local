import React, {useState, useEffect} from 'react';
import {
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
  Button
} from 'react-native';
import { Icon } from "native-base";
import Navbar from '../components/Navbar';
import Timer from '../components/Timer';
import { GET_USER_ITEMS, UPDATE_ITEM } from '../queries/usersListedItems'
import { useLazyQuery, useMutation } from '@apollo/client';

export default function UsersItems({navigation,route}) {
  const email = route.params.email.current;
  const [getItems,{loading, error, data}] = useLazyQuery(GET_USER_ITEMS, {
    fetchPolicy: 'cache-and-network',
    variables: { email: email }
  });

  useEffect(()=>{
    console.log('loading: ', loading);
    console.log('error: ', error);
    console.log('data: ', data);
  }, [loading, error, data]);

  useEffect(()=>{
    getItems();
  }, []);
  
  if (loading) return (<Text>Loading...</Text>);
  if (error) return (<Text>Error: {error}</Text>);
  
  return (
    <SafeAreaView>
    <Navbar navigation={navigation} canGoBack={true}/>
    <ScrollView style={styles.container}>
    <Button title="Refresh"
        onPress={() => {
          getItems();
        }}
        color="#0C637F88"/>
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
      {data ? data.get_user_by_email.item.map((item)=>(
        <Panel
          key={item.id}
          id={item.id}
          name={item.name} 
          description={item.description} 
          deadline={new Date('December 5, 2020 12:00:00')}
          price={item.minPrice}/>
          )): null}
    </ScrollView>
    </SafeAreaView>
  );
}

function Panel (props) {
  const [listDataSource, setListDataSource] = useState([{
    isExpanded: false,
  }]);
  const [multiSelect, setMultiSelect] = useState(false);
  const [layoutHeight, setLayoutHeight] = useState(0);
  const [title, setTitle] = useState(props.name);
  const [description, setDescription] = useState(props.description);
  const [changeItem, {data, error, loading}] = useMutation(UPDATE_ITEM);
  
  useEffect(()=>{
    console.log('loading: ', loading);
    console.log('error: ', error);
    console.log('data: ', data);
  }, [loading, error, data]);

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
        minPrice:props.price,
        description: description,
      }
    };

    changeItem({variables:queryVariables});
  }

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const updateLayout = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...listDataSource];
    if (multiSelect) {
      array[index]['isExpanded'] = !array[index]['isExpanded'];
    } else {
      array.map((value, placeindex) =>
        placeindex === index
          ? (array[placeindex]['isExpanded'] =
            !array[placeindex]['isExpanded'])
          : (array[placeindex]['isExpanded'] = false),
      );
    }
    setListDataSource(array);
  };

  return (
    <SafeAreaView style={{flexShrink: 0,borderWidth: 5,
      borderStyle: 'solid',
      borderColor: '#00C793',
      width: '95%',
      margin:10}}>
      <View style={styles2.container}>
        <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
          <View style={{flexShrink: 0}}>
            <Text style={styles2.titleText}>{title}</Text>
            <Text>{props.price+'€'}</Text>
          </View>
          <Text>Time:</Text>
          <Timer deadline={props.deadline}/>
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
};
const ExpandableComponent = ({saveChanges,onClickFunction, title, description, layoutHeight, setDescription, setTitle}) => {
  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onClickFunction}
        style={styles2.header}>
        <Text style={styles2.header}>
          TOUCH HERE TO EDIT
        </Text>
      </TouchableOpacity>
      <View
        style={{
          height: layoutHeight,
          overflow: 'hidden',
        }}>
      <View>
        <Text>Title</Text>
        <TextInput style={styles2.textBoxes} value={title} onChangeText={text => {
          setTitle(text)}}></TextInput>
        <Text>Description</Text>
        <TextInput style={styles2.textBoxes} value={description} onChangeText={text => setDescription(text)}></TextInput>
      </View>
      <Button
        title='Save Changes'
        onPress={saveChanges}
        color= '#0C637F'/>
      </View>
    </View>
  );
};

const styles2 = StyleSheet.create({
  container: {
    width: '95%',
    flexShrink: 0,
    padding:10,
  },
  titleText: {
    flexShrink: 0,
    width: '95%',
    fontSize: 22,
    fontWeight: 'bold',
    width:'100%'
  },
  header: {
    width: '95%',
    fontSize: 16,
    fontWeight: '500',
  },
  textBoxes: {
    borderWidth:1,
    borderStyle:'solid',
    borderColor:'#EF476F',
    width:'95%',
    padding:10
  },
  text: {
    width:'95%',
    fontSize:16,
  },
  content: {
    width:'95%',
    backgroundColor:'#fff',
  },
});

const styles = StyleSheet.create({
  container: {
    flexDirection:'column',
    backgroundColor:'#fff',
    width:'100%',
    height:'100%',
    flexShrink:0,
  },
  box: {
    paddingLeft: 15,
    margin:10,
    height:100,
    width: '95%',
    flexShrink: 0,
    backgroundColor: '#0C637F',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  text: {
    color:'#fff',
    fontSize: 22,
    textAlign:'center',
  },
  itemImage: {
    width: 50,
    height: 50,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
});
