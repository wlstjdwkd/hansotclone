import {BrowserRouter, Routes, Route} from "react-router-dom";
import App from './App';
import Login from './Login';
import Signup from "./Signup";
import SignupAgree from "./SignupAgree";

function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/signupAgree" element={<SignupAgree/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;