import React, { useEffect, useState } from 'react';
import '../stylesheets/adminSelections.css';
import AdminSelectionItem from './AdminSelectionItem';

export const AdminSelections = () => {
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

    let selections = [
        {
            id: 1,
            src: '/pictures/employees.jpg',
            alt: 'Garry Jones Picking Apples',
            text: 'View and Edit Accounts',
            label: 'Accounts',
            path: '/accounts'
        },
        {
            id: 2,
            src: '/pictures/orders.jpg',
            alt: 'Garry Jones Picking Apples',
            text: 'View all open orders',
            label: 'Orders',
            path: '/orders/open'
        },
        {
            id: 3,
            src: '/pictures/harvest.jpg',
            alt: 'Garry Jones Picking Apples',
            text: 'View all open harvests',
            label: 'Harvests',
            path: '/harvests/open'
        },
        {
            id: 4,
            src: '/pictures/trees.jpg',
            alt: 'Garry Jones Picking Apples',
            text: 'View and Edit Trees',
            label: 'Trees',
            path: '/trees'
        },
        {
            id: 5,
            src: '/pictures/apples.jpg',
            alt: 'Garry Jones Picking Apples',
            text: 'View and Edit Apples',
            label: 'Apples',
            path: '/apples'
        }
    ]

    const renderSelectionList = () => {
        const selectionGroups = [];

        if (screenWidth >= 1200) {
            for (let i = 0; i < selections.length; i += 3) {
                const group = selections.slice(i, i + 3)

                selectionGroups.push(
                    <ul className='cards__adminselection__items' key={i}>
                        {group.map((selection, index) => (
                            <AdminSelectionItem
                                src={selection.src}
                                alt={selection.alt}
                                text={selection.text}
                                label={selection.label}
                                path={selection.path}
                            />
                        ))}
                    </ul>
                )
            }
        }

        if (screenWidth < 1200) {
            for (let i = 0; i < selections.length; i += 1) {
                const group = selections.slice(i, i + 1);

                selectionGroups.push(
                    <ul className='cards__adminselection__items' key={i}>
                        {group.map((selection, index) => (
                            <AdminSelectionItem
                                src={selection.src}
                                alt={selection.alt}
                                text={selection.text}
                                label={selection.label}
                                path={selection.path}
                            />
                        ))}
                    </ul>
                );
            }
        }

        return selectionGroups;
    };

    return (
        <div className='cards__adminselection'>
            <div className='cards__adminselection__container'>
                <div className='cards__adminselection__wrapper'>
                    {renderSelectionList()}
                </div>
            </div>
        </div>
    );
}

export default AdminSelections;