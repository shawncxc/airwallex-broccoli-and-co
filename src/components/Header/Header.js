import styles from "./styles.module.css";

export default function Header({ title }) {
  return (
    <div className={ styles.container }>
      <div>{ title }</div>
    </div>
  );
}