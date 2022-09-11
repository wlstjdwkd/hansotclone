import '../App.css';
import React, { useState, useEffect } from 'react';
import {BrowserRouter, Link, Route, Routes as Router} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Login from "./Login";
import { useCookies } from 'react-cookie';


function Top(){

    const [cookies, setCookie, removeCookie] =useCookies(['test']);
    const [text,setText] = useState('');
    let result=cookies.id;
    let auth=false;
    let data1;
    const navigate = useNavigate();
    useEffect(()=>{
        getCookieFunc();
    },[])
    const getCookieFunc = (param)=>{
        setText(result);
    }
    const removeCookieFunc= () =>{
        removeCookie('id');
        result=null;
        window.location.reload();
    }

    const [menu_list,setMenu_List] = useState([]);
    const onMenu_list= async (e)=>{
        // e.preventDefault();
        const res= await fetch("http://localhost:5000/menu_list",{
            method:"GET",

        });
        data1=await res.json();
        // data1=data1.stringify();
        if (res.ok) {
            console.log("menu: ", data1);
            console.log(data1.rows.length);
            console.log(data1.rows[0][1]);
            navigate('/menu_list', { state:data1.rows });
            // window.location.replace("/menu_list");
            // alert(data.message);
        } else {
            // console.log(data);
            // alert(data.message);
        }
    }
    console.log("member_id:"+result);


    const onMyPage = async (e)=>{
        e.preventDefault();
        const req = {
            member_id:result,
        };
        console.log(req.member_id);
        const res= await fetch("http://localhost:5000/myPage",{
            method:"POST",
            headers: { "Content-Type": "application/json"},
            body:JSON.stringify(req),
        });
        data1=await res.json();
        if(res.ok){
            navigate('/myPage', {state:data1.rows});
        }
        else{

        }
    }

    return(
        <>
        <div className="container">
            <div>
                <ul className="nav justify-content-end">
                    { result ?
                        (   <ul className="nav justify-content-end">
                        <li className="nav-item">
                        <Link className="nav-link" to="/" onClick={removeCookieFunc}>로그아웃</Link>
                    </li>
                            <li className="nav-item">
                                <button className="nav-link" onClick={onMyPage}>마이페이지</button>
                            </li>
                        </ul>):(
                            <ul className="nav justify-content-end">
                            <li className="nav-item">
                        <Link className="nav-link" to='/login'>로그인</Link>
                    </li><li className="nav-item">
                        <Link className="nav-link" to="/signupAgree">회원가입</Link>
                        </li>
                            </ul>)}
                </ul>
            </div>
            <nav className="navbar navbar-expand-sm bg-light justify-content-center">
                <ul className="navbar-nav">
                    <li className="nav-item" >
                        <p>
                            <Link className="nav-link text-dark" to="/">Hansot</Link>
                        </p>
                    </li>
                    <li className="nav-item dp1">
                        <p>
                            <a className="nav-link text-dark" href="src/routes/Top">
                                BRAND
                            </a>
                        </p>
                        <div className="dp2">
                            afds
                        </div>
                    </li>
                    <li className="nav-item dp1">
                        <p>
                            <a className="nav-link text-dark" href="src/routes/Top">
                                ESG
                            </a>
                        </p>
                        <div className="dp2">
                            sfad
                        </div>
                    </li>
                    <li className="nav-item dp1">
                        <p>
                            <a className="nav-link text-dark" href="src/routes/Top">
                                MENU
                            </a>
                        </p>
                        <div className="dp2">
                            <ul>
                                <li>
                                    <button onClick={onMenu_list}>전체 메뉴</button>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className="nav-item dp1">
                        <p>
                            <a className="nav-link text-dark" href="src/routes/Top">
                                STORE
                            </a>
                        </p>
                        <div className="dp2">
                            <ul>
                                <li>
                                    <a href="src/routes/Top">주변점포찾기</a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className="nav-item">
                        <p>
                            <a className="nav-link text-dark" href="src/routes/Top">
                                EVENT
                            </a>
                        </p>
                        <div>

                        </div>
                    </li>
                    <li className="nav-item">
                        <p>
                            <a className="nav-link text-dark" href="src/routes/Top">
                                FRANCHISE
                            </a>
                        </p>
                        <div>

                        </div>
                    </li>
                    <li className="nav-item">
                        <p>
                            <a className="nav-link text-dark" href="src/routes/Top">
                                HANSOT
                            </a>
                        </p>
                        <div>

                        </div>
                    </li>
                </ul>
            </nav>
        </div>
            {/*<Routes>*/}
            {/*    <Route path="/login" component={Login} />*/}
            {/*</Routes>*/}
                {/*<Route path="/login" element={<Login />}></Route>*/}

        {/*</Router>*/}
            </>
    );
}

export default Top;