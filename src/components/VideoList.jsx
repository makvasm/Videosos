import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

export default function VideoList({ links, setCurrentVid }) {
  const Videos = ({ links }) => (
    links.map((link, ind) => (
      <Col key={ind} className='m-1 p-2' style={{ width: '150px', height: '150px' }}>
        <img
          data-href={link.video}
          src={link.preview}
          style={{ width: '150px', height: '150px' }}
          onClick={({ target }) => setCurrentVid(target.dataset.href)}
        />
      </Col>
    ))
  );

  return links && links.length ?
    <Row className='m-auto'>
      <Videos links={links} />
    </Row>
    :
    <div>Видео не найдены</div>
}
