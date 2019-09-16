import React , {Component} from 'react';
import Film from './Film'

class FilmsList extends Component {
     
    render(){
        return this.props.films.map(film=>(
            <Film key={film.id} film={film} deleteFilm={this.props.deleteFilm} />
        ))
    }
  
}

export default FilmsList;
