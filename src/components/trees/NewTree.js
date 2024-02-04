import "../stylesheets/newTree.css"
import { Footer } from "../Footer"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Form, FormGroup, Input, Label } from "reactstrap"
import { getAppleVarieties } from "../../managers/appleManager"
import { createNewTree } from "../../managers/treeManager"

export const NewTree = () => {
    const [newTree, setNewTree] = useState({})
    const [appleVarieties, setAppleVarieties] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        setNewTree({
            appleVarietyId: 1,
            datePlanted: new Date().toISOString(),
        })
        getAppleVarieties().then(setAppleVarieties)
    }, [])

    return (
        <>
            <div className="newtree">
                <header className="newtree_header">
                    <h1>New Tree</h1>
                </header>
                <section className="newtree_body">
                    <Form>
                        <FormGroup>
                            <Label for="appleVariety">
                                Apple Variety
                            </Label>
                            <Input
                                id="appleVariety"
                                name="select"
                                type="select"
                                onChange={event => {
                                    let update = { ...newTree }
                                    update.appleVarietyId = event.target.value
                                    setNewTree(update)
                                }}
                            >
                                {appleVarieties.map(av => {
                                    return (
                                        <option key={av.id} selected={av.id === newTree.appleVarietyId} value={av.id}>
                                            {av.type}
                                        </option>
                                    )
                                })}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="datePlanted">
                                Date Planted
                            </Label>
                            <Input
                                id="datePlanted"
                                name="datePlanted"
                                placeholder="date placeholder"
                                type="date"
                                value={newTree.datePlanted ? newTree.datePlanted.substring(0, 10) : ''}
                                onChange={event => {
                                    let update = { ...newTree };
                                    const selectedDate = event.target.value;
                                    update.datePlanted = selectedDate ? new Date(selectedDate).toISOString() : newTree.datePlanted;
                                    setNewTree(update);
                                }}
                            />
                        </FormGroup>
                    </Form>
                </section>
                <div className="newtree_footer">
                    <Button className="newtree_footer_button" onClick={() => {
                        createNewTree(newTree).then(() => {
                            navigate("/trees")
                        })
                    }}>
                        Submit
                    </Button>
                    <Button className="newtree_footer_button" onClick={() => {
                        navigate("/trees")
                    }}>
                        Cancel
                    </Button>
                </div>
            </div>
            <Footer />
        </>
    )
}