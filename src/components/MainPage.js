import React, { useEffect, useRef } from "react";
import { auth, storage, database, db } from "../firebase";
import { ref, getDownloadURL, connectStorageEmulator } from "firebase/storage";
import { getStorage, listAll } from "firebase/storage";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import "./MainPage.css";
import { getDatabase, onValue } from "firebase/database";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
} from "firebase/firestore";

export default function MainPage() {
  const storage = getStorage();
  const [audios, setAudios] = useState(null);
  const [audio_number, setAudio_number] = useState(null);
  const [audio_folder, setAudio_folder] = useState(null);
  const promptRef = collection(db, "Sentences");

  const flag = useRef(false);

  const username = auth.currentUser.displayName;
  const uid = auth.currentUser.uid;
  const uemail = auth.currentUser.email;
  const pno = auth.currentUser.phoneNumber;

  const signout = () => {
    auth.signOut();
  };

 
  const UserNotAssigned = () => {
    return <h6 className="completed-note">User Not yet assigned</h6>;
  };

//   useEffect(() => {
//     console.log("test main");
//   }, []);
  useEffect(() => {
    if (flag.current) return;
    flag.current = true;
    var starCountRef = database.ref("Users/" + uid + "/progress");
    starCountRef.on("value", (snapshot) => {
      const data = snapshot.val();
      const folder = String(data.audio_folder);
      const listRef = ref(storage, folder);
      listAll(listRef).then((res) => {
        setAudios(res["items"]);
      });
      setAudio_folder(data.audio_folder);
      setAudio_number(data.audio_number);
    });

    // Loadaudios(audio_folder)
  }, []);

  return (
    <div>
      <h4 className="Header">
        <b>
          <u>English Gyani Project : Annotations</u>
        </b>
      </h4>
      <div className="welcomenote">
        {/* <h1>Welcome <span style={{color: '#FF5733',fontFamily:'Georgia'}}>{ uid }</span>.</h1> */}
        <h6>
          Logged in with{" "}
          <span style={{ color: "#FF5733", fontStyle: "italic" }}>
            {pno ? pno : uemail}
          </span>
          .
        </h6>
        {/* <h3>User ID : <span style={{color: '#FF5733',fontFamily:'Georgia'}}>{ uid }</span>.</h3> */}
        <nav>
          <button className="sign_out_button" onClick={signout}>
            Sign out
          </button>
        </nav>
        <br />
      </div>

      {audios ? (
        <LoadQuestion question_number={audio_number} audios={audios} {...{uid, audio_folder, promptRef}} />
      ) : (
        <UserNotAssigned />
      )}
      <p className="contact-note">
        If you face any issues, please write to{" "}
        <span style={{ color: "red", fontStyle: "italic" }}>
          englishgnaniproject@gmail.com
        </span>
      </p>
    </div>
  );
}

function LoadQuestion(props) {
    const {uid, audio_folder, promptRef} = props;
    const flag_l = useRef(false);
    const [question_number, setQuestion_number] = useState(
      props.question_number
    );
    const [outputs, setOutputs] = useState([]);
    const [url, setUrl] = useState("");
    const audios = props.audios;
    const [prompt, setPrompt] = useState();
    // const [urlE,setUrlE] = useState();
    const [showoptions, setShowoptions] = useState(false);

    // function getUrl(filename) {

    // };

    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setOutputs((values) => ({ ...values, [name]: value }));
    };

    const BinaryQuestion = (props) => {
      return (
        <div className="binary-question">
          <h6 className="yes_No">{props.question}</h6>

          {showoptions && (
            <div className="yes-no">
              <input
                className="option-radio"
                name={props.k}
                type="radio"
                value="Yes"
                onChange={handleChange}
                checked={props.outputs[props.k] === "Yes"}
                required
              />
              Yes
              <input
                className="option-radio"
                name={props.k}
                type="radio"
                value="No"
                onChange={handleChange}
                checked={props.outputs[props.k] === "No"}
                required
              />
              No
            </div>
          )}
        </div>
      );
    };

    const handleSubmit = (event) => {
    //   event.preventDefault();
      
      if (Object.keys(outputs).length !== 8) {
        alert("Please select an option for all questions");
      } else {
        var name1 = audios[question_number].name;
        name1 = name1.split(".")[0];
        // console.log(name1)
        database
          .ref("Users/" + uid + "/" + name1)
          .set({
            responce: outputs,
          })
          .catch(alert);
        // setAudio_number(audio_number+1);

        database
          .ref("Users/" + uid + "/progress")
          .set({
            audio_folder: audio_folder,
            audio_number: question_number + 1,
          })
          .catch(alert);
        //   console.log({before :question_number})
        setQuestion_number(question_number+1);
        // console.log({after : question_number})
      }
    };

    const OverallRating = (props) => {
      const q_str = "Overall Rating";
      return (
        <div className="overallrating">
          <h6>8.{q_str}</h6>
          {showoptions && (
            <div className="options">
              <input
                className="option-radio"
                name={q_str}
                type="radio"
                value="1"
                onChange={handleChange}
                checked={props.outputs[q_str] === "1"}
                required
              />
              1
              <input
                className="option-radio"
                name={q_str}
                type="radio"
                value="2"
                onChange={handleChange}
                checked={props.outputs[q_str] === "2"}
                required
              />
              2
              <input
                className="option-radio"
                name={q_str}
                type="radio"
                value="3"
                onChange={handleChange}
                checked={props.outputs[q_str] === "3"}
                required
              />
              3
              <input
                className="option-radio"
                name={q_str}
                type="radio"
                value="4"
                onChange={handleChange}
                checked={props.outputs[q_str] === "4"}
                required
              />
              4
              <input
                className="option-radio"
                name={q_str}
                type="radio"
                value="5"
                onChange={handleChange}
                checked={props.outputs[q_str] === "5"}
                required
              />
              5
              <input
                className="option-radio"
                name={q_str}
                type="radio"
                value="6"
                onChange={handleChange}
                checked={props.outputs[q_str] === "6"}
                required
              />
              6
              <input
                className="option-radio"
                name={q_str}
                type="radio"
                value="7"
                onChange={handleChange}
                checked={props.outputs[q_str] === "7"}
                required
              />
              7
              <input
                className="option-radio"
                name={q_str}
                type="radio"
                value="8"
                onChange={handleChange}
                checked={props.outputs[q_str] === "8"}
                required
              />
              8
              <input
                className="option-radio"
                name={q_str}
                type="radio"
                value="9"
                onChange={handleChange}
                checked={props.outputs[q_str] === "9"}
                required
              />
              9
              <input
                className="option-radio"
                name={q_str}
                type="radio"
                value="10"
                onChange={handleChange}
                checked={props.outputs[q_str] === "10"}
                required
              />
              10
            </div>
          )}
        </div>
      );
    };

    const handleEnded = (event) => {
      setShowoptions(true);
    };

    // useEffect(() => {
    //   console.log("test load question", {question_number, len: audios.length });
    // }, []);

    useEffect(() => {
      

      if (question_number < audios.length) {
        const filename = audios[question_number].fullPath;
        setOutputs([]);
        setShowoptions(false);
        getDownloadURL(ref(storage, filename)).then((url_t) => {
          setUrl(url_t);
        });

        const name = audios[question_number].name;
        const num = name.split(".")[0].split("_")[1];

        // getDownloadURL(ref(storage,'Expert_3_Male/'+num+'.mp3')).then((url)=>{
        //     setUrlE(url)});

        (async () => {
          const textRef = doc(promptRef, String(num));
          const text = await getDoc(textRef);
          const p = text.data().prompt;
          setPrompt(p);
        //   console.log(num, url, prompt,uid);
        })();
      }
      // console.log(audios)
    }, [question_number]);

    // if (question_number < audios.length) {
    //   return (
    //     <div className="question">
    //       {/* { props.audios &&getUrl(audios[question_number].fullPath) } */}

    //       <h6>
    //         Audio : {question_number + 1}/{audios.length}
    //       </h6>
    //       {/* {console.log(question_number+1)} */}
    //       {/* {!urlE && <CircularProgress />} */}
    //       {/* <div className="audios"> */}
    //       {/* {urlE  &&<div className="audio-wrapper expert"><h6>Expert </h6><audio className="audio-player" src={urlE} controls ></audio></div>  } */}
    //       {/* {!url && <CircularProgress />}<p></p> */}
    //       {url && (
    //         <div className="audio-wrapper">
    //           <h6>Speaker</h6>
    //           <audio
    //             className="audio-player"
    //             src={url}
    //             controls
    //             onEnded={handleEnded}
    //           ></audio>
    //         </div>
    //       )}
    //       {/* </div>  */}
    //       <h6 className="Transcription">
    //         Prompt : <b>{prompt}</b>
    //       </h6>
    //       <h6 className="Instruction">
    //         <span style={{ fontStyle: "italic" }}>
    //           Answer the following questions with respect to the given audio and
    //           text.
    //         </span>
    //         <br />
    //         Please refer to the{" "}
    //         <a href="https://docs.google.com/spreadsheets/d/12udizujfYe8lpX_svux-fspHdl13QomutzlznXRDx-g/edit?usp=sharing">
    //           examples
    //         </a>{" "}
    //         if you have any doubts.
    //       </h6>
    //       <div className="questions-flex">
    //         <BinaryQuestion
    //           question={"1.Is it intelligible?"}
    //           outputs={outputs}
    //           k={"Is it intelligible?"}
    //         />
    //         <BinaryQuestion
    //           question={"2.Is the quality of spoken phonemes correct?"}
    //           outputs={outputs}
    //           k={"Is Phoneme Quality correct?"}
    //         />
    //         <BinaryQuestion
    //           question={"3.Are the phonemes pronounced correctly?"}
    //           outputs={outputs}
    //           k={"Are the phonemes pronounced correctly"}
    //         />
    //         <BinaryQuestion
    //           question={"4.Are the stress locatios correct?"}
    //           outputs={outputs}
    //           k={"Are stress markings correct?"}
    //         />
    //         <BinaryQuestion
    //           question={"5.Is intonation/voice modulation correct?"}
    //           outputs={outputs}
    //           k={"Is intonation or voice modulation correct?"}
    //         />
    //         <BinaryQuestion
    //           question={"6.Is chunking/pause-placement correct?"}
    //           outputs={outputs}
    //           k={"Is chunking or placement of pause correct?"}
    //         />
    //         <BinaryQuestion
    //           question={"7.Is there any Mother Tongue influence?"}
    //           outputs={outputs}
    //           k={"Will you agree there is no Mother Tongue influence?"}
    //         />
    //         <OverallRating outputs={outputs} />
    //       </div>
    //       <button className="submit-button" onClick={handleSubmit}>
    //         Submit
    //       </button>
    //     </div>
    //   );
    // } else {
    //   return <h6 className="completed-note"> All questions visited</h6>;
    // }

    return (
      <>
        {question_number < audios.length ? (
          <>
            <div className="question">
              {/* { props.audios &&getUrl(audios[question_number].fullPath) } */}

              <h6>
                Audio : {question_number + 1}/{audios.length}
              </h6>
              {/* {console.log(question_number+1)} */}
              {/* {!urlE && <CircularProgress />} */}
              {/* <div className="audios"> */}
              {/* {urlE  &&<div className="audio-wrapper expert"><h6>Expert </h6><audio className="audio-player" src={urlE} controls ></audio></div>  } */}
              {/* {!url && <CircularProgress />}<p></p> */}
              {url ? (
                <div className="audio-wrapper">
                  <h6>Speaker</h6>
                  <audio
                    className="audio-player"
                    src={url}
                    controls
                    onEnded={handleEnded}
                  ></audio>
                </div>
              ) : <CircularProgress/>}
              {/* </div>  */}
              <h6 className="Transcription">
                Prompt : <b>{prompt}</b>
              </h6>
              <h6 className="Instruction">
                <span style={{ fontStyle: "italic" }}>
                  Answer the following questions with respect to the given audio
                  and text.
                </span>
                <br />
                Please refer to the{" "}
                <a href="https://docs.google.com/spreadsheets/d/12udizujfYe8lpX_svux-fspHdl13QomutzlznXRDx-g/edit?usp=sharing">
                  examples
                </a>{" "}
                if you have any doubts.
              </h6>
              <div className="questions-flex">
                <BinaryQuestion
                  question={"1.Is it intelligible?"}
                  outputs={outputs}
                  k={"Is it intelligible?"}
                />
                <BinaryQuestion
                  question={"2.Is the quality of spoken phonemes correct?"}
                  outputs={outputs}
                  k={"Is Phoneme Quality correct?"}
                />
                <BinaryQuestion
                  question={"3.Are the phonemes pronounced correctly?"}
                  outputs={outputs}
                  k={"Are the phonemes pronounced correctly"}
                />
                <BinaryQuestion
                  question={"4.Are the stress locatios correct?"}
                  outputs={outputs}
                  k={"Are stress markings correct?"}
                />
                <BinaryQuestion
                  question={"5.Is intonation/voice modulation correct?"}
                  outputs={outputs}
                  k={"Is intonation or voice modulation correct?"}
                />
                <BinaryQuestion
                  question={"6.Is chunking/pause-placement correct?"}
                  outputs={outputs}
                  k={"Is chunking or placement of pause correct?"}
                />
                <BinaryQuestion
                  question={"7.Is there any Mother Tongue influence?"}
                  outputs={outputs}
                  k={"Will you agree there is no Mother Tongue influence?"}
                />
                <OverallRating outputs={outputs} />
              </div>
              <button className="submit-button" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </>
        ) : (
          <h6 className="completed-note"> All questions visited</h6>
        )}
      </>
    );
  }
