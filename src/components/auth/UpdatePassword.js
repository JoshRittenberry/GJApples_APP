import { Button, FormFeedback, FormGroup, Input, Label } from "reactstrap"
import { useEffect, useState } from "react"
import { Footer } from "../Footer"
import { getUserWithRoles, updateEmployeePassword } from "../../managers/employeeManager"
import { useNavigate } from "react-router-dom"
import "../stylesheets/updatePassword.css"

export const UpdatePassword = ({ loggedInUser }) => {
    const [user, setUser] = useState({})
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [passwordMismatch, setPasswordMismatch] = useState()

    const navigate = useNavigate()

    const handleSubmit = () => {
        if (password !== confirmPassword) {
            setPasswordMismatch(true)
        } else {
            const newPassword = {
                identityUserId: user.identityUserId,
                password: password
            }
            updateEmployeePassword(newPassword).then(() => {
                navigate("/")
            })
        }
    }

    useEffect(() => {
        getUserWithRoles(loggedInUser.id).then(userRes => {
            setUser(userRes)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <div className="updatepassword">
                <header className="updatepassword_header">
                    <h1>Update Password</h1>
                    <h5>Your password has recently been reset by an administrator. Please provide a new password to login.</h5>
                </header>
                <section className="updatepassword_body">
                    <FormGroup>
                        <Label>Password</Label>
                        <Input
                            invalid={passwordMismatch}
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPasswordMismatch(false)
                                setPassword(e.target.value)
                            }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label> Confirm Password</Label>
                        <Input
                            invalid={passwordMismatch}
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => {
                                setPasswordMismatch(false)
                                setConfirmPassword(e.target.value)
                            }}
                        />
                        <FormFeedback>Passwords do not match!</FormFeedback>
                    </FormGroup>
                </section>
                <div className="updatepassword_footer">
                    <Button onClick={() => {
                        handleSubmit()
                    }}>
                        Submit
                    </Button>
                </div>
            </div>
            <Footer />
        </>
    )
}