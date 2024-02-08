import { useState } from "react"
import { createCustomer } from "../../../managers/authManager"
import { useNavigate } from "react-router-dom"
import { Button, FormGroup, Input, Label } from "reactstrap"
import { Footer } from "../../Footer"
import "../../stylesheets/register.css"

export const NewCustomer = ({ setLoggedInUser }) => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const generateRandomPassword = () => {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"
        let newPassword = ""

        for (let i = 0; i < 8; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length)
            newPassword += charset[randomIndex]
        }

        setPassword(newPassword)
    }

    const handleSubmit = (e) => {
        let newCustomer = {
            email: email,
            password: password,
            userName: userName ,
            firstName: firstName,
            lastName: lastName,
            address: address
        }
        if (firstName.trim() === "" || lastName.trim() === "" || userName.trim() === "" || email.trim() === "" || address.trim() === "" || password.trim() === "") {
            return
        }

        createCustomer(newCustomer).then(() => {
            navigate("/accounts/customers/view")
        })
    }

    return (
        <>
            <div className="container register-container" style={{ maxWidth: "500px" }}>
                <h3>Create an Employee Account</h3>
                <FormGroup>
                    <Label>First Name</Label>
                    <Input
                        type="text"
                        value={firstName}
                        onChange={(e) => {
                            setFirstName(e.target.value)
                        }}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Last Name</Label>
                    <Input
                        type="text"
                        value={lastName}
                        onChange={(e) => {
                            setLastName(e.target.value)
                        }}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Email</Label>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>User Name</Label>
                    <Input
                        type="text"
                        value={userName}
                        onChange={(e) => {
                            setUserName(e.target.value)
                        }}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Address</Label>
                    <Input
                        type="text"
                        value={address}
                        onChange={(e) => {
                            setAddress(e.target.value)
                        }}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <Input
                        type="text"
                        value={password}
                        readOnly
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                    />
                </FormGroup>
                <div className="newemployee_footer">
                    {password === "" && (
                        <Button onClick={() => {
                            generateRandomPassword()
                        }}>
                            Generate
                        </Button>
                    )}
                    {password !== "" && (
                        <Button onClick={() => {
                            handleSubmit()
                        }}>
                            Submit
                        </Button>
                    )}
                    <Button onClick={() => {
                        setPassword("")
                        navigate("/accounts")
                    }}>
                        Cancel
                    </Button>
                </div>
            </div>
            <Footer />
        </>
    )
}