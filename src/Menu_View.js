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
    let option_sum_txt;

    let total;
    const handleChange = (e)=>{
        option_sum_txt=document.getElementById("option_sum_txt");
        total = document.getElementById("total");
        if(e.target.checked){
            console.log(Number(option_sum_txt.innerHTML)+Number(e.target.value));
            option_sum_txt.innerHTML = Number(option_sum_txt.innerHTML)+ Number(e.target.value);
            total.innerHTML= Number(total.innerHTML)+ Number(e.target.value);
        }else{
            option_sum_txt.innerHTML = Number(option_sum_txt.innerHTML)- Number(e.target.value);
            total.innerHTML= Number(total.innerHTML) - Number(e.target.value);

        }
    }

    // console.log("menu_view_state: "+state.length);
    let img_url;
    if(menu[0]==2){
        img_url = blossom;
    }
    else if(menu[0]==3){
        img_url = azalea;
    }

    const onOrder = async (e)=>{
        const res = await fetch("http://localhost:5000/order",{
           method:"POST",
        });

        const data=await res.json();
        if(res.ok) {
            //주문 성공

        }else{

        }
    }

    const rendering = () =>{
        const result = [];
        for (let i=0; i<option.length;i++){
            result.push(
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value={option[i][2]} id={option[i][0]} onChange={handleChange}/>
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            {option[i][1]}     +{option[i][2]}원
                        </label>
                    </div>
                // <option value={option[i][2]}></option>
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
                                <br/>
                                <span id="option_sum_txt">
                                    0
                                </span>
                            </dd>
                            <div className="price_wrap">
                                <span id="total">
                                    {menu[4]}
                                </span>
                                {/*합계 */}
                                <em></em>
                                원
                            </div>
                        </div>
                        <button className="btn btn-primary" type="submit">
                            주문하기
                        </button>
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