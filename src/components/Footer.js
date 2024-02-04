import { Link } from "react-router-dom"
import { Button } from "./Button"
import "./stylesheets/footer.css"

export const Footer = () => {
    return (
        <div className="footer-container">
            <section className="footer-subscription">
                <Link to="/" className="social-logo">
                    Contact Us
                </Link>
                <p className="footer-subscription-heading">
                    Join GJ's newsletter to receive updates on all of our news and upcomming events
                </p>
                <p className="footer-subscription-text">
                    You can unsubscribe at any time
                </p>
                <div className="input-areas">
                    <form>
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            className="footer-input"
                        />
                        <Button buttonStyle="btn--outline">Subscribe</Button>
                    </form>
                </div>
            </section>
            <section className="social-media">
                <div className="social-media-wrap">
                    <div className="footer-logo">
                        <Link to="/" className="social-logo">
                            GJ's Apples
                        </Link>
                    </div>
                    <small className="website-rights">GJ's Apples © 2024</small>
                    <div className="social-icons">
                        <Link
                            className="social-icon-link facebook"
                            to="https://www.facebook.com/"
                            target="_blank"
                            aria-label="Facebook"
                        >
                            <i className="fab fa-facebook-f"></i>
                        </Link>
                        <Link
                            className="social-icon-link instagram"
                            to="https://www.instagram.com/"
                            target="_blank"
                            aria-label="Instagram"
                        >
                            <i className="fab fa-instagram"></i>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}