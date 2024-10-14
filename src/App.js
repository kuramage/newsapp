import './App.css';
import LoadingBar from 'react-top-loading-bar'
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default class App extends Component {
  c="Aditya";

  state ={
    progress:0
  }
  setProgress=(progress)=> {
    this.setState({progress:progress})
  };
  render() {
    
    return (
      <div >
        
      <Router>
        <Navbar />
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        
      />
        <Routes>
          <Route path='/general' element={<News setProgress={this.setProgress}  key='general' country='us' category='general' />} />
          <Route path='/Science' element={<News setProgress={this.setProgress}  key='science' country='us' category='science' />} />
          <Route path='/Business' element={<News setProgress={this.setProgress}  key='business' country='us' category='business' />} />
          <Route path='/Technology' element={<News setProgress={this.setProgress}  key='technology' country='us' category='technology' />} />
          <Route path='/Health' element={<News setProgress={this.setProgress}  key='health' country='us' category='health' />} />
          <Route path='/Sports' element={<News setProgress={this.setProgress}  key='sports' country='us' category='sports' />} />
          <Route path='/Entertainment' element={<News setProgress={this.setProgress}  key='entertainment' country='us' category='entertainment' />} />
        </Routes>
      </Router>
    
      </div>
    )
  }
}
