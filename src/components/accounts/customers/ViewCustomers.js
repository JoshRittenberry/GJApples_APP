import { Button, Table } from "reactstrap"
import React, { useEffect, useState } from 'react'
import { Footer } from "../../Footer"
import "../../stylesheets/viewCustomers.css"
import { useNavigate } from "react-router-dom"
import { ChangeCustomerPasswordModal } from "./ChangeCustomerPasswordModal"
import { getAllCustomers } from "../../../managers/customerManager"

export const ViewCustomers = ({ loggedInUser }) => {
    const [customers, setCustomers] = useState([])
    const [selectedCustomer, setSelectedCustomer] = useState({})
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const [currentPage, setCurrentPage] = useState(1)
    const [passwordModal, setPasswordModal] = useState(false)


    const customersPerPage = 10
    const navigate = useNavigate()
    const togglePasswordModal = () => setPasswordModal(!passwordModal)

    useEffect(() => {
        getAllCustomers().then(setCustomers)
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

    // Calculate the index of the first and last tree to display on the current page
    const indexOfLastCustomer = currentPage * customersPerPage
    const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage
    const currentCustomers = customers.slice(indexOfFirstCustomer, indexOfLastCustomer)

    // Function to handle next page
    const nextPage = () => {
        if (indexOfLastCustomer < customers.length) {
            setCurrentPage(currentPage + 1)
        }
    }

    // Function to handle previous page
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    return (
        <>
            <div className="viewcustomers">
                <header className="viewcustomers_header">
                    <h1>Customers</h1>
                    <aside className="viewcustomers_header_inputs">
                        {/* Place for buttons if needed */}
                    </aside>
                </header>
                <section className="viewcustomers_body">
                    <Table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                {screenWidth > 900 && <th>Address</th>}
                                {screenWidth > 600 && <th>Email</th>}
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentCustomers.map((e) => {
                                return (
                                    <tr key={`customer-${e.id}`}>
                                        <th scope="row">
                                            {e.id}
                                        </th>
                                        <th>{e.firstName}</th>
                                        <th>{e.lastName}</th>
                                        {screenWidth > 900 && <th>{e.address}</th>}
                                        {screenWidth > 600 && <th>{e.email}</th>}
                                        <th>
                                            <button className="viewcustomers_body_button_edit" onClick={() => {
                                                navigate(`/accounts/customers/edit/${e.id}`)
                                            }}>
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </button>
                                            <button className="viewcustomers_body_button_reset" onClick={() => {
                                                setSelectedCustomer(e)
                                                togglePasswordModal()
                                            }}>
                                                <i className="fa-solid fa-key"></i>
                                            </button>
                                        </th>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </section>
                {customers.length > 10 && (
                    <div className="viewcustomers_body_pagination">
                        <Button className="viewcustomers_body_button" onClick={prevPage} disabled={currentPage === 1}>
                            Previous
                        </Button>
                        <Button className="viewcustomers_body_button" onClick={nextPage} disabled={indexOfLastCustomer >= customers.length}>
                            Next
                        </Button>
                    </div>
                )}
            </div>
            <ChangeCustomerPasswordModal passwordModal={passwordModal} togglePasswordModal={togglePasswordModal} selectedCustomer={selectedCustomer} setSelectedCustomer={setSelectedCustomer} />
            <Footer />
        </>
    )
}