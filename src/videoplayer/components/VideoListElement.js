import React                            from 'react';
import PlaceHolder                      from '../../images/placeholders/100x100.png';
import { VideoListElement as StyledLi } from './styles/VideoListElement';

export default function VideoListElement({ video }) {
    if (! typeof (video) === 'object' || !video.preview || !video.video) return null;
    return (
        <StyledLi>
            <a href="#">
                <img src={PlaceHolder} />
            </a>
        </StyledLi>
    )
}
