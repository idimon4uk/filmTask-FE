import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Header extends Component {
    render() {

        let headerStyle = {
            background:'#333',
            color:'#fff',
            textAlign:'center',
            padding:'10px'
        }

        let linkStyle = {
            textDecoration:'none',
            color:'#fff'
        }
        return (
            <header style={headerStyle}>
                <h1>Films list</h1>
                <Link to='/' style={linkStyle}>Home</Link> | <Link to='/stars' style={linkStyle}>Stars</Link> | <Link to='/add' style={linkStyle}>Add new film</Link>
            </header>
        )
    }
}

export default Header;