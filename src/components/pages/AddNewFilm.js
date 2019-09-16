import React, { Component } from 'react';
import InputSuggestions from '../InputSuggest';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup'
import axios from 'axios';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Link } from 'react-router-dom';


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

    saveButtonAction() {
        console.log(this.state)
        axios.post('http://127.0.0.1:3000/api/films/', this.state.film).then(res => {
            console.log(res.data, this.state)
        })
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:3000/api/stars/').then(result => {
            this.setState({
                ...this.state,
                avaliableStars: result.data.map(e => {
                    return {
                        label: `${e.firstName} ${e.lastName}`
                    }
                })
            })
        })
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
    handleFileUpload(e){
        const data = new FormData() 
        data.append('file', e.target.files[0])
        // console.log(data);
        alert(`File is uploaded on server, it's can take some time`)
        axios.post("http://127.0.0.1:3000/api/films/import", data, { 
        }).then(result=>{
            console.log(result.data);
            alert('done!')
        }).catch(err=>alert(err))
    }
    render() {
        return (<div>
            <TextField
                id="film-title"
                label="Title"
                placeholder="Title"
                fullWidth
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
            <InputSuggestions currentStars={this.state.film.stars} stars={this.state.avaliableStars} handleChange={this.handleDownship} context={this} />



            <ButtonGroup style={{ float: 'right' }}
                variant="contained"
                color="secondary"
                size="large"
                aria-label="large contained secondary button group">
                <input
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    ref={'file-upload'}
                    multiple
                    type="file"
                    onChange={this.handleFileUpload}
                    component={ Link } to={`/`} 
                />
                <label htmlFor="raised-button-file">
                    <Button component="span" variant="contained" color="default" >
                        Upload
                    <CloudUploadIcon />
                    </Button>
                </label>

                <Button onClick={this.saveButtonAction.bind(this)} component={Link} to={`/`} variant="contained" size="small">
                    <SaveIcon />
                    Save
                </Button>
            </ButtonGroup>
        </div>)
    }

}


export default NewFilm;