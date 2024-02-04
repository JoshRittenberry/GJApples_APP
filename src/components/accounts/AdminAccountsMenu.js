import { Footer } from "../Footer"
import { AdminAccountSelections } from "../cards/AdminAccountSelections"
import "../stylesheets/adminAccountsMenu.css"

export const AdminAccountsMenu = () => {
    return (
        <>
            <div className="adminaccountseemenu">
                <selection className="adminaccountsmenu_body">
                    <AdminAccountSelections />
                </selection>
            </div>
            <Footer />
        </>
    )
}