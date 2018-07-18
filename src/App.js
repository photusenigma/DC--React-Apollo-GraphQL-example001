import React, { Component } from 'react';
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';


import MyComponent from './MyComponent';

class App extends Component {
  constructor(...args) {
    super(...args);

    // const networkInterface = createNetworkInterface('https://swapi.apis.guru');
    this.client = new ApolloClient({
      link: new HttpLink({
          uri: 'https://swapi.apis.guru'
      }),
      connectToDevTools: true,
      cache: new InMemoryCache(),
      dataIdFromObject: r => r.id
    });
  }
  render() {
    return (
      <ApolloProvider client={this.client}>
        <MyComponent />
      </ApolloProvider>
    );
  }
}

export default App;