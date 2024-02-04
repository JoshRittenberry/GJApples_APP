import React from 'react';
import '../stylesheets/cards.css';
import CardItem from './CardItem';

export const Cards = () => {
    return (
        <div className='cards'>
            <h1>Check out these EPIC Destinations!</h1>
            <div className='cards__container'>
                <div className='cards__wrapper'>
                    <ul className='cards__items'>
                        <CardItem
                            src='/pictures/GJ-Picking-Apples.jpg'
                            alt='Garry Jones Picking Apples'
                            text='Hear from Garry Jones on the humble beginnings of his wonderful apple orchard.'
                            label='History'
                            path='/history'
                        />
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Cards;