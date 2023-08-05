import { useState } from "react";

// Data
import mockData from "../assets/data.json";
import timestamps from "../assets/timeStamps.json";

// Components
import Dropdown from "../component/dropdown/Dropdown";
import HeaderTitle from "../component/header-title/HeaderTitle";
import Search from "../component/search/Search";
import List from "../component/list/List";

// Styles
import styles from "./Dashboard.module.css";
import Card from "../component/card/Card";

const Dashboard = () => {
  const [currency, setCurrency] = useState("EUR");
  const [searchText, setSearchText] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState({});
  const [selectedOrderTimeStamps, setSelectedOrderTimeStamps] = useState({});

  // filter rows based on search
  const filter = mockData.results.filter((row) => 
    row["&id"].toLowerCase().includes(searchText.toLowerCase())
  );

  // get the total numbers of data
  const totalOrders = mockData.results.length;

  const handleRowClick = (id) => {
    const matchedOrder = mockData.results.find((row) => row["&id"] === id);
    setSelectedOrderId(id);
    setSelectedOrderDetails(matchedOrder?.executionDetails || {});

    // Find the timestamps related to the selected order
    const matchedTimestamps = timestamps.results.find((item) => item["&id"] === id);
    setSelectedOrderTimeStamps(matchedTimestamps ? matchedTimestamps.timestamps : {});
  };

  return (
    <div>
      <div className={styles.header}>
        <HeaderTitle primaryTitle="Orders" secondaryTitle={`${totalOrders} orders`} />
        <div className={styles.actionBox}>
          <Search
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Dropdown
            options={["GBP", "USD", "JPY", "EUR"]}
            onChange={(e) => setCurrency(e.target.value)}
            selectedItem={currency}
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.section}>
          <Card
            cardData={selectedOrderDetails}
            title="Selected Order Details"
          />
          <Card
            cardData={selectedOrderTimeStamps}
            title="Selected Order Timestamps"
          />
        </div>
        <List rows={filter} currency={currency} timestamps={timestamps.results} onRowClick={handleRowClick} selectedOrderId={selectedOrderId}/>
      </div>
    </div>
  );
};

export default Dashboard;
