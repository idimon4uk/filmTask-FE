import React , {Component} from 'react';
import axios from 'axios';
import Star from '../Star';
import { GET_FILM_DETAIL } from '../../API'

class NewFilm extends Component {
    
    state = {
        film:{},
        stars:[]
    }

    getFilmDetails(){

        let { id } = this.props.match.params;

        axios(GET_FILM_DETAIL(id), {
            method: 'GET',
          }).then(res=>{
            this.setState({film:res.data, stars:res.data.stars})
            
        })
      }

      componentDidMount() {
          this.getFilmDetails()
      }
    showStarsList (stars) {
        
       return stars.map(e=>(
            <Star key={e.id} star={e}/>
        ))
    }
    render(){
        let divStyle={
            fontSize:'20px',
            textAlign:'center'
        }
        return (
            
            <div style = {divStyle}>
               <h1>{this.state.film.title}</h1>
               <p>
                   Release Year: {this.state.film.releaseDate}
               </p>
               <p>
                   Format: {this.state.film.format}
               </p>
               <p>
                   Stars: 
                    {/* <StarsList stars={this.state.film.stars}/> */}
                   {this.showStarsList(this.state.film.stars?this.state.film.stars:[])}
               </p>
            </div>
            
        )
    }
}

export default NewFilm;