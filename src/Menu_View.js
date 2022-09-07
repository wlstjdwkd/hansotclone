import Top from "./Top";
import {Link, useLocation} from "react-router-dom";
import blossom from './img/blossom.jpg';
import azalea from './img/Azalea.jpg';
import React from "react";


function Menu_View(){
    const location = useLocation();
    console.log("menu_view_state_menu: "+location.state.menu);
    console.log("menu_view_state_option: "+location.state.option);

    const menu=location.state.menu;
    const option = location.state.option;
    // console.log("menu_view_state: "+state.length);
    let img_url;
    if(menu[0]==2){
        img_url = blossom;
    }
    else if(menu[0]==3){
        img_url = azalea;
    }

    const rendering = () =>{
        const result = [];
        for (let i=0; i<option.length;i++){
            result.push(
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            {option[i][1]}     +{option[i][2]}원
                        </label>
                    </div>
            );
        }
        return result;
    }

    return(
        <>
        <Top></Top>
            <div className="container">
                <h2>
                    <Link to="/menu_list">
                        전체 메뉴
                    </Link>
                </h2>
                <div className="row">
                    <div className="col-5">
                        <img src={img_url}/>

                        {/*<img src={require('./img/newMenu1.jpg')}/>*/}
                    </div>
                    <div className="col-7">
                        <h3>
                            {menu[1]}
                        </h3>
                        <p>
                            {menu[2]}
                        </p>
                        <div>
                            {rendering()}
                        {/*    option*/}
                        </div>
                        <br/>
                        <div className="total">
                            <dd>
                                <span>
                                    {menu[4]}
                                </span>
                                <span>
                                {/*    option 비용*/}
                                </span>
                            </dd>
                            <div className="price_wrap">
                                {/*합계 */}
                                <em></em>
                                원
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h4>열량</h4>
                    <p>
                        {menu[5]}
                        <span></span>
                        Kcal
                    </p>
                </div>
            </div>
        </>
    );
}

export default Menu_View;