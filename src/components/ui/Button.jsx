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