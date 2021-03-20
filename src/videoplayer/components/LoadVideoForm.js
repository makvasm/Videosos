import React, { useState } from 'react';
import Button              from 'react-bootstrap/Button';
import Form                from 'react-bootstrap/Form';

export default function LoadVideoForm() {
    return (
        <Form className="my-2">
            <Form.Group className="w-100 m-0" controlId="formBasicEmail">
                <Form.Control type="url" placeholder="Ссылка" />
            </Form.Group>
            <Button variant="dark" type="submit">
                Загрузить
            </Button>
        </Form>
    )
}
