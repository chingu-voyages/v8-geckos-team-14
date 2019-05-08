import styled from 'styled-components';

// Below are shared styles that are / can be reused across components.
// Simply import the ones you need, like you import JSX files

export const Heading = styled.h1`
    color: black;
    font-size: 2em;
    font-weight: bold;
`;

export const Button = styled.button`
    outline: none;
    display: block;
    height: 8vw;
    width: 8vw;
    margin: 1vw 0 0 1vw;
    transition: transform 0.25s;
    letter-spacing: 0.2rem;
    border-radius: 50%;
    border: 2px solid white;
    background: rgba(256, 256, 256, 0.1);
    color: white;
    font-weight: 700;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;

    :active {
    transform: scale(0.96);
    }

    :hover {
    opacity: 1;
    }
`;