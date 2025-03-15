import React, { useState, useEffect, useRef } from 'react';
import useScroll from './hooks/useScroll';
import logo from './logo.svg';
import './App.css';
import Trends from './components/Trends/Trends';

function App() {

  const containerRef = useRef(null); 
  useScroll(containerRef, "vertical"); // 세로 스크롤

  let [result, 글제목변경] = useState('리액트');
  const [showRec, setShowRec] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [isHeightChanged, setIsHeightChanged] = useState(false);
  const [isFixed, setIsFixed] = useState(true);

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
          <button className="my">🐻‍❄️</button>
        </div>
      </div>

      {!showRec && (
        <div className="rec">
          <h2>오늘 뭐 먹지?</h2>
          <button className='create-rec' onClick={() => {
            setShowRec(true);
            글제목변경('리액트');
          }}>알려죠</button>
        </div>
      )}

      {showRec && (
        <div>
          <h2>오늘의 추천 메뉴는 '{ result }' !</h2>
          <img src={ logo }/>
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
          <p>지도</p>
        </div>
      )}
      
      <Trends isFixed={isFixed}/>
    </div>
  );
}

export default App;