import React, { useState,useEffect } from "react";
import Top from "./Top";
import { useCookies } from "react-cookie";

function Login({authenticated}){

    const [web_id,setWeb_id] = useState("");
    const [password,setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState(false);
    const [loggedInInfo, setLoggedInInfo] = useState({
        web_id: "",
        password: "",
    });
    const [cookies,setCookie,removeCookie] = useCookies(['id']);

    useEffect(()=>{
        getCookieFunc();
    },[]);

    const setCookieFunc = () =>{
        // let random = Math.floor(Math.random() * (10 - 0) + 0);
    }
    const getCookieFunc = (param) =>{
        let result = "getCookie : "+cookies.id;
    }

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
            alert(data.message);
            setCookie('id',data.id,{maxAge:2000});

            window.location.href="/";
        } else {
            setLoginStatus(false);
            console.log(data);
            alert(data.message);
        }
    }



    return(<>
        <Top></Top>
        <div className="container">
            <div className="col-12 text-center">
                <h2>
                    로그인
                </h2>
                <br/>

                <form onSubmit={(e)=>{
                    onLogin(e)
                }}>
                    <input type="text" name='web_id' value={web_id} onChange={onIDHandler} placeholder="아이디"/>
                    <input type="password" name='password' value={password} onChange={onPasswordHandler} placeholder="비밀번호"/>

                    <br/>
                    <br/>
                    <div>
                        <button className="btn-warning" type="submit">
                            로그인
                        </button>
                    </div>
                </form>
            </div>
        </div>

    </>);
}

export default Login;