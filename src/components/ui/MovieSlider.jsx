import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components"
import { getGenre } from "../../axios/axios";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules'

//swiper
import 'swiper/css';
import 'swiper/css/navigation';

import MovieItem from "./MovieItem";
import { scale } from "framer-motion";
import Modal from "../layout/Modal";


export default function MovieSlider({ movies, title, type, rate }) {
    const [genres, setGenres] = useState({});
    const { movieId } = useParams();
    const navigate = useNavigate()

    // motion 내부에 적용할 요소들 기본값 설정
    const imgVariants = {
        initial: {
            scale: 1,
        },
        hover: {
            scale: 1.2,
            transition: {
                duration: .5
            }
        }
    }
    const infoVariants = {
        initial: {
            opacity: 0,
            scale: 1,
            zIndex: 1,
        },
        hover: {
            opacity: 1,
            scale: 1.5,
            zIndex: 99,
            transition: {
                duration: .5
            }
        }
    }

    useEffect(() => {
        const fetchGenres = async () => {
            const genresData = await getGenre();
            console.log(genresData)
            const genreMap = genresData.reduce((acc, genre) => {
                acc[genre.id] = genre.name
                return acc
            }, {})
            setGenres(genreMap)
        }
        fetchGenres()
    }, [])

    // 장르 받아오기
    const getGenresName = (genreId) => {
        return genreId.map(id => genres[id]).join(',')
    }

    const getRating = (adult) => {
        return adult ? '청불' : '전체 관람 가능'
    }

    const clickModal = movieId && movies ?
        movies.find(movie => String(movie.id) === movieId) : null

    const handleModalClick = (movieId) => {
        navigate(`/${movieId}`)
    }

    return (
        <MovieSliderItem>
            <MovieTitle>{title}</MovieTitle>
            <Swiper
                spaceBetween={32}
                slidesPerView={6}
                slidesPerGroup={5}
                modules={[Navigation]}
                navigation
            >
                {movies?.map((movie, id) => (
                    <SwiperSlide key={movie.id}>
                        <MovieItem
                            movie={movie}
                            id={id}
                            rate={rate}
                            getRating={getRating}
                            getGenresName={getGenresName}
                            movieLength={movies.length}
                            imgVariants={imgVariants}
                            infoVariants={infoVariants}
                            handleModalClick={handleModalClick}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            {clickModal && <Modal movie={clickModal} />}
        </MovieSliderItem>
    )
}

const MovieSliderItem = styled.div`
    padding: 40px 20px;
    box-sizing: border-box;
    .swiper{
        overflow: visible;
    }
`

const MovieTitle = styled.h2`
    font-size: 30px;
    color:#fff;
    position: relative;
    margin-bottom: 24px;
`