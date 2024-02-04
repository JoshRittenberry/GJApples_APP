import "../stylesheets/homePageGJGreeting.css"
import "../../App.css"
import { Button } from "../Button"
import { useNavigate } from "react-router-dom"

export const HomePageGJGreeting = () => {
    const navigate = useNavigate()

    return (
        <div className='homepage-gj-greeting-container'>
            {/* <img src='/pictures/GJ-Picking-Apples.jpg' alt=""/> */}
            <h1>Hear From Garry Jones Himself</h1>
            <p>Learn about the humble beginnings of Garry's Orchard and what helped make it one of Tennessee's top orchards.</p>
            <div className='homepage-gj-greeting-btns'>
                <Button
                    className='btns'
                    buttonStyle='btn--primary'
                    buttonSize='btn--large'
                    onClick={event => {
                        event.preventDefault()
                        navigate("/history")
                    }}
                >
                    History Page
                </Button>
            </div>
        </div>
    )
}