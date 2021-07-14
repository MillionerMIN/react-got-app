import React, { useState, useEffect, Component} from 'react';
import Spinner from 'reactstrap/lib/Spinner';
import gotService from '../../services/gotService';
import ErrorMessage from '../errorMessage';
import './itemList.css';


function ItemList({ getData, onItemSelected, renderItem }) {

    const [itemList, setItemList] = useState([])

    useEffect(() => {
        getData()
            .then((data) => {
                setItemList(data)
            })
            .catch(() => this.onError());
    }, []);

    function renderItems(arr) {
        return arr.map((item) => {
            const { id } = item;
            const label = renderItem(item);
            return (
                <li key={id}
                    className="list-group-item"
                    onClick={() => onItemSelected(id)}>
                    {label}
                </li>
            )
        });
    }

    const items = renderItems(itemList)
    if (items) {
        return <ErrorMessage />
    }

    if (!itemList) {
        return <Spinner />
    }

    return (
        <ul className="item-list list-group">
            {items}
        </ul>
    );
}

const withData = (View, getData) => {
    return class extends Component {
        state = {
            data: null,
            error: false,
        }

        componentDidMount() {

            getData()
                .then((data) => {
                    this.setState({
                        data,
                        error: false,
                    })
                })
                .catch(() => this.onError());
        }

        render() {
            const { data, error } = this.state;
            if (error) {
                return <ErrorMessage />
            }

            if (!data) {
                return <Spinner />
            }
            return <View {...this.props} data={data} />
        }
    }
}
const { getAllCharacters } = new gotService();
export default withData(ItemList, getAllCharacters);

export {
    ItemList
}
