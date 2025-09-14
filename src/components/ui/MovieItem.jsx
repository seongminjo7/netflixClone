import styled from "styled-components"
import { motion } from 'framer-motion'
import Button from "./Button"
import { FaPlay, FaPlus } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function MovieItem({ movie, id, rate, getRating, getGenresName, movieLength, imgVariants, infoVariants, handleModalClick }) {
    return (
        <Item
            className={`movieItem${id === 0 ? 'first' : id % 6 === 5 ? 'last' : ''}`}
            initial='initial'
            whileHover='hover'
        >
            <div className={`movieItemImg ${rate ? 'rate' : ''}`}>
                {rate && (
                    <div className={`rateNum${id === movieLength - 1 ? ' last' : ''}`}>
                        {id + 1}
                    </div>
                )}
                <motion.div variants={imgVariants}>
                    <img src={`https://image.tmdb.org/t/p/w500${rate ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.title} />
                </motion.div>
            </div>
            <motion.div className="movieItemInfo" variants={infoVariants}>
                <div className="infoImg">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                        alt={movie.title} />
                </div>
                <div className="infoWrapper" onClick={() => handleModalClick(movie.id)}>
                    <div className="btns">
                        <div>
                            <Button type="circle" icon={<FaPlay />} />
                            <Button type="circleOut" icon={<FaPlus />} />
                            <Button type="circleOut" icon={<AiOutlineLike />} />
                        </div>
                        <Button type="circleOut" icon={<MdKeyboardArrowDown />} />
                    </div>
                    <div className="infoGenres">
                        <p>{getRating(movie.adult)}</p>
                        <p>{getGenresName(movie.genre_ids)}</p>
                    </div>
                </div>
            </motion.div>
        </Item >
    )
}

const Item = styled(motion.div)`
    position: relative;

    &.first {
        .movieItemImg,
        .movieItemInfo {
            transform-origin: left center;
        }
    }

    &.last {
        .movieItemImg,
        .movieItemInfo
        {
            transform-origin: right center;
        }
    }

    img {
        width: 100%;
        cursor: pointer;
    }

    .movieItemImg.rate {
        width: 100%;
        display: flex;
        justify-content: flex-end;

        img {
            width: 150px;
            height: auto;
            position: relative;
            z-index: 2;
        }

        & .rateNum {
            position: absolute;
            top: 0;
            left: 0;
            font-size: 300px;
            line-height: .65;
            color: transparent;
            -webkit-text-stroke: 4px gray;
            -webkit-text-fill-color: transparent;
            &.last{
                font-size: 250px;
                line-height: .8;
                letter-spacing: -30px;
                left: -15%;
            }
        }
    }
    .movieItemInfo{
        position: absolute;
        top: 0;
        left:0;
        width: 100%;
        height: 100%;
        background: #000;

        .infoWrapper{
            display: flex;
            width: 100%;
            padding: 20px;
            box-sizing: border-box;
            background: #000;
            flex-direction: column;
            gap: 20px;
            color: #fff;

            .btns{
                display: flex;
                justify-content: space-between;
                align-items: center;

                div{
                    display: flex;
                    gap: 4px;
                }
            }
        }
    }
`