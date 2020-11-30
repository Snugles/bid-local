import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Panel from './UsersItemsPanel.js';

export default function UsersItems() {
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
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.text}>
          Add additional item
        </Text>
      </View>
      {console.log(data)}
      {data.map((item)=>(
        <Panel 
          key={item.title}
          title={item.title} 
          description={item.description} 
          deadline={item.deadline}
          price='20€'/>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'column',
    marginTop:80,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'flex-start',
    width:'100%',
    height:'100%',
    flexShrink: 0,
  },
  box: {
    margin:10,
    height:100,
    width: '95%',
    flexShrink: 0,
    backgroundColor: '#0C637F',
    flexDirection:'row',
    justifyContent:'center',
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