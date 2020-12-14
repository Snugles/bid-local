import React, { useEffect, useRef } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { Content, Text, List, ListItem, Icon } from "native-base";

export default function SideBar({ navigation, hideSide, setHideSide }) {

  const fadeAnim = useRef(new Animated.Value(300)).current

  useEffect(() => {
    if (hideSide) {
      Animated.timing(
        fadeAnim,
        {
          toValue: 300,
          duration: 300,
          useNativeDriver: false,
        }
      ).start();
    } else {
      Animated.timing(
        fadeAnim,
        {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }
      ).start();
    }
    
  }, [hideSide]);

  return (
    <Animated.View style={[styles.container, {transform: [{ translateX: fadeAnim }]} ]}>
      <Content>
        <List>
          <ListItem style={styles.sidebarItem} onPress={()=>{navigation.navigate('Home'); setHideSide(true)}}>
            <Icon type="MaterialCommunityIcons" name="home" style={styles.sidebarIcon}/>
            <Text style={styles.sidebarText}>Home</Text>
          </ListItem>
          <ListItem onPress={()=>{navigation.navigate('UserInfo'); setHideSide(true)}}>
            <Icon type="MaterialCommunityIcons" name="account" style={styles.sidebarIcon}/>
            <Text style={styles.sidebarText}>Profile</Text>
          </ListItem>
          <ListItem onPress={()=>{navigation.navigate('UserWonItems'); setHideSide(true)}}>
            <Icon type="MaterialCommunityIcons" name="crown" style={styles.sidebarIcon}/>
            <Text style={styles.sidebarText}>Won Items</Text>
          </ListItem>
          <ListItem onPress={()=>{navigation.navigate('UsersItems'); setHideSide(true)}}>
            <Icon type="MaterialCommunityIcons" name="format-list-bulleted-square" style={styles.sidebarIcon}/>
            <Text style={styles.sidebarText}>User Items</Text>
          </ListItem>
          <ListItem onPress={()=>{navigation.navigate('AddItem'); setHideSide(true)}}>
            <Icon type="MaterialCommunityIcons" name="plus" style={styles.sidebarIcon}/>
            <Text style={styles.sidebarText}>Add Item</Text>
          </ListItem>
          <ListItem onPress={()=>{navigation.navigate('Login'); setHideSide(true)}}>
            <Icon type="MaterialCommunityIcons" name="logout" style={styles.sidebarIcon}/>
            <Text style={styles.sidebarText}>Logout</Text>
          </ListItem>
        </List>
      </Content>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#118AB2',
    position: 'absolute',
    zIndex: 99,
    right: 0,
    width: 300,
    marginTop: 56,
  },
  sidebarItem: {
    borderBottomColor: 'white'
  },
  sidebarIcon: {
    color: 'white',
    marginRight: 10,
  },
  sidebarText: {
    fontSize: 20,
    color: 'white',
  },
});