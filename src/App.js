import React, {Component} from 'react';
import HomePage from './components/pages/Home';
import Header from './components/layout/Header';
import AddNewFilm from './components/pages/AddNewFilm';
import FilmDetails from './components/pages/FilmDetail';
import StarPage from './components/pages/Star';
import EditPage from './components/pages/Edit';
import AllStars from './components/pages/AllStars';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {

render(){
  return (
    <Router>
    <div className="App">
      <div className = 'container'>
      <Header />
      <Route exact path='/' component={HomePage}/>
      <Route exact path='/add' component={AddNewFilm}/>
      <Route exact path='/films/:id' component={FilmDetails}/>
      <Route exact path='/stars/:id' component={StarPage}/>
      <Route exact path='/films/:id/edit' component={EditPage}/>
      <Route exact path='/stars' component={AllStars}/>
      </div>  
    </div>
    </Router>
  );
}
}

export default App;
