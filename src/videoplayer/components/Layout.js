import React from 'react';
import BContainer from 'react-bootstrap/Container';

export default function Layout(props)
{
    return (
        <BContainer>
            {props.children}
        </BContainer>
    );
}