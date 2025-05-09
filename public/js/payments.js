document.addEventListener('DOMContentLoaded', function() {
    // Filter payments
    const filterPayments = document.getElementById('filterPayments');
    const paymentMonth = document.getElementById('paymentMonth');
    
    if (filterPayments) {
      filterPayments.addEventListener('change', function() {
        // In a real app, this would fetch filtered data from the server
        console.log('Filtering payments by:', this.value);
      });
    }
    
    if (paymentMonth) {
      paymentMonth.addEventListener('change', function() {
        // In a real app, this would fetch data for the selected month
        console.log('Filtering payments by month:', this.value);
      });
    }
  });