import { IoSearch } from "react-icons/io5";
import styled from "styled-components";
import { motion } from "framer-motion"
import { useState } from "react";
export default function Search() {
    const [searchOpen, setSearchOpen] = useState(false)

    const handleInputOpen = () => {
        setSearchOpen((prev) => !prev)
    }

    return (
        <SearchItem>
            <motion.div
                initial={{ width: 30 }} // 기본값
                animate={{
                    width: searchOpen ? 300 : 30,
                    border: `solid 1px rgba(255,255,255,${searchOpen ? 1 : 0})`,
                    transition: { duration: .5 }
                }} // 이벤트로 인해 변경되는 값
            >
                <SearchBtn type='button' onClick={handleInputOpen}>
                    <IoSearch />
                </SearchBtn>
            </motion.div>

        </SearchItem>
    )
}

const SearchItem = styled.div`
    display: flex;
    position: relative;

    div{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 4px;
        box-sizing: border-box;
        border-radius: 4px;
    }
`

const SearchBtn = styled.button`
    color: #fff;
    font-size: 24px;
    display: flex;
    align-items: center;
    border: none;
    background:transparent;
    cursor: pointer;
`