import React, { useState, useCallback, useEffect } from 'react'

import BackgroundImg from './img/BackgroundImg.png'
import MicIcon from './img/MicIcon.png'
import Axios from 'axios';

function TranslationPage() {

    const [IsRec, setIsRec] = useState(true)
    // const [Stream, setStream] = useState()
    // const [IsAnalyser, setIsAnalyser] = useState()
    const [Media, setMedia] = useState()
    // const [Source, setSource] = useState()
    const [RecordedChunks, setRecordedChunks] = useState([])
    // const [audioURL, setAudioURL] = useState('');

    const onRecHandler = () => {
        if (IsRec) {
            console.log('recording')
            navigator.mediaDevices.getUserMedia({ audio: true }).then((Stream) => {
                console.log('Stream', Stream)
                const Media = new MediaRecorder(Stream);
                setMedia(Media)

                Media.ondataavailable = event => {
                    console.log(event.data)
                    setRecordedChunks(prev => [...prev, event.data]);
                };

                Media.start();

                setIsRec(false);
            })
        }

    }

    const offRecHandler = () => {
        if (!IsRec) {
            console.log('stop recoding')
            Media.stop();
            Media.onstop = () => {
                let aElm = document.createElement('a');
                aElm.href = window.URL.createObjectURL(new Blob(RecordedChunks, {type: "audio/mp4"}));
                aElm.download = 'recording.mp4';
                aElm.click();
            };
        }

        // let aElm = document.createElement('a');
        // aElm.href = window.URL.createObjectURL(new Blob(RecordedChunks, {type: "audio/wav"}));
        // aElm.download = 'recording.wav';
        // aElm.click();

        // upload file
        let formdata = new FormData();
        formdata.append("fname", "test.wav");
        formdata.append("data", RecordedChunks);

        let xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/upload/audio", false);
        xhr.send(formdata);

        // const config = {
        //     header: {
        //         'Content-Type': 'audio/mpeg'
        //     }
        // }

        // console.log('formdata', formdata)

        // Axios.post('/api/upload/audio', formdata, config).then(response => {
        //     console.log('res', response)
        // })
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
              {/* {audioURL && (
                <a href={audioURL} download="recording.wav">
                    Download Recording
                </a>
            )} */}
          </div>
      </div>
  )
}

export default TranslationPage