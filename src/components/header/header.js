import React from 'react';
import s from './header.module.css'
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className={s.header}>
            <h3 className={s.title}>
                <Link to='/'>
                Game of Thrones DB
                </Link>
            </h3>
            <ul className={s.links}>
                <li>
                    <Link to='/characters/'>Characters</Link>
                </li>
                <li>
                    <Link to='/houses/'>Houses</Link>
                </li>
                <li>
                    <Link to='/books/'>Books</Link>   
                </li>
            </ul>
        </div>
    );
};

export default Header;