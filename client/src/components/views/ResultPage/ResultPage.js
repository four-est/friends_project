import React, { useEffect, useState } from 'react'

import './ResultPage.css'

import SoundIcon from './img/SoundIcon.png'
import BookmarkIcon from './img/BookmarkIcon.png'
import HomeIcon from './img/HomeIcon.png'
import MicIcon from './img/MicIcon.png'

function ResultPage(props) {

  const [UserId, setUserId] = useState('')

  useEffect(() => {
    console.log(props.user)
    if (props.user.userData !== undefined) {
      setUserId(props.user.userData._id)
    }
  }, [props.user.userData])
  

  return (
    <div style={{ height: '100%' }}>
      <div style={{ width: '90%', margin: '0px auto' }}>
        <div style={{ margin: '20px 0px 30px 0px', display: 'inline-flex', width: '100%', height: '60px', justifyContent: 'space-between' }}>
          <div className='IconBox'>
            <img src={SoundIcon} style={{ width: '35px', height: '35px' }}/>
          </div>
          <a href={`/recommend/bookmark/${UserId}`}>
            <div className='IconBox'>
              <img src={BookmarkIcon} style={{ width: '35px' }}/>
            </div>
          </a>
        </div>
        <div className='ResultBox'>
          <p className='ResultText'>안녕하세요</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <a href='/translation'>
            <div className='MicButton'>
              <img src={ MicIcon } style={{ width: '30px', height: '30px' }} />
            </div>
          </a>
          <a href='/'>
            <div className='HomeButton'>
              <img src={ HomeIcon } style={{ width: '30px', height: '30px' }} />
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default ResultPage