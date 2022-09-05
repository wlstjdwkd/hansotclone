import React, { useState,useEffect } from "react";
import {Link} from "react-router-dom";
import Top from "./Top";
import { useDispatch } from "react-redux";
import { withRouter } from 'react-router-dom';

function Login(props){
    // const dispatch = useDispatch();

    const [web_id,setWeb_id] = useState("");
    const [password,setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState(false);
    const [loggedInInfo, setLoggedInInfo] = useState({
        web_id: "",
        password: "",
    });
    // const [loggedInInfo, setLoggedInInfo]=useState({
    //
    // })

    const onIDHandler = (e) =>{
        setWeb_id(e.currentTarget.value);
    }
    const onPasswordHandler = (e) =>{
        setPassword(e.currentTarget.value);
    }
    const onLogin = async (e) =>{
        e.preventDefault();
        const req = { web_id: web_id, password:password};
        const res = await fetch("http://localhost:5000/login",{
            method:"POST",
            headers:{ "Content-Type": "application/json"},
            body: JSON.stringify(req),
        });
        console.log("res: ",res);
        const data = await res.json();
        if (res.ok) {
            setLoginStatus(true);
            console.log("login: ", data);
            setLoggedInInfo({
                web_id: data.WEB_ID,
                password: data.PASSWORD,
            });
        } else {
            setLoginStatus(false);
            console.log(data);
            alert(data.message);
        }
    }



    return(<>
        <Top></Top>
        <div className="col-7">
            <h2>
                로그인
            </h2>
            <form onSubmit={(e)=>{
                onLogin(e)
            }}>
                <input type="text" name='web_id' value={web_id} onChange={onIDHandler} placeholder="아이디"/>
                <input type="password" name='password' value={password} onChange={onPasswordHandler} placeholder="비밀번호"/>

                <div>
                    <button className="btn-warning" type="submit">
                        로그인
                    </button>
                </div>
            </form>
        </div>
        <div className="col-5">

        </div>
    </>);
}

export default Login;