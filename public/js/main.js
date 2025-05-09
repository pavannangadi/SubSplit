// General JavaScript for all pages
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('show');
      });
    }
    
    // Profile picture preview
    const profilePicInput = document.getElementById('profilePic');
    const profilePreview = document.getElementById('profilePreview');
    
    if (profilePicInput && profilePreview) {
      profilePicInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function(e) {
            profilePreview.src = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      });
    }
    
    // Alert close buttons
    document.querySelectorAll('.alert .close').forEach(button => {
      button.addEventListener('click', function() {
        this.parentElement.style.display = 'none';
      });
    });
  });