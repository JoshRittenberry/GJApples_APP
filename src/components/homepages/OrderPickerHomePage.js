import { useEffect, useState } from "react"
import "../stylesheets/orderPickerHomePage.css"
import { getAllUnassignedOrders, getOrderPickerAssignment } from "../../managers/orderManager"
import { OrderPickerAvailableOrders } from "../orders/OrderPickerAvailableOrders"
import { OrderPickerAssignedOrder } from "../orders/OrderPickerAssignedOrder"
import { Footer } from "../Footer"

export const OrderPickerHomePage = ({ loggedInUser }) => {
    const [orders, setOrders] = useState([])
    const [assignedOrder, setAssignedOrder] = useState({})

    useEffect(() => {
        getAllUnassignedOrders().then(setOrders)
        getOrderPickerAssignment().then(setAssignedOrder)
    }, [])

    console.log(loggedInUser.id)

    return (
        <>
            <div className="orderpickerhome">
                <header className="orderpickerhome_header">
                    <h1>Open Orders</h1>
                </header>
                <section className="orderpickerhome_body">
                    <OrderPickerAvailableOrders loggedInUser={loggedInUser} orders={orders} assignedOrder={assignedOrder} setAssignedOrder={setAssignedOrder} />
                    <OrderPickerAssignedOrder loggedInUser={loggedInUser} assignedOrder={assignedOrder} setOrders={setOrders} setAssignedOrder={setAssignedOrder} />
                </section>
            </div>
            <Footer />
        </>
    )
}