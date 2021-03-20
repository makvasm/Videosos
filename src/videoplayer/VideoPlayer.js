import React, { useState } from 'react';
import Layout              from './components/Layout';
import Player              from './components/Player';
import PlayerWrapper       from './components/PlayerWrapper';

export default function VideoPlayer(props) {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    window.addEventListener('resize', ({target}) => setScreenWidth(target.innerWidth));

    return (
        <Layout>
            <PlayerWrapper screenWidth={screenWidth} >
                <Player />
            </PlayerWrapper>
        </Layout>
    );
}