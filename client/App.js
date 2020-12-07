import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { APOLLO_SERVER_URI, APOLLO_WEB_SERVER_URI } from '@env';
import { WebSocketLink } from 'apollo-link-ws';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import Navigator from './routes/HomeStack';

const getFonts = () => {
  return Font.loadAsync({
    Roboto_medium: require('./assets/fonts/Roboto-Medium.ttf'),
  });
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const email = useRef('');
  const id = useRef('');

  useEffect(() => {
    console.log(email);
  }, [email]);

  const wsLink = new WebSocketLink({
    uri: APOLLO_WEB_SERVER_URI,
    options: {
      reconnect: true
    }
  });
  
  const uri = APOLLO_SERVER_URI;
  const link = new HttpLink({ uri: uri });
  
  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    link,
  );

  const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      {fontsLoaded ? (
        <Navigator email={email} id={id}/>
      ) : (
        <AppLoading
          startAsync={getFonts}
          onFinish={() => {
            setFontsLoaded(true);
          }}
        />
      )}
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
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  navbarLogo: {
    height: 50,
    width: 200,
  },
  burgerContainer: {
    width: '15%',
    height: 50,
  },
});
