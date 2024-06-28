import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Palette from "../../pallete.json";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styled from 'styled-components';
import sound from "../../sound.mp3";

const phrases = ["GOT IT!", "COPIED!", "PASTE ME!", "RIGHT ONE!", "IT'LL ROCK!"];

const Container = styled.div`
    position: relative;
`;

const Header = styled.header`
    font-size: 36px;
    color: black;
    left: 2px;
    bottom: 5px;
    letter-spacing: 2.5px;
    font-weight: 900;
    cursor: pointer;
`;

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(4, 1fr);
    width: 100%;
    height: 1250px;
`;

const ColorBlock = styled.div`
    background-color: ${({ color }) => color};
    position: relative;
    cursor: pointer;

    &:hover {
        border: 2px solid white;
        background-color: rgba(0, 0, 0, 0.3);
        color: #fff;
        padding: 4px;
        border-radius: 4px;
    }
`;

const CopyText = styled.div`
    border: 2px solid white;
    background-color: transparent; /* Зміна фону на прозорий */
    color: #fff;
    padding: 4px;
    border-radius: 4px;
    position: absolute;
    top: 50%; /* Центрування по вертикалі */
    left: 50%; /* Центрування по горизонталі */
    transform: translate(-50%, -50%); /* Центрування відносно центра батьківського елемента */
    opacity: 0; /* Початково приховуємо */
    transition: opacity 0.3s ease; /* Плавна анімація зникнення/показу */
`;

const ColorName = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 4px;
    color: ${({ color }) => (color === "#fff" ? '#c9c1c6' : '#fff')};
    font-size: 30px;
    text-transform: uppercase;
    font-weight: bold;
`;

const Footer = styled.footer`
    font-size: 36px;
    color: black;
    left: 2px;
    bottom: 5px;
    letter-spacing: 2.5px;
    font-weight: 900;
    text-align: right;
`;

const Modal = styled.div`
    background-color: ${({ color }) => color};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    background-color: rgba(255, 255, 255, 0.9);
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    color: black;
    position: relative;
    animation: fadeOut 2s forwards;
`;

const MaterialPage = ({ paletteName = "string" }) => {
    const selectedPalette = Palette.find(palette => palette.paletteName === paletteName);
    const colors = selectedPalette.colors;

    const [copiedBlocks, setCopiedBlocks] = useState(new Set());
    const [modalPhrase, setModalPhrase] = useState(null);
    const [modalColor, setModalColor] = useState(null);
    const [hoveredBlock, setHoveredBlock] = useState(null);
    const [clickedBlock, setClickedBlock] = useState(null);

    const handleCopy = (color) => {
        setCopiedBlocks(new Set([...copiedBlocks, color]));
        setModalPhrase(phrases[Math.floor(Math.random() * phrases.length)]);
        setModalColor(color);
        setTimeout(() => {
            setCopiedBlocks(prevBlocks => new Set([...prevBlocks].filter(block => block !== color)));
            setModalPhrase(null);
            setModalColor(null);
        }, 1500);
        playSound();
    };

    const playSound = () => {
        const audio = new Audio(sound);
        audio.play();
    };

    return (
        <Container>
            <Header>
                <NavLink to="/">← Back</NavLink>
            </Header>
            <GridContainer>
                {colors.map((color, index) => (
                    <CopyToClipboard key={index} text={color.color} onCopy={() => handleCopy(color)}>
                        <ColorBlock
                            color={color.color}
                            onMouseEnter={() => setHoveredBlock(color.color)}
                            onMouseLeave={() => setHoveredBlock(null)}
                            onClick={() => setClickedBlock(color.color)}
                        >
                            {hoveredBlock === color.color && !copiedBlocks.has(color.color) && (
                                <CopyText>COPY</CopyText>
                            )}
                            <ColorName color={color.color}>{color.name}</ColorName>
                        </ColorBlock>
                    </CopyToClipboard>
                ))}
            </GridContainer>
            <Footer>{selectedPalette.paletteName}</Footer>
            {modalPhrase && modalColor && (
                <Modal color={modalColor.color}>
                    <ModalContent>
                        <div style={{ fontSize: "150px" }}>{modalPhrase}</div>
                        <div style={{ fontSize: "30px", marginTop: "20px" }}>#{modalColor.color}</div>
                    </ModalContent>
                </Modal>
            )}
        </Container>
    );
};

export default MaterialPage;
