import React, { Component } from 'react';
import gotService from '../../services/gotService';
import Spinner from '../spinner/index';
import ErrorMessage from '../errorMessage';
import './itemDetails.css';

const Field = ({ item, field, label }) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}


export default class ItemDetails extends Component {

    gotService = new gotService();

    state = {
        item: null,
        loading: true,
        error: false,
    }

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }

    componentDidCatch() {
        this.setState({
            error: true,
        })
    }

    updateItem() {
        const { itemId, getData } = this.props;
        if (!itemId) {
            return;
        }

        getData(itemId)
            .then((item) => {
                this.setState({ item })
            })
    }

    onError() {
        this.setState({
            item: null,
            error: true
        })
    }

    render() {

        if (!this.state.item && this.state.error) {
            return <ErrorMessage />
        } else if (!this.state.item) {
            return <span className='select-error'>Please select a itemacter</span>
        }
        const { item } = this.state;
        const { name } = item;

        if (this.state.loading) {
            return (
                <div className="item-details rounded">
                    <Spinner />
                </div>
            )
        }

        return (
            <div className="item-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, { item });
                        })
                    }
                </ul>
            </div>
        );
    }
}

export {
    Field
}