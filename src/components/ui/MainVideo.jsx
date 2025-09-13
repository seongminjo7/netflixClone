import { useEffect, useState } from "react";
import { getMovies, getMovieVideos } from "../../axios/axios";
import styled from "styled-components";
import ReactPlayer from 'react-player';
import { delay, motion, scale } from 'framer-motion'
import Button from "./Button";
import { FaPlay } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";

export default function MainVideo() {
    const [videoKey, setVideoKey] = useState(null)
    // 여러개의 동영상이 있는 경우 하나만 출력하기 위해서 저장할 상태값
    const [randomVideo, setRandomVideo] = useState('');
    // 여러 동영상 중에 하나의 동영상을 받아올 값
    useEffect(() => {
        async function movieData() {
            try {
                const movies = await getMovies('now_playing')
                const movieDatas = [];
                // console.log(movies)
                for (const movie of movies) {
                    const videos = await getMovieVideos(movie.id)
                    if (videos.length > 0) {
                        movieDatas.push({ ...movie, videoKey: videos[0].key })
                    }
                }
                // console.log(movieDatas)
                const pickMovie = movieDatas[Math.floor(Math.random() * movieDatas.length)]
                // console.log(pickMovie)
                setRandomVideo(pickMovie)
                setVideoKey(pickMovie.videoKey)
            } catch (error) {
                console.error(error);
            }
        }
        movieData()
    }, [])



    return (
        <VideoContainer>
            <VideoWrapper>
                <ReactPlayer
                    controls={false}
                    muted={true}
                    loop={true}
                    width='100%'
                    height='100%'
                    url={`https://youtu.be/${videoKey}`}
                />
            </VideoWrapper>
            <VideoInfoWrapper>
                <motion.h2
                    initial={{
                        transform: 'scale(1.5) translateY(0)',
                        transformOrigin: 'left bottom'
                    }}
                    animate={{
                        transform: 'scale(1) translateY(100px)',
                        transition: { delay: 3, duration: 1 }
                    }}
                >
                    {randomVideo.title}</motion.h2>
                <motion.p
                    initial={{ transform: 'translateY(0)', opacity: 1 }}
                    animate={{
                        transform: 'translateY(100px)', opacity: 0,
                        transition: { delay: 3, duration: 1 }
                    }}
                >{randomVideo.overview}</motion.p>
                <ButtonWrapper>
                    <Button type="bgWhite" icon={<FaPlay />} children={'재생'} />
                    <Button type="bgGray" icon={<IoIosInformationCircleOutline />} children={'상세정보'} />
                </ButtonWrapper>
            </VideoInfoWrapper>
        </VideoContainer >
    )
}

const VideoContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
`

const VideoWrapper = styled.div`
    width: 100%;
    height: 100%;
`
const VideoInfoWrapper = styled.div`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    padding: 0px 100px;
    z-index: 5;
    display: flex;
    flex-direction: column;
    gap: 24px;

    h2{
        color: #fff;
        font-size: 60px;
        font-weight: bold;
    }

    p{
        font-size: 24px;
        width: 50%;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        color: #fff;
        line-height: 1.4;
    }
`

const ButtonWrapper = styled.div`
    position: relative;
    display: flex;
    gap: 12px;
    z-index: 11;
    button:nth-of-type(2){
        svg{
            font-size: 30px;
        }
    }
`