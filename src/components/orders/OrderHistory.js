import { useEffect, useState } from "react"
import "../stylesheets/orderHistory.css"
import { getAllOrders } from "../../managers/orderManager"
import { Button, Table } from "reactstrap"
import { useNavigate } from "react-router-dom"
import { Footer } from "../Footer"

export const OrderHistory = ({ loggedInUser }) => {
    const [submittedOrders, setSubmittedOrders] = useState([])
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    const navigate = useNavigate()

    useEffect(() => {
        getAllOrders().then((res) => {
            let orders = res.filter(order => order.dateOrdered !== null)
            let ordersSorted = orders.sort((a, b) => b.id - a.id)

            setSubmittedOrders(ordersSorted)
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
    }, [])

    return (
        <>
            <header className="orderhistory_header">
                <h1>Order History Page</h1>
            </header>
            <section className="orderhistory_body">
                <Table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            {screenWidth >= 425 && <th>Order Date</th>}
                            {screenWidth >= 620 && <th>Date Completed</th>}
                            {screenWidth >= 1260 && <th>Order Picker</th>}
                            <th>Cost</th>
                            {screenWidth >= 1260 && <th>Pounds of Apples</th>}
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {submittedOrders.map((o) => (
                            <tr key={`order-${o.id}`}>
                                <th
                                    scope="row"
                                >
                                    {o.id}
                                </th>
                                {screenWidth >= 425 && (
                                    <th>
                                        {new Date(o.dateOrdered).toISOString().split('T')[0]}
                                    </th>
                                )}
                                {screenWidth >= 620 && (
                                    <th>
                                        {o.canceled && ("Canceled")}
                                        {!o.canceled && o.employeeUserProfileId == null && ("Awaiting Order Picker")}
                                        {!o.canceled && o.employeeUserProfileId != null && o.dateCompleted == null && ("In Progress")}
                                        {!o.canceled && o.employeeUserProfileId != null && o.dateCompleted != null && (new Date(o.dateCompleted).toISOString().split('T')[0])}
                                    </th>
                                )}
                                {screenWidth >= 1260 && (
                                    <th>
                                        {o.employeeUserProfileId != null && (o.employeeUserProfileId)}
                                        {o.employeeUserProfileId === null && o.canceled && ("-")}
                                        {o.employeeUserProfileId === null && !o.canceled && ("N/A")}
                                    </th>
                                )}
                                <th>
                                    {o.canceled && ("-")}
                                    {!o.canceled && (`$${o.totalCost}`)}
                                </th>
                                {screenWidth >= 1260 && (
                                    <th>
                                        {o.canceled && ("-")}
                                        {!o.canceled && (`${o.orderItems.reduce((sum, item) => sum + item.pounds, 0)} lbs`)}
                                    </th>
                                )}
                                <th>
                                    <Button onClick={() => {
                                        navigate(`/orderhistory/view/${o.id}`)
                                    }}>
                                        View Order
                                    </Button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </section>
            <Footer />
        </>
    )
}