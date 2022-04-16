import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import styles from "./styles.module.css";

import { useState, useCallback } from "react";
import RequestInviteModal from "../../components/Modal/RequestInviteModal";

const initialModalState = false;

export default function Landing() {

  const [open, setOpen] = useState(initialModalState);
  const toggleModal = useCallback(() => {
    setOpen(!open);
  });

  return (
    <div className={ styles.page }>
      <RequestInviteModal open={ open } toggleModal={ toggleModal } />
      <Header title="BROCCOLI &amp; CO." />
      <div className={ styles.body }>
        <div className={ `${styles.row} ${styles.title}` }>
          A better way
        </div>
        <div className={ `${styles.row} ${styles.title}` }>
          to enjoy every day.
        </div>
        <div className={ `${styles.row} ${styles.subtitle}` }>
          Be the first to know when we launch.
        </div>
        <button
          className={ `${styles.row} ${styles.invite}` }
          onClick={ toggleModal }
        >
          Request an invite
        </button>
      </div>
      <Footer />
    </div>
  );
}