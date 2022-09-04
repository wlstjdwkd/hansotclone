import './App.css';
import React, { useState, useEffect } from 'react';
import {BrowserRouter, Link, Route, Routes, Routes as Router} from "react-router-dom";
import Login from "./Login";

function Top(){
    return(
        <>
        <div className="container">
            <div>
                <ul>
                    <li>
                        <Link to='/login'>로그인</Link>
                    </li>
                    <li>
                        <Link to="/signupAgree">회원가입</Link>
                    </li>
                </ul>
            </div>
            <nav className="navbar navbar-expand-sm bg-light">
                <ul className="navbar-nav">
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
                                    <a href="">전체 메뉴</a>
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