import React, {useEffect} from 'react';
import Top from "./Top";
import {Link, useLocation, useNavigate} from "react-router-dom";
import blossom from '../img/blossom.jpg';
import azalea from '../img/Azalea.jpg';


function Menu_list(props){
    const navigate = useNavigate();
    const { state } = useLocation();
    console.log("menu_state: "+state[0][1]);
    let img_url;
    let data1;

    const rendering = () =>{
        const result = [];
        for (let i=0; i< state.length; i++){

            //나중에 배열로 바꾸기 너무 귀찮당
            if(i==0){
                img_url = blossom;
            }
            else if(i==1){
                img_url = azalea;
            }

            let menu_id=state[i][0];
            result.push(
                <div className="col-4">
                    <button onClick={async (e) => {
                        const res = await fetch("http://localhost:5000/menu_view",{
                            method:"GET",
                        });
                        data1=await res.json();
                        if(res.ok){
                            console.log("option: ", data1.rows);
                            navigate(`/menu_view/${menu_id}`, {state: {
                                    menu:state[i],
                                    option:data1.rows,
                            }})

                        }else{

                        }
                    }}>

                        <img src={img_url}/>
                        <p className="d-block">
                            {state[i][1]}
                        </p>
                        <p>
                            {state[i][4]}
                        </p>
                    </button>
                </div>
            );
        }
        return result;
    }

    return(
        <>
            <Top></Top>
            <p>

            </p>
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
                            {rendering()}
                        </div>

                    </div>
                </div>
            </div>

        </>
    );
}

export default Menu_list;