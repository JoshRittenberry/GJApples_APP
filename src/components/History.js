import { Footer } from "./Footer"
import "./stylesheets/history.css"

export const History = () => {
    let timelineElements = [
        {
            id: 1,
            image: "/pictures/gj_50.jpg",
            date: "1955",
            title: "First Apple Tree Planted",
            description: "Garry Jones plants the very first apple tree in his backyard in Mount Juliet, Tennessee, at the age of 27, with a vision of starting his own apple orchard."
        },
        {
            id: 2,
            image: "/pictures/gj_60.jpg",
            date: "1960",
            title: "Expansion Begins",
            description: "Encouraged by the success of his first apple tree, Garry, now 32, expands his backyard orchard by planting more apple trees, creating a small family orchard."
        },
        {
            id: 3,
            image: "/pictures/gj_70.jpg",
            date: "1970",
            title: "Opening to the Public",
            description: "Garry, aged 42, decides to share his love for apples with the community and opens his orchard to the public, allowing visitors to pick their own apples and enjoy the scenic beauty of the orchard."
        },
        {
            id: 4,
            image: "/pictures/gj_80.webp",
            date: "1986",
            title: "Officially Named Garry Jones' Apple Orchard",
            description: "The orchard becomes well-known in the region, and Garry, now 58, officially names it 'Garry Jones' Apple Orchard' as it grows in size and popularity."
        },
        {
            id: 5,
            image: "/pictures/gj_00.jpg",
            date: "2001",
            title: "Generational Involvement",
            description: "Garry's children and grandchildren become actively involved in the business, helping with orchard management, apple picking, and maintaining the orchard's traditions as Garry turns 73 years old."
        },
        {
            id: 6,
            image: "/pictures/gj_10.jpg",
            date: "2017",
            title: "#1 Best Apple Orchard Award",
            description: "At 89 years old, Garry Jones' Apple Orchard is awarded the prestigious 'Tennessee Apple Harvest Excellence Award' in 2017, recognizing it as the #1 Best Apple Orchard in Tennessee. This award brings widespread recognition and visitors from across the state."
        },
        {
            id: 7,
            image: "/pictures/gj_20.jpg",
            date: "2020",
            title: "Modernization and Expansion",
            description: "With Garry still overseeing the orchard at the age of 92, it undergoes a significant modernization and expansion phase, including the addition of a cider press, a café, and educational programs for visitors."
        },
        {
            id: 8,
            image: "/pictures/gj_23.jpg",
            date: "Present Day",
            title: "Garry Jones' Legacy",
            description: "Garry Jones, now an elderly man at 93, continues to oversee the orchard with the help of his family. The orchard has become a beloved community destination, offering a wide variety of apple varieties, apple-based products, and a beautiful environment for families to enjoy."
        }
    ]

    let position = ""

    return (
        <>
            <div className='history-container'>
                <video className="history-container-video" src='/videos/hp_apples_v.mp4' playsInline autoPlay loop muted />
                <div className="timeline">
                    {timelineElements.map(te => {
                        if (position === "right" || position === "") {
                            position = "left"
                        } else if (position === "left") {
                            position = "right"
                        }
                        return (
                            <div className={`timeline-container ${position}-container`} key={te.id}>
                                <img className={`${position}-dot`} alt="" src="/pictures/blank.png"></img>
                                <div className="timeline-container-textbox">
                                    <h2>{te.title}</h2>
                                    <small>{te.date}</small>
                                    <div className="timeline-container-textbox-info">
                                        <p>{te.description}</p>
                                        <img src={te.image} alt=""></img>
                                    </div>
                                    <span className={`${position}-container-arrow`}></span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <Footer />
        </>
    )
}