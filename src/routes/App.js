import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from 'react-router-dom';
import '../App.css';
import Top from "./Top";
// import main from "./main";
import Login from "./Login";
import { useEffect } from "react";

function App() {
    // window.onload = () => {
    //     let bg = document.querySelector(".main_hansot .main_hansot_bg");
    //     console.log(bg);
    //     bg.addEventListener("mouseenter", (event) => {
    //         event.target.classList.add("on");
    //         console.log("mouseenter");
    //     });
    //     bg.addEventListener("mouseleave", (event) => {
    //         event.target.classList.remove("on");
    //         console.log("mouseleave");
    //     });
    // };

    return (<>
            <Top> </Top>

            <div className="container">
                {/*위에 두개*/}
                <div className="row justify-content-md-center">
                    <div className="col-md-6">
                        <div className="col-md-12 bg-secondary area_sc">
                            <figure>
                                <span>
                                    <img src={require('../img/main01.jpg')}/>
                                </span>
                                <figcaption>
                                    <p>
                                        <span className="d-block">
                                            가격 이상의 가치가 담긴
                                        </span>
                                        <span className="d-block">
                                            다양한 메뉴를 확인해 보세요
                                        </span>
                                    </p>
                                    <span>한솥 메뉴</span>
                                </figcaption>
                            </figure>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="col-md-12 bg-secondary area_sc">
                            <figure>
                                <span>
                                    <img src={require('../img/main02.jpg')}/>
                                </span>
                                <figcaption>
                                    <p>
                                        <span className="d-block">
                                            갓 지은 한끼가 기다리고 있는
                                        </span>
                                        <span className="d-block">
                                            가까운 한솥 매장을 찾아보세요
                                        </span>
                                    </p>
                                    <span>주변 점포 찾기</span>
                                </figcaption>
                            </figure>

                        </div>
                    </div>
                </div>
                <br/>
                {/*가운데 세개*/}
                <div className="row justify-content-md-center">
                    <div className="col-12 col-sm-4">
                        <div className="col-12 bg-warning">
                            <h2>
                            <span className="d-block">
                                가맹점주에게도
                            </span>
                                <span className="d-block">
                                든든한 한솥입니다
                            </span>
                            </h2>
                            <p>
                            <span className="d-block">
                                점주님들의 꿈을 실현시켜 드리기 위해
                            </span>
                                <span className="d-block">
                                가맹점주와 성공까지 동행하는 한솥!
                            </span>
                                <span className="d-block">
                                상담부터 개업까지 모든 희로애락을 함께합니다.
                            </span>
                            </p>
                        </div>
                    </div>
                    <div className="col-6 col-sm-4 bg-secondary">
                        <div className="col-12">
                            <img src={require('../img/main03.jpg')}/>
                            <p>
                                <span className="d-block">
                                    한솥은 언제나 고객님과 점주님들의
                                </span>
                                <span className="d-block">
                                    이익을 먼저 생각합니다
                                </span>
                            </p>
                            <span>
                                Why 한솥 가맹점
                            </span>
                        </div>
                    </div>
                    <div className="col-6 col-sm-4">
                        <div className="col-12 bg-secondary">
                            <img src={require('../img/main04.jpg')}/>
                            <p>
                    <span className="d-block">
                        한솥과 함께하는 가맹점주들의
                    </span>
                                <span className="d-block">
                        성공스토리입니다
                    </span>
                            </p>
                            <span>
                    성공수기
                </span>
                        </div>
                    </div>
                </div>
                <br/>
                {/*길쭉 배경*/}
                <div className="main_hansot">
                    <div className="main_hansot_bg">

                    </div>
                    <div className="col-12 col-sm-3 main_cont_wrap">
                        <div className="col-12 bg-secondary main_info">
                            <div className="h2_info">
                                <h2>
                                    <span className="d-block text-light">든든한 솥밥을 위해</span>
                                    <span className="d-block text-light">한솥이 지키고,</span>
                                    <span className="d-block text-light">키워가는 것들</span>
                                </h2>
                                <p>
                                    <span className="d_block text-light">한솥은 '따끈한 도시락으로 지역사회에 공헌한다' 라는</span>
                                    <span className="d_block text-light">기업이념 아래, 고객 이익을 최우선으로 하며 엄선된</span>
                                    <span className="d_block text-light">좋은 식재료만 사용하는 대한민국 외식종합기업 시장을</span>
                                    <span className="d_block text-light">리드하는 글로벌 종합외식기업 입니다.</span>
                                </p>
                                <span>
                                <a href="src/routes/App" className="text-light">브랜드 철학</a>
                            </span>
                            </div>

                        </div>

                    </div>
                </div>

                <br/>
                <div className="bg-secondary">
                    <div>
                        <img src={require('../img/main05.jpg')}/>
                    </div>
                    <h2>
                        <span className="d-block">식재료 앞에서는</span>
                        <span className="d-block">한없이</span>
                        <span className="d-block">까탈스럽습니다</span>
                    </h2>

                    <p>
                        <span className="d-block">맑고 깨끗한 자연 환경 속에서 재배된 식재료가</span>
                        <span className="d-block">아니면 한솥이 될 수 없습니다.</span>
                        <span className="d-block">모든 식재료는 고객분들이 안심하고 드실 수 있도록</span>
                        <span className="d-block">엄격한 기준 아래 선별됩니다.</span>
                    </p>
                    <span>식재료 이야기</span>
                </div>
            </div>


        </>
    );
}

export default App;
