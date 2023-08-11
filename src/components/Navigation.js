import React from 'react';
import '../css/Navigation.css';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
    const navigate = useNavigate();
    const MoveToMain = e => {
        navigate('/main');
    }
    return(
        <>
        <div className='Navigation'>
            <div className='logobox' onClick={MoveToMain}></div>
            <div className='navigationbox'>
                <div id='1' className='btn navigationbox-govermentbtn'><Link to='/goverment24'>정부24</Link></div>
                <div id='2' className='btn navigationbox-kioskbtn'><Link to='/movie'>키오스크</Link></div>
                <div id='3' className='btn navigationbox-ecommercebtn'><Link to='/shoppingmall'>이커머스</Link></div>
                <div id='4' className='btn navigationbox-postbtn' ><Link to={'/post'}>게시글</Link></div>
            </div>
            <div className='mypagebox'>
                <button className='btn mypagebox-loginbtn'><Link to='/login'>로그인</Link></button>
                <button className='btn mypagebox-mypagebtn'><Link to='/mypage'>마이페이지</Link></button>
            </div>
        </div>
        </>
    )
}

export default Navigation;