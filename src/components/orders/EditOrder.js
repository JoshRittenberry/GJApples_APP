import { useEffect, useState } from "react"
import "../stylesheets/editOrder.css"
import { useNavigate, useParams } from "react-router-dom"
import { cancelOrder, getOrderById, createOrderItem, decreaseOrderItem, increaseOrderItem, deleteOrderItem } from "../../managers/orderManager"
import { Button, Table, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Input } from "reactstrap";
import { getAllApples } from "../../managers/appleManager"
import { Footer } from "../Footer";

export const EditOrder = ({ loggedInUser }) => {
    const [order, setOrder] = useState({})
    const [apples, setApples] = useState([])
    const [newOrderItem, setNewOrderItem] = useState({})
    const [isOpen, setIsOpen] = useState(false)

    const navigate = useNavigate()
    const orderId = useParams().id

    useEffect(() => {
        getOrderById(orderId).then(order => {
            setOrder(order)
            if (order.dateCompleted != null || order.employeeUserProfileId != null) {
                navigate("/orderhistory")
            }
            getAllApples().then(apples => {
                let filteredApples = apples.filter(apple => !order.orderItems.some(oi => oi.appleVarietyId === apple.id))
                setApples(filteredApples)
            })
            setNewOrderItem({
                orderId: order.id,
                appleVarietyId: null,
                pounds: 1,
            })
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orderId])

    if (order.orderItems?.length < 1) {
        cancelOrder(orderId).then(() => {
            navigate("/orderhistory")
        })
    }

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    const handleDisplayedItemPounds = (orderItemId) => {
        if (order.orderItems?.some(oi => oi.appleVarietyId === orderItemId)) {
            let orderItem = order.orderItems.find(oi => oi.appleVarietyId === orderItemId)

            return `${orderItem.pounds} lbs`
        }
    }

    const handleIncreaseItem = (orderItemId) => {
        // Make sure the Apple is already in the Order
        if (order.orderItems.some(oi => oi.id === orderItemId)) {
            increaseOrderItem(orderItemId).then(() => {
                getOrderById(orderId).then(setOrder)
            })
        }
    }

    const handleDecreaseItem = (orderItemId) => {
        // Make sure the Apple is already in the Order
        if (order.orderItems.some(oi => oi.id === orderItemId)) {
            let orderItem = order.orderItems.find(oi => oi.id === orderItemId)
            if (orderItem.pounds > 1) {
                decreaseOrderItem(orderItem.id).then(() => {
                    getOrderById(orderId).then(setOrder)
                })
            }
        }
    }

    const handleDeleteItem = (orderItemId) => {
        deleteOrderItem(orderItemId).then(() => {
            getOrderById(orderId).then(setOrder)
        })
    }

    const handleAddNewItem = () => {
        createOrderItem(newOrderItem).then(() => {
            getOrderById(orderId).then(order => {
                setOrder(order)
                getAllApples().then(apples => {
                    let filteredApples = apples.filter(apple => !order.orderItems.some(oi => oi.appleVarietyId === apple.id))
                    setApples(filteredApples)
                })
                setNewOrderItem({
                    orderId: order.id,
                    appleVarietyId: null,
                    pounds: 1,
                })
            })
        })
    }

    return (
        <>
            <div className="editorder">
                <header className="editorder_header">
                    <div className="editorder_header_top">
                        <h3>Order #{order.id}</h3>
                        <button className="editorder_header_top_backbutton" onClick={() => {
                            navigate("/orderhistory")
                        }}>
                            <i className="fa-solid fa-circle-arrow-left"></i>
                        </button>
                    </div>
                    <h5>Customer #{order.customerUserProfileId}</h5>
                    <div className="editorder_header_bottom">
                        {/* <h5>Phone: (XXX)-XXX-XXXX</h5> */}
                        <h5>Email: xxx@xxxx.com</h5>
                    </div>
                </header>
                <section className="editorder_body">
                    <Table>
                        <thead>
                            <tr>
                                <th>Apple Variety</th>
                                <th>Pounds</th>
                                <th>Item Cost (Per Pound)</th>
                                <th>Item Cost (Total)</th>
                                <th></th>
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
                                    <th className="editorder_body_buttons">
                                        <button className="editorder_body_buttons_subtract" onClick={() => {
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
                                            className="editorder_body_buttons_input"
                                        />
                                        <button className="editorder_body_buttons_add" onClick={() => {
                                            // add the item or increase the item by 0.5 if it already exists
                                            handleIncreaseItem(oi.id)
                                        }}>
                                            <i className="fa-solid fa-circle-plus"></i>
                                        </button>
                                    </th>
                                    <th>${oi.appleVariety.costPerPound}</th>
                                    <th>${oi.totalItemCost}</th>
                                    <th className="editorder_body_options">
                                        <Button className="editorder__button" onClick={() => {
                                            handleDeleteItem(oi.id)
                                        }}>
                                            Delete Item
                                        </Button>
                                    </th>
                                </tr>
                            ))}
                            <tr>
                                <th>
                                    <Dropdown isOpen={isOpen} toggle={toggleDropdown}>
                                        <DropdownToggle className="editorder_body_dropdown" caret>
                                            {newOrderItem.appleVarietyId == null ? "Select an Apple" : apples.find(apple => apple.id === newOrderItem.appleVarietyId).type}
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {apples.map(apple => (
                                                <DropdownItem key={apple.id} onClick={() => {
                                                    let update = { ...newOrderItem }
                                                    update.appleVarietyId = apple.id
                                                    setNewOrderItem(update)
                                                }}>
                                                    {apple.type}
                                                </DropdownItem>
                                            ))}
                                        </DropdownMenu>
                                    </Dropdown>
                                </th>
                                <th>
                                    {newOrderItem.appleVarietyId == null && ("-")}
                                    {newOrderItem.appleVarietyId != null && (
                                        `${newOrderItem.pounds} lbs`
                                    )}
                                </th>
                                <th>
                                    {newOrderItem.appleVarietyId == null && ("-")}
                                    {newOrderItem.appleVarietyId != null && (
                                        apples.find(apple => apple.id === newOrderItem.appleVarietyId).costPerPound
                                    )}
                                </th>
                                <th>
                                    {newOrderItem.appleVarietyId == null && ("-")}
                                    {newOrderItem.appleVarietyId != null && (
                                        apples.find(apple => apple.id === newOrderItem.appleVarietyId).costPerPound
                                    )}
                                </th>
                                <th className="editorder_body_options">
                                    <Button className="test" onClick={() => {
                                        handleAddNewItem()
                                    }}>
                                        Add New Item
                                    </Button>
                                </th>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th>Total: ${order.totalCost}</th>
                                <th></th>
                            </tr>
                        </tbody>
                    </Table>
                </section>
            </div>
            <Footer />
        </>
    )
}