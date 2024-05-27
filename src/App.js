import React, { useState } from "react";
import styled from "styled-components";
import { Line } from "react-chartjs-2";
import {
  Chart,
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

// import { CategoryScale } from "chart.js";
// import Chart from "chart.js/auto";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 20px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: row;
  justifycontent: "space-between";
`;

const ChargeCode = styled.h2`
  margin: 0;
`;

// const Total = styled.h2`
//   margin: 0;
//   margin-left: 20px;
// `;
const Total = styled.h2`
  margin: 0;
  // margin-left: 20px;
`;

// const Dropdown = styled.select`
//   align-self: flex-start;
// `;

const ButtonClose = styled.button`
  position: absolute;
  top: 30px;
  right: 50px;
  padding: 10px;
  background-color: white;
  color: black;
  border-color: black;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
`;

const Dropdown = styled.select`
  position: absolute; // Position the dropdown absolutely
  top: 30px; // Adjust top position
  right: 125px; // Adjust right position
  padding: 10px;
  border-color: black;
  border-radius: 5px;
  font-size: 16px;
`;

// const LineGraph = styled.div`
//   width: 100%;

//   max-width: 800px;
//   margin: 20px 0;
// `;
const LineGraph = styled.div`
  width: 100%;

  margin: 20px 0;
`;

const Table = styled.table`
  width: 100%;
  max-width: 800px;
  border-collapse: collapse;
  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  th {
    background-color: #f2f2f2;
  }
  td {
    text-align: center;
  }
`;

// const CloseButton = styled.button`
//   background: none;
//   border: ;
//   font-size: 1.2em;
//   cursor: pointer;
// `;

const data = [
  {
    chargeCode: "104880.08.01.05.07",
    total: "$4,126.89",
    months: [
      "Jan'24",
      "Feb'24",
      "Mar'24",
      "Apr'24",
      "May'24",
      "Jun'24",
      "Jul'24",
      "Aug'24",
      "Sep'24",
      "Oct'24",
      "Nov'24",
      "Dec'24",
    ],
    accounts: [
      {
        account: "221763654986",
        friendlyName: "maximus-fed-fsasolutions",
        cost: 114975.75,
        costs: [
          8399.48, 12000.0, 10500.0, 10500.0, 6000.0, 11500.0, 10000.0, 9000.0,
          9500.0, 10000.0, 11000.0, 11000.0,
        ],
      },
    ],
  },
  {
    chargeCode: "104880.08.01.05.16",
    total: "$115,375.23",
    months: [
      "Jan'24",
      "Feb'24",
      "Mar'24",
      "Apr'24",
      "May'24",
      "Jun'24",
      "Jul'24",
      "Aug'24",
      "Sep'24",
      "Oct'24",
      "Nov'24",
      "Dec'24",
    ],
    accounts: [
      {
        account: "235818672228",
        friendlyName: "abcdfhfgdcs.maximus-ghduyeto",
        cost: 114975.75,
        costs: [
          8399.48, 12000.0, 10500.0, 10500.0, 6000.0, 11500.0, 10000.0, 9000.0,
          9500.0, 10000.0, 11000.0, 11000.0,
        ],
      },
      {
        account: "235818672229",
        friendlyName: "defdhfhfgcs.maximus-ghduyeto",
        cost: 296.53,
        costs: [
          5.0, 1.53, 50.0, 0.0, 30.0, 40.0, 40.0, 50.0, 20.0, 60.0, 30.0, 50.0,
        ],
      },
    ],
  },
];

const App = () => {
  const [selectedOption, setSelectedOption] = useState("Last Year Average");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleClose = () => {
    console.log("Close button clicked");
  };

  const selectedData = data[1]; // Select data based on some logic or user selection

  const chartData = {
    labels: selectedData.months,
    datasets: selectedData.accounts.map((account, index) => ({
      label: account.account,
      data: account.costs,
      borderColor: index === 0 ? "rgba(75,192,192,1)" : "rgba(153,102,255,1)",
      backgroundColor:
        index === 0 ? "rgba(75,192,192,0.2)" : "rgba(153,102,255,0.2)",
      tension: 0.4, // Add tension for smooth curve
      pointStyle: "rect",
      pointRadius: 5,
      pointHoverRadius: 8,
    })),
  };

  const averageCost = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
  const averageData = {
    label: "Average",
    data: new Array(selectedData.months.length).fill(
      averageCost(selectedData.accounts[0].costs)
    ),
    borderColor: "rgba(255,99,132,1)",
    backgroundColor: "rgba(255,99,132,0.2)",
    borderDash: [5, 5],
    tension: 0.4, // Add tension for smooth curve
    pointStyle: "circle",
    pointRadius: 5,
    pointHoverRadius: 8,
  };
  chartData.datasets.push(averageData);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
        },
      },
    },
    scales: {
      x: {
        display: true,
      },
      y: {
        display: true,
        beginAtZero: true,
      },
    },
  };

  return (
    <Container>
      <Header>
        {/* <Info>
          <ChargeCode>Charge Code: {selectedData.chargeCode}</ChargeCode>
          <div style={{ margin: "0 10px" }}>|</div>
          <Total>Total: {selectedData.total}</Total>
        </Info> */}
        <Info style={{ display: "flex", alignItems: "center" }}>
          <ChargeCode>Charge Code: {selectedData.chargeCode}</ChargeCode>
          <div style={{ margin: "0 10px", fontSize: "20px", color: "grey" }}>
            |
          </div>
          <Total>Total: {selectedData.total}</Total>
        </Info>

        <Dropdown value={selectedOption} onChange={handleOptionChange}>
          <option value="Last Year Average">Last Year Average</option>
          <option value="Other Option">Other Option</option>
        </Dropdown>
        <ButtonClose onClick={handleClose}>Close</ButtonClose>

        {/* <CloseButton onClick={handleClose}>X</CloseButton> */}
      </Header>
      <LineGraph>
        <Line data={chartData} options={chartOptions} />
      </LineGraph>
      <Table>
        <thead>
          <tr>
            <th>Account</th>
            {selectedData.months.map((month) => (
              <th key={month}>{month}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {selectedData.accounts.map((account) => (
            <tr key={account.account}>
              <td>
                {account.account}
                <br />
                {account.friendlyName}
              </td>
              {account.costs.map((cost, index) => (
                <td key={index}>${cost.toFixed(2)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default App;
