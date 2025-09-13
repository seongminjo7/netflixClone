import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
    }

    body,html{
        background: #333;
    }

    input[type='text']{
        background: transparent;
        border: none;
        outline: none;
        color: #fff;
    }
`

export default GlobalStyle