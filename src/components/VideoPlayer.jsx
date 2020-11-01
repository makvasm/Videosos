import React, { useState, useEffect } from 'react';
import VideoList from './VideoList.jsx';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function VideoPlayer() {

  const [links, setLinks] = useState([]);
  const [currentVid, setCurrentVid] = useState('');

  useEffect(() => {
    try {
      setLinks(GetFromCache().videos);
    } catch (e) {
      console.log(e)
    }
  }, []);

  const LoadVideos = (url) => {
    url = url.trim();
    if (CheckCache(url)) {
      setLinks(GetFromCache().videos);
    } else {
      FetchVideos(url).then(setLinks);
    }
  }

  const SetCache = (url, videos) => {
    let cache = {
      url,
      videos,
      iat: Date.now()
    };
    localStorage.setItem('videos', JSON.stringify(cache));
  }

  const CheckCache = (url) => {
    if (!localStorage.getItem('videos')) return false;
    let cache = GetFromCache();
    if (
      cache.url !== url ||
      (cache.iat - Date.now()) / 1000 > 60
    ) {
      return false;
    } else return true;
  }

  const GetFromCache = () => {
    return JSON.parse(localStorage.getItem('videos'));
  }

  const FetchVideos = (url) => {
    return fetch('/api/getvideos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url })
    })
      .catch(e => console.log(e))
      .then(res => {
        if (!res.ok) throw Error('Ошибка получения видео');
        return res.json().then(data => {
          SetCache(url, data);
          return data;
        });
      });
  }

  return (
    <Container>
      <div>
        <video
          controls
          src={currentVid}
          className='w-100 position-sticky sticky-top'
          style={{ height: '50vh', backgroundColor: 'white' }}
        ></video>

        <Form
          onSubmit={event => {
            event.preventDefault();
            let url = new FormData(event.target).get('url');
            LoadVideos(url);
          }}
        >
          <Form.Group>
            <Form.Label>Ссылка на тред</Form.Label>
            <Form.Control type="text" name='url' />
          </Form.Group>

          <Button variant="primary" type="submit">
            Загрузить
          </Button>
        </Form>

        <VideoList links={links} setCurrentVid={setCurrentVid} />
      </div>

    </Container>
  )
}
