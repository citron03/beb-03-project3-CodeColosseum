import { createGlobalStyle } from "styled-components";
import "./font.css";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        font-family: 'MaruBuri-Regular', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: ${({isDarkMode}) => isDarkMode ? "#161515" : "white"};
        color: ${({isDarkMode}) => isDarkMode ? "white" : "#161515"};
    }

    textarea {
        background-color: ${({isDarkMode}) => isDarkMode ? "black" : "white"};
        color: ${({isDarkMode}) => isDarkMode ? "white" : "black"};
    }

    input {
        background-color: ${({isDarkMode}) => isDarkMode ? "black" : "white"};
        color: ${({isDarkMode}) => isDarkMode ? "white" : "black"};
    }

    :root {
        --highlight-yellow: #f0b81c;
        --dark-yellow: #a56516;
        --background-theme-gray: ${({isDarkMode}) => isDarkMode ? "#2c2a2a" : "white"};
        --background-theme-modal: ${({isDarkMode}) => isDarkMode ? "#222f3e" : "white"};
        --background-theme: ${({isDarkMode}) => isDarkMode ? "black" : "white"};
        --font-theme: ${({isDarkMode}) => isDarkMode ? "white" : "black"};
    }

    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
    }

    .slick-dots li button::before {
        color: gray!important;
    }

    .slick-dots li.slick-active button:before {
        color: ${({isDarkMode}) => isDarkMode ? "rgb(230, 230, 107)" : "red"}!important;
    }

    .slick-prev:before {
        color: gray;
    }

    .slick-next:before {
        color: gray;
    }

`;

export default GlobalStyle;