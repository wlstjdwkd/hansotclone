import './App.css';
import React, { useState, useEffect } from 'react';
import {BrowserRouter, Link, Route, Routes, Routes as Router} from "react-router-dom";
import Login from "./Login";
import { useCookies } from 'react-cookie';

function Top(){
    //이런식
    //{authenticated ? (<로그아웃 버튼>) : (<로그인 버튼 >)}

    const [cookies, setCookie, removeCookie] =useCookies(['test']);
    const [text,setText] = useState('');
    let result=cookies.id;
    let auth=false;
    useEffect(()=>{
        getCookieFunc();
    },[])
    const getCookieFunc = (param)=>{
        setText(result);
    }
    const removeCookieFunc= () =>{
        removeCookie('id');
        result=null;
    }

    const [member, setMember]= useState("");
    const authenticated = member != null;
    return(
        <>
        <div className="container">
            <div>
                <ul className="nav justify-content-end">
                    { result ?
                        (   <ul className="nav justify-content-end">
                        <li className="nav-item">
                        <Link className="nav-link" to="/">로그아웃</Link>
                    </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/">마이페이지</Link>
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
                            <a className="nav-link text-dark" href="">
                                BRAND
                            </a>
                        </p>
                        <div className="dp2">
                            afds
                        </div>
                    </li>
                    <li className="nav-item dp1">
                        <p>
                            <a className="nav-link text-dark" href="">
                                ESG
                            </a>
                        </p>
                        <div className="dp2">
                            sfad
                        </div>
                    </li>
                    <li className="nav-item dp1">
                        <p>
                            <a className="nav-link text-dark" href="">
                                MENU
                            </a>
                        </p>
                        <div className="dp2">
                            <ul>
                                <li>
                                    <Link to="/menu_list">전체 메뉴</Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className="nav-item dp1">
                        <p>
                            <a className="nav-link text-dark" href="">
                                STORE
                            </a>
                        </p>
                        <div className="dp2">
                            <ul>
                                <li>
                                    <a href="">주변점포찾기</a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className="nav-item">
                        <p>
                            <a className="nav-link text-dark" href="">
                                EVENT
                            </a>
                        </p>
                        <div>

                        </div>
                    </li>
                    <li className="nav-item">
                        <p>
                            <a className="nav-link text-dark" href="">
                                FRANCHISE
                            </a>
                        </p>
                        <div>

                        </div>
                    </li>
                    <li className="nav-item">
                        <p>
                            <a className="nav-link text-dark" href="">
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