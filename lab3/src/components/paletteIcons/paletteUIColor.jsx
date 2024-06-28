import React from "react";
import PropTypes from 'prop-types'; // Add type checking
import Palette from "../../pallete.json";
import styled from 'styled-components'; // Use styled-components for styling

// Styles using styled-components
const PaletteContainer = styled.div`
  width: 420px;
  height: 250px;
  background-color: #fff;
  margin-top: 2px;
  padding: 10px;
  border-radius: 4px;
`;

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(4, 1fr);
  width: 100%;
  height: 200px;
`;

const ColorCell = styled.div`
  background-color: ${({ color }) => color}; // Dynamic color prop
`;

const PaletteName = styled.div`
  font-size: 18px;
  color: black;
  font-weight: 600;
  width: 100%;
  margin: 5px;
  display: flex; // Use flexbox for layout
  align-items: center; // Align items vertically
  justify-content: space-between; // Add space between name and emoji
`;

const PaletteEmoji = styled.span`
  font-size: 24px; // Enlarge the emoji
`;

function MaterialUIColor({ paletteName = "string" }) {
    const selectedPalette = Palette.find(
        (palette) => palette.paletteName === paletteName
    );

    if (!selectedPalette) {
        return <div>Palette not found</div>; // Handle invalid paletteName
    }

    return (
        <PaletteContainer>
            <ColorGrid>
                {selectedPalette.colors.map((color, index) => (
                    <ColorCell key={index} color={color.color} />
                ))}
            </ColorGrid>
            <PaletteName>
                {selectedPalette.paletteName}
                <PaletteEmoji role="img" aria-label="palette">
                    {selectedPalette.emoji}
                </PaletteEmoji>
            </PaletteName>
        </PaletteContainer>
    );
}

// Add prop types for type checking
MaterialUIColor.propTypes = {
    paletteName: PropTypes.string.isRequired,
};

export default MaterialUIColor;
