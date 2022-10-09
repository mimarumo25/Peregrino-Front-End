import { NavBar, NavBarM, Sidebar } from './';

import { Outlet} from "react-router-dom";
import { Container } from "react-bootstrap";

export const Home = () => {
    return (
        <>
        <div className="d-none d-md-block d-print-block">
          <div className="row d-flex flex-nowrap">
            <div className='col-md-3 col-lg-2' style={{
              paddingRight: 0
            }}>
              <Sidebar />
            </div>
  
            <div className="col" style={{
              padding: 0
            }}>
              <NavBar />
              <Container>
                <Outlet/>
              </Container>
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