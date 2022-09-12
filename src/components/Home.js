import { Outlet} from "react-router-dom";

import Navbar from "./NavBar";
import Sidebar from "./Sidebar";

import NavBarM from "./NavBarM";

const Home = () => {
    return (
        <>
        <div className="d-none d-md-block d-print-block">
          <div className="row ">
            <div className="col-md-2 ">
              <Sidebar />
            </div>
  
            <div className="col-md-9">
              <Navbar />
              <Outlet/>
            </div>
          </div>
        </div>
        <div className="d-md-none">
          <NavBarM />
          <div className="container">
          <Outlet/>
          </div>
        </div>
      </>
    );
}

export default Home;