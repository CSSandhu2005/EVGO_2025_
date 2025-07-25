import { checkUser } from "../lib/checkUser"
import EVGONavbar from "./evgo-navbar"

const EVGONavbarWrapper = async ({ isAdminPage = false }) => {
  const user = await checkUser()

  return <EVGONavbar isAdminPage={isAdminPage} user={user} />
}

export default EVGONavbarWrapper