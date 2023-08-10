import React from "react";
import { useState, useCallback } from "react";
import axios from 'axios';

const AudioRecord = () => {
  const [stream, setStream] = useState();
  const [media, setMedia] = useState();
  const [onRec, setOnRec] = useState(true);
  const [source, setSource] = useState();
  const [analyser, setAnalyser] = useState();
  const [audioUrl, setAudioUrl] = useState();

  const onRecAudio = () => {
    // 음원정보를 담은 노드를 생성하거나 음원을 실행또는 디코딩 시키는 일을 한다
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    // 자바스크립트를 통해 음원의 진행상태에 직접접근에 사용된다.
    const analyser = audioCtx.createScriptProcessor(0, 1, 1);
    setAnalyser(analyser);

    function makeSound(stream) {
      // 내 컴퓨터의 마이크나 다른 소스를 통해 발생한 오디오 스트림의 정보를 보여준다.
      const source = audioCtx.createMediaStreamSource(stream);
      setSource(source);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
    }
    // 마이크 사용 권한 획득
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      setStream(stream);
      setMedia(mediaRecorder);
      makeSound(stream);

      analyser.onaudioprocess = function (e) {
        // 3분(180초) 지나면 자동으로 음성 저장 및 녹음 중지
        if (e.playbackTime > 180) {
          stream.getAudioTracks().forEach(function (track) {
            track.stop();
          });
          mediaRecorder.stop();
          // 메서드가 호출 된 노드 연결 해제
          analyser.disconnect();
          audioCtx.createMediaStreamSource(stream).disconnect();

          mediaRecorder.ondataavailable = function (e) {
            setAudioUrl(e.data);
            setOnRec(true);
          };
        } else {
          setOnRec(false);
        }
      };
    });
  };

  // 사용자가 음성 녹음을 중지했을 때
  const offRecAudio = () => {
    // dataavailable 이벤트로 Blob 데이터에 대한 응답을 받을 수 있음
    media.ondataavailable = function (e) {
      setAudioUrl(e.data);
      setOnRec(true);
    };

    // 모든 트랙에서 stop()을 호출해 오디오 스트림을 정지
    stream.getAudioTracks().forEach(function (track) {
      track.stop();
    });

    // 미디어 캡처 중지
    media.stop();
    // 메서드가 호출 된 노드 연결 해제
    analyser.disconnect();
    source.disconnect();
  };

  const onSubmitAudioFile = useCallback(() => {
    if (audioUrl) {
      console.log(URL.createObjectURL(audioUrl)); // 출력된 링크에서 녹음된 오디오 확인 가능
    }
    // File 생성자를 사용해 파일로 변환
    const sound = new File([audioUrl], "soundBlob", { lastModified: new Date().getTime(), type: "audio" });
    console.log(sound); // File 정보 출력
  }, [audioUrl]);

  return (
    <>
      <button onClick={onRec ? onRecAudio : offRecAudio}>녹음</button>
      <button onClick={onSubmitAudioFile}>결과 확인</button>
    </>
  );
};

export default function Postpage() {
    const Question = new FormData();
    const [posttitle, setPosttitle] = useState("");
    const [category, setCategory] = useState('정부24');
    const [contents, setContents] = useState("");
    const selectList = ['정부24', '키오스크', '이커머스'];

    const handletitle = e => {
        const newTitle = e.target.value
        setPosttitle(newTitle)
        
    }
    const handlecategory = e => {
        setCategory(e.target.value)        
    }
    const hadlecontents = e => {
        setContents(e.target.value)
    }
    const postWrite = e => {
        e.preventDefault();
        Question.append('title', posttitle);
        Question.append('category', category);
        Question.append('contents', contents);
        console.log(Question.get('title'))
        console.log(Question.get('category'))
        console.log(Question.get('contents'))
        axios({
            method:'post',
            url: '/questions',
            data:Question,
        })
        .then(result => {console.log('요청성')
        console.log(result)
    })
        .catch(error => {console.log('요청실패')
        console.log(error)
    })
    };
    return(
        <>
            <div className="postbox" >
                <form>
                    <div className="postbox-title">
                        <input required type="text" placeholder="제목" maxLength={20} name='posttitle' onChange={handletitle}/>
                    </div>
                    <div className="postbox-category">
                        <select onChange={handlecategory} value={category}>
                            {selectList.map((item) => (
                                <option value={item} key={item}>
                                    {item}
                                </option>
                            ))}
                            {/* <option value={'정부24'}>정부24</option>
                            <option value={'키오스크'}>키오스크</option>
                            <option value={'이커머스'}>이커머스</option> */}
                        </select>    
                    </div>
                    <div className="postbox-wirtebox">
                        <textarea rows={30} cols={80} onChange={hadlecontents}></textarea>
                        <AudioRecord />
                        <input type="file" accept="image/*" />
                        <input type="submit" value={'게시글 등록'} onClick={postWrite}/>
                    </div>
                </form>
            </div>
        </>
    )
}
