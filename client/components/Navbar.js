import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Header, Button, Icon, Left, Right, Body } from "native-base";
import { StyleSheet, ImageBackground } from 'react-native';

export default function Navbar({navigation, canGoBack}) {


  return (
    <>
    <Header noShadow style={{backgroundColor: '#FFD166'}}>
      <Left>
        {canGoBack
          ?
          <Button transparent onPress={()=>{navigation.goBack()}}>
            <ImageBackground source={require('../assets/arrow.png')} style={styles.arrow} resizeMode='contain'/>
          </Button>
          :
          null
        }
      </Left>
      <Body>
        
      </Body>
      <Right>
        <Button transparent>
          <Icon name="menu" />
        </Button>
      </Right>
    </Header>
    </>
  );
}

const styles = StyleSheet.create({
  arrow: {
    height: 40,
    width: 30,
  },
});
