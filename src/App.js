import Navigation from './components/Navigation'
import {Routes, Route} from 'react-router-dom';
import Goverment from './components/Goverment'
import Postpage from './pages/Postpages';
import MyPage from "./pages/MyPage";
import PostHistoryPage from "./pages/PostHistoryPage";
import AnswerHistoryPage from "./pages/AnswerHistoryPage";
import InformationPage from "./pages/InformationPage";
import Withdrawal from "./components/Withdrawal";
import KioskPage from './pages/KioskPage';
import EcommercePage from './pages/EcommercePage';

function App() {
  return (
    <div className="App">
      <Navigation/>
      <Routes>
        <Route path='/goverment24' element={<Goverment/>}/>
        <Route path='/movie' element={<KioskPage/>}/>
        <Route path='/ecommercePage' element={<EcommercePage/>}/>
        <Route path='/post' element={<Postpage/>} />
        <Route path="/myPage" element = {<MyPage />}></Route>
          <Route path="/postHistoryPage" element = {<PostHistoryPage />}></Route>
          <Route path="/answerHistoryPage" element = {<AnswerHistoryPage />}></Route>
          <Route path="/informationPage" element = {<InformationPage />}></Route>
          <Route path="/withdrawal" element = {<Withdrawal />}></Route>
      </Routes>
    </div>
  );
}

export default App;
