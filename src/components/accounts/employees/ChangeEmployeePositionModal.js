import "../../stylesheets/changeEmployeePositionModal.css"
import { useEffect, useState } from "react"
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import { getAllRoles, getUserWithRoles, updateEmployeeRole } from "../../../managers/employeeManager"

export const ChangeEmployeePositionModal = ({ positionModal, togglePositionModal, selectedEmployee, setSelectedEmployee, args }) => {
    const [roles, setRoles] = useState([])
    const [user, setUser] = useState({})
    const [currentRole, setCurrentRole] = useState({})

    useEffect(() => {
        getAllRoles().then(rolesRes => {
            setRoles(rolesRes.filter(role => role.name !== 'Customer'))
            getUserWithRoles(selectedEmployee.id).then(userRes => {
                setUser(userRes)
                const userRole = rolesRes.find(role => userRes.roles?.includes(role.name))
                setCurrentRole(userRole)
            })
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [togglePositionModal])

    return (
        <Modal isOpen={positionModal} togglePositionModal={togglePositionModal} {...args}>
            <ModalHeader className="changeemployeepositionmodal_header" togglePositionModal={togglePositionModal}>Edit {selectedEmployee.firstName} {selectedEmployee.lastName}'s Position</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="position">
                            Position
                        </Label>
                        <Input
                            id="position"
                            name="select"
                            type="select"
                            onChange={event => {
                                let newRole = roles.find(role => role.id === event.target.value)
                                setCurrentRole(newRole)
                            }}
                        >
                            {roles.map(r => {
                                return (
                                    <option key={r.id} selected={r.id === currentRole?.id} value={r.id}>
                                        {r.name}
                                    </option>
                                )
                            })}
                        </Input>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter className="changeemployeepositionmodal_footer">
                <Button onClick={() => {
                    if (currentRole != null && user.roles?.[0] !== currentRole.name) {
                        updateEmployeeRole(user?.identityUserId, currentRole?.id).then(() => {
                            setSelectedEmployee({})
                            togglePositionModal()
                            window.location.reload()
                        });
                    }
                }}>
                    Submit
                </Button>
                <Button onClick={() => {
                    setSelectedEmployee({})
                    togglePositionModal()
                }}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    )
}