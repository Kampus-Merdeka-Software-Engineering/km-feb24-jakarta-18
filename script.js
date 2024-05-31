// Fetch JSON data from the assets folder
async function fetchData() {
    const response = await fetch('assets/js/CoffeeShopSales.json');
    const data = await response.json();
    return data;
  }
  
  // Function to render data
  function renderData(data) {
    const salesData = document.getElementById('salesData');
    salesData.innerHTML = '';
  
    if (data.length === 0) {
      salesData.innerHTML = '<p>No data available.</p>';
      return;
    }
  
    data.forEach(item => {
      const dataItem = document.createElement('div');
      dataItem.className = 'data-item';
      dataItem.innerHTML = `
        <h3>${item.product_detail}</h3>
        <p>Product Type: ${item.product_type}</p>
        <p>Product Category: ${item.product_category}</p>
        <p>Unit Price: ${item.unititem._price}</p>
        <p>Transaction Quantity: ${item.transaction_qty}</p>
        <p>Transaction Total: ${item.transaction_total}</p>
        <p>Store Location: ${item.store_location}</p>
      `;
      salesData.appendChild(dataItem);
    });
  }
  
  // Function to handle filter change
  async function handleFilterChange(event) {
    const selectedStoreLocation = document.getElementById('storeLocation').value;
    const selectedProductCategory = document.getElementById('productCategory').value;
    const data = await fetchData();
    
    const filteredData = data.filter(item => {
    const storeLocationMatch = selectedStoreLocation === 'all' || item.store_location === selectedStoreLocation;
    const productCategoryMatch = selectedProductCategory === 'all' || item.product_category === selectedProductCategory;
    return storeLocationMatch && productCategoryMatch;
    });

    renderData(filteredData);
  }
  
  // Event listener for filter
  document.getElementById('storeLocation').addEventListener('change', handleFilterChange);
  document.getElementById('productCategory').addEventListener('change', handleFilterChange);
  
  // Initial render
  async function init() {
    const data = await fetchData();
    renderData(data);
  }
  
  init();
  