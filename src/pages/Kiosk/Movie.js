import React from "react";
import { Link } from "react-router-dom";
import '../../css/kiosk/MoviePage.css';

function Movie() {
    return (

        <>
            <div className="title">
                <Link to={'/kiosk'}><span>키오스크</span></Link>
            </div>
            <div className="tap">
                <Link to="/Movie"><button>영화관</button></Link>
                <Link to="/Cafe"><button>카페</button></Link>
                <Link to="/Food"><button>햄버거</button></Link>
                <Link to="/Dessert"><button>디저트</button></Link>
            </div>
            <div className="Kiosk_list">
                <ul>
                    <li><Link to="/Cgv"><div className="Cgv"></div><p>CGV</p></Link></li>
                    <li><Link to="/Megabox"><div className="Megabox"></div><p>MEGABOX</p></Link></li>
                    <li><Link to="/Lotte"><div className="Lotte"></div><p>LOTTE CINEMA</p></Link></li>
                    
                </ul>
            </div>
        </>
    )
}

export default Movie;