import { useCallback, useEffect, useState } from "react";
import Modal from "./Modal";
import { AUTH_URL } from "../../constants";
import inputIsInvalid from "./validation";
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

  const closeAndReset = useCallback(() => {
    setDisplaySuccessFlag(initialDisplaySuccessFlag);
    setStatus(initialStatus);
    setData(initialData);
    setErr(initialErr);
    toggleModal();
  });

  if (displaySuccessFlag) {
    return (
      <Modal
        open={ open }
        title={ `All done!` }
        close={ closeAndReset }
      >
        <div>You will be one of the first to experience</div>
        <div>Broccoli &amp; Co. when we launch.</div>
        <button className={ styles.sendBtn } onClick={ closeAndReset }>OK</button>
      </Modal>
    ); 
  }

  return (
    <Modal
      open={ open }
      title={ `Request an invite` }
      close={ closeAndReset }
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
        disabled={ status === sendingStatus }
      >
        {
          status === initialStatus ? "Send" : "Sending... Please wait"
        }
      </button>
      {
        err && err.length ?
        <div className={ styles.err }>{ err }</div> : <div className={ styles.errPlaceholder }></div>
      }
    </Modal>
  );
}
