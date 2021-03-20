import React from 'react';
import BContainer from 'react-bootstrap/Container';

export default function Layout(props)
{
    return (
        <BContainer fluid="xl" className="my-2">
            {props.children}
        </BContainer>
    );
}