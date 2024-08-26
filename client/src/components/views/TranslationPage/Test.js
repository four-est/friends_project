import React, { useState, useCallback, useEffect } from 'react'

import BackgroundImg from './img/BackgroundImg.png'
import MicIcon from './img/MicIcon.png'
import Axios from 'axios';

function TranslationPage() {

    const [IsRec, setIsRec] = useState(true)
    const [Stream, setStream] = useState()
    const [IsAnalyser, setIsAnalyser] = useState()
    const [Media, setMedia] = useState()
    const [Source, setSource] = useState()
    const [RecordedChunks, setRecordedChunks] = useState([])

    const onRecHandler = () => {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

        const IsAnalyser = audioCtx.createScriptProcessor(0, 1, 1);
        setIsAnalyser(IsAnalyser);

        function makeSound(Stream) {
            // 내 컴퓨터의 마이크나 다른 소스를 통해 발생한 오디오 스트림의 정보를 보여준다.
            const Source = audioCtx.createMediaStreamSource(Stream);
            setSource(Source);
            Source.connect(IsAnalyser);
            IsAnalyser.connect(audioCtx.destination);
        }

        const options = {
            // audioBitsPerSecond: 128000,
            mimeType: 'audio/webm;codecs=opus'
        };

        navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then((Stream) => {
            console.log('Stream', Stream)
            const Media = new MediaRecorder(Stream, options);
            Media.start();
            setStream(Stream);
            setMedia(Media)
            makeSound(Stream)
            console.log('start')

            IsAnalyser.onaudioprocess = function (event) {
                setIsRec(false);
            };
        })

    }

    const offRecHandler = () => {
         // dataavailable 이벤트로 Blob 데이터에 대한 응답을 받을 수 있음
        Media.ondataavailable = function (event) {
            console.log('e', event)
            if (event.data.size > 0) {
                setRecordedChunks(event.data)
            }
            setIsRec(true);
        };

        console.log('stop', RecordedChunks)

        // 모든 트랙에서 stop()을 호출해 오디오 스트림을 정지
        Stream.getAudioTracks().forEach(function (track) {
            track.stop();
        });

        // 메서드가 호출 된 노드 연결 해제
        IsAnalyser.disconnect();
        Source.disconnect();
        Media.stop();

        let aElm = document.createElement('a');
        aElm.href = window.URL.createObjectURL(new Blob(RecordedChunks, {type: "audio/wav"}));
        aElm.download = 'audio.webm';
        aElm.click();

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
          </div>
      </div>
  )
}

export default TranslationPage