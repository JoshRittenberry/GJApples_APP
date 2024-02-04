import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from 'reactstrap';

export const NewOrderSelectionItem = ({ apple, order, setOrder, handleDisplayedItemPounds, handleAddOrIncreaseItem, handleDecreaseItem, handleSubmitOrder }) => {
    return (
        <>
            <li className='cards__neworderselection__item'>
                <Link className='cards__neworderselection__item__link'>
                    <figure className='cards__neworderselection__item__pic-wrap' data-category={`$${apple?.costPerPound}/lb`}>
                        <img
                            className='cards__neworderselection__item__img'
                            alt={`${apple?.type}`}
                            src={apple?.imageUrl}
                        />
                    </figure>
                    <div className='cards__neworderselection__item__info'>
                        <h5 className='cards__neworderselection__item__text'>{apple?.type}</h5>
                        <div className="cards__neworderselection__item__footer">
                            <button className="cards__neworderselection__item__footer__subtract" onClick={() => {
                                // remove 0.5 pounds of apples
                                handleDecreaseItem(apple?.id)
                            }}>
                                <i className="fa-solid fa-circle-minus"></i>
                            </button>
                            <Input
                                // display how many pounds of apples have been added to the order
                                type="text"
                                readOnly
                                value={handleDisplayedItemPounds(apple?.id)}
                                className="cards__neworderselection__item__footer__input"
                            />
                            <button className="cards__neworderselection__item__footer__add" onClick={() => {
                                // add the item or increase the item by 0.5 if it already exists
                                handleAddOrIncreaseItem(apple?.id)
                            }}>
                                <i className="fa-solid fa-circle-plus"></i>
                            </button>
                        </div>
                    </div>

                </Link>
            </li>
        </>
    )
}

export default NewOrderSelectionItem;