import React , {Component} from 'react';
import { Link } from 'react-router-dom';

class Star extends Component {
    render () {
        console.log(this.props)
        let linkStyle = {
            textDecoration:'none',
            color:'#333'
        }
        return (
        <p>
           <Link style={linkStyle} to={`/stars/${this.props.star.id}`}> {this.props.star.firstName} {this.props.star.lastName} </Link>
        </p>
            
        )
    }
}
export default Star;