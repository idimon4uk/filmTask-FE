import React, { Component } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Details from '@material-ui/icons/Details'
import ButtonGroup from '@material-ui/core/ButtonGroup';
import EditIcon from '@material-ui/icons/Edit'

import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

class Film extends Component {


    render() {
        let classes = makeStyles(theme => ({
            button: {
                margin: theme.spacing(1),
                float: 'right'
            },
            leftIcon: {
                marginRight: theme.spacing(1),
            },
            rightIcon: {
                marginLeft: theme.spacing(1),
                float: 'right'
            },
            iconSmall: {
                fontSize: 20,
            },
        }));


        const getStyle = () => {
            return {
                background: '#f4f4f4',
                padding: '10px',
                borderBottom: '1px #ccc dotted',
                fontSize:'20px'
            }
        }

        const { id, title } = this.props.film


        return (
            <div style={getStyle()}>
                <p>
                    {title}
                    <ButtonGroup style={{ float: 'right', margin: '-10px' }}
                        variant="contained"
                        color="secondary"
                        size="large"
                        aria-label="large contained secondary button group">

                        <Button variant="contained" color="default" className={classes.button} component={Link}
                            to={`/films/${id}/edit`}>
                            Edit
                            <EditIcon className={classes.rightIcon} />
                        </Button>

                        <Button variant="contained" color="primary" className={classes.button}
                            component={Link}
                            to={`/films/${id}`}>
                            Details
                        <Details className={classes.rigthIcon} />
                        </Button>
                        <Button variant="contained" color="secondary" className={classes.button} onClick={this.props.deleteFilm.bind(this, id)}>
                            Delete
                        <DeleteIcon className={classes.leftIcon} />
                        </Button>
                    </ButtonGroup>


                    {/* <button style={btnStyle} onClick={this.props.deleteFilm.bind(this, id)}>X</button> */}

                </p>
            </div>

        )
    }

}

export default Film;
