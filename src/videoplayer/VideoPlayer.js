import React               from 'react';
import Layout              from './components/Layout';
import LoadVideoForm       from './components/LoadVideoForm';
import Player              from './components/Player';
import PlayerWrapper       from './components/PlayerWrapper';
import VideoList from './components/VideoList';

export default function VideoPlayer(props) {
    return (
        <Layout>
            <PlayerWrapper >
                <Player />
                <LoadVideoForm />
            </PlayerWrapper>
            <VideoList />
        </Layout>
    );
}