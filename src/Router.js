import {BrowserRouter, Routes, Route} from "react-router-dom";
import App from './App';
import Login from './Login';
import Signup from "./Signup";
import SignupAgree from "./SignupAgree";
import Menu_list from "./Menu_list";
import Menu_View from "./Menu_View";

function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/signupAgree" element={<SignupAgree/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/menu_list" element={<Menu_list/>}/>
                <Route path="/menu_view" element={<Menu_View/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;