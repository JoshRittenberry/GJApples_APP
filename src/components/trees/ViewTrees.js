import "../stylesheets/viewTrees.css"
import { useEffect, useState } from "react"
import { Button, Table } from "reactstrap"
import { Footer } from "../Footer"
import { getAllTrees } from "../../managers/treeManager"
import { useNavigate } from "react-router-dom"

export const ViewTrees = ({ loggedInUser }) => {
    const [trees, setTrees] = useState([])
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const [currentPage, setCurrentPage] = useState(1)

    const treesPerPage = 10
    const navigate = useNavigate()

    useEffect(() => {
        getAllTrees().then(setTrees)

        // Function to update screenWidth state when the window is resized
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        // Attach the event listener for window resize
        window.addEventListener('resize', handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])

    // Calculate the index of the first and last tree to display on the current page
    const indexOfLastTree = currentPage * treesPerPage;
    const indexOfFirstTree = indexOfLastTree - treesPerPage;
    const currentTrees = trees.slice(indexOfFirstTree, indexOfLastTree);

    // Function to handle next page
    const nextPage = () => {
        if (indexOfLastTree < trees.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Function to handle previous page
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const datePlanted = (tree) => {
        return new Date(tree.datePlanted).toISOString().split('T')[0]
    }

    const dateRemoved = (tree) => {
        if (tree.dateRemoved == null) {
            return `-`
        }
        return new Date(tree.dateRemoved).toISOString().split('T')[0]
    }

    const lastHarvestDate = (treeHarvestReports) => {
        if (treeHarvestReports.length < 1) {
            return "-"
        }
        let harvest = treeHarvestReports.reduce((prev, current) => prev.id > current.id ? prev : current)
        return new Date(harvest.harvestDate).toISOString().split('T')[0]
    }

    const lastHarvester = (treeHarvestReports) => {
        if (treeHarvestReports.length < 1) {
            return "-"
        }
        let harvest = treeHarvestReports.reduce((prev, current) => prev.id > current.id ? prev : current)
        return `${harvest.employee.firstName} ${harvest.employee.lastName}`
    }

    const poundsProduced = (treeHarvestReports) => {
        if (treeHarvestReports.length < 1) {
            return "-"
        }
        let pounds = 0
        treeHarvestReports.map(thr => pounds += thr.poundsHarvested)
        return pounds
    }

    return (
        <>
            <div className="viewtrees">
                <header className="viewtrees_header">
                    <h1>Tree Manager</h1>
                    <aside className="viewtrees_header_inputs">
                        <Button className="viewtrees_header_inputs_button" onClick={() => {
                            navigate("/trees/newtree")
                        }}>
                            New Tree
                        </Button>
                    </aside>
                </header>
                <section className="viewtrees_body">
                    <Table>
                        <thead>
                            <tr>
                                <th>Tree Id</th>
                                <th>Apple Variety</th>
                                {screenWidth > 715 && <th>Date Planted</th>}
                                {screenWidth > 840 && <th>Date Removed</th>}
                                {screenWidth > 460 && <th>Last Harvest Date</th>}
                                {screenWidth > 600 && <th>Last Harvester</th>}
                                {screenWidth > 990 && <th>Pounds Produced</th>}
                                {loggedInUser.roles.includes("Admin") && <th></th>}
                            </tr>
                        </thead>
                        <tbody>
                            {currentTrees?.map((t) => (
                                <tr key={`order-${t.id}`}>
                                    <th
                                        style={{ color: t.dateRemoved != null ? 'red' : 'black' }}
                                        scope="row"
                                    >
                                        {t.id}
                                    </th>
                                    <th style={{ color: t.dateRemoved != null ? 'red' : 'black' }}>{t.appleVariety.type}</th>
                                    {screenWidth > 715 && <th style={{ color: t.dateRemoved != null ? 'red' : 'black' }}>{datePlanted(t)}</th>}
                                    {screenWidth > 840 && <th style={{ color: t.dateRemoved != null ? 'red' : 'black' }}>{dateRemoved(t)}</th>}
                                    {screenWidth > 460 && <th style={{ color: t.dateRemoved != null ? 'red' : 'black' }}>{lastHarvestDate(t.treeHarvestReports)}</th>}
                                    {screenWidth > 600 && <th style={{ color: t.dateRemoved != null ? 'red' : 'black' }}>{lastHarvester(t.treeHarvestReports)}</th>}
                                    {screenWidth > 990 && <th style={{ color: t.dateRemoved != null ? 'red' : 'black' }}>{poundsProduced(t.treeHarvestReports)}</th>}
                                    {loggedInUser.roles.includes("Admin") && (
                                        <th>
                                            <Button className="viewtrees_body_button" onClick={() => {
                                                navigate(`/trees/edit/${t.id}`)
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
                <div className="viewtrees_body_pagination">
                    <Button className="viewtrees_body_button" onClick={prevPage} disabled={currentPage === 1}>
                        Previous
                    </Button>
                    <Button className="viewtrees_body_button" onClick={nextPage} disabled={indexOfLastTree >= trees.length}>
                        Next
                    </Button>
                </div>
            </div>
            <Footer />
        </>
    )
}