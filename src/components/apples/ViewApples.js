import "../stylesheets/viewApples.css"
import { useEffect, useState } from "react"
import { Button, Table } from "reactstrap"
import { Footer } from "../Footer"
import { getAllApples } from "../../managers/appleManager"
import { useNavigate } from "react-router-dom"

export const ViewApples = ({ loggedInUser }) => {
    const [apples, setApples] = useState([])
    const [currentPage, setCurrentPage] = useState(1)

    const applesPerPage = 10
    const navigate = useNavigate()

    useEffect(() => {
        getAllApples().then(setApples)
    }, [])

    // Calculate the index of the first and last apple to display on the current page
    const indexOfLastApple = currentPage * applesPerPage
    const indexOfFirstApple = indexOfLastApple - applesPerPage
    const currentApples = apples.slice(indexOfFirstApple, indexOfLastApple)

    // Function to handle next page
    const nextPage = () => {
        if (indexOfLastApple < apples.length) {
            setCurrentPage(currentPage + 1)
        }
    }

    // Function to handle previous page
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const poundsProduced = (trees) => {
        let pounds = 0
        trees.map(tree => (
            tree.treeHarvestReports.map(thr => (
                pounds += thr.poundsHarvested
            ))
        ))
        return pounds
    }

    const poundsOrdered = (orderItems) => {
        let pounds = 0
        orderItems.map(item => (
            pounds += item.pounds
        ))
        return pounds
    }

    return (
        <>
            <div className="viewapples">
                <header className="viewapples_header">
                    <h1>Apple Manager</h1>
                    <aside className="viewapples_header_inputs">
                        <Button className="viewapples_header_inputs_button" onClick={() => {
                            navigate("/apples/newapple")
                        }}>
                            New Apple
                        </Button>
                    </aside>
                </header>
                <section className="viewapples_body">
                    <Table>
                        <thead>
                            <tr>
                                <th>Apple Id</th>
                                <th>Variety</th>
                                <th>Cost Per Pound</th>
                                <th>Number of Trees</th>
                                <th>Pounds Produced</th>
                                <th>Pounds Purchased</th>
                                <th>Pounds Available</th>
                                {loggedInUser.roles.includes("Admin") && <th></th>}
                            </tr>
                        </thead>
                        <tbody>
                            {currentApples?.map((a) => (
                                <tr key={`order-${a.id}`}>
                                    <th style={{ color: a.isActive ? 'black' : 'red' }} scope="row">{a.id}</th>
                                    <th style={{ color: a.isActive ? 'black' : 'red' }}>{a.type}</th>
                                    <th style={{ color: a.isActive ? 'black' : 'red' }}>{a.costPerPound}</th>
                                    <th style={{ color: a.isActive ? 'black' : 'red' }}>{a.trees?.filter(tree => tree.dateRemoved == null).length}</th>
                                    <th style={{ color: a.isActive ? 'black' : 'red' }}>{poundsProduced(a.trees)}</th>
                                    <th style={{ color: a.isActive ? 'black' : 'red' }}>{poundsOrdered(a.orderItems)}</th>
                                    <th style={{ color: a.isActive ? 'black' : 'red' }}>{poundsProduced(a.trees) - poundsOrdered(a.orderItems)}</th>
                                    {loggedInUser.roles.includes("Admin") && (
                                        <th>
                                            <Button className="viewapples_body_button" onClick={() => {
                                                navigate(`/apples/edit/${a.id}`)
                                            }}>
                                                Edit
                                            </Button>
                                        </th>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </section>
                <div className="viewapples_body_pagination">
                    {apples.length > 10 && (
                        <>
                            <Button className="viewapples_body_button" onClick={prevPage} disabled={currentPage === 1}>
                                Previous
                            </Button>
                            <Button className="viewapples_body_button" onClick={nextPage} disabled={indexOfLastApple >= apples.length}>
                                Next
                            </Button>
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </>
    )
}