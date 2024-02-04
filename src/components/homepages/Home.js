import React from "react"
import "../stylesheets/home.css"
import "../../App.css"
import { HomePageWelcome } from "./HomePageWelcome"
import { HomePageGJGreeting } from "./HomePageGJGreeting"
import { Footer } from "../Footer"

export const Home = ({ loggedInUser }) => {
    return (
        <>
            <div className="homepage">
                <HomePageWelcome loggedInUser={loggedInUser} />
                <HomePageGJGreeting />
                {/* <Cards /> */}
            <Footer />
            </div>
        </>
    )
}