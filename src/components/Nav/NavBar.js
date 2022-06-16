import { useContext } from "react";
import AuthContext from "../../store/auth-context";
const NavBar = () => {
  const authCtx = useContext(AuthContext);

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">
            aServerConnect
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="fas fa-bars"></i>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" href="/">
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/profile">
                  Profile
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/contact">
                  Contact Developer
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/requests">
                  Requests
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/" onClick={authCtx.logout}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* <header>
        <nav class="navbar navbar-light bg-light">
          <div class="container-fluid">
            <div class="navbar-header">
              <a class="navbar-brand mb-0 h1">aConnectServer</a>
            </div>
            <ul class="nav navbar-nav" style={{"align-items": "baseline"}}>
              
            </ul>
          </div>
        </nav>
      </header> */}
    </>
  );
};

export default NavBar;
