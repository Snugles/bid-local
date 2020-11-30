import React, {useEffect, useState} from 'react';
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

const ExpandableComponent = ({item, onClickFunction, title, description}) => {
  const [layoutHeight, setLayoutHeight] = useState(0);

  useEffect(() => {
    if (item.isExpanded) {
      setLayoutHeight(null);
    } else {
      setLayoutHeight(0);
    }
  }, [item.isExpanded]);

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onClickFunction}
        style={styles.header}>
        <Text style={styles.headerText}>
          Edit
        </Text>
      </TouchableOpacity>
      <View
        style={{
          height: layoutHeight,
          overflow: 'hidden',
        }}>
          <View>
            <Text>Title</Text>
            <TextInput style={styles.textBoxes} value={title}></TextInput>
            <Text>Description</Text>
            <TextInput style={styles.textBoxes} value={description}></TextInput>
          </View>
      </View>
    </View>
  );
};

export default function Panel (props) {
  const [listDataSource, setListDataSource] = useState([{
    isExpanded: false,
  }]);
  const [multiSelect, setMultiSelect] = useState(false);
  const [timeDiff, setTimeDiff] = useState(props.deadline-new Date(Date.now()));
  const [time, setTime] = useState('99:99:99:99')

  useEffect(()=>{
    setTimeout(()=>setTime(updateTime(timeDiff)), 1000);
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
      console.log(props.title)
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
      <View style={styles.container}>
        <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
          <View style={{flexShrink: 0}}>
            <Text style={styles.titleText}>{props.title}</Text>
            <Text>{props.price}</Text>
          </View>
          <Text>{time}</Text>
        </View>
        <ScrollView>
            <ExpandableComponent
              description={props.description}
              title={props.title}
              onClickFunction={() => {
                updateLayout(0);
              }}
              item={listDataSource[0]}
            />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '95%',
    flexShrink: 0,
  },
  titleText: {
    flexShrink: 0,
    width: '95%',
    fontSize: 22,
    fontWeight: 'bold',
    width:'100%'
  },
  header: {
    width: '95%'
  },
  headerText: {
    width: '95%',
    fontSize: 16,
    fontWeight: '500',
  },
  textBoxes: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#EF476F',
    width: '95%',
  },
  text: {
    width: '95%',
    fontSize: 16,
  },
  content: {
    width: '95%',
    backgroundColor: '#fff',
  },
});