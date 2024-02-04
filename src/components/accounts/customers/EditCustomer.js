import { useEffect, useState } from "react"
import { Button, FormGroup, Input, Label } from "reactstrap";
import { Footer } from "../../Footer"
import "../../stylesheets/editCustomer.css"
import { useNavigate, useParams } from "react-router-dom";
import { getCustomerById, updateCustomer } from "../../../managers/customerManager";

export const EditCustomer = () => {
    const [update, setUpdate] = useState({})

    const navigate = useNavigate()
    const customerId = useParams().id

    useEffect(() => {
        getCustomerById(customerId).then(res => {
            setUpdate({
                id: res.id,
                firstName: res.firstName,
                lastName: res.lastName,
                address: res.address,
                email: res.email,
                forcePasswordChange: false,
                userName: res.userName
            })
        })
    }, [customerId])

    return (
        <>
            <div className="editcustomer">
                <header className="editcustomer_header">
                    <h1>Edit Customer</h1>
                </header>
                <section className="editcustomer_body">
                    <FormGroup>
                        <Label>First Name</Label>
                        <Input
                            type="text"
                            value={update.firstName}
                            onChange={(e) => {
                                let newUpdate = { ...update }
                                newUpdate.firstName = e.target.value
                                setUpdate(newUpdate)
                            }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Last Name</Label>
                        <Input
                            type="text"
                            value={update.lastName}
                            onChange={(e) => {
                                let newUpdate = { ...update }
                                newUpdate.lastName = e.target.value
                                setUpdate(newUpdate)
                            }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={update.email}
                            onChange={(e) => {
                                let newUpdate = { ...update }
                                newUpdate.email = e.target.value
                                setUpdate(newUpdate)
                            }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>User Name</Label>
                        <Input
                            type="text"
                            value={update.userName}
                            onChange={(e) => {
                                let newUpdate = { ...update }
                                newUpdate.userName = e.target.value
                                setUpdate(newUpdate)
                            }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Address</Label>
                        <Input
                            type="text"
                            value={update.address}
                            onChange={(e) => {
                                let newUpdate = { ...update }
                                newUpdate.address = e.target.value
                                setUpdate(newUpdate)
                            }}
                        />
                    </FormGroup>
                </section>
                <div className="editcustomer_footer">
                    <Button className="editcustomer_footer_button" onClick={() => {
                        updateCustomer(customerId, update)
                        navigate("/customers/view")
                    }}>
                        Submit
                    </Button>
                    <Button className="editcustomer_footer_button" onClick={() => {
                        navigate("/customers/view")
                    }}>
                        Cancel
                    </Button>
                </div>
            </div>
            <Footer />
        </>
    )
}