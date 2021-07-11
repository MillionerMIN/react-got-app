import React, { Component } from 'react';
import { Col, Row, Container, Button } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../characterPage';
import s from './app.module.css';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import gotService from '../../services/gotService';


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
            <>
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{ size: 5, offset: 0 }}>
                            {char}
                            <Button color="primary"
                                className={s.button}
                                onClick={this.toggleRandomChar}>Toggle Random char</Button>
                        </Col>
                    </Row>
                    <CharacterPage />
                    <Row>
                        <Col md='6'>
                            <ItemList onItemSelected={this.onItemSelected}
                                getData={this.gotService.getAllHouses}
                                renderItem={(item) => item.name} />
                        </Col>
                        <Col md='6'>
                            <CharDetails charId={this.state.selectedChar} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList onItemSelected={this.onItemSelected}
                                getData={this.gotService.getAllBooks}
                                renderItem={(item) => item.name} />
                        </Col>
                        <Col md='6'>
                            <CharDetails charId={this.state.selectedChar} />
                        </Col>
                    </Row> 
                </Container>
            </>
        );
    }
};