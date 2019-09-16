import React, { Component } from 'react';
// import { Link } from 'react-router-dom'

class Search extends Component {
    
    state = {
        value:''
    }
    
    handleSearch(e){
        this.setState({value:e.target.value});
        this.props.search.call(this.props.context,e);
    }

    

    render() {

        let divStyle = {
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
            <div style={divStyle}>
                Search <input style={{...linkStyle, color:"333"}} onChange={this.handleSearch.bind(this)} value={this.state.value}></input> | <a href='#sortByName' style = {linkStyle} onClick={this.props.sortByName.bind(this.props.context)}> Sort by name</a> | <a href='#sortByPopularity' style = {linkStyle} onClick={this.props.sortByPopularity.bind(this.props.context)}> Sort by popularity</a>
            </div>
        )
    }
}

export default Search;