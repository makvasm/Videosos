import React                     from 'react';
import VideoListElement          from './VideoListElement';
import { VideoList as StyledUl } from './styles/VideoList';

export default function VideoList({ links }) {
    if (!Array.isArray(links)) return null;

    return (
        <StyledUl>
            {linksMock.map((link) => <VideoListElement />)}
        </StyledUl>
    )
}
