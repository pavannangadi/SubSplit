document.addEventListener('DOMContentLoaded', function() {
    // Filter groups
    const filterGroup = document.getElementById('filterGroup');
    const groupsList = document.querySelector('.groups-list');
    
    if (filterGroup && groupsList) {
      filterGroup.addEventListener('change', function() {
        // In a real app, this would fetch filtered data from the server
        groupsList.innerHTML = '<p>Loading filtered groups...</p>';
        
        // Simulate loading
        setTimeout(() => {
          groupsList.innerHTML = `
            <div class="group-item">
              <img src="/uploads/netflix-logo.png" alt="Netflix">
              <div class="group-info">
                <h4>Netflix Premium</h4>
                <p>Your share: $5.99/month</p>
                <p>Next payment: ${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toDateString()}</p>
              </div>
            </div>
          `;
        }, 500);
      });
    }
  });