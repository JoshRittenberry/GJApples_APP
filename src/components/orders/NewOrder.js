import { useEffect, useState } from "react"
import "../stylesheets/newOrder.css"
import { getAllApples } from "../../managers/appleManager"
import { Button } from "reactstrap"
import { createOrderItem, decreaseOrderItem, getUnsubmittedOrder, increaseOrderItem } from "../../managers/orderManager"
import { useNavigate } from "react-router-dom"
import { Footer } from "../Footer"
import { NewOrderSelections } from "../cards/NewOrderSelections"

export const NewOrder = ({ loggedInUser }) => {
    const [apples, setApples] = useState([])
    const [order, setOrder] = useState({})

    const navigate = useNavigate()

    useEffect(() => {
        getAllApples().then(res => {
            let activeApples = res.filter(apple => apple.isActive)
            setApples(activeApples)
        })
        getUnsubmittedOrder().then(setOrder)
    }, [])

    const handleDisplayedItemPounds = (appleId) => {
        if (order.orderItems?.some(oi => oi.appleVarietyId === appleId)) {
            let orderItem = order.orderItems.find(oi => oi.appleVarietyId === appleId)

            return `${orderItem.pounds} lbs`
        } else {
            return ""
        }
    }

    const handleAddOrIncreaseItem = (appleId) => {
        // If the Apple is already in the Order
        if (order.orderItems.some(oi => oi.appleVarietyId === appleId)) {
            let orderItem = order.orderItems.find(oi => oi.appleVarietyId === appleId)

            increaseOrderItem(orderItem.id).then(() => {
                getUnsubmittedOrder().then(setOrder)
            })
        }
        // If the Apple is not already in the Order
        else if (!order.orderItems.some(oi => oi.appleVarietyId === appleId)) {
            let orderItem = {
                orderId: order.id,
                appleVarietyId: appleId,
                pounds: 1,
            }

            createOrderItem(orderItem).then(() => {
                getUnsubmittedOrder().then(setOrder)
            })
        }
    }

    const handleDecreaseItem = (appleId) => {
        // If the Apple is already in the Order
        if (order.orderItems.some(oi => oi.appleVarietyId === appleId)) {
            let orderItem = order.orderItems.find(oi => oi.appleVarietyId === appleId)

            decreaseOrderItem(orderItem.id).then(() => {
                getUnsubmittedOrder().then(setOrder)
            })
        }
    }

    const handleSubmitOrder = () => {
        if (order.orderItems.length < 1) {
            console.log("You can't do that")
        } else {
            navigate("/cart")
        }
    }

    return (
        <>
            <div className="neworder">
                <header className="neworder_header">
                    <h1>Create New Order</h1>
                    <aside className="neworder_header_inputs">
                        <Button onClick={() => {
                            handleSubmitOrder()
                        }}>
                            My Cart
                        </Button>
                    </aside>
                </header>
                <NewOrderSelections
                    apples={apples}
                    order={order}
                    setOrder={setOrder}
                    handleDisplayedItemPounds={handleDisplayedItemPounds}
                    handleAddOrIncreaseItem={handleAddOrIncreaseItem}
                    handleDecreaseItem={handleDecreaseItem}
                    handleSubmitOrder={handleSubmitOrder}
                />
            </div>
            <Footer />
        </>
    )
}