import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { APOLLO_SERVER_URI, APOLLO_WEB_SERVER_URI } from '@env';
import { WebSocketLink } from 'apollo-link-ws';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Navigator from './routes/HomeStack';
import { setContext } from '@apollo/client/link/context';

const getFonts = () => {
  return Font.loadAsync({
    Roboto_medium: require('./assets/fonts/Roboto-Medium.ttf'),
  });
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const email = useRef('');
  const id = useRef('');
  const token = useRef('');
  const uri = APOLLO_SERVER_URI;
  const webUri = APOLLO_WEB_SERVER_URI;


  const authLink = setContext((_, { headers }) => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NWJlMjc3LWNlMDEtNGQyMy1hZTgzLTRlNGIwNDEyZDM5ZiIsImVtYWlsIjoidGVzdEB1c2VyLmNvbSIsImlhdCI6MTYwNzQzMTM5NywiZXhwIjoxNjA3NDY3Mzk3fQ.P6SzTuZFXogmLvDKWxy8cGMINHKEuBKHrIlcSkrUl0w";
    return {
      headers: {
        ...headers,
        'x-token': token ? `${token}` : "",
      }
    }
  });

  useEffect(() => {
    console.log(token);
  }, [token]);

  const wsLink = new WebSocketLink({
    uri: webUri,
    options: {
      reconnect: true
    }
  });
  
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
    link: authLink.concat(splitLink),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      {fontsLoaded ? (
        <Navigator email={email} token={token}/>
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
