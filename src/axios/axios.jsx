/* 
    axios
    node.jss나 브라우저에서 사용할 수 있는 http 기반의 클라이언트 라이브러리
    외부에 있는 api와 비동기 방식으로 통신할 수 있게 해주는 라이브러리
    yarn add axios로 설치
    fetch 처럼 네트워크 요청을 보내고 응답을 받는데 문법 자체가 다른 라이브러리에 비해서 간결하고 추가 기능이 있음
*/

import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = process.env.REACT_APP_BASE_URL;
// process.env = node 상에서 전역 변수로 선언

/*
    민감한 정보들 ( aip키, 계정 정보 등 github에 공유되면 안되는 내용들 )은 변수에 직접 담는 경우 그대로 노출되기 때문에 매우 위험
    gitignore에 있는 파일 명을 이용해서 ( .env.local을 씀 )변수를 담아서 불러오는 방식을 자주 사용

    반드시 지켜야 하는 것들은 REACT_APP_**는 지켜야 하며,
    넥스트의 경우는 NEXT_REPUBLICK_**로 변수명을 지어야 함

    환경 변수로 지정된 값들은 외부에서 import 방식 대신 process.env라는 명령어를 사용해서 불러오는데
    전역 변수로 값을 불러와서 import 없이 사용할 수 있게 해주는 명령어
*/

const instance = axios.create({
    // axios.creat() 새로운 axios 인스턴스를 생성해서 외부 api와 연결하는 작업
    baseURL: BASE_URL,
    params: {
        api_key: API_KEY,
        language: 'ko-KR' // 기본 통신 언어 설정
    }
})
// 현재 상영중인 영화의 리스트 받아오기

export const getMovies = async (type) => {
    try {
        const res = await instance.get(`/movie/${type}`)
        return res.data.results
    } catch (error) {
        console.error(error)
    }
}

// 메인 비디오
export const getMovieVideos = async (movieId) => {
    try {
        const res = await instance.get(`/movie/${movieId}/videos`)
        return res.data.results
    } catch (error) {
        console.error(error)
    }
}

// 영화 장르 가져오기
export const getGenre = async () => {
    try {
        const res = await instance.get(`/genre/movie/list`)
        return res.data.genres
    } catch (error) {
        console.error(error);
    }
}

// 장르별 영화 리스트 받아오기
export const getMovieGenre = async (genreId) => {
    // 특정 장르의 값을 넣으면 그 장르에 해당하는 영화만 출력하는 코드
    try {
        const res = await instance.get('/discover/movie', {
            params: {
                with_genres: genreId
            }
        })
        console.log(res)
        return res.data.results
    } catch (error) {
        console.error(error);
    }
}

export const getModalDetail = async (movieId) => {
    try {
        const res = await instance.get(`movie/${movieId}`);
        return res.data
    } catch (error) {
        console.error(error);
    }
}

export const getSearchResults = async (keyword) => {
    try {
        const res = await instance.get(`search/multi?query=${keyword}`);
        console.log(res)
        return res.data.results
    } catch (error) {
        console.error(error);
    }
}

export default instance