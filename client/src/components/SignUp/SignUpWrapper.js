import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signupUser } from '../../_actions/user_actions';
import TextInputGenderRequired from './TextInputGenderRequired';
import { checkEmail, checkPassword } from '../../utils/validation';

function SignUpWrapper() {
  const dispatch = useDispatch();

  const [email_isValid, setEmail_isValid] = useState(false);
  const [pw_isValid, setPw_isValid] = useState(false);
  const [pw_confirm, setPw_confirm] = useState(false);

  const [Email, setEmail] = useState('');
  const [Name, setName] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (checkEmail(Email)) {
      setEmail_isValid(true);
    } else {
      setEmail_isValid(false);
    }

    if (checkPassword(Password)) {
      setPw_isValid(true);
    } else {
      setPw_isValid(false);
    }
    if (Password === ConfirmPassword) {
      setPw_confirm(true);
    } else {
      setPw_confirm(false);
    }
  }, [Email, Password, ConfirmPassword]);

  const requiredTextInputData = [
    [
      '이메일',
      'user_email',
      Email,
      setEmail,
      '이메일',
      'email',
      email_isValid,
      '30',
    ],
    [
      '비밀번호',
      'user_password',
      Password,
      setPassword,
      '8자 이상 입력해주세요',
      'password',
      pw_isValid,
      '20',
    ],
    [
      '비밀번호 확인',
      'password_confirm',
      ConfirmPassword,
      setConfirmPassword,
      '비밀번호 확인',
      'password',
      pw_confirm,
      '20',
    ],
    ['닉네임', 'user_name', Name, setName, '유저 이름', 'text', '', '20'],
  ];

  function postHandler(e) {
    let body = {
      user_email: Email,
      user_password: Password,
      user_name: Name,
      user_info: {
        user_gender: 'female',
        user_age: '20대',
        user_position: '프론트엔드',
        user_language: 'javascript',
      },
    };

    console.log('SignUpWrapper :', body);

    dispatch(signupUser(body)).then(res => {
      if (res.payload === 'User created') {
        window.location.href = '/signin';
      } else {
        alert('회원가입 실패하였습니다.');
      }
    });
  }

  return (
    <div className="signupcontainer">
      <div className="signupwrapper">
        {requiredTextInputData.map((el, idx) => {
          return (
            <TextInputGenderRequired
              key={`TextInputGenderRequired${idx}`}
              inputname={el[0]}
              detailString={el[1]}
              stateName={el[2]}
              stateFunc={el[3]}
              placeholder={el[4]}
              type={el[5]}
              isValid={el[6]}
              maxLength={el[7]}
            />
          );
        })}
        <div
          className="signupbtn"
          onClick={e =>
            Email &&
            Password &&
            ConfirmPassword &&
            Name &&
            email_isValid &&
            pw_isValid &&
            pw_confirm
              ? postHandler(e)
              : alert('모든 것을 만족해야 합니다.')
          }
        >
          회원가입
        </div>
      </div>
    </div>
  );
}

export default SignUpWrapper;
