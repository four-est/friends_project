import React, { useState } from 'react';
import { Form, Input, Button, Radio } from 'antd';
import { registerUser } from '../../../_actions/user_actions';
import { useDispatch } from 'react-redux';

import './RegisterPage.css'

function RegisterPage(props) {

    const dispatch = useDispatch()

    const [ID, setID] = useState('')
    const [Password, setPassword] = useState('')
    const [PasswordConfirm, setPasswordConfirm] = useState('')
    const [Name, setName] = useState('')
    const [Birth, setBirth] = useState('')
    const [Sex, setSex] = useState(1)

    const idChangeHandler = (event) => {
        setID(event.target.value)
    }
    
    const passwordChangeHandler = (event) => {
        setPassword(event.target.value)
    }
    
    const passwordconfirmChangeHandler = (event) => {
        setPasswordConfirm(event.target.value)
    }
    
    const nameChangeHandler = (event) => {
        setName(event.target.value)
    }
    
    const birthChangeHandler = (event) => {
        setBirth(event.target.value)
    }

    const sexChangeHandler = (event) => {
        console.log('radio checked', event.target.value)
        setSex(event.target.value)
    }

    const submitHandler = (event) => {
        event.preventDefault();
        
        if ( !ID | !Password | !PasswordConfirm | !Name | !Birth | !Sex) {
            return alert('모든 내용을 작성해주세요.')
        } else if (Password !== PasswordConfirm) {
            return alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.')
        } else if (Birth.length !== 8) {
            return alert('생일은 8자리로 입력해주세요. (ex.19980101')
        } else if (Password.length < 4) {
            console.log(Password.length)
            return alert('비밀번호는 4자리 이상 입력하세요.')
        }

        const body = {
            ID: ID,
            password: Password,
            name: Name,
            birth: Birth,
            sex: Sex
        }

        console.log('body', body)

        dispatch(registerUser(body)).then(response => {
          if(response.payload.success) {
            alert('회원가입이 완료되었습니다.')
            props
              .history
              .push('/')
          } else if (response.payload.err.code === 11000) {
              console.log(response.payload.err.errmsg)
              alert('중복되는 아이디가 있습니다.')
          }
          else {
              console.log(response)
              alert('회원가입에 실패했습니다.')
          }
        })
    }

    return (
        <div style={{ height: '100%', backgroundColor: '#fff' }}>
            <div style={{ width: '100%', height: '100px', backgroundColor: '#0E4A84' }}>
                <p style={{ fontSize: '20px', color: '#fff', textAlign: 'center', paddingTop: '30px', margin: 0 }}>FRIEND'S</p>
            </div>
            <div className="registerContainer" style={{ width: '90%', margin: '3rem auto' }}>
                <div>
                    <p className='registerContainer-p' style={{ fontSize: '32px', letterSpacing: '5px', textAlign: 'center' }}>JOIN</p>
                </div>
                <Form onSubmitCapture={submitHandler}>
                    <div>
                        <p style={{fontSize: '20px'}}>아이디/비밀번호</p>
                        <Input placeholder='아이디를 입력해주세요' onChange={idChangeHandler} value={ID} />
                        <Input placeholder='비밀번호를 입력해주세요' onChange={passwordChangeHandler} value={Password} type='password' />
                        <Input placeholder='비밀번호를 다시 입력해주세요' onChange={passwordconfirmChangeHandler} value={PasswordConfirm} type='password' />
                    </div>
                    
                    <div>
                        <p style={{fontSize: '20px' }}>개인정보 입력</p>
                        <Input placeholder='이름을 입력해주세요' onChange={nameChangeHandler} value={Name} />
                        <Input placeholder='생년월일을 입력해주세요(6자리)' onChange={birthChangeHandler} value={Birth} type='number' />
                        <p style={{ fontSize: '15px', margin: 0 }}>성별을 선택하세요</p>
                        <Radio.Group onChange={sexChangeHandler} value={Sex}>
                            <Radio value={1}>여성</Radio>
                            <Radio value={2}>남성</Radio>
                        </Radio.Group>
                    </div>
                    <a href='/'>
                        <Button
                            style={{
                                width: '100%',
                                height: '40px',
                                borderRadius: '20px',
                                background: '#0E4A84',
                                border: '0',
                                color: '#fff',
                                marginTop: '60px',
                                marginBottom: '60px'
                            }}
                                htmlType='submit'>
                                회원가입
                        </Button>
                    </a>
                </Form>
            </div>  
        </div>
    )
}

export default RegisterPage