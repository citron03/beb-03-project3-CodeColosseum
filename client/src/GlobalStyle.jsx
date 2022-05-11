import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: #161515;
        color: white;
    }

    textarea {
        background-color: black;
        color: white;
    }

    input {
        background-color: black;
        color: white;
    }

    :root {
        --highlight-yellow: #f0b81c;
        --dark-yellow: #a56516;
    }

    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
    }

    .slick-dots li button::before {
        color: white!important;
    }

    .slick-dots li.slick-active button:before {
        color: rgb(230, 230, 107)!important;
    }

`;

export default GlobalStyle;