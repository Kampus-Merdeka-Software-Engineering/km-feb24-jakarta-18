// Pie chart
function createChart(labels, datasets, type, options, element){
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

const pieChart = createChart(
  ["Aria", "Hell's Kitchen", "Lower Manhattan"],
  [
    {
      label: "My First Dataset",
      data: [65, 59, 80],
      backgroundColor: ["red", "blue", "green"],
    },
  ],
  "doughnut",
  {},
  "doughnut"
);

//barchart
const barRevenue = createChart(
  ["Coffee", "Tea", "Bakery"],
  [
    {
      label: "My First Dataset",
      data: [65, 59, 80],
      backgroundColor: ["red", "blue", "green"],
    },
  ],
  "bar",
  { indexAxis: "y" },
  "barRevenue"
);