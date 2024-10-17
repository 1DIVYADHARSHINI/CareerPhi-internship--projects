let investments = JSON.parse(localStorage.getItem('investments')) || [];

const investmentForm = document.getElementById('investmentForm');
const investmentList = document.getElementById('investmentList');
const totalValueDisplay = document.getElementById('totalValue');
const portfolioChart = document.getElementById('portfolioChart').getContext('2d');

let portfolioChartInstance; // Global variable to store the chart instance

// Function to calculate percentage change
function calculatePercentageChange(investedAmount, currentValue) {
  if (investedAmount === 0) return '0.00';  // Avoid division by zero
  return (((currentValue - investedAmount) / investedAmount) * 100).toFixed(2);
}

// Function to render the investment list
function renderInvestments() {
  investmentList.innerHTML = '';
  investments.forEach((investment, index) => {
    const li = document.createElement('li');
    li.className = 'investment-item';
    li.innerHTML = `
      ${investment.assetName} - Invested: $${investment.investedAmount}, Current: $${investment.currentValue}, Change: ${calculatePercentageChange(investment.investedAmount, investment.currentValue)}%
      <button onclick="updateInvestment(${index})">Update</button>
      <button onclick="removeInvestment(${index})">Remove</button>
    `;
    investmentList.appendChild(li);
  });
  updateTotalValue();
  renderChart();  // Call renderChart() after updating investments
}

// Function to remove an investment
function removeInvestment(index) {
  investments.splice(index, 1); // Remove the investment at the given index
  localStorage.setItem('investments', JSON.stringify(investments)); // Update localStorage
  renderInvestments(); // Re-render the list after removal
}

// Function to update an investment
function updateInvestment(index) {
  const newInvestedAmount = parseFloat(prompt('Enter new invested amount:'));
  const newCurrentValue = parseFloat(prompt('Enter new current value:'));
  
  if (!isNaN(newInvestedAmount) && !isNaN(newCurrentValue)) {
    investments[index].investedAmount = newInvestedAmount;
    investments[index].currentValue = newCurrentValue;
    localStorage.setItem('investments', JSON.stringify(investments)); // Update localStorage
    renderInvestments(); // Re-render the list after the update
  } else {
    alert("Please enter valid numbers for the invested amount and current value.");
  }
}

// Function to render the pie chart using Chart.js
function renderChart() {
  try {
    // Destroy the previous chart instance if it exists
    if (portfolioChartInstance) {
      portfolioChartInstance.destroy();
    }

    const chartData = investments.map(inv => inv.currentValue);
    const chartLabels = investments.map(inv => inv.assetName);

    // Create a new chart instance and assign it to portfolioChartInstance
    portfolioChartInstance = new Chart(portfolioChart, {
      type: 'pie',
      data: {
        labels: chartLabels,
        datasets: [{
          data: chartData,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
        }]
      }
    });
  } catch (error) {
    console.error("Error rendering chart:", error);
  }
}

// Function to add a new investment
investmentForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const assetName = document.getElementById('assetName').value;
  const investedAmount = parseFloat(document.getElementById('investedAmount').value);
  const currentValue = parseFloat(document.getElementById('currentValue').value);
  
  const newInvestment = { assetName, investedAmount, currentValue };
  investments.push(newInvestment);
  localStorage.setItem('investments', JSON.stringify(investments));
  
  renderInvestments();
  investmentForm.reset();
});

// Function to update total value
function updateTotalValue() {
  const totalValue = investments.reduce((sum, investment) => sum + investment.currentValue, 0);
  totalValueDisplay.textContent = totalValue.toFixed(2);
}

// Initial render
renderInvestments();
