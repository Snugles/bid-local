import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { APOLLO_SERVER_URI } from '@env';
import { createHttpLink } from "apollo-link-http";
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import Navigator from './routes/HomeStack';


const link = createHttpLink({ uri: "/graphql" });

const getFonts = () => {
  return Font.loadAsync({
    Roboto_medium: require('./assets/fonts/Roboto-Medium.ttf'),
  });
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [email, setEmail] = useState('test@email2.com');

  useEffect(()=>{
    console.log(email);
  }, [email]);

  const uri = APOLLO_SERVER_URI;

  const client = new ApolloClient({
  //  link: createHttpLink({ uri: uri }),
  //   cache: new InMemoryCache()
    uri: uri,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      {fontsLoaded ? (
        <Navigator setEmail={setEmail} email={email} />
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
