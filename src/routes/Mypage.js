import Top from "./Top";
import {useLocation} from "react-router-dom";

function Mypage(){
    const { state } =useLocation();
    state.push([null,null,null,null,null,null]);

    console.log(state);
    const rendering = () =>{
        const result = [];
        for(let i=0; i<state.length; i++){
            var cnt=1;

            if(state[i][4]!=null){
                console.log("state[i][3] : "+state[i][3]);
                state[i][2]= Number(state[i][2])+Number(state[i][5]);
                while(state[i][3]==state[i+cnt][3]){
                    state[i][4] += "\n"+ state[i+cnt][4];
                    state[i][2]= Number(state[i][2])+Number(state[i+cnt][5]);
                    cnt++;
                }
            }else{
                state[i][4]= "-";
            }
            result.push(
                <div className="row d-flex text-center bg-light align-items-center ">
                    <div className="border col-2">
                        {state[i][0]}
                    </div>
                    <div className="border col-6">
                        {state[i][1]}
                    </div>
                    <div className="border col-2">
                        {state[i][2]}
                    </div>
                    <div className="border col-2">
                        {state[i][4]}
                    </div>
                </div>

            );
            console.log("cnt: "+cnt);
            i=i+cnt-1;

        }


        return result;

    }

    return (<>
        <Top></Top>
        <div className="container">
            <div className="row d-flex text-center bg-secondary align-items-center ">
                <div className="border col-2">
                    주문일자
                </div>
                <div className="border col-6">
                    상품정보
                </div>
                <div className="border col-2">
                    상품구매금액
                </div>
                <div className="border col-2">
                    추가 옵션
                </div>
            </div>
            {rendering()}

        </div>
        </>);
}

export default Mypage;