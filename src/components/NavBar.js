import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { logout } from "../managers/authManager";
import "./stylesheets/navBar.css"
import { getUnsubmittedOrder } from "../managers/orderManager";

export default function NavBar({ loggedInUser, setLoggedInUser }) {
    const [click, setClick] = useState(false)
    const [order, setOrder] = useState({})

    useEffect(() => {
        if (loggedInUser?.roles.includes("Customer")) {
            getUnsubmittedOrder().then(order => {
                setOrder(order)
            })
        }
    }, [order, loggedInUser])

    const handleClick = () => {
        setClick(!click)
    }

    const closeMobileMenu = () => {
        setClick(false)
    }

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                        GJ's Apples
                    </Link>
                    <div className="menu-icon" onClick={handleClick}>
                        <i className={click ? `fas fa-times` : `fas fa-bars`} />
                    </div>
                    <ul className={click ? `nav-menu active` : `nav-menu`}>
                        {loggedInUser ? (
                            <>
                                {/* Normal Links */}
                                <li className="nav-item">
                                    <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                                        Home
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/history" className="nav-links" onClick={closeMobileMenu}>
                                        History
                                    </Link>
                                </li>

                                {/* Customer Links */}
                                {loggedInUser.roles.includes("Customer") && (
                                    <>
                                        <li className="nav-item">
                                            <Link to="/order" className="nav-links" onClick={closeMobileMenu}>
                                                Order
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/orderhistory" className="nav-links" onClick={closeMobileMenu}>
                                                Order History
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/cart" className="nav-links" onClick={closeMobileMenu}>
                                                <i className="fa-solid fa-bag-shopping">{order.orderItems?.length > 0 && ` ${order.orderItems?.length}`}</i>
                                            </Link>
                                        </li>
                                    </>
                                )}

                                {/* Order Picker Links */}
                                {loggedInUser.roles.includes("OrderPicker") && (
                                    <li className="nav-item">
                                        <Link to="/orders/open" className="nav-links" onClick={closeMobileMenu}>
                                            Employee Portal
                                        </Link>
                                    </li>
                                )}

                                {/* Harvester Links */}
                                {loggedInUser.roles.includes("Harvester") && (
                                    <li className="nav-item">
                                        <Link to="/harvests/open" className="nav-links" onClick={closeMobileMenu}>
                                            Employee Portal
                                        </Link>
                                    </li>
                                )}

                                {/* Admin Links */}
                                {loggedInUser.roles.includes("Admin") && (
                                    <li className="nav-item">
                                        <Link to="/admin" className="nav-links" onClick={closeMobileMenu}>
                                            Admin Portal
                                        </Link>
                                    </li>
                                )}

                                {/* Logout */}
                                <li className="nav-item">
                                    <Link to="/login" className="nav-links" onClick={(e) => {
                                        e.preventDefault();
                                        // setOpen(false);
                                        logout().then(() => {
                                            setLoggedInUser(null);
                                            // setOpen(false);
                                        });
                                    }}>
                                        Logout
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                {/* Normal Links */}
                                <li className="nav-item">
                                    <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                                        Home
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/history" className="nav-links" onClick={closeMobileMenu}>
                                        History
                                    </Link>
                                </li>

                                {/* Login */}
                                <li className="nav-item">
                                    <Link to="/login" className="nav-links" onClick={closeMobileMenu}>
                                        Login
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                    {/* {button && <Button buttonStyle="btn--outline">Login</Button>} */}
                </div>
            </nav>
        </>
    )
}