import { React, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import '../css/Mainpage.css';
import { RiSchoolFill } from "react-icons/ri";
import { SlScreenDesktop } from 'react-icons/sl';
import { FaInternetExplorer } from 'react-icons/fa'

export default function Main() {
    const navigate = useNavigate();
    const [postdata, setPostdata] = useState([]);
    const [recentPost, setRecentPost] = useState([]);
    const [bestpost, setBestpost] = useState([]);
    useEffect(() => {
        const BestPost = async () => {
            try {
                const response = await axios.get('//localhost:8080/questions')
                setPostdata(response.data.data)
                console.log(response.data.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        BestPost();
    }, [])
    // useEffect(() => {
    //     if (postdata.length > 0) {
    //         const recent = postdata.slice(0, 3);
    //         setRecentPost(recent);
    //         console.log(recent);
    //     }
    // }, [postdata]);

    useEffect(() => {
        let bestpost = postdata.sort((a, b) => (b.hits - a.hits))
        bestpost = bestpost.slice(0, 3)
        console.log(bestpost)
        setBestpost(bestpost);
    }, [postdata])

    const MoveToGover = e => {
        navigate('/goverment24')
    }
    const MoveToKiosk = e => {
        navigate('/movie');
    }
    const MoveToEcor = e => {
        navigate('/ecommerce');
    }
    return (
        <div className="Mainbody">
            <div className="mainbox">
                <div className="mainbox-categorybox">
                    <h3 className="categorytext">사용방법 카테고리</h3>
                    <div className="mainbox-categorybox-box">
                        <div className="mainbox-categorybox__goverment24box" onClick={MoveToGover}>
                            <RiSchoolFill size={50} />
                            <p>정부24</p>
                            <span>바로가기</span>
                        </div>
                        <div className="mainbox-categorybox__kioskbox" onClick={MoveToKiosk}>
                            <SlScreenDesktop size={50} />
                            <p>키오스크</p>
                            <span>바로가기</span>
                        </div>
                        <div className="mainbox-categorybox__ecommercebox" onClick={MoveToEcor}>
                            <FaInternetExplorer size={50} />
                            <p>전자상거래</p>
                            <span>바로가기</span>
                        </div>
                    </div>
                </div>
                <div className="main-postbox">
                    <h3>게시글 목록</h3>
                    <div className="mainbox-bestpostbox">
                        {bestpost?.map(item => (
                            <li className="bestpostlist" key={item.id} id={item.id}>
                                <Link to='/postdetails' state={{ id: item.id }}>
                                    <h4 className="titlepost">제목 : {item.title}</h4>
                                    <div className="posttext">작성자: {item.writer}, 조회수: {item.hits}</div>
                                </Link>
                            </li>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
