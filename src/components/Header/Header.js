import styles from "./styles.module.css";

export default function Header({ title }) {
  return (
    <div className={ styles.container }>
      <img src={process.env.PUBLIC_URL + '/logo512.jpeg'} className={ styles.logo } alt="logo" />
      <div>{ title }</div>
    </div>
  );
}