import datasets from "../CoffeeShopSales.json" assert { type: "json" };

console.log(datasets);
let transactionTotal = datasets.length;
let totalRevenue = 0;
let totalQTY = 0;
let totalTransaction = 0;
//chart
let datasetPie = [
  // {
  //   id:'idToko',
  //   nama:'namaToko',
  //   value:'totaltransaksi ditoko/totalsemua*100%'
  // }
];

for (let index = 0; index < datasets.length; index++) {
  const dataset = datasets[index];
  totalRevenue += Number(dataset.transaction_total);
  totalQTY += Number(dataset.transaction_qty);
  totalTransaction += Number(dataset.transaction_total);

  //Piechart
  if (datasetPie.map((row) => row.id).includes(dataset.store_id)) {
    datasetPie = datasetPie.map((row) => {
      if (row.id === dataset.store_id) {
        return {
          ...row,
          value: row.value + Number(dataset.transaction_total),
        };
      }
      return row;
    });
  } else {
    datasetPie.push({
      id: dataset.store_id,
      nama: dataset.store_location,
      value: Number(dataset.transaction_total),
    });
  }
}
console.log(datasetPie);

function AVGSalesQTY(totalQTY, totalTrans) {
  return totalQTY / totalTrans;
}

function AVGRevenue(totalTransaction, totalTrans) {
  return totalTransaction / totalTrans;
}
document.querySelector(".totalSales").innerHTML = transactionTotal;
document.querySelector(".totalRevenue").innerHTML =
  "$" + totalRevenue.toFixed(2);
document.querySelector(".AVGSalesQTY").innerHTML = AVGSalesQTY(
  totalQTY,
  transactionTotal
).toFixed(2);

document.querySelector(".AVGRevenue").innerHTML =
  "$" + AVGRevenue(totalTransaction, transactionTotal).toFixed(2);

// Pie chart
function createChart(labels, datasets, type, options, element) {
  // const labels = ["Aria", "Hell's Kitchen", "Lower Manhattan"];
  const data = {
    labels: labels,
    // datasets: [
    //   {
    //     label: "My First Dataset",
    //     data: [65, 59, 80],
    //     backgroundColor: ["red", "blue", "green"],
    //   },
    // ],
    datasets: datasets,
  };

  const config = {
    // type: "doughnut",
    type: type,
    data: data,
    options: options,
    // options: {
    //   scales: {
    //     y: {
    //       beginAtZero: true,
    //     },
    //   },
    // },
  };
  // const ctx = document.getElementById("doughnut");
  const ctx = document.getElementById(element);
  // console.log(window);

  // const pieChart = new Chart(ctx, config);
  // const myChart = new Chart(ctx, config);
  return new Chart(ctx, config);
}

function PersentaseSales(datasetPie, totalTransaction){
  let presentasePie =[];
  for (let index = 0; index < datasetPie.length; index++) {
    const item = datasetPie[index];
    presentasePie.push(Math.round((item.value/totalTransaction)*100))
  }
  return presentasePie;

}

const pieChart = createChart(
datasetPie.map(row=>row.nama),
  [
    {
      label: "My First Dataset",
      data: PersentaseSales(datasetPie, totalTransaction),
      backgroundColor: [
        "rgb(237, 116, 112)",
        "rgb(130, 105, 90)",
        "rgb(189, 203, 137)",
      ],
    },
  ],
  "doughnut",
  {},
  "doughnut"
);

//Barchart
// Create an object to store the revenue for each product category
let categoryRevenue = {};
for (let index = 0; index < datasets.length; index++) {
  const dataset = datasets[index];
  const category = dataset.product_category;
  if (categoryRevenue[category]) {
    categoryRevenue[category] += Number(dataset.transaction_total);
  } else {
    categoryRevenue[category] = Number(dataset.transaction_total);
  }
}

// Sort the object by revenue in descending order and get the top 5 categories
let sortedCategories = Object.entries(categoryRevenue)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 5);

// Create the bar chart
const barRevenue = createChart(
  sortedCategories.map((category) => category[0]),
  [
    {
      label: "Revenue by Product Category",
      // label: ["Aria", "Hell's Kitchen", "Lower Manhattan"],
      data: sortedCategories.map((category) => category[1]),
      backgroundColor: [
        "rgb(237, 116, 112)",
        "rgb(130, 105, 90)",
        "rgb(189, 203, 137)",
        "rgb(255, 206, 86)",
        "rgb(75, 192, 192)",
      ],
    },
  ],
  "bar",
  { indexAxis: "y" },
  "barRevenue"
);

// const barRevenue = createChart(
//   ["Coffee", "Tea", "Bakery"],
//   [
//     {
//       label: "My First Dataset",
//       data: [65, 59, 80],
//       backgroundColor: [
//         "rgb(237, 116, 112)",
//         "rgb(130, 105, 90)",
//         "rgb(189, 203, 137)",
//       ],
//     },
//   ],
//   "bar",
//   { indexAxis: "y" },
//   "barRevenue"
// );

//lineChart
// const lineTrend = createChart(
//   ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//   [
//     {
//       label: "Aria",
//       data: [65, 59, 80, 81, 56, 55], // Replace this with the actual data for Aria
//       borderColor: "rgb(237, 116, 112)",
//       backgroundColor: "rgb(237, 116, 112)",
//       tension: 0.1,
//     },
//     {
//       label: "Hell's Kitchen",
//       data: [45, 69, 70, 71, 66, 65], // Replace this with the actual data for Hell's Kitchen
//       borderColor: "rgb(130, 105, 90)",
//       backgroundColor: "rgb(130, 105, 90)",
//       tension: 0.1,
//     },
//     {
//       label: "Lower Manhattan",
//       data: [75, 89, 70, 71, 86, 85], // Replace this with the actual data for Lower Manhattan
//       borderColor: "rgb(189, 203, 137)",
//       backgroundColor: "rgb(189, 203, 137)",
//       tension: 0.1,
//     },
//   ],
//   "line",
//   { indexAxis: "x" },
//   "lineTrend"
// );

// Extract revenue data by month for each store location
const storeLocations = [...new Set(datasets.map((dataset) => dataset.store_location))];
const revenueByMonth = storeLocations.reduce((acc, storeLocation) => {
  acc[storeLocation] = {};
  datasets.forEach((dataset) => {
    if (dataset.store_location === storeLocation) {
      // const month = dataset.transaction_date.split('-')[1]; // assuming transaction_date is in YYYY-MM-DD format
      const month = dataset.transaction_date.split("-")[0]; //assuming transaction_date is in MM-DD-YYYY format
      const revenue = Number(dataset.transaction_total);
      if (!acc[storeLocation][month]) {
        acc[storeLocation][month] = 0;
      }
      acc[storeLocation][month] += revenue;
    }
  });
  return acc;
}, {});

// Create labels and data arrays for the line chart
const labels = Object.keys(revenueByMonth[storeLocations[0]]);
const data = storeLocations.map((storeLocation, index) => {
  return {
    label: storeLocation,
    data: labels.map((month) => revenueByMonth[storeLocation][month] || 0),
    // borderColor: getRandomColor(), // generate a random color for each store location
    borderColor: [
      "rgb(237, 116, 112)",
      "rgb(130, 105, 90)",
      "rgb(189, 203, 137)",
    ][index],
    backgroundColor: [
      "rgb(237, 116, 112)",
      "rgb(130, 105, 90)",
      "rgb(189, 203, 137)",
    ], 
    tension: 0.1,
  };
});

// Create the line chart
const lineTrend = createChart(
  labels,
  data,
  "line",
  {
    indexAxis: "x",
    borderColor: [
      "rgb(237, 116, 112)",
      "rgb(130, 105, 90)",
      "rgb(189, 203, 137)",
    ],
  },
  "lineTrend"
);

// Function to generate a random color
// function getRandomColor() {
//   const letters = '0123456789ABCDEF';
//   let color = '#';
//   for (let i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   return color;
// }

//Table

let table = new DataTable("#myTable");


function populateTable() {
  const tableBody = document.getElementById("data-output");
  tableBody.innerHTML = ""; // clear the table body

  // Group datasets by product_type
  const groupedDatasets = [];
  const productTypes = [
    ...new Set(datasets.map((dataset) => dataset.product_type)),
  ];
  productTypes.forEach((type) => {
    const groupedDataset = {
      type: type,
      datasets: datasets.filter((dataset) => dataset.product_type === type),
    };
    groupedDatasets.push(groupedDataset);
  });

  // Iterate over groups and populate table
  groupedDatasets.forEach((groupedDataset) => {
    groupedDataset.datasets.forEach((dataset) => {
      const row = document.createElement("tr");

      // product_category
      const categoryCell = document.createElement("td");
      categoryCell.textContent = dataset.product_category;
      row.appendChild(categoryCell);

      // product_type
      const typeCell = document.createElement("td");
      typeCell.textContent = groupedDataset.type; // Use product_type as the value
      row.appendChild(typeCell);

      // total_sales
      const totalSalesCell = document.createElement("td");
      totalSalesCell.textContent = dataset.transaction_total;
      row.appendChild(totalSalesCell);

      // avg_total_sales
      const avgTotalSalesCell = document.createElement("td");
      const avgTotalSales =
        groupedDataset.datasets.reduce(
          (acc, current) => acc + current.transaction_total,
          0
        ) / groupedDataset.datasets.length;
      avgTotalSalesCell.textContent = avgTotalSales.toFixed(2);
      row.appendChild(avgTotalSalesCell);

      // transaction_qty
      const qtyCell = document.createElement("td");
      qtyCell.textContent = dataset.transaction_qty;
      row.appendChild(qtyCell);

      // Avg_revenue_per_item
      const avgRevenueCell = document.createElement("td");
      const avgRevenue =
        groupedDataset.datasets.reduce(
          (acc, current) => acc + current.transaction_total,
          0
        ) /
        groupedDataset.datasets.reduce(
          (acc, current) => acc + current.transaction_qty,
          0
        );
      avgRevenueCell.textContent = `$${avgRevenue.toFixed(2)}`;
      row.appendChild(avgRevenueCell);

      tableBody.appendChild(row);
    });
  });
}

populateTable();

// function populateTable() {
//   const tableBody = document.getElementById("data-output");
//   tableBody.innerHTML = ""; // clear the table body

//   datasets.forEach((dataset) => {
//     const row = document.createElement("tr");

//     // product_category
//     const categoryCell = document.createElement("td");
//     categoryCell.textContent = dataset.product_category;
//     row.appendChild(categoryCell);

//     // product_type
//     const typeCell = document.createElement("td");
//     typeCell.textContent = dataset.product_type;
//     row.appendChild(typeCell);

//     // total_sales
//     const totalSalesCell = document.createElement("td");
//     totalSalesCell.textContent = dataset.transaction_total;
//     row.appendChild(totalSalesCell);

//     // avg_total_sales
//     const avgTotalSalesCell = document.createElement("td");
//     const avgTotalSales =
//       datasets.reduce((acc, current) => acc + current.transaction_total, 0) /
//       datasets.length;
//     avgTotalSalesCell.textContent = avgTotalSales.toFixed(2);
//     row.appendChild(avgTotalSalesCell);

//     // transaction_qty
//     const qtyCell = document.createElement("td");
//     qtyCell.textContent = dataset.transaction_qty;
//     row.appendChild(qtyCell);

//     // Avg_revenue_per_item
//     const avgRevenueCell = document.createElement("td");
//     const avgRevenue =
//       datasets.reduce((acc, current) => acc + current.transaction_total, 0) /
//       datasets.reduce((acc, current) => acc + current.transaction_qty, 0);
//     avgRevenueCell.textContent = `$${avgRevenue.toFixed(2)}`;
//     row.appendChild(avgRevenueCell);

//     tableBody.appendChild(row);
//   });
// }

// populateTable();

// const lineTrend = createChart(
//   ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//   [
//     {
//       label: ["Aria", "Hell's Kitchen", "Lower Manhattan"],
//       data: [65, 59, 80, 81, 56, 55],
//       // fill: false,
//       borderColor: "rgb(75, 192, 192)",
//       backgroundColor: ["red", "blue", "green"],
//       tension: 0.1,
//     },
//   ],
//   "line",
//   { indexAxis: "y" },
//   "lineTrend"
// );

// const labels = Utils.months({ count: 7 });
// const data = {
//   labels: labels,
//   datasets: [
//     {
//       label: "My First Dataset",
//       data: [65, 59, 80, 81, 56, 55, 40],
//       fill: false,
//       borderColor: "rgb(75, 192, 192)",
//       tension: 0.1,
//     },
//   ],
// };

//sort table
// function sortTableByColumn(table, column, asc =true){

// }
