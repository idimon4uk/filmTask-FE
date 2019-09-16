import React, { Component } from 'react';
import FilmList from '../ListFilms';
import SearchAndFilter from '../SearchAndFilterPanelFilms';
import axios from 'axios';
import {GET_ALL_FILMS , DELETE_FILM } from '../../API'

class HomePage extends Component {
  state = {
    films: [],
    filteredFilms: []
  }

  sortStatusByTitle = 0;
  sortStatusByYear = 0;

  getAllFilms() {
    axios(GET_ALL_FILMS(), {
      method: 'GET',
    }).then(res => {
      this.setState({ films: res.data, filteredFilms: res.data })
    })
  }

  componentDidMount() {
    this.getAllFilms()
  }


  deleteFilm = (id) => {
    axios(DELETE_FILM(id), {
      method: 'DELETE',
    }).then(res => {
      setTimeout(() => {
        this.getAllFilms();
        console.info(`Film by ${id} is deleted`);
      }, 500)

    })

  }

  filterState(event) {
    let filtered = this.state.films.filter(e => e.title.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1)
    this.setState({
      ...this.state,
      filteredFilms: filtered
    })
  }

  sortFilmByTitle() {
    this.sortStatusByTitle += 1;
    let sorted = this.state.filteredFilms?this.state.filteredFilms:[];
    switch (this.sortStatusByTitle % 2) {
      case 0: {
        sorted = sorted.sort(function (a, b) {
          if (a.title.toLowerCase() < b.title.toLowerCase()) { return -1; }
          if (a.title.toLowerCase() > b.title.toLowerCase()) { return 1; }
          return 0;
        })
        break;
      }
      default : {
        sorted = sorted.sort(function (a, b) {
          if (a.title.toLowerCase() < b.title.toLowerCase()) { return -1; }
          if (a.title.toLowerCase() > b.title.toLowerCase()) { return 1; }
          return 0;
        }).reverse()
        break;
      }

    }

    this.setState({
      ...this.state,
      filteredFilms: sorted
    })
  }

  sortFilmByYear () {
    this.sortStatusByYear += 1;
    let sorted = this.state.filteredFilms?this.state.filteredFilms:[];
    console.log(sorted)
    switch (this.sortStatusByYear % 2) {
      case 0: {
        sorted = sorted.sort(function (a, b) {
          if (a.releaseDate < b.releaseDate) { return -1; }
          if (a.releaseDate > b.releaseDate) { return 1; }
          return 0;
        })
        break;
      }
      default : {
        sorted = sorted.sort(function (a, b) {
          if (a.releaseDate < b.releaseDate) { return -1; }
          if (a.releaseDate > b.releaseDate) { return 1; }
          return 0;
        }).reverse();
        break;
      }

    }

    this.setState({
      ...this.state,
      filteredFilms: sorted
    })
  }

  render() {

    return (
      <div>
        <SearchAndFilter context={this} search={this.filterState} sortByTitle={this.sortFilmByTitle} sortByYear={this.sortFilmByYear}/>
        <FilmList films={this.state.filteredFilms} deleteFilm={this.deleteFilm} />
      </div>
    )
  }
}

export default HomePage;