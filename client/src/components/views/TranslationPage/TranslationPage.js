import React, { useState, useCallback, useEffect, useRef } from 'react'

import BackgroundImg from './img/BackgroundImg.png'
import MicIcon from './img/MicIcon.png'
import Axios from 'axios';

function TranslationPage(props) {

    const [IsRec, setIsRec] = useState(true)
    const [Media, setMedia] = useState()
    const [Stream, Setstream] = useState()
    const RecordedChunksRef = useRef([]);

    
    console.log(props)
    

    const onRecHandler = () => {
        if (IsRec) {
            console.log('recording')
            navigator.mediaDevices.getUserMedia({ audio: true }).then((Stream) => {
                // console.log('Stream', Stream)
                const Media = new MediaRecorder(Stream);
                setMedia(Media)
                Setstream(Stream)

                Media.ondataavailable = (event) => {
                    if (event.data) {
                        // console.log('data', event.data)
                        RecordedChunksRef.current.push(event.data)
                    }
                };

                Media.start();

                setIsRec(false);
            })
        }

    }

    const offRecHandler = () => {
        if (IsRec == false) {
            console.log('stop recoding')
            Media.stop();

            Media.onstop = () => {
                if (RecordedChunksRef.current.length > 0) {
                    console.log('RecordedChunksRef-off', RecordedChunksRef.current[0])
                    const RecChunks = RecordedChunksRef.current[0]
                    let aElm = document.createElement('a');
                    aElm.href = window.URL.createObjectURL(new Blob([RecChunks], {type: "audio/wav"}));
                    aElm.download = 'recording.wav';
                    aElm.click();
                    console.log('Recording stopped, Blob created');

                    // upload file

                    if (RecChunks !== undefined) {
                        console.log('RecChunks', RecChunks.size)
                        let formData = new FormData();

                        const config = {
                            header: {
                                'Content-Type': 'multipart/form-data',
                            }
                        }

                        formData.append("file", RecChunks)

                        // Axios.post('/api/upload/audio', { params: { 'fileSize': RecChunks.size, 'fileType': RecChunks.type }})
                        Axios.post('/api/upload/audio', formData, config)
                            .then(response => {
                                console.log('response', response)
                            })
                    }
                }
            }
        }
    }

  return (
      <div style={{ height: '100%' }}>
          <div style={{ width: '90%', margin: '0px auto' }}>
              <div style={{ width: '100%', paddingTop: '80%', display: 'flex', alignItems: 'center', justifyContent: 'center', alignContent: 'center', flexDirection: 'column', flexWrap: 'wrap' }}>
                  <img src={BackgroundImg} style={{ width: '45px' }}/>
                  <p>음성 버튼을 눌러 말해주세요</p>
              </div>
          </div>
          <div style={{ marginTop: '303px' }}>
              <button onClick={IsRec ? onRecHandler : offRecHandler} style={{ width: '100%', height: '100px', backgroundColor: '#0E4A84'}}>
                  <img src={MicIcon} style={{ width: '50px' }}/>
              </button>
          </div>
      </div>
  )
}

export default TranslationPage