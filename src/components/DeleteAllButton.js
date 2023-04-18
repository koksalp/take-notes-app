import styles from "./styles/DeleteAllButton.module.css";

export default function (props) {
  return (
    <button
      className={styles.button}
      type="button"
      onClick={props.deleteAllNotes}
    >
      Delete All 
    </button>
  );
}
