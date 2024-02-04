import { useEffect, useState } from "react"
import { Button, FormGroup, Input, Label } from "reactstrap";
import { Footer } from "../../Footer"
import "../../stylesheets/editEmployee.css"
import { useNavigate, useParams } from "react-router-dom";
import { getEmployeeById, updateEmployee } from "../../../managers/employeeManager";

export const EditEmployee = () => {
    const [update, setUpdate] = useState({})

    const navigate = useNavigate()
    const employeeId = useParams().id

    useEffect(() => {
        getEmployeeById(employeeId).then(res => {
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
    }, [employeeId])

    return (
        <>
            <div className="editemployee">
                <header className="editemployee_header">
                    <h1>Edit Employee</h1>
                </header>
                <section className="editemployee_body">
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
                <div className="editemployee_footer">
                    <Button className="editemployee_footer_button" onClick={() => {
                        updateEmployee(employeeId, update)
                        navigate("/employees/view")
                    }}>
                        Submit
                    </Button>
                    <Button className="editemployee_footer_button" onClick={() => {
                        navigate("/employees/view")
                    }}>
                        Cancel
                    </Button>
                </div>
            </div>
            <Footer />
        </>
    )
}