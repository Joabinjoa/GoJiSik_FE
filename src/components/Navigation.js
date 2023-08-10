import React from 'react';
import '../css/Navigation.css';
import {Link} from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import Goverment from './Goverment';
import Postpages from '../pages/Postpages'

const MoveToPage = e => {
    console.log(e.target.id);
    const Nav_Id = e.target.id;
    switch(Nav_Id){
        case 1 : {<div>i</div>}
    }
}

const Navigation = () => {
    return(
        <>
        <div className='Navigation'>
            <div className='logobox'><Link to={'/main'}></Link></div>
            <div className='navigationbox'>
                <div id='1' className='btn navigationbox-govermentbtn'><Link to='/goverment24'>정부24</Link></div>
                <div id='2' className='btn navigationbox-kioskbtn' onClick={MoveToPage}><Link to={'/movie'}>키오스크</Link></div>
                <div id='3' className='btn navigationbox-ecommercebtn' onClick={MoveToPage}><Link to={'/ecommercePage'}>이커머스</Link></div>
                <div id='4' className='btn navigationbox-postbtn' ><Link to={'/post'}>게시글</Link></div>
            </div>
            <div className='mypagebox'>
                <button className='btn mypagebox-loginbtn'>로그인</button>
                <button className='btn mypagebox-mypagebtn'><Link to={'/myPage'}>마이페이지</Link></button>
            </div>
        </div>
        </>
    )
}

export default Navigation;