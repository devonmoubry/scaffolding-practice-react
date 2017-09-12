import React, { Component } from 'react';
import '../styles/App.css';
import NavBar from './NavBar';
import Section from './Section';
import Header from './Header';
import Form from './Form';
import Footer from './Footer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Header />
        <Section />
        <Form />
        <Footer />
      </div>
    );
  }
}

export default App;
