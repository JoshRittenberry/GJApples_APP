import React, { useEffect, useState } from 'react';
import '../stylesheets/newOrderSelections.css';
import { NewOrderSelectionItem } from './NewOrderSelectionItem';

export const NewOrderSelections = ({ apples, order, setOrder, handleDisplayedItemPounds, handleAddOrIncreaseItem, handleDecreaseItem, handleSubmitOrder }) => {
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
                    <ul className='cards__neworderselection__items' key={i}>
                        {group.map((apple, index) => (
                            <NewOrderSelectionItem
                                apple={apple}
                                order={order}
                                setOrder={setOrder}
                                handleDisplayedItemPounds={handleDisplayedItemPounds}
                                handleAddOrIncreaseItem={handleAddOrIncreaseItem}
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
                    <ul className='cards__neworderselection__items' key={i}>
                        {group.map((apple, index) => (
                            <NewOrderSelectionItem
                                apple={apple}
                                order={order}
                                setOrder={setOrder}
                                handleDisplayedItemPounds={handleDisplayedItemPounds}
                                handleAddOrIncreaseItem={handleAddOrIncreaseItem}
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
        <div className='cards__neworderselection'>
            <div className='cards__neworderselection__container'>
                <div className='cards__neworderselection__wrapper'>
                    {renderAppleList()}
                </div>
            </div>
        </div>
    );
}

export default NewOrderSelections;