import {BrowserRouter, Routes, Route} from "react-router-dom";
import App from './App';
import Login from './routes/Login';
import Signup from "./routes/Signup";
import SignupAgree from "./routes/SignupAgree";
import Menu_list from "./routes/Menu_list";
import Menu_View from "./routes/Menu_View";
import Mypage from "./routes/Mypage";

function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/signupAgree" element={<SignupAgree/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/menu_list" element={<Menu_list/>}/>
                <Route path="/menu_view/:menuID" element={<Menu_View/>}/>
                <Route path="/myPage" element={<Mypage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;