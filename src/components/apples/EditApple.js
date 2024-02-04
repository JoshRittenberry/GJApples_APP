import { useEffect, useState } from "react"
import { Footer } from "../Footer"
import "../stylesheets/editApple.css"
import { useNavigate, useParams } from "react-router-dom"
import { editApple, getAppleById } from "../../managers/appleManager"
import { Button, Form, FormGroup, Input, Label } from "reactstrap"

export const EditApple = ({ loggedInUser }) => {
    const [apple, setApple] = useState({})
    const [update, setUpdate] = useState({})

    const navigate = useNavigate()
    const appleId = useParams().id

    useEffect(() => {
        getAppleById(appleId).then(res => {
            setApple(res)
            setUpdate({
                id: res.id,
                type: res.type,
                imageUrl: res.imageUrl,
                costPerPound: res.costPerPound,
                isActive: res.isActive
            })
        })
    }, [appleId])

    return (
        <>
            <div className="editapple">
                <header className="editapple_header">
                    <div className="editapple_header_top">
                        <h1>Apple Editor (Apple #{apple.id})</h1>
                    </div>
                </header>
                <section className="editapple_body">
                    <Form>
                        <FormGroup>
                            <Label for="appleVariety">
                                Apple Variety
                            </Label>
                            <Input
                                id="appleVariety"
                                name="appleVariety"
                                type="text"
                                value={update.type}
                                onChange={event => {
                                    let newUpdate = { ...update }
                                    newUpdate.type = event.target.value
                                    setUpdate(newUpdate)
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
                                value={update.imageUrl}
                                onChange={event => {
                                    let newUpdate = { ...update }
                                    newUpdate.imageUrl = event.target.value
                                    setUpdate(newUpdate)
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
                                value={update.costPerPound}
                                onChange={event => {
                                    let newUpdate = { ...update }
                                    newUpdate.costPerPound = event.target.value
                                    setUpdate(newUpdate)
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
                                checked={update.isActive}
                                onChange={(event) => {
                                    const isChecked = event.target.checked;
                                    let newUpdate = { ...update };
                                    newUpdate.isActive = isChecked;
                                    setUpdate(newUpdate);
                                }}
                            />
                        </FormGroup>
                    </Form>
                </section>
                <div className="editapple_footer">
                    <Button className="editapple_footer_button" onClick={() => {
                        editApple(update).then(() => {
                            navigate("/apples")
                        })
                    }}>
                        Submit
                    </Button>
                    <Button className="editapple_footer_button" onClick={() => {
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