import { useEffect, useState } from "react"
import "../stylesheets/cart.css"
import { decreaseOrderItem, deleteOrderItem, getOrderById, getUnsubmittedOrder, increaseOrderItem, submitOrder } from "../../managers/orderManager"
import { Button, Input, Table } from "reactstrap"
import { Footer } from "../Footer"
import { useNavigate } from "react-router-dom"
import { CartSelections } from "../cards/CartSelections"

export const Cart = ({ loggedInUser }) => {
    const [order, setOrder] = useState({})
    const [orderApples, setOrderApples] = useState([])
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    const navigate = useNavigate()

    useEffect(() => {
        getUnsubmittedOrder().then(order => {
            const orderItems = order.orderItems.map(oi => oi.appleVariety);
            setOrder(order);
            setOrderApples(orderItems)
        })
        // Function to update screenWidth state when the window is resized
        const handleResize = () => {
            setScreenWidth(window.innerWidth)
        }

        // Attach the event listener for window resize
        window.addEventListener('resize', handleResize)

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    })

    const handleDisplayedItemPounds = (orderItemId) => {
        if (order.orderItems?.some(oi => oi.appleVarietyId === orderItemId)) {
            let orderItem = order.orderItems.find(oi => oi.appleVarietyId === orderItemId)

            return `${orderItem.pounds} lbs`
        }
    }

    const handleIncreaseItem = (orderItemId) => {
        // Make sure the Apple is already in the Order
        console.log("hello?")
        if (order.orderItems.some(oi => oi.id === orderItemId)) {
            increaseOrderItem(orderItemId).then(() => {
                getOrderById(order.id).then(setOrder)
            })
        }
    }

    const handleDecreaseItem = (orderItemId) => {
        // Make sure the Apple is already in the Order
        if (order.orderItems.some(oi => oi.id === orderItemId)) {
            let orderItem = order.orderItems.find(oi => oi.id === orderItemId)
            if (orderItem.pounds > 1 || screenWidth <= 650) {
                decreaseOrderItem(orderItem.id).then(() => {
                    getOrderById(order.id).then(setOrder)
                })
            }
        }
    }

    const handleDeleteItem = (orderItemId) => {
        deleteOrderItem(orderItemId).then(() => {
            getOrderById(order.id).then(setOrder)
        })
    }

    const handleSubmitOrder = () => {
        if (order.orderItems.length < 1) {
            console.log("You can't do that")
        } else {
            submitOrder(order.id).then(() => {
                navigate("/orderhistory")
            })
        }
    }

    return (
        <>
            <div className="cart">
                <header className="cart_header">
                    <h1>My Cart</h1>
                </header>
                <section className="cart_body">
                    {screenWidth > 650 && (
                        <Table>
                            <thead>
                                <tr>
                                    <th className="cart_body_table_applevariety">Apple Variety</th>
                                    <th>Pounds</th>
                                    {screenWidth > 1100 && <th>Item Cost (Per Pound)</th>}
                                    {screenWidth > 780 && <th>Item Cost (Total)</th>}
                                    <th className="cart_body_table_options"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.orderItems?.map((oi) => (
                                    <tr key={`orderitem-${oi.id}`}>
                                        <th
                                            className="cart_body_table_applevariety"
                                            scope="row"
                                        >
                                            {oi.appleVariety?.type}
                                        </th>
                                        <th className="cart_body_buttons">
                                            <button className="cart_body_buttons_subtract" onClick={() => {
                                                // remove 0.5 pounds of apples
                                                handleDecreaseItem(oi.id)
                                            }}>
                                                <i className="fa-solid fa-circle-minus"></i>
                                            </button>
                                            <Input
                                                // display how many pounds of apples have been added to the order
                                                type="text"
                                                readOnly
                                                value={handleDisplayedItemPounds(oi.appleVarietyId)}
                                                className="cart_body_buttons_input"
                                            />
                                            <button className="cart_body_buttons_add" onClick={() => {
                                                // add the item or increase the item by 0.5 if it already exists
                                                handleIncreaseItem(oi.id)
                                            }}>
                                                <i className="fa-solid fa-circle-plus"></i>
                                            </button>
                                        </th>
                                        {screenWidth > 1100 && <th>${oi.appleVariety.costPerPound}</th>}
                                        {screenWidth > 780 && <th>${oi.totalItemCost}</th>}
                                        <th className="cart_body_table_options">
                                            <button onClick={() => {
                                                handleDeleteItem(oi.id)
                                            }}>
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </th>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                    {screenWidth <= 650 && (
                        <CartSelections
                            apples={orderApples}
                            order={order}
                            setOrder={setOrder}
                            handleDisplayedItemPounds={handleDisplayedItemPounds}
                            handleIncreaseItem={handleIncreaseItem}
                            handleDecreaseItem={handleDecreaseItem}
                            handleSubmitOrder={handleSubmitOrder}
                        />
                    )}
                    <div className="cart_footer">
                        <div>Total: ${order.totalCost}</div>
                        <Button onClick={() => {
                            handleSubmitOrder()
                        }}>
                            Submit
                        </Button>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    )
}