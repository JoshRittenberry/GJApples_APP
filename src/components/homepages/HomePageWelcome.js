import "../stylesheets/homePageWelcome.css"
import "../../App.css"
import { Button } from "../Button"
import { useNavigate } from "react-router-dom"

export const HomePageWelcome = ({ loggedInUser }) => {

    const navigate = useNavigate()

    return (
        <div className='homepagewelcome-container'>
            <video className='homepagewelcome-container-video' src='/videos/hp_apples_h.mp4' playsInline autoPlay loop muted />
            <h1>Garry Jones' Apples</h1>
            <p>What are you waiting for{loggedInUser?.id != null && loggedInUser?.roles.includes("Customer") && (` ${loggedInUser?.firstName}`)}? Buy some of our delicious apples!!</p>
            <div className='homepagewelcome-btns'>
                {loggedInUser?.id == null && (
                    <Button
                        className='btns'
                        buttonStyle='btn--primary'
                        buttonSize='btn--large'
                        onClick={event => {
                            event.preventDefault()
                            navigate("/login")
                        }}
                    >
                        Login to Purchase
                    </Button>
                )}
                {loggedInUser?.id != null && loggedInUser?.roles.includes("Customer") && (
                    <Button
                        className='btns'
                        buttonStyle='btn--primary'
                        buttonSize='btn--large'
                        onClick={event => {
                            event.preventDefault()
                            navigate("/order")
                        }}
                    >
                        Start an Order
                    </Button>
                )}
            </div>
        </div>
    )
}