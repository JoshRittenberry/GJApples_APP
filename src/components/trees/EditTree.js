import { useEffect, useState } from "react"
import { Footer } from "../Footer"
import "../stylesheets/editTree.css"
import { useNavigate, useParams } from "react-router-dom"
import { editTree, getTreeById } from "../../managers/treeManager"
import { Button, Form, FormGroup, Input, Label } from "reactstrap"
import { getAppleVarieties } from "../../managers/appleManager"

export const EditTree = ({ loggedInUser }) => {
    const [tree, setTree] = useState({})
    const [appleVarieties, setAppleVarieties] = useState([])
    const [update, setUpdate] = useState({})

    const navigate = useNavigate()
    const treeId = useParams().id

    useEffect(() => {
        getTreeById(treeId).then(res => {
            setTree(res)
            setUpdate({
                id: res.id,
                appleVarietyId: res.appleVarietyId,
                datePlanted: res.datePlanted,
                dateRemoved: res.dateRemoved,
            })
        })
        getAppleVarieties().then(setAppleVarieties)
    }, [treeId])

    return (
        <>
            <div className="edittree">
                <header className="edittree_header">
                    <div className="edittree_header_top">
                        <h1>Tree Editor (Tree #{tree.id})</h1>
                    </div>
                </header>
                <section className="edittree_body">
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
                                    let newUpdate = { ...update }
                                    newUpdate.appleVarietyId = event.target.value
                                    setUpdate(newUpdate)
                                }}
                            >
                                {appleVarieties.map(av => {
                                    return (
                                        <option key={av.id} selected={av.id === update.appleVarietyId} value={av.id}>
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
                                value={update.datePlanted ? update.datePlanted.substring(0, 10) : ''}
                                onChange={event => {
                                    let newUpdate = { ...update };
                                    const selectedDate = event.target.value;
                                    newUpdate.datePlanted = selectedDate ? new Date(selectedDate).toISOString() : tree.datePlanted;
                                    setUpdate(newUpdate);
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="dateRemoved">
                                Date Removed
                            </Label>
                            <Input
                                id="dateRemoved"
                                name="dateRemoved"
                                placeholder="date placeholder"
                                type="date"
                                value={update.dateRemoved ? update.dateRemoved.substring(0, 10) : ''}
                                onChange={event => {
                                    let newUpdate = { ...update };
                                    const selectedDate = event.target.value;
                                    newUpdate.dateRemoved = selectedDate ? new Date(selectedDate).toISOString() : null;
                                    setUpdate(newUpdate);
                                }}
                            />
                        </FormGroup>
                    </Form>
                </section>
                <div className="edittree_footer">
                    <Button className="edittree_footer_button" onClick={() => {
                        editTree(update).then(() => {
                            navigate("/trees")
                        })
                    }}>
                        Submit
                    </Button>
                    <Button className="edittree_footer_button" onClick={() => {
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