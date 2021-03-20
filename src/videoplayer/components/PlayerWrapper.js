import React                              from 'react';
import { PlayerWrapper as StyledWrapper } from './styles/PlayerWrapper';

export default function PlayerWrapper(props) {
    return (
        <StyledWrapper {...props}>
            {props.children}
        </StyledWrapper>
    )
}
