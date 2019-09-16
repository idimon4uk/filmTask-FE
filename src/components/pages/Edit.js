import React, { Component } from 'react';
import InputSuggestions from '../InputSuggest';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup'
import axios from 'axios';
import { Link } from 'react-router-dom'

class NewFilm extends Component {

    state = {
        film: {
            title: '',
            releaseDate: null,
            format: '',
            stars: []
        },
        avaliableStars: [],
        avaliableFormats: [{ value: 'DVD', label: 'DVD' }, { label: 'Blu-Ray', value: 'Blu-Ray' }, { label: 'VHS', value: 'VHS' }]
    }

    saveButtonAction(){
        console.log(this.state)
        let { id } = this.props.match.params;
        axios.put(`http://127.0.0.1:3000/api/films/${id}`,this.state.film).then(res=>{
            console.log(res.data,this.state)
        }).catch(err=>alert(err));
    }

    componentDidMount() {
        let { id } = this.props.match.params;

        axios.get('http://127.0.0.1:3000/api/stars/').then(result => {
            this.setState({
                ...this.state,
                avaliableStars: result.data.map(e => {
                    return {
                        label: `${e.firstName} ${e.lastName}`
                    }
                })
            })
        }).catch(err=>alert(err));


        axios.get(`http://127.0.0.1:3000/api/films/${id}`).then(res=>{
            this.setState({
                ...this.state,
                film:{
                    ...res.data,
                    stars:res.data.stars.map(e=>`${e.firstName} ${e.lastName}`)
                }
            })
        }).catch(err=>alert(err))


    }
    handleDownship(selectedItems) {
        console.log(selectedItems)
        this.setState({
            ...this.state,
            film: {
                ...this.state.film,
                stars: selectedItems
            }
        })
    }
    render() {
        return (<div>
            <TextField
                id="film-title"
                label="Title"
                placeholder="Title"
                fullWidth
                value={this.state.film.title}
                onChange={(event) => this.setState({
                    film: {
                        ...this.state.film,
                        title: event.target.value
                    }
                })}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                id="film-release-year"
                label="Release year"
                placeholder="Release year"
                type="number"
                fullWidth
                value={this.state.film.releaseDate}
                onChange={(event) => this.setState({
                    film: {
                        ...this.state.film,
                        releaseDate: event.target.value
                    }
                })}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                id="film-format-select"
                select
                fullWidth
                label="Format"
                value={this.state.film.format}
                onChange={(event) => this.setState({
                    film: {
                        ...this.state.film,
                        format: event.target.value
                    }
                })}
                helperText="Please select your format"

            >
                {this.state.avaliableFormats.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </TextField>
            <InputSuggestions currentStars = {this.state.film.stars}  stars={this.state.avaliableStars} handleChange={this.handleDownship} context={this} />



            <ButtonGroup style={{ float: 'right' }}
                variant="contained"
                color="secondary"
                size="large"
                aria-label="large contained secondary button group">

                <Button onClick={this.saveButtonAction.bind(this)} component={Link} to={`/`}  variant="contained" size="small">
                    <SaveIcon />
                    Save
                </Button>
            </ButtonGroup>
        </div>)
    }

}


export default NewFilm;