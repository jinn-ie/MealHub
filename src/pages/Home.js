import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Trends from '../components/Trends/Trends';
import useScroll from '../hooks/useScroll';
import sushi from '../sushi.jpg';
import map from '../map.png';

function Home() {

  const containerRef = useRef(null); 
  useScroll(containerRef, "vertical"); // 세로 스크롤

  const [result, 글제목변경] = useState('초밥');
  const [showRec, setShowRec] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [isHeightChanged, setIsHeightChanged] = useState(false);
  const [isFixed, setIsFixed] = useState(true);

  const navigate = useNavigate();

  const calculateTotalHeight = () => {  // 전체 높이 계산
    if (containerRef.current) {
      const children = Array.from(containerRef.current.children);
      const totalHeight = children.reduce((sum, child) => sum + child.offsetHeight, 0);
      return totalHeight;
    }
  }

  useEffect(() => {
    if (calculateTotalHeight() <= window.innerHeight) setIsFixed(true);
    else setIsFixed(false);
    setIsHeightChanged(false);
  }, [isHeightChanged]);

  return (
    <div className="App" ref={containerRef}>
      <div className="orange-nav">
        <h3>MEALHUB</h3>
        <div className="nav-buttons">
          <button className="like">🤍</button>
          <button className="my" onClick={() => navigate("/login")}>🐻‍❄️</button>
        </div>
      </div>

      <div className='party'>
        <span>정종욱</span>
        <span>하천수</span>
        <span>이서진</span>
        <p>님과 함께합니다.</p>
      </div>

      {!showRec && (
        <div className="rec">
          <h2>오늘 뭐 먹지?</h2>
          <button className='create-rec' onClick={() => {
            setShowRec(true);
            글제목변경('초밥'); //////////////////
          }}>추천 생성</button>
        </div>
      )}

      {showRec && (
        <div>
          <h2>오늘의 추천 메뉴는 '{ result }' !</h2>
          <img className='res-img' src={ sushi }/>
          <div className='buttons'>
          <button className="show-map" onClick={() => {
            setShowMap(true);
            setIsHeightChanged(true);
          }}>주변 식당 찾기</button>
          <button className="reload">추천 재생성</button>
          </div>
        </div>
      )}


      {showMap && (
        <div className="map">
          {/* <p>지도</p> */}
          <img className="map-img" src={ map }></img>
        </div>
      )}
      
      <Trends isFixed={isFixed}/>
    </div>
  );
}

export default Home;