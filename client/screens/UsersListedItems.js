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
} from 'react-native';
import { Icon } from "native-base";
import Navbar from '../components/Navbar';

export default function UsersItems({navigation}) {
  const data = [
    {
      title:'title 1',
      description:'description description description description',
      deadline:new Date('December 25, 2020 12:00:00'),
      price:'20€',
    },
    {
      title:'title 2',
      description:'description description description description',
      deadline:new Date('December 31, 2020 24:00:00'),
      price:'20€',
    }
  ]

  return (
    <>
    <Navbar navigation={navigation} canGoBack={true}/>
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>{navigation.navigate('AddItem')}} style={styles.box}>
        <Text style={styles.text}>
          Add additional item
        </Text>
        <Icon type="MaterialCommunityIcons" name="plus" style={{color: 'white', fontSize: 70}}/>
      </TouchableOpacity>
      {data.map((item)=>(
        <Panel 
          key={item.title}
          title={item.title} 
          description={item.description} 
          deadline={item.deadline}
          price='20€'/>
        ))}
    </View>
    </>
  );
}

const ExpandableComponent = ({onClickFunction, title, description, layoutHeight, setDescription, setTitle}) => {
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
            <TextInput style={styles2.textBoxes} value={title} onChangeText={text => setTitle(text)}></TextInput>
            <Text>Description</Text>
            <TextInput style={styles2.textBoxes} value={description} onChangeText={text => setDescription(text)}></TextInput>
          </View>
      </View>
    </View>
  );
};
function Panel (props) {
  const [listDataSource, setListDataSource] = useState([{
    isExpanded: false,
  }]);
  const [multiSelect, setMultiSelect] = useState(false);
  const [timeDiff, setTimeDiff] = useState(props.deadline-new Date(Date.now()));
  const [time, setTime] = useState('99:99:99:99')
  const [layoutHeight, setLayoutHeight] = useState(0);
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);

  useEffect(() => {
    if (listDataSource[0].isExpanded) {
      setLayoutHeight(null);
    } else {
      setLayoutHeight(0);
    }
  }, [listDataSource[0].isExpanded]);

  useEffect(()=>{
    let timer = setTimeout(()=>setTime(updateTime(timeDiff)), 1000);

    return ()=>{
      clearTimeout(timer);
    }
  },[timeDiff]);

  function updateTime (diff) { 
    if (diff > 0) {
      const days=Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours=Math.floor((diff / (1000 * 60 * 60)) % 24);
      let minutes=Math.floor((diff / 1000 / 60) % 60);
      let seconds=Math.floor((diff / 1000) % 60);
      if (minutes<10) {
        minutes='0'+minutes;
      }
      if (seconds<10) {
        seconds='0'+seconds;
      }
      setTimeDiff(timeDiff-1000);
      return `${days}:${hours}:${minutes}:${seconds}`
    } else {
      return 'finished';
    }
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
            <Text style={styles2.titleText}>{props.title}</Text>
            <Text>{props.price}</Text>
          </View>
          <Text>{time}</Text>
        </View>
        <ScrollView>
            <ExpandableComponent
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
    alignItems:'center',
    justifyContent:'flex-start',
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