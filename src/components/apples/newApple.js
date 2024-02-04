import "../stylesheets/newApple.css"
import { Footer } from "../Footer"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Form, FormGroup, Input, Label } from "reactstrap"
import { createNewApple } from "../../managers/appleManager"

export const NewApple = () => {
    const [newApple, setNewApple] = useState({})

    const navigate = useNavigate()

    useEffect(() => {
        setNewApple({
            type: "",
            imageUrl: "",
            costPerPound: 0.50,
            isActive: true
        })
    }, [])

    return (
        <>
            <div className="newapple">
                <header className="newapple_header">
                    <h1>New Apple</h1>
                </header>
                <section className="newapple_body">
                    <Form>
                        <FormGroup>
                            <Label for="appleVariety">
                                Apple Variety
                            </Label>
                            <Input
                                id="appleVariety"
                                name="appleVariety"
                                type="text"
                                value={newApple.type}
                                onChange={event => {
                                    let newUpdate = { ...newApple }
                                    newUpdate.type = event.target.value
                                    setNewApple(newUpdate)
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="appleImage">
                                Image Source
                            </Label>
                            <Input
                                id="appleImage"
                                name="appleImage"
                                type="text"
                                value={newApple.imageUrl}
                                onChange={event => {
                                    let newUpdate = { ...newApple }
                                    newUpdate.imageUrl = event.target.value
                                    setNewApple(newUpdate)
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="appleCost">
                                Cost Per Pound
                            </Label>
                            <Input
                                id="appleCost"
                                name="appleCost"
                                type="number"
                                step="0.05"
                                min="0.50"
                                value={newApple.costPerPound}
                                onChange={event => {
                                    let newUpdate = { ...newApple }
                                    newUpdate.costPerPound = event.target.value
                                    setNewApple(newUpdate)
                                }}
                            />
                        </FormGroup>
                        <FormGroup check>
                            <Label check for="appleActiveStatus">
                                Is Active
                            </Label>
                            <Input
                                type="checkbox"
                                id="appleActiveStatus"
                                label="Active Status"
                                checked={newApple.isActive}
                                onChange={(event) => {
                                    const isChecked = event.target.checked;
                                    let newUpdate = { ...newApple };
                                    newUpdate.isActive = isChecked;
                                    setNewApple(newUpdate);
                                }}
                            />
                        </FormGroup>
                    </Form>
                </section>
                <div className="newapple_footer">
                    <Button className="newapple_footer_button" onClick={() => {
                        createNewApple(newApple).then(() => {
                            navigate("/apples")
                        })
                    }}>
                        Submit
                    </Button>
                    <Button className="newapple_footer_button" onClick={() => {
                        navigate("/apples")
                    }}>
                        Cancel
                    </Button>
                </div>
            </div>
            <Footer />
        </>
    )
}