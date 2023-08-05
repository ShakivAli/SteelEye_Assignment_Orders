import ListRow from "./ListRow";
import ListRowCell from "./ListRowCell";

import ListHeader from "./ListHeader";
import ListHeaderCell from "./ListHeaderCell";

import styles from "./List.module.css";

const List = ({ rows, currency, timestamps, onRowClick, selectedOrderId }) => {

  // for matching the timeStamps.json id to data.json id and printing the orderSubmitted value

  const timestampsArray = Object.values(timestamps);

  const getOrderSubmitted = (id) => {
    const matchedData = timestampsArray.find((item) => item["&id"] === id);
    return matchedData ? matchedData.timestamps.orderSubmitted : "N/A";
  };

  return (
    <table className={styles.container}>
      <thead>
        <ListHeader>
          <ListHeaderCell>Order ID</ListHeaderCell>
          <ListHeaderCell>Buy/Sell</ListHeaderCell>
          <ListHeaderCell>Country</ListHeaderCell>
          <ListHeaderCell>Order Submitted</ListHeaderCell>
          <ListHeaderCell>Order Volume / {currency}</ListHeaderCell>
        </ListHeader>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          
          //key is added to remove the "each child in a list should have a unique key props"
          //By adding this we can efficiently update the elements when list changes

          <ListRow key={`${row["&id"]}-${index}`}
            onClick={() => onRowClick(row["&id"])}
            isSelected = {row["&id"] === selectedOrderId}
          >
            <ListRowCell>{row["&id"]}</ListRowCell>
            <ListRowCell>{row.executionDetails.buySellIndicator}</ListRowCell>
            <ListRowCell>{row.executionDetails.orderStatus}</ListRowCell>
            <ListRowCell>{getOrderSubmitted(row["&id"])}</ListRowCell>
            <ListRowCell>{row.bestExecutionData.orderVolume[currency]}</ListRowCell>
          </ListRow>
        ))}
      </tbody>
    </table>
  );
};

export default List;
