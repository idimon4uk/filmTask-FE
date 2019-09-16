import React , {Component} from 'react';
import { Link } from 'react-router-dom';

class FilmSimple extends Component {
    render () {
        let linkStyle = {
            textDecoration:'none',
            color:'#333'
        }

        console.log(this.props)
        return (
            <p>
                <Link style={linkStyle} to={`/films/${this.props.film.id}`}>{this.props.film.title}</Link>
            </p>
            
        )
    }
}
export default FilmSimple;