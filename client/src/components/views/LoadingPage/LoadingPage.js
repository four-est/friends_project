import React from 'react'
import Axios from 'axios'
import { useHistory } from 'react-router-dom';

import BackgroundImg from './img/BackgroundImg.png'
import MicIcon from './img/MicIcon.png'

function LoadingPage(props) {

    // console.log(props)
    const history = useHistory();

    if (props) {
        const body = {
            userId: props.location.state.userId,
            fileName: props.location.state.fileName,
            filePath: props.location.state.filePath,
            fileSize: props.location.state.fileSize,
            fileData: props.location.state.fileData
        }
        Axios
            .post('/api/upload', body)
            .then(response => {
                console.log('file is upload in DB', response)
                if (response.status == 200) {
                    setTimeout(() => {
                        history.push('/result')
                    }, 5000)
                }
            })
    }

    return (
        <div style={{ height: '100%' }}>
            <div style={{ width: '90%', margin: '0px auto' }}>
                <div style={{ width: '100%', paddingTop: '80%', display: 'flex', alignItems: 'center', justifyContent: 'center', alignContent: 'center', flexDirection: 'column', flexWrap: 'wrap' }}>
                    <img src={BackgroundImg} style={{ width: '45px' }}/>
                    <p>번역 중 입니다...</p>
                </div>
            </div>
            <div style={{ marginTop: '303px' }}>
                <div style={{ width: '100%', height: '100px', backgroundColor: '#0E4A84'}}>
                    <img src={MicIcon} style={{ width: '50px', color: '#c4c4c4' }}/>
                </div>
            </div>
        </div>
    )
}

export default LoadingPage