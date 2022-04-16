import styles from "./styles.module.css";

export default function Modal({ open, close, title, children }) {

  if (!open) return null;

  return (
    <div className={ styles.modal } onClick={ close }>
      <div className={ styles.content } onClick={ e => e.stopPropagation() }>
        <div className={ styles.modalHeader }>
          { title }
        </div>
        <div className={ styles.modalBody }>
          { children }
        </div>
      </div>
    </div>
  );
}