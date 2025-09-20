import { IoSearch } from "react-icons/io5";
import { IoMdClose, IoMdSharp } from "react-icons/io"; // 혹시 위에랑 같은거면 한 줄에 넣어도 ㄱㅊ
import styled from "styled-components";
import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Search() {
    const [searchOpen, setSearchOpen] = useState(false)
    const [keyword, setKeyword] = useState('');
    const [clearBtn, setClearBtn] = useState(false);
    const navigate = useNavigate();

    // useRef
    const inputRef = useRef(HTMLInputElement)

    const handleInputOpen = () => {
        setSearchOpen((prev) => !prev)
    }

    const hanldeTextChange = (e) => {
        const value = e.target.value;
        console.log(value)
        setKeyword(value)
        setClearBtn(value.trim() !== "")
        const keywordText = value.trim();

        /*
            trim()은 문자열에서 앞 뒤에 공백을 제거해주는 역할
            !== "" 공백을 다 제거했을 때 공백이 아니라면 true를 반환
            value.trim().length > 0 = 빈 문자가 아니야
        */

        if (keywordText) {
            const searchUrl = `/search?keyword=${encodeURIComponent(keywordText)}`
            // encodeURIComponent(value) = 문자열로 바꿔주는 자바스크립트 함수
            // 특수문자, 한글, 공백 같은 문자가 url에서 에러가 나지 않도록 퍼센트 인코딩 형식으로 변환함
            // ex) %20%545...
            // console.log(searchUrl)
            navigate(searchUrl, { replace: true })
            // replace: true 히스토리 누적 방지
        } else {
            // 텍스트가 비워지면 
            navigate('/')
        }
    }

    const handleClearInput = (e) => {
        e.preventDefault();
        setKeyword('')
        setClearBtn(false)
        /* requestAnimationFrame(() => {
            inputRef.current.focus()
            // 한 템포 늦출 때 실행 위치 1 프레임 기준이므로 텀이 거의 보이지 않음
        }) */
        /* inputRef.current.focus() 즉시 실행 위치 */

        inputRef.current?.blur() // blur = foucs 해제   포커스를 해제 후 다시 포커스 걸기 위한 리셋
        setTimeout(() => {
            inputRef.current.focus()
        }, 500)
        navigate('/')
    }

    useEffect(() => {
        if (searchOpen && inputRef.current) { /* current = 참고하겠다 */
            inputRef.current.focus()
        }
    }, [searchOpen])

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
                </SearchBtn>{/* 검색 버튼 */}
                <motion.input
                    ref={inputRef}
                    type="text"
                    initial={{ width: 0 }}
                    animate={{ width: searchOpen ? 250 : 0 }}
                    transition={{ duration: .5 }}
                    placeholder="제목, 사람, 장르"
                    value={keyword}
                    onChange={hanldeTextChange}
                />
                {clearBtn && (
                    <ClearBtn onClick={handleClearInput}>
                        <IoMdClose />
                    </ClearBtn>
                )}

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

const ClearBtn = styled.button`
    display: flex;
    color: #fff;
    font-size: 20px;
    align-self: center;
    justify-content: center;
    margin-left: auto;
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
`