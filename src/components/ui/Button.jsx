import styled, { css } from "styled-components"

export default function Button({ type = 'bgWhite', children, icon }) {
    return (
        <StyleButton type={type}>
            {icon && <span>{icon}</span>}
            {children && <span>{children}</span>}
        </StyleButton>
    )
}

const typeStyles = {
    bgWhite: css`
        background-color: white;
        color: black;
    `,
    bgGray: css`
        background-color: gray;
        color: white;
    `,
    circle: css`
        width: 36px;
        height: 36px;
        border-radius: 100%;
        border: none;
        background-color: white;
        color:#000;
        padding: 0;
    `,
    circleOut: css`
        width: 36px;
        height: 36px;
        border-radius: 100%;
        border: solid 1px #fff;
        color:#fff;
        padding: 0;
        background-color: transparent;
    `
}

const StyleButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
    font-size: 20px;
    font-weight: 500;
    gap: 8px;
    outline: none;
    border: none;

    span{
        display: font-size;
        align-items: center;
    }

    &:hover{
        opacity: .8;
    }

    ${(props) => props.type && typeStyles[props.type]}
`