import React, { Component } from 'react';
import './randomChar.css';
import gotService from '../../services/gotService';
import Spinner from '../spinner/index';
import ErrorMessage from '../errorMessage';
import PropTypes from 'prop-types';

export default class RandomChar extends Component {

    gotService = new gotService();
    state = {
        char: {},
        loading: true,
        error: false,
    }

    // static defaultProps = {
    //     interval: 15000
    // }

    componentDidMount() {
        this.updateChar();
        this.timeId = setInterval(this.updateChar, this.props.interval);
    }

    componentWillUnmount() {
        clearInterval(this.timeId)
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false,
        });
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false,
        });
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * 140 + 25); //25-140
        // const id = 13000000;
        this.gotService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    render() {
        const { char, loading, error } = this.state;
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null
        const content = !(loading || error) ? <View char={char} /> : null;

        return (
            <div className="random-block rounded">
                {errorMessage}
                {spinner}
                {content}
            </div>
        );
    }
}

RandomChar.defaultProps = {
    interval: 15000
}

RandomChar.propTypes = {
    interval: PropTypes.number
}



function View({ char }) {
    const { name, gender, born, died, culture } = char;
    return (
        <>
            <h4>Random Character: {name !== '' ? name : 'not data('}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender</span>
                    <span>{gender !== '' ? gender : 'not data('}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born</span>
                    <span>{born !== '' ? born : 'not data('}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died</span>
                    <span>{died !== '' ? died : 'not data('}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture</span>
                    <span>{culture !== '' ? culture : 'not data('}</span>
                </li>
            </ul>
        </>
    )
}

