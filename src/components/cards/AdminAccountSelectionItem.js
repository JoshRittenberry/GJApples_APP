import React from 'react';
import { Link } from 'react-router-dom';

export const AdminAccountSelectionItem = (props) => {
    return (
        <>
            <li className='cards__adminaccountselection__item'>
                <Link className='cards__adminaccountselection__item__link' to={props.path}>
                    <figure className='cards__adminaccountselection__item__pic-wrap' data-category={props.label}>
                        <img
                            className='cards__adminaccountselection__item__img'
                            alt={props.alt}
                            src={props.src}
                        />
                    </figure>
                    <div className='cards__adminaccountselection__item__info'>
                        <h5 className='cards__adminaccountselection__item__text'>{props.text}</h5>
                    </div>
                </Link>
            </li>
        </>
    )
}

export default AdminAccountSelectionItem;