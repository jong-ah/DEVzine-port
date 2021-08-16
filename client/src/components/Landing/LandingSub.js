import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Common/Button/Button';

function LandingSub() {
  const [subscribers, setSubscribers] = useState('200000');
  const [count, setCount] = useState('0');
  const [ScrollY, setScrollY] = useState(0);
  const [ScrollActive, setScrollActive] = useState(false);

  useEffect(() => {
    let start = 0;
    const end = parseInt(subscribers.substring(0, 3));
    if (start === end) return;

    let totalMilSecDur = parseInt(1);
    let incrementTime = (totalMilSecDur / end) * 3500;

    let timer = setInterval(() => {
      start += 1;
      setCount(String(start) + ',' + subscribers.substring(3));
      if (start === end) clearInterval(timer);
    }, incrementTime);
  }, [ScrollActive]);

  useEffect(() => {
    function scrollListener() {
      window.addEventListener('scroll', handleScroll);
    }
    scrollListener();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  function handleScroll() {
    if (ScrollY > window.innerHeight) {
      setScrollY(window.pageYOffset);
      setScrollActive(true);
    } else {
      setScrollY(window.pageYOffset);
      setScrollActive(false);
    }
  }

  return (
    <>
      <div className="landinglast">
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <div className="withuscontainer">
                <h2>{count}명</h2>
                구독하고 있어요.
                <p>많은 분들이 찾는 DEVzine과 함께 해요!</p>
                <div className="landingbottombtn">
                  <div>
                    <Link to="/subscribe">
                      <Button
                        subject="구독하기"
                        color="#191A20"
                        backgroundColor="#FFDD14"
                        className="btn1"
                      />
                    </Link>
                  </div>
                  <div>
                    <Button
                      subject="매거진 보기"
                      color="#191A20"
                      backgroundColor="#FFDD14"
                      onClickHandle={() =>
                        (window.location.href = '/articlelist')
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingSub;