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


// function createChart(labels, datasets, type, options, element) {
//   // const labels = ["Aria", "Hell's Kitchen", "Lower Manhattan"];
//   const data = {
//     labels: labels,
//     // datasets: [
//     //   {
//     //     label: "My First Dataset",
//     //     data: [65, 59, 80],
//     //     backgroundColor: ["red", "blue", "green"],
//     //   },
//     // ],
//     datasets: datasets,
//   };
//   const config = {
//     type: type,
//     data: data,
//     options: options,
//     // options: {
//     //   scales: {
//     //     y: {
//     //       beginAtZero: true,
//     //     },
//     //   },
//     // },
//   };
//   // const ctx = document.getElementById("doughnut");
//   const ctx = document.getElementById(element);
//   // console.log(window);

//   // const pieChart = new Chart(ctx, config);
//   // const myChart = new Chart(ctx, config);
//   return new Chart(ctx, config);
// }

function createChart(
  labels,
  datasets,
  type,
  options,
  element,
  filter = () => true
) {
  const data = {
    labels: labels,
    datasets: datasets.filter((dataset) => filter(dataset)),
  };

  const config = {
    type: type,
    data: data,
    options: options,
  };

  const ctx = document.getElementById(element);
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
  // Pie-Doughnut-chart
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


// Create an object to store the revenue for each product type
// Bar chart: Revenue Contribution by Product Type
let typeRevenue = {};
for (let index = 0; index < datasets.length; index++) {
  const dataset = datasets[index];
  const type = dataset.product_type;
  if (typeRevenue[type]) {
    typeRevenue[type] += Number(dataset.transaction_total);
  } else {
    typeRevenue[type] = Number(dataset.transaction_total);
  }
}

let sortedTypes = Object.entries(typeRevenue)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 5);

const barRevenueType = createChart(
  sortedTypes.map((type) => type[0]),
  [
    {
      label: "Revenue by Product Type",
      data: sortedTypes.map((type) => type[1]),
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
  "barRevenueType"
);
// let typeRevenue = {};
// for (let index = 0; index < datasets.length; index++) {
//   const dataset = datasets[index];
//   const type = dataset.product_type;
//   if (typeRevenue[type]) {
//     typeRevenue[type] += Number(dataset.transaction_total);
//   } else {
//     typeRevenue[type] = Number(dataset.transaction_total);
//   }
// }

// // Sort the object by revenue in descending order and get the top 5 types
// let sortedTypes = Object.entries(typeRevenue)
//   .sort((a, b) => b[1] - a[1])
//   .slice(0, 5);

// const barRevenueType = createChart(
//   sortedTypes.map((type) => type[0]), // Corrected variable name
//   [
//     {
//       label: "Revenue by Product Type",
//       data: sortedTypes.map((type) => type[1]), // Corrected variable name
//       backgroundColor: [
//         "rgb(237, 116, 112)",
//         "rgb(130, 105, 90)",
//         "rgb(189, 203, 137)",
//         "rgb(255, 206, 86)",
//         "rgb(75, 192, 192)",
//       ],
//     },
//   ],
//   "bar",
//   { indexAxis: "y" },
//   "barRevenueType"
// );

// Dropdown filter for product categories
const categoryDropdown = document.getElementById("categoryDropdown");
const uniqueCategories = [...new Set(datasets.map(dataset => dataset.product_category))];

uniqueCategories.forEach(category => {
  const option = document.createElement("option");
  option.value = category;
  option.text = category;
  categoryDropdown.appendChild(option);
});

categoryDropdown.addEventListener("change", function() {
  const selectedCategory = this.value;
  const filteredDatasets = datasets.filter(dataset => dataset.product_category === selectedCategory || selectedCategory === "All");
  
  // Update Revenue Contribution by Product Type chart
  const filteredTypeRevenue = filteredDatasets.reduce((acc, dataset) => {
    const type = dataset.product_type;
    acc[type] = (acc[type] || 0) + Number(dataset.transaction_total);
    return acc;
  }, {});
  
  const sortedFilteredTypes = Object.entries(filteredTypeRevenue).sort((a, b) => b[1] - a[1]);
  
  const newBarRevenueType = createChart(
    sortedFilteredTypes.map((type) => type[0]),
    [
      {
        label: "Revenue by Product Type",
        data: sortedFilteredTypes.map((type) => type[1]),
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
    "barRevenueType"
  );
});

//Line Chart
// Extract revenue data by month for each store location
// const storeLocations = [...new Set(datasets.map((dataset) => dataset.store_location))];
// const revenueByMonth = storeLocations.reduce((acc, storeLocation) => {
//   acc[storeLocation] = {};
//   datasets.forEach((dataset) => {
//     if (dataset.store_location === storeLocation) {
//       // const month = dataset.transaction_date.split('-')[1]; // assuming transaction_date is in YYYY-MM-DD format
//       const month = dataset.transaction_date.split("-")[0]; //assuming transaction_date is in MM-DD-YYYY format
//       const revenue = Number(dataset.transaction_total);
//       if (!acc[storeLocation][month]) {
//         acc[storeLocation][month] = 0;
//       }
//       acc[storeLocation][month] += revenue;
//     }
//   });
//   return acc;
// }, {});3

// // Create labels and data arrays for the line chart
// const labels = Object.keys(revenueByMonth[storeLocations[0]]);
// const data = storeLocations.map((storeLocation, index) => {
//   return {
//     label: storeLocation,
//     data: labels.map((month) => revenueByMonth[storeLocation][month] || 0),
//     borderColor: [
//       "rgb(237, 116, 112)",
//       "rgb(130, 105, 90)",
//       "rgb(189, 203, 137)",
//     ][index],
//     backgroundColor: [
//       "rgb(237, 116, 112)",
//       "rgb(130, 105, 90)",
//       "rgb(189, 203, 137)",
//     ], 
//     tension: 0.1,
//   };
// });

// // Create the line chart
// const lineTrend = createChart(
//   labels,
//   data,
//   "line",
//   {
//     indexAxis: "x",
//     borderColor: [
//       "rgb(237, 116, 112)",
//       "rgb(130, 105, 90)",
//       "rgb(189, 203, 137)",
//     ],
//   },
//   "lineTrend"
// );



// //LineTrendHours
// // Extract revenue data by hour for each store location
// const storeLocations = [...new Set(datasets.map((dataset) => dataset.store_location))];
// const revenueByHour = storeLocations.reduce((acc, storeLocation) => {
//   acc[storeLocation] = {};
//   datasets.forEach((dataset) => {
//     if (dataset.store_location === storeLocation) {
//       const hour = dataset.transaction_time.split(":")[0]; // Extract hour from transaction_time
//       const revenue = Number(dataset.transaction_total);
//       if (!acc[storeLocation][hour]) {
//         acc[storeLocation][hour] = 0;
//       }
//       acc[storeLocation][hour] += revenue;
//     }
//   });
//   return acc;
// }, {});

// // Create labels (hours) and data arrays for the line chart
// const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0')); // Generate hours from "00" to "23"
// const data = storeLocations.map((storeLocation, index) => {
//   return {
//     label: storeLocation,
//     data: hours.map((hour) => revenueByHour[storeLocation][hour] || 0),
//     borderColor: [
//       "rgb(237, 116, 112)",
//       "rgb(130, 105, 90)",
//       "rgb(189, 203, 137)",
//       "rgb(255, 206, 86)",
//       "rgb(75, 192, 192)"
//     ][index % 5], // Use different colors for different store locations
//     backgroundColor: [
//       "rgba(237, 116, 112, 0.2)",
//       "rgba(130, 105, 90, 0.2)",
//       "rgba(189, 203, 137, 0.2)",
//       "rgba(255, 206, 86, 0.2)",
//       "rgba(75, 192, 192, 0.2)"
//     ][index % 5], 
//     tension: 0.1,
//   };
// });

// // Create the line chart
// const lineTrendHours = createChart(
//   hours,
//   data,
//   "line",
//   {
//     indexAxis: "x",
//   },
//   "lineTrendHours"
// );

// Line chart: trend of revenue by month
// Define a mapping of month numbers to month names
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Extract store locations from datasets
const storeLocations = [...new Set(datasets.map(dataset => dataset.store_location))];

// Calculate revenue by month for each store location
const revenueByMonth = storeLocations.reduce((acc, storeLocation) => {
  acc[storeLocation] = {};
  datasets.forEach(dataset => {
    if (dataset.store_location === storeLocation) {
      const month = dataset.transaction_date.split("/")[0]; // Assuming MM/DD/YYYY format
      const revenue = Number(dataset.transaction_total);
      acc[storeLocation][month] = (acc[storeLocation][month] || 0) + revenue;
    }
  });
  return acc;
}, {});

// Sort the months and map them to month names
const sortedMonthNumbers = Object.keys(revenueByMonth[storeLocations[0]]).sort((a, b) => a - b);
const monthLabels = sortedMonthNumbers.map(monthNumber => monthNames[monthNumber - 1]);

// Prepare the data for the line chart
const lineDataByMonth = storeLocations.map((storeLocation, index) => {
  return {
    label: storeLocation,
    data: sortedMonthNumbers.map(month => revenueByMonth[storeLocation][month] || 0),
    borderColor: [
      "rgb(237, 116, 112)",
      "rgb(130, 105, 90)",
      "rgb(189, 203, 137)",
    ][index % 3],
    backgroundColor: [
      "rgba(237, 116, 112, 0.2)",
      "rgba(130, 105, 90, 0.2)",
      "rgba(189, 203, 137, 0.2)",
    ][index % 3],
    tension: 0.1,
  };
});

// Create the line chart
const lineTrend = createChart(
  monthLabels,
  lineDataByMonth,
  "line",
  {
    indexAxis: "x",
  },
  "lineTrend"
);


// Line chart: trend of revenue by hour
const revenueByHour = storeLocations.reduce((acc, storeLocation) => {
  acc[storeLocation] = {};
  datasets.forEach(dataset => {
    if (dataset.store_location === storeLocation) {
      const hour = dataset.transaction_time.split(":")[0]; // Extract hour from transaction_time
      const revenue = Number(dataset.transaction_total);
      acc[storeLocation][hour] = (acc[storeLocation][hour] || 0) + revenue;
    }
  });
  return acc;
}, {});

const hourLabels = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0')); // Generate hours from "00" to "23"
const lineDataByHour = storeLocations.map((storeLocation, index) => {
  return {
    label: storeLocation,
    data: hourLabels.map(hour => revenueByHour[storeLocation][hour] || 0),
    borderColor: [
      "rgb(237, 116, 112)",
      "rgb(130, 105, 90)",
      "rgb(189, 203, 137)",
      "rgb(255, 206, 86)",
      "rgb(75, 192, 192)"
    ][index % 5], // Use different colors for different store locations
    backgroundColor: [
      "rgba(237, 116, 112, 0.2)",
      "rgba(130, 105, 90, 0.2)",
      "rgba(189, 203, 137, 0.2)",
      "rgba(255, 206, 86, 0.2)",
      "rgba(75, 192, 192, 0.2)"
    ][index % 5],
    tension: 0.1,
  };
});

const lineTrendHours = createChart(
  hourLabels,
  lineDataByHour,
  "line",
  {
    indexAxis: "x",
  },
  "lineTrendHours"
);

//DataTables
// let table = new DataTable("#myTable");
$(document).ready(function () {
  let table = $("#myTable").DataTable({
    // Add options for pagination, sorting, and searching here
    responsive: true,
    paging: true,
    lengthChange: true,
    searching: true,
    ordering: true,
    info: true,
    data: datasets, // Assuming 'datasets' is your data source
    columns: [
      // Define columns and how to display data
      { data: "product_category" },
      { data: "product_type" },
      { data: "transaction_total" }, // Access data for missing columns
      { data: "transaction_qty" }, // Access data for missing columns
      {
        data: null, // Calculate and display average revenue
        render: function (data, type, row) {
          if (row.transaction_qty > 0) {
            return `$${(row.transaction_total / row.transaction_qty).toFixed(
              2
            )}`;
          } else {
            return "$0.00";
          }
        },
      },
    ],
  });
});

//SIDEBAR
// const sidebar = document.getElementById("sidebar");

// sidebar.addEventListener("mouseover", () => {
//   sidebar.classList.add("sidebar-expanded");
// });

// sidebar.addEventListener("mouseout", () => {
//   sidebar.classList.remove("sidebar-expanded");
// });