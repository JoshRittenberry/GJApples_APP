import "../../stylesheets/changeEmployeePasswordModal.css"
import { useEffect, useState } from "react"
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import { getUserWithRoles, updateEmployeePassword } from "../../../managers/employeeManager"

export const ChangeEmployeePasswordModal = ({ passwordModal, togglePasswordModal, selectedEmployee, setSelectedEmployee, args }) => {
    const [password, setPassword] = useState({})

    useEffect(() => {
        getUserWithRoles(selectedEmployee.id).then(userRes => {
            setPassword({
                identityUserId: userRes.identityUserId,
                password: null,
            })
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [togglePasswordModal])

    const generateRandomPassword = () => {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"
        let newPassword = ""

        for (let i = 0; i < 8; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length)
            newPassword += charset[randomIndex]
        }

        let update = {...password}
        update.password = newPassword
        setPassword(update)
    }

    return (
        <Modal isOpen={passwordModal} togglePasswordModal={togglePasswordModal} {...args}>
            <ModalHeader className="changeemployeepasswordmodal_header" togglePasswordModal={togglePasswordModal}>Reset {selectedEmployee.firstName} {selectedEmployee.lastName}'s Password</ModalHeader>
            <ModalBody className="changeemployeepasswordmodal_body">
                <Form className="changeemployeepasswordmodal_form">
                    <FormGroup row>
                        <Label
                            for="password"
                            size="md"
                            sm={2}
                        >
                            Password:
                        </Label>
                        <Col sm={10}>
                            <Input
                                bsSize="md"
                                id="password"
                                type="text"
                                value={password?.password}
                                readOnly
                            />
                        </Col>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter className="changeemployeepasswordmodal_footer">
                {password?.password === null && (
                    <Button onClick={() => {
                        generateRandomPassword()
                    }}>
                        Generate
                    </Button>
                )}
                {password?.password != null && (
                    <Button onClick={() => {
                        updateEmployeePassword(password).then(() => {
                            setPassword(null)
                            togglePasswordModal()
                        })
                    }}>
                        Submit
                    </Button>
                )}
                <Button onClick={() => {
                    setPassword(null)
                    togglePasswordModal()
                }}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    )
}