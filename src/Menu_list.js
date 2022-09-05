import Top from "./Top";

function Menu_list(){
    return(
        <>
            <Top></Top>
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <div id="accordion">
                            <div className="card">
                                <div className="card-header" id="headingOne">
                                    <h5 className="mb-0">
                                        <button className="btn btn-link" data-toggle="collapse"
                                                data-target="#collapseOne" aria-expanded="true"
                                                aria-controls="collapseOne">
                                            전체보기
                                        </button>
                                    </h5>
                                </div>
                                
                            </div>
                            <div className="card">
                                <div className="card-header" id="headingThree">
                                    <h5 className="mb-0">
                                        <button className="btn btn-link collapsed" data-toggle="collapse"
                                                data-target="#collapseThree" aria-expanded="false"
                                                aria-controls="collapseThree">
                                            프리미엄·고메이
                                        </button>
                                    </h5>
                                </div>
                                <div id="collapseThree" className="collapse" aria-labelledby="headingThree"
                                     data-parent="#accordion">
                                    <div className="card-body">
                                        프리미엄
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header" id="headingFour">
                                    <h5 className="mb-0">
                                        <button className="btn btn-link collapsed" data-toggle="collapse"
                                                data-target="#collapseFour" aria-expanded="false"
                                                aria-controls="collapseFour">
                                            사각도시락
                                        </button>
                                    </h5>
                                </div>
                                <div id="collapseFour" className="collapse" aria-labelledby="headingFour"
                                     data-parent="#accordion">
                                    <div className="card-body">
                                        고기고기시리즈
                                    </div>
                                </div>
                                <div id="collapseFour" className="collapse" aria-labelledby="headingFour"
                                     data-parent="#accordion">
                                    <div className="card-body">
                                        모둠시리즈
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header" id="headingFive">
                                    <h5 className="mb-0">
                                        <button className="btn btn-link collapsed" data-toggle="collapse"
                                                data-target="#collapseFive" aria-expanded="false"
                                                aria-controls="collapseFive">
                                            보울도시락
                                        </button>
                                    </h5>
                                </div>
                                <div id="collapseFive" className="collapse" aria-labelledby="headingFive"
                                     data-parent="#accordion">
                                    <div className="card-body">
                                        마요
                                    </div>
                                </div>
                                <div id="collapseFive" className="collapse" aria-labelledby="headingFive"
                                     data-parent="#accordion">
                                    <div className="card-body">
                                        카레
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="row">
                            <div className="col-4">
                                <a href="/menu_view">
                                    <img src={require('./img/newMenu1.jpg')}/>
                                    <p className="d-block">
                                        아보카도 게맛살 명란비빔밥
                                    </p>
                                    <p>
                                        6500원
                                    </p>
                                </a>
                            </div>
                            <div className="col-4">
                                <a href="">
                                    <img src={require('./img/newMenu2.jpg')}/>
                                    <p className="d-block">
                                        아보카도 소고기 명란비빔밥
                                    </p>
                                    <p>
                                        6500원
                                    </p>
                                </a>
                            </div>
                            <div className="col-4">
                                <a href="">
                                    <img src={require('./img/newMenu3.jpg')}/>
                                    <p className="d-block">
                                        핫 치즈 닭갈비덮밥
                                    </p>
                                    <p>
                                        5900원
                                    </p>
                                </a>
                            </div>
                            <div className="col-4">
                                <a href="">
                                    <img src={require('./img/newMenu1.jpg')}/>
                                    <p className="d-block">
                                        오리지널 치즈 닭갈비덮밥
                                    </p>
                                    <p>
                                        5900원
                                    </p>
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </>
    );
}

export default Menu_list;