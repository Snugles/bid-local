import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import Navigator from './routes/HomeStack';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import {APOLLO_SERVER_URI} from '@env';
import { ApolloLink } from 'apollo-boost'
import { onError } from 'apollo-link-error'
import { HttpLink } from 'apollo-link-http';

const getFonts = () => {
  return Font.loadAsync({
    Roboto_medium: require('./assets/fonts/Roboto-Medium.ttf'),
  });
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [email, setEmail] = useState('test@email2.com');

  useEffect(()=>{
    console.log(email);
  }, [email]);

  const httpLink = new HttpLink({
    uri: APOLLO_SERVER_URI
  })

  const client = new ApolloClient({
    uri: APOLLO_SERVER_URI,
    cache: new InMemoryCache(),
    link: ApolloLink.from([errorLink, httpLink]),
  });

  return (
    <ApolloProvider client={client}>
    {fontsLoaded
      ?
      <Navigator email={email} setEmail={setEmail}/>
      :
      <AppLoading startAsync={getFonts} onFinish={()=>{setFontsLoaded(true)}}/>
    }
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navBar: {
    height: 80,
    paddingTop: 25,
    backgroundColor: '#FFD166',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  arrowContainer: {
    height: 40,
    width: '15%',
  },
  arrow: {
    height: 40,
    width: 30,
  },
  logoContainer: {
    width: '70%',
    height:50,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  navbarLogo: {
    height:50,
    width: 200,
  },
  burgerContainer: {
    width: '15%',
    height: 50
  },
});
