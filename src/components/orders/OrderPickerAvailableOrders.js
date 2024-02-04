import { Button, Table } from "reactstrap"
import { assignOrderPicker } from "../../managers/orderManager"
import { useEffect, useState } from "react";

export const OrderPickerAvailableOrders = ({ loggedInUser, orders, assignedOrder, setAssignedOrder }) => {
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

    return (
        <div className="orderpickerhome_body_list" style={{ display: assignedOrder.id != null && screenWidth <= 1200 && 'none' }}>
            <header className="orderpickerhome_body_list_header">
                <h3>Orders Needing Completed</h3>
            </header>
            <Table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Order Date</th>
                        {assignedOrder.id == null && <th></th>}
                    </tr>
                </thead>
                <tbody>
                    {orders?.map((o) => (
                        <tr key={`order-${o.id}`}>
                            <th scope="row">
                                {o.id}
                            </th>
                            <th>{new Date(o.dateOrdered).toISOString().split('T')[0]}</th>
                            {assignedOrder?.id == null && (
                                <th>
                                    <Button onClick={() => {
                                        assignOrderPicker(o.id, loggedInUser.id).then(() => {
                                            window.location.reload();
                                        });
                                    }}>
                                        Assign Me
                                    </Button>
                                </th>
                            )}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );

}