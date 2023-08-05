import React from "react";
import styles from "./ListRow.module.css";

const ListRow = ({ children, onClick, isSelected }) => {
  const rowClasses = isSelected ? styles.selectedRow : '';

  return (
    <tr className={rowClasses} onClick={onClick}>
      {React.Children.map(children, (child, index) => (
        <td key={index} className={styles.cell}>
          {child}
        </td>
      ))}
    </tr>
  );
};

export default ListRow;
