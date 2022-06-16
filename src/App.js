import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import AuthContext from "./store/auth-context";
import { useContext } from "react";
import NavBar from "./components/Nav/NavBar";
import ProfilePage from "./pages/ProfilePage";
import ContactsPage from "./pages/ContactPage";
import RequestsList from "./components/ContactsSection/RequestsList";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <>
      {authCtx.isLoggedIn && <NavBar></NavBar>}
      <Routes>
        {/* <Route exact path="/" element={<IndexPage />}>
          <Route exact path="/" element={<HomePage/>}></Route>
        </Route>
        <Route exact path="/login" element={<AuthPage/>}></Route> */}

        {authCtx.isLoggedIn && (
          <>
          <Route exact path="/" element={<HomePage />}></Route>
          <Route exact path="/profile" element={<ProfilePage/>}></Route>
          <Route exact path="/contact" element={<ContactsPage></ContactsPage>}></Route>
          <Route exact path="/requests" element={<RequestsList></RequestsList>}></Route>
          </>
        )}
        {!authCtx.isLoggedIn && <Route exact path="/" element={<AuthPage />} />}
      </Routes>
    </>
  );
}

export default App;
