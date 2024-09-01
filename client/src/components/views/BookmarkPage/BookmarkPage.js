import React, {useState, useEffect} from 'react'

import Speaker from '../ResultPage/Speaker'
import './BookmarkPage.css'

import SoundIcon from './img/SoundIcon.png'
import BookmarkIcon from './img/BookmarkIcon.png'
import HomeIcon from './img/HomeIcon.png'

function BookmarkPage() {

  const [Text, setText] = useState('안녕하세요')

  //음성 변환 목소리 preload
  useEffect(() => {
    window.speechSynthesis.getVoices();
  }, []);

  const SpeakerButtonHandler = () => {
    Speaker(Text)
  }

  return (
    <div style={{ height: '100%' }}>
      <div style={{ width: '90%', margin: '0px auto' }}>
        <div className='TextBox' style={{ margin: '20px 0px 30px 0px', display: 'flex', alignContent: 'space-around', flexDirection: 'column' }}>
          <div style={{ margin: '20px 20px 0px 20px', display: 'inline-flex', justifyContent: 'space-between' }}>
            <button className='IconButton' onClick={SpeakerButtonHandler}>
              <img src={SoundIcon} style={{ width: '17px'}} />
            </button>
            <button className='IconButton'>
              <img src={BookmarkIcon} style={{ width: '17px'}} />
            </button>
          </div>
          <p className='TextStyle'>{Text}</p>
        </div>
        <a href='/'>
          <div className='HomeButton'>
            <img src={HomeIcon} style={{ width: '30px' }} />
          </div>
        </a>
      </div>
    </div>
  )
}

export default BookmarkPage