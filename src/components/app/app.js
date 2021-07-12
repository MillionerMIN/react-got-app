import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Col, Row, Container, Button } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import './app.css';
import gotService from '../../services/gotService';
import { CharacterPage, BooksPage, HousesPage, BooksItem } from '../pages';



export default class App extends Component {

    gotService = new gotService();
    state = {
        showRandomChar: true,
        error: false,
    }
    toggleRandomChar = () => {
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            }
        });
    }
    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true,
        })
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage />
        }
        const char = this.state.showRandomChar ? <RandomChar /> : null;

        return (
            <Router>
                <div className='app'>
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                    <Row>
                    <Col lg={{ size: 5, offset: 0 }}>
                {char}
                    <Button color="primary"
                    className='button'
                    onClick={this.toggleRandomChar}>Toggle Random char</Button>
                    </Col>
                    </Row>
                    <Route path='/' exact  component={() => <h1>Welcom of GOT DB</h1>} />
                    <Route path='/characters' component={CharacterPage} />
                    <Route path='/houses' component={HousesPage} />
                    <Route path='/books' component={BooksPage} />
                    <Route path='/books/:id' render={
                        ({match}) => {
                            const id = match.params;
                            return <BooksItem bookId={id}/>
                        }
                        }/>
                    </Container>
                </div>
            </Router>
        );
    }
};