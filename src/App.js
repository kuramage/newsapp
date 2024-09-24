import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default class App extends Component {
  c="Aditya";
  render() {
    
    return (
      <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/general' element={<News key='general' country='us' category='general' />} />
          <Route path='/Science' element={<News key='science' country='us' category='science' />} />
          <Route path='/Business' element={<News key='business' country='us' category='business' />} />
          <Route path='/Technology' element={<News key='technology' country='us' category='technology' />} />
          <Route path='/Health' element={<News key='health' country='us' category='health' />} />
          <Route path='/Sports' element={<News key='sports' country='us' category='sports' />} />
          <Route path='/Entertainment' element={<News key='entertainment' country='us' category='entertainment' />} />
        </Routes>
      </Router>
      </div>
    )
  }
}
