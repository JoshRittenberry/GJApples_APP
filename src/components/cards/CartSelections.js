import React, { useEffect, useState } from 'react';
import '../stylesheets/cartSelections.css';
import { CartSelectionItem } from './CartSelectionItem';

export const CartSelections = ({ apples, order, setOrder, handleDisplayedItemPounds, handleIncreaseItem, handleDecreaseItem, handleSubmitOrder }) => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    useEffect(() => {
        // Function to update screenWidth state when the window is resized
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        // Attach the event listener for window resize
        window.addEventListener('resize', handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // Empty dependency array means this effect runs once after initial render

    const renderAppleList = () => {
        const appleGroups = [];

        if (screenWidth >= 1600) {
            for (let i = 0; i < apples.length; i += 4) {
                const group = apples.slice(i, i + 4)

                appleGroups.push(
                    <ul className='cards__cartSelection__items' key={i}>
                        {group.map((apple, index) => (
                            <CartSelectionItem
                                apple={apple}
                                order={order}
                                setOrder={setOrder}
                                handleDisplayedItemPounds={handleDisplayedItemPounds}
                                handleIncreaseItem={handleIncreaseItem}
                                handleDecreaseItem={handleDecreaseItem}
                                handleSubmitOrder={handleSubmitOrder}
                            />
                        ))}
                    </ul>
                )
            }
        }

        if (screenWidth < 1600) {
            for (let i = 0; i < apples.length; i += 2) {
                const group = apples.slice(i, i + 2);

                appleGroups.push(
                    <ul className='cards__cartSelection__items' key={i}>
                        {group.map((apple, index) => (
                            <CartSelectionItem
                                apple={apple}
                                order={order}
                                setOrder={setOrder}
                                handleDisplayedItemPounds={handleDisplayedItemPounds}
                                handleIncreaseItem={handleIncreaseItem}
                                handleDecreaseItem={handleDecreaseItem}
                                handleSubmitOrder={handleSubmitOrder}
                            />
                        ))}
                    </ul>
                );
            }
        }

        return appleGroups;
    };

    return (
        <div className='cards__cartSelection'>
            <div className='cards__cartSelection__container'>
                <div className='cards__cartSelection__wrapper'>
                    {renderAppleList()}
                </div>
            </div>
        </div>
    );
}

export default CartSelections;