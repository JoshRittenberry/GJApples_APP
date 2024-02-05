import { useEffect, useState } from "react"
import "../stylesheets/viewOrder.css"
import { useNavigate, useParams } from "react-router-dom"
import { cancelOrder, getOrderById } from "../../managers/orderManager"
import { Button, Table } from "reactstrap"
import { Footer } from "../Footer"

export const ViewOrder = ({ loggedInUser }) => {
    const [order, setOrder] = useState({})

    const navigate = useNavigate()
    const orderId = useParams().id

    useEffect(() => {
        getOrderById(orderId).then(setOrder)
    }, [orderId])

    return (
        <>
            <div className="vieworder">
                <header className="vieworder_header">
                    <div className="vieworder_header_top">
                        <h3>Order #{order.id}</h3>
                        <button className="vieworder_header_top_backbutton" onClick={() => {
                            navigate("/orderhistory")
                        }}>
                            <i className="fa-solid fa-circle-arrow-left"></i>
                        </button>
                    </div>
                    <h5>Customer: {order.customer?.firstName} {order.customer?.lastName}</h5>
                    <div className="vieworder_header_bottom">
                        {/* <h5>Phone: (XXX)-XXX-XXXX</h5> */}
                        <h5>Email: {order.customer?.email}</h5>
                    </div>
                </header>
                <section className="vieworder_body">
                    <Table>
                        <thead>
                            <tr>
                                <th>Apple Variety</th>
                                <th>Pounds</th>
                                <th>Item Cost (Per Pound)</th>
                                <th>Item Cost (Total)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.orderItems?.map((oi) => (
                                <tr key={`orderitem-${oi.id}`}>
                                    <th
                                        scope="row"
                                    >
                                        {oi.appleVariety?.type}
                                    </th>
                                    <th>{oi.pounds} lbs</th>
                                    <th>${oi.appleVariety.costPerPound}</th>
                                    <th>${oi.totalItemCost}</th>
                                </tr>
                            ))}
                        </tbody>
                        <tbody>
                            <tr>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th>Total: ${order.totalCost}</th>
                            </tr>
                        </tbody>
                    </Table>
                    {!order.canceled && order.employeeUserProfileId === null && order.dateCompleted === null && (
                        <div className="vieworder_body_buttons">
                            <Button onClick={() => {
                                cancelOrder(order.id).then(() => {
                                    getOrderById(orderId).then(setOrder)
                                    navigate("/orderhistory")
                                })
                            }}>
                                Cancel Order
                            </Button>
                            <Button onClick={() => {
                                navigate(`/orderhistory/edit/${order.id}`)
                            }}>
                                Edit Order
                            </Button>
                        </div>
                    )}
                </section>
            </div>
            <Footer />
        </>
    )
}