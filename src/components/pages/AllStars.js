import React, { Component } from 'react';
import axios from 'axios';
import Star from '../Star';
import SearchAndFilter from '../SearchAndFilterPanelStars'


class AllStars extends Component {

    state = {
        stars: [],
        filterdedStars: []
    }

    sortStatusByName = 0;
    sortStatusByPopularity = 0;
    componentWillMount() {
        axios.get('http://127.0.0.1:3000/api/stars').then(result => {
            this.setState({ stars: result.data, filterdedStars: result.data })
        })
    }

    renderListOfStars() {
        return this.state.filterdedStars.map(star => (
            <p style={{ fontSize: '30px' }}>
                <Star key={star.id} star={star} />
            </p>
        ))
    }

    sortByName() {
        this.sortStatusByName += 1;
        let sorted = this.state.filterdedStars ? this.state.filterdedStars : [];
        switch (this.sortStatusByName % 2) {
            case 0: {
                sorted = sorted.sort(function (a, b) {
                    if ((`${a.firstName} ${a.lastName}`).toLowerCase() < (`${b.firstName} ${b.lastName}`).toLowerCase()) { return -1; }
                    if ((`${a.firstName} ${a.lastName}`).toLowerCase() > (`${b.firstName} ${b.lastName}`).toLowerCase()) { return 1; }
                    return 0;
                })
                break;
            }
            default: {
                sorted = sorted.sort(function (a, b) {
                    if ((`${a.firstName} ${a.lastName}`).toLowerCase() < (`${b.firstName} ${b.lastName}`).toLowerCase()) { return -1; }
                    if ((`${a.firstName} ${a.lastName}`).toLowerCase() > (`${b.firstName} ${b.lastName}`).toLowerCase()) { return 1; }
                    return 0;
                }).reverse()
                break;
            }

        }

        this.setState({
            ...this.state,
            filterdedStars: sorted
        })
    }

    sortByPopularity() {
        this.sortStatusByPopularity += 1;
        let sorted = this.state.filterdedStars ? this.state.filterdedStars : [];
        switch (this.sortStatusByPopularity % 2) {
            case 0: {
                sorted = sorted.sort(function (a, b) {
                    if (a.films.length < b.films.length) { return -1; }
                    if (a.films.length > b.films.length) { return 1; }
                    return 0;
                })
                break;
            }
            default: {
                sorted = sorted.sort(function (a, b) {
                    if (a.films.length < b.films.length) { return -1; }
                    if (a.films.length > b.films.length) { return 1; }
                    return 0;
                }).reverse()
                break;
            }

        }

        this.setState({
            ...this.state,
            filterdedStars: sorted
        })
    }

    search(event) {
        this.setState({
            ...this.state,
            filterdedStars: this.state.stars.filter(e => (`${e.firstName} ${e.lastName}`).indexOf(event.target.value) !== -1)
        })
    }

    renderSearchPanel() {
        return (<SearchAndFilter sortByName={this.sortByName} sortByPopularity={this.sortByPopularity} context={this} search={this.search} />);
    }

    render() {
        return (
            <div>
                {this.renderSearchPanel()}

                {this.renderListOfStars()}
            </div>

        )
    }
}

export default AllStars;