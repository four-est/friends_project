import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { loginUser } from "../../../_actions/user_actions";
import { Form, Input, Button } from 'antd';
import { useDispatch } from "react-redux";

import './LoginPage.css'

function LoginPage(props) {
    const dispatch = useDispatch();

    const [ID, setID] = useState("");
    const [Password, setPassword] = useState("");

    const idChangeHandler = (event) => {
      setID(event.target.value);
    };

    const passwordChangeHandler = (event) => {
      setPassword(event.target.value);
    };

    const submitHandler = (event) => {
      event.preventDefault();

      const body = {
        ID: ID,
        password: Password,
      };

      console.log("is logged: ", body);

      dispatch(loginUser(body)).then((response) => {
        console.log(response);
        if (response.payload.loginSuccess) {
          window.localStorage.setItem("userId", response.payload.userId);
          props.history.push("/");
        } else {
          alert("로그인이 실패");
        }
      });
    };


    return (
      <div style={{ height: '100vh', backgroundColor: '#fff' }}>
        <div style={{ width: '100%', height: '100px', backgroundColor: '#0E4A84' }}>
          <p style={{ fontSize: '20px', color: '#fff', textAlign: 'center', paddingTop: '30px' }}>FRIEND'S</p>
        </div>
        <div style={{ width: '90%', margin: '3rem auto' }}>
          <div className="container">
            <p style={{ fontSize: '32px', letterSpacing: '5px', textAlign: 'center' }}>LOGIN</p>
            <Form onSubmit={submitHandler} style={{ width: '350px' }}>
                <Input
                  placeholder="아이디"
                  value={ID}
                  onChange={idChangeHandler}
                  style={{ marginBottom: '16px'}}
                />
                <Input
                  placeholder="비밀번호"
                  value={Password}
                  onChange={passwordChangeHandler}
                />
              <div>
                <a href="/">
                  <Button htmlType="submit">
                      로그인
                  </Button>
                </a>
              </div>
            </Form>
            <div className="link">
                  <a href="/register">회원가입</a>
                </div>
            </div>
          </div>
      </div>
    );
};

export default withRouter(LoginPage);


