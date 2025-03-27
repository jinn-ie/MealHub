import React, { useRef, useEffect, useState } from 'react';

const Map = () => {
    const mapContainer = useRef(null);

    const latitude = 37.5665;
    const longitude = 126.9780;
    const apiKey = process.env.REACT_APP_KAKAO_API_KEY;
    const [keyword, setKeyword] = useState("부산대 초밥"); // 키워드 상태 관리
    const [map, setMap] = useState(null); // map 객체 상태 관리
    const [markers, setMarkers] = useState([]); // markers 상태 관리

    useEffect(() => {
        const script = document.createElement('script');
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false&libraries=services`;
        script.async = true;

        script.onload = () => {
            if (window.kakao && window.kakao.maps) {
                window.kakao.maps.load(() => {
                    const container = mapContainer.current;
                    const options = {
                        center: new window.kakao.maps.LatLng(latitude, longitude), // 위치 수정
                        level: 3,
                    };
                    const initializedMap = new window.kakao.maps.Map(container, options); // 맵 초기화
                    setMap(initializedMap); // map 객체 상태에 저장
                    searchPlaces(initializedMap); // 맵 초기화 후 검색 실행
                });
            } else {
                console.error("Kakao Maps API 로드 실패!");
            }
        };

        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, [apiKey]);

    // 키워드로 장소 검색하는 함수
    const searchPlaces = (map) => {
        const ps = new window.kakao.maps.services.Places();
        const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

        if (!keyword.replace(/^\s+|\s+$/g, '')) {
            alert('키워드를 입력해주세요!');
            return false;
        }

        ps.keywordSearch(keyword, (data, status, pagination) => {
            if (status === window.kakao.maps.services.Status.OK) {
                displayPlaces(data, map, infowindow); // 검색 결과 처리
                displayPagination(pagination);
            } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
                alert('검색 결과가 존재하지 않습니다.');
                return;
            } else if (status === window.kakao.maps.services.Status.ERROR) {
                alert('검색 결과 중 오류가 발생했습니다.');
                return;
            }
        });
    };

    // 검색 결과를 지도에 표시하고 목록에 추가하는 함수
    const displayPlaces = (places, map, infowindow) => {
        const listEl = document.getElementById('placesList');
        const menuEl = document.getElementById('menu_wrap');
        const fragment = document.createDocumentFragment();
        const bounds = new window.kakao.maps.LatLngBounds();

        removeAllChildNodes(listEl);
        removeMarker();

        places.forEach((place, i) => {
            const placePosition = new window.kakao.maps.LatLng(place.y, place.x);
            const marker = addMarker(placePosition, i, place.place_name);
            const itemEl = getListItem(i, place);

            bounds.extend(placePosition);

            (function (marker, title) {
                window.kakao.maps.event.addListener(marker, 'mouseover', function () {
                    displayInfowindow(marker, title, infowindow);
                });

                window.kakao.maps.event.addListener(marker, 'mouseout', function () {
                    infowindow.close();
                });

                itemEl.onmouseover = function () {
                    displayInfowindow(marker, title, infowindow);
                };

                itemEl.onmouseout = function () {
                    infowindow.close();
                };
            })(marker, place.place_name);

            fragment.appendChild(itemEl);
        });

        listEl.appendChild(fragment);
        menuEl.scrollTop = 0;

        map.setBounds(bounds); // 지도 범위 재설정
    };

        // 장소 목록을 반환하는 함수 (getListItem 추가)
        const getListItem = (index, place) => {
            const el = document.createElement('li');
            let itemStr =
            '<span class="markerbg marker_' +
            (index + 1) +
            '"></span>' +
            '<div class="info">' +
            '   <h5>' +
            place.place_name +
            '</h5>';
    
            if (place.road_address_name) {
                itemStr +=
                '    <span>' +
                place.road_address_name +
                '</span>' +
                '   <span class="jibun gray">' +
                place.address_name +
                '</span>';
            } else {
                itemStr += '    <span>' + place.address_name + '</span>';
            }
    
            itemStr += '  <span class="tel">' + place.phone + '</span>' + '</div>';
    
            el.innerHTML = itemStr;
            el.className = 'item';
    
            return el;
        };

    // 마커를 생성하는 함수
    const addMarker = (position, idx, title) => {
        const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png';
        const imageSize = new window.kakao.maps.Size(36, 37);
        const imgOptions = {
            spriteSize: new window.kakao.maps.Size(36, 691),
            spriteOrigin: new window.kakao.maps.Point(0, idx * 46 + 10),
            offset: new window.kakao.maps.Point(13, 37),
        };
        const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);
        const marker = new window.kakao.maps.Marker({
            position: position,
            image: markerImage,
        });

        marker.setMap(map);
        setMarkers((prevMarkers) => [...prevMarkers, marker]); // 마커 상태 업데이트

        return marker;
    };

    // 검색된 마커를 제거하는 함수
    const removeMarker = () => {
        markers.forEach((marker) => marker.setMap(null));
        setMarkers([]); // 마커 상태 비우기
    };

    // 검색결과 목록 하단에 페이지번호를 표시하는 함수
    const displayPagination = (pagination) => {
        const paginationEl = document.getElementById('pagination');
        const fragment = document.createDocumentFragment();

        while (paginationEl.hasChildNodes()) {
            paginationEl.removeChild(paginationEl.lastChild);
        }

        for (let i = 1; i <= pagination.last; i++) {
            const el = document.createElement('a');
            el.href = '#';
            el.innerHTML = i;

            if (i === pagination.current) {
                el.className = 'on';
            } else {
                el.onclick = (function (i) {
                    return function () {
                        pagination.gotoPage(i);
                    };
                })(i);
            }

            fragment.appendChild(el);
        }
        paginationEl.appendChild(fragment);
    };

    // 인포윈도우를 표시하는 함수
    const displayInfowindow = (marker, title, infowindow) => {
        const content = '<div style="padding:5px;z-index:1;">' + title + '</div>';
        infowindow.setContent(content);
        infowindow.open(map, marker);
    };

    // 검색결과 목록의 자식 Element를 제거하는 함수
    const removeAllChildNodes = (el) => {
        if (el && el.hasChildNodes()) {
            while (el.hasChildNodes()) {
                el.removeChild(el.lastChild);
            }
        }
    };

    const handleInputChange = (e) => {
        setKeyword(e.target.value);
    };

    return (
        <div>
            <div ref={mapContainer} id="map" className="map"></div>
            <div id="menu_wrap" className="bg_white">
                <div className="option">
                    <form onSubmit={(e) => { e.preventDefault(); searchPlaces(map); }}>
                        키워드:
                        <input
                            type="text"
                            value={keyword}
                            onChange={handleInputChange}
                            id="keyword"
                            size="15"
                        />
                        <button type="submit">검색하기</button>
                    </form>
                </div>
                <hr />
                <ul id="placesList"></ul>
                <div id="pagination"></div>
            </div>
        </div>
    );
};

export default Map;
