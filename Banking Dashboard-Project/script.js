document.addEventListener('DOMContentLoaded', function() {
    let balance = 1000; // Initial balance

    const balanceElement = document.getElementById('balance');
    const depositBtn = document.getElementById('depositBtn');
    const withdrawBtn = document.getElementById('withdrawBtn');
    const depositAmountInput = document.getElementById('depositAmount');
    const withdrawAmountInput = document.getElementById('withdrawAmount');

    // Update balance display
    function updateBalance() {
        balanceElement.textContent = balance.toFixed(2);
    }

    // Handle deposit action
    depositBtn.addEventListener('click', function() {
        const depositAmount = parseFloat(depositAmountInput.value);
        if (!isNaN(depositAmount) && depositAmount > 0) {
            balance += depositAmount;
            updateBalance();
            depositAmountInput.value = '';
        } else {
            alert("Please enter a valid deposit amount.");
        }
    });

    // Handle withdrawal action
    withdrawBtn.addEventListener('click', function() {
        const withdrawAmount = parseFloat(withdrawAmountInput.value);
        if (!isNaN(withdrawAmount) && withdrawAmount > 0) {
            if (withdrawAmount <= balance) {
                balance -= withdrawAmount;
                updateBalance();
                withdrawAmountInput.value = '';
            } else {
                alert("Insufficient funds for this withdrawal.");
            }
        } else {
            alert("Please enter a valid withdrawal amount.");
        }
    });
});
