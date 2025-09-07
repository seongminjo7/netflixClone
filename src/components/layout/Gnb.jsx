import styled from "styled-components"
import { Link } from 'react-router-dom';

export default function Gnb() {
    return (
        <GnbContainer>
            <ul>
                <li><Link to="/">홈</Link></li>
                <li><Link to="/">TV프로그램</Link></li>
                <li><Link to="/">영화</Link></li>
                <li><Link to="/">넷플릭스 오리지널</Link></li>
                <li><Link to="/">최신 등록 컨텐츠</Link></li>
                <li><Link to="/">내 컨텐츠</Link></li>
            </ul>
        </GnbContainer>
    )
}

const GnbContainer = styled.nav`
    display: flex;
    align-items: center;

    ul{
        display: flex;
        gap: 20px;
        align-items: center;
        list-style-type: none;
        
        li a{
            color: rgba(255, 255, 255, .5);
            transition: 300ms;
            font-size: 12px;
            
            &:hover{
                color: rgba(255, 255, 255, 1);
            }
        }
    }
`