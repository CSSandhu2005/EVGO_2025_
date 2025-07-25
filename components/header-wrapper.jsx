import { checkUser } from "../lib/checkUser";
import AnimatedHeader from "./animated-header";

const HeaderWrapper = async ({ isAdminPage = false }) => {
  const user = await checkUser();

  return <AnimatedHeader isAdminPage={isAdminPage} user={user} />;
};

export default HeaderWrapper;
