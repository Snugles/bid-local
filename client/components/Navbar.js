import 'react-native-gesture-handler';
import React, {useState} from 'react';
import { Header, Button, Left, Right, Body } from "native-base";
import { StyleSheet, ImageBackground, StatusBar } from 'react-native';
import SideBar from './SideBar';

export default function Navbar({navigation, canGoBack}) {
  const [hideSide, setHideSide] = useState(true);

  return (
    <>
    <Header style={{backgroundColor: '#FFD166'}}>
    <StatusBar backgroundColor='#CC8F00'/>
      <Left style={{flex: 1}}>
        {canGoBack
          ?
          <Button transparent onPress={()=>{navigation.goBack()}}>
            <ImageBackground source={require('../assets/arrow.png')} style={styles.arrow} resizeMode='contain'/>
          </Button>
          :
          null
        }
      </Left>
      <Body style={styles.logoContainer}>
        <ImageBackground source={require('../assets/logo.png')} style={styles.logo} resizeMode='contain'/>
      </Body>
      <Right style={{flex: 1}}>
        <Button transparent onPress={() => {setHideSide(hide => !hide)}}>
          <ImageBackground source={require('../assets/burger.png')} style={styles.burger} resizeMode='contain'/>
        </Button>
      </Right>
    </Header>
    <SideBar navigation={navigation} hideSide={hideSide} setHideSide={setHideSide}/>
    </>
  );
}

const styles = StyleSheet.create({
  arrow: {
    height: 40,
    width: 30,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    height: 50,
    width: 170,
  },
  burger: {
    height: 40,
    width: 45,
  },
});
