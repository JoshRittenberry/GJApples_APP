import "../stylesheets/adminHomePage.css"
import { Footer } from "../Footer"
import AdminSelections from "../cards/AdminSelections"

export const AdminHomePage = () => {
    return (
        <>
            <div className="adminhome">
                <section className="adminhome_body">
                    <AdminSelections />
                </section>
            </div>
            <Footer />
        </>
    )
}