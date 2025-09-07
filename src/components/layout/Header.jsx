import { Link } from 'react-router-dom';
import { SiNetflix } from "react-icons/si";
import styled from 'styled-components';
import Gnb from './Gnb';

export default function Header() {
    return (
        <HeaderContainer>
            <h1 className="logo">
                <Link to="/">
                    <SiNetflix />
                </Link>
            </h1>
            <Gnb />
        </HeaderContainer>
    )
}

const HeaderContainer = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    padding: 12px 24px;
    box-sizing: border-box;
    width: 100%;
    gap: 100px;
    z-index: 999;

    .logo a{
        display: flex;
        align-items: center;
        font-size: 30px;
        color: #E50914 ;
        
    }
`