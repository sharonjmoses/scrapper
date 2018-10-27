import React, { Component } from 'react';
// import Customer from './components/Customer'
import Scrapout from './components/Scrapout'
import Footer from './components/layout/Footer'
import Header from './components/layout/Header'
import Maincontainer from './components/layout/Maincontainer'
import firebase from 'firebase';
import { config } from './components/fconfig';
firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Maincontainer />
        <Scrapout />
        <Footer/>
      </div>
    );
  }
}

export default App;
