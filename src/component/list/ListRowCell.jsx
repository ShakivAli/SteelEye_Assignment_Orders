import styles from "./ListRowCell.module.css";

const ListRowCell = ({ children }) => {
  return <div className={styles.cell}>{children}</div>;
};

export default ListRowCell;
