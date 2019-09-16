import React, { Component } from 'react';
import FilmSimple from '../FilmSimple'
import axios from 'axios';
import { GET_STAR } from '../../API'

class StarPage extends Component {

    state = {
        star:{
            firstName:'',
            lastName:'',
            films:[]
        }
    }
    getStarDetails() {

        let { id } = this.props.match.params;

        axios(GET_STAR(id), {
            method: 'GET',
        }).then(res => {
            this.setState({ star: res.data })

        })
    }

    getAllFilms(films){
        return films.map(film=>(
            <FilmSimple key={film.id} film={film}/>
        ))
    }

    componentDidMount() {
        this.getStarDetails()
    }

    render() {
        let divStyle={
            fontSize:'20px',
            textAlign:'center'
        }

        return (
            <div style={divStyle}>
            <h1>Name:{this.state.star.firstName} {this.state.star.lastName}</h1>
            <h2>
                Films:
                
                {this.getAllFilms(this.state.star.films)}
            </h2>
            </div>
        )
    }
}

export default StarPage;