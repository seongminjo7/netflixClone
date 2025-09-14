import { useQuery } from "@tanstack/react-query"
import { getModalDetail } from "../../axios/axios"
import { AnimatePresence } from "framer-motion"
import { useParams } from "react-router-dom"
import { motion } from 'framer-motion'
import styled from "styled-components"

export default function Modal({ movie }) {
    const { movieId } = useParams()
    console.log(movieId)

    const { data } = useQuery({
        queryKey: ['detail', movie.id],
        queryFn: () => getModalDetail(movie.id),
        staleTime: 5000
    })
    return (
        <AnimatePresence>
            {movieId ? (
                <ModalWrapper
                    aniamte={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div className="modalContent" transition={{ duration: .5 }}>
                        <div className="modalBg">
                            <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title} />
                        </div>
                    </motion.div>

                </ModalWrapper>
            ) : null}
        </AnimatePresence>
    )
}

const ModalWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    max-height: 100vh;
    background-color: rgba(0,0,0,.7);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    box-sizing: border-box;

    .modalContent{
        position: relative;
        width: 50%;
        max-height: 100vh;
        min-height: 100vh;
        background: #333;
        z-index: 99;
        overflow: auto;
    }
`