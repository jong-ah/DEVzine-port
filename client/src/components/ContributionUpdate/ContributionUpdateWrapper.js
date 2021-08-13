import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Auth from '../../hoc/auth';
import AlertModal from '../Common/AlertModal/AlertModal';
import { customAxios } from '../../utils/customAxios';
import SigninModal from '../Common/SignInModal/SignInModal';
import Button from '../Common/Button/Button';

function ContributionUpdateWrapper({ id }) {
  const [keyword, setKeyword] = useState('게임');
  const [title, setTitle] = useState('nothing');
  const [content, setContent] = useState('nothing');
  const [modalOpen, setModalOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [colorChange, setcolorChange] = useState(false);

  let selectOptions = [
    '게임',
    '머신러닝',
    '모바일',
    '보안',
    '블록체인',
    '빅데이터',
    '코딩',
    '클라우드',
    '퍼스널 컴퓨팅',
    'AI/로봇',
    '기타',
  ];

  useEffect(async () => {
    const requestGet = await customAxios
      .get(`/magazine/contribution/${id}`)
      .then(res => res.data.data.contribution_keyword)
      .catch(err => alert('기고 정보를 받아오는데 실패하였습니다.'));

    setKeyword(requestGet);
    // setKeyword(requestGet.contribution_keyword);
    // setTitle(requestGet.contribution_title);
    // setContent(requestGet.contribution_content);
  }, []);

  useEffect(() => {
    const requrest = Auth(true);

    if (requrest === 'Login need') {
      setModalOpen(true);
    }
  });

  function onKeywordHandler(e) {
    setKeyword(e.currentTarget.value);
  }

  function onTitleHandler(e) {
    setTitle(e.currentTarget.value);
  }

  function onContentHandler(e) {
    setContent(e.currentTarget.value);

    if (e.currentTarget.value.length >= 200) {
      setcolorChange(true);
    } else {
      setcolorChange(false);
    }
  }

  function onSubmitHandler(e) {
    e.preventDefault();

    if (title.length < 8 || content.length < 200 || keyword === '') {
      return setAlertOpen(true);
    }

    let body = {
      contribution_title: title,
      contribution_content: content,
      contibution_keyword: keyword,
    };

    return customAxios.post('/contribution', body).then(res => {
      if (res.status === 200) {
        alert('기고수정요청이 완료되었습니다.');
        // window.location.href = '/mypage';
      } else alert('기고수정요청이 실패하였습니다.');
    });
  }

  const closeModal = () => {
    setAlertOpen(false);
  };

  return (
    <>
      <div className="contributioncontainer">
        <div className="continner">
          <form onSubmit={e => onSubmitHandler(e)} className="signinform">
            <label for="conselect">
              키워드 <span>(필수)</span>
            </label>
            <select
              onChange={e => onKeywordHandler(e)}
              value={keyword}
              className="conselect"
              id="conselect"
            >
              <option value="" className="optionslect">
                선택
              </option>
              {selectOptions.map((option, idx) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <br />
            <label for="contitle">
              제목 <span>(필수)</span>
            </label>
            <input
              type="text"
              onChange={e => onTitleHandler(e)}
              placeholder="제목"
              defaultValue={title}
              placeholder="8자 이상 입력해주세요."
              className="contitle"
              id="contitle"
            />

            <br />
            <label for="contextarea">
              미리보기 내용 <span>(필수)</span>
              <p className={colorChange ? 'textlength active' : 'textlength'}>
                ( {content.length} / 200 이상 )
              </p>
            </label>
            <textarea
              cols="50"
              rows="10"
              onChange={e => onContentHandler(e)}
              placeholder="200자 이상 입력해주세요."
              className="contextarea"
              defaultValue={content}
              id="contextarea"
            ></textarea>

            <br />
            <button type="submit" className="contributionbtn">
              <Button
                subject="기고수정"
                color="#fff"
                backgroundColor="#191a20"
              />
            </button>
          </form>
          <div className="contextsmall">
            수정 완료 후엔 심사가 다시 시작해요.
          </div>
          <div class="updatecancelbtn">
            <Link to="/mypage">
              <Button
                subject="이전으로"
                color="#191a20"
                backgroundColor="#d9d9d9"
              />
            </Link>
          </div>
        </div>
        <div className="alermodalbox">
          <AlertModal
            open={alertOpen}
            close={closeModal}
            alertString={'모두 입력해야 합니다.'}
            alertBtn="확인"
          />
        </div>
      </div>
      {modalOpen ? (
        <SigninModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      ) : null}
    </>
  );
}

export default ContributionUpdateWrapper;
