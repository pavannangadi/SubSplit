document.addEventListener('DOMContentLoaded', function() {
    // Delete account confirmation
    const deleteAccountBtn = document.getElementById('deleteAccountBtn');
    
    if (deleteAccountBtn) {
      deleteAccountBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
          // In a real app, this would send a request to delete the account
          alert('Account deletion would be processed here');
        }
      });
    }
    
    // Password validation
    const newPassword = document.getElementById('newPassword');
    const confirmPassword = document.getElementById('confirmPassword');
    
    if (newPassword && confirmPassword) {
      const form = newPassword.closest('form');
      
      form.addEventListener('submit', function(e) {
        if (newPassword.value !== confirmPassword.value) {
          e.preventDefault();
          alert('New passwords do not match');
        }
      });
    }
  });