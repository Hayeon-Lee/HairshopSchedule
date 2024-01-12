import { createGlobalStyle } from 'styled-components';
import TheJamsil5Bold from './TheJamsil5Bold.woff2';

export default createGlobalStyle`
    @font-face {
        font-family: 'TheJamsil5Bold';
        src: local('TheJamsil5Bold'), url(${TheJamsil5Bold}) format('woff2');
        font-weight: 700;
        font-style: normal;
    }
`;
