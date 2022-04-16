import { useCallback, useState } from "react";
import Modal from "./Modal";
import { AUTH_URL } from "../../constants";
import styles from "./rimodal.module.css";

const initialData = {};
const initialStatus = "DONE";
const sendingStatus = "SENDING";
const initialErr = "";
const initialDisplaySuccessFlag = false;

export default function RequestInviteModal({ open, toggleModal }) {
  const [data, setData] = useState(initialData);
  const [status, setStatus] = useState(initialStatus);
  const [err, setErr] = useState(initialErr);
  const [displaySuccessFlag, setDisplaySuccessFlag] = useState(initialDisplaySuccessFlag);

  const onChange = useCallback((event) => {
    setErr(initialErr);
    const target = event.target;
    const key = target.getAttribute("data-item");
    const value = target.value;
    setData({
      ...data,
      [key]: value,
    });
  });

  const onSend = useCallback(() => {
    const { name, email } = data;

    // validation
    if (inputIsInvalid(data, setErr)) return;

    // send request
    async function sendInvite(name, email, setStatus, setErr) {
      setStatus(sendingStatus);
      const response = await fetch(AUTH_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
        }),
      });
      setStatus(initialStatus);

      if (response.status === 200) {
        setDisplaySuccessFlag(true);
      } else {
        setErr(`Server error: ${response.statusText}, modify your inputs and try again`);
      }
    }

    sendInvite(name, email, setStatus, setErr);
  });

  if (displaySuccessFlag) {
    return (
      <Modal
        open={ open }
        title={ `All done` }
        close={() => {
          setData(initialData);
          toggleModal();
        }}
      >
        <div>You will be one of the first to experience</div>
        <div>Broccoli &amp; Co. when we launch.</div>
        <button className={ styles.sendBtn } onClick={ toggleModal }>OK</button>
      </Modal>
    ); 
  }

  return (
    <Modal
      open={ open }
      title={ `Request an invite` }
      close={() => {
        setData(initialData);
        toggleModal();
      }}
    >
      <input
        className={ styles.input }
        placeholder="Full name"
        data-item="name"
        value={ data.name ? data.name : "" }
        onChange={ onChange }
      />
      <input
        className={ styles.input }
        placeholder="Email"
        data-item="email"
        value={ data.email ? data.email : "" }
        onChange={ onChange }
      />
      <input
        className={ styles.input }
        placeholder="Confirm email"
        data-item="emailconfirm"
        value={ data.emailconfirm ? data.emailconfirm : "" }
        onChange={ onChange }
      />
      <button
        className={ styles.sendBtn }
        onClick={ onSend }
        disabled={ (err && err.length) || (status === sendingStatus) }
      >
        {
          status === initialStatus ? "Send" : "Sending... Please wait"
        }
      </button>
      {
        err && err.length ?
        <div className={ styles.err }>{ err }</div>
        : ""
      }
    </Modal>
  );
}

function inputIsInvalid(data, setErr) {
  const { name, email, emailconfirm } = data;

  // check if empty
  if (!name) {
    setErr("Name can not be empty");
    return true;
  }
  if (!email) {
    setErr("Email can not be empty");
    return true;
  }
  if (!emailconfirm) {
    setErr("Please confirm your email");
    return true;
  }

  // check if name is valid
  if (name.length < 3) {
    setErr("Your name is too short");
    return true;
  }

  // check email syntax
  if (!email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )) {
    setErr("Your email is not valid");
    return true;
  }

  // check email vs email confirmation
  if (email !== emailconfirm) {
    setErr("Your email is not matching your email confirmation");
    return true;
  }

  return false;
}
