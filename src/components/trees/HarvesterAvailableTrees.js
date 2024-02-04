import { Button, Table } from "reactstrap"
import { createNewTreeHarvestReport, getAllUnassignedTrees, getHarvesterAssignment } from "../../managers/treeManager"
import { useEffect, useState } from "react";

export const HarvesterAvailableTrees = ({ loggedInUser, trees, setTrees, assignedTreeHarvestReport, setAssignedTreeHarvestReport }) => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    useEffect(() => {
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
    }, []); // Empty dependency array means this effect runs once after initial render

    const lastHarvestDate = (treeHarvestReports) => {
        let harvest = treeHarvestReports.reduce((prev, current) => prev.id > current.id ? prev : current)
        return new Date(harvest.harvestDate).toISOString().split('T')[0]
    }

    const handleAssignTree = (treeId) => {
        let newTreeHarvestReport = {
            treeId: treeId,
            employeeUserProfileId: loggedInUser.id,
        }

        createNewTreeHarvestReport(newTreeHarvestReport).then(() => {
            getAllUnassignedTrees().then(setTrees)
            getHarvesterAssignment().then(setAssignedTreeHarvestReport)
        })
    }

    return (
        <div className="harvesterhome_body_list" style={{ display: assignedTreeHarvestReport.id != null && screenWidth <= 1200 && 'none' }}>
            <header className="harvesterhome_body_list_header">
                <h3>Available Harvests</h3>
            </header>
            <section className="harvesterhome_body_list_body">
                <Table>
                    <thead>
                        <tr>
                            <th>Tree Id</th>
                            <th>Apple Variety</th>
                            {screenWidth > 800 && <th>Last Harvest Date</th>}
                            {assignedTreeHarvestReport.id == null && <th></th>}
                        </tr>
                    </thead>
                    <tbody>
                        {trees?.map((t) => (
                            <tr key={`order-${t.id}`}>
                                <th
                                    scope="row"
                                >
                                    {t.id}
                                </th>
                                <th>{t.appleVariety.type}</th>
                                {screenWidth > 800 && <th>{lastHarvestDate(t.treeHarvestReports)}</th>}
                                {assignedTreeHarvestReport?.id == null && (
                                    <th>
                                        <Button onClick={() => {
                                            handleAssignTree(t.id)
                                        }}>
                                            Assign Me
                                        </Button>
                                    </th>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </section>
        </div>
    )
}