import React, { useState } from 'react';
import styled from 'styled-components';
import ConversionPopup from './ConversionPopup';

const Button = styled.button`
  background-color: #007bff;
  border: none;
  color: white;
  padding: 10px 16px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  cursor: pointer;
  position: fixed;
  bottom: 20px;
  right: 20px;
`;

const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
`;

const Popup = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenPopup = () => {
        setIsOpen(true);
    };

    const handleClosePopup = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <Button onClick={handleOpenPopup}>Open Popup</Button>
            {isOpen && (
                <PopupContainer onClick={handleClosePopup}>
                    <PopupContent onClick={(e) => e.stopPropagation()}>
                        <ConversionPopup />
                    </PopupContent>
                </PopupContainer>
            )}
        </div>
    );
};

export default Popup;
