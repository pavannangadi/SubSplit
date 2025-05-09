document.addEventListener('DOMContentLoaded', function() {
  // Modal handling
  const modal = document.getElementById('createGroupModal');
  const btn = document.getElementById('createGroupBtn');
  const span = document.querySelector('.close');
  
  btn.onclick = function() {
    modal.style.display = 'flex';
  }
  
  span.onclick = function() {
    modal.style.display = 'none';
  }
  
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  }
  
  // Form submission
  const form = document.getElementById('createGroupForm');
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(form);
    
    try {
      const response = await fetch('/groups/create', {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });
      
      if (response.ok) {
        window.location.reload();
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to create group');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('An error occurred while creating the group');
    }
  });
  
  // Join group buttons
  const joinButtons = document.querySelectorAll('.join-group');
  joinButtons.forEach(button => {
    button.addEventListener('click', async function() {
      const groupId = this.dataset.group;
      
      try {
        const response = await fetch(`/groups/join/${groupId}`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          window.location.reload();
        } else {
          const error = await response.json();
          alert(error.message || 'Failed to join group');
        }
      } catch (err) {
        console.error('Error:', err);
        alert('An error occurred while joining the group');
      }
    });
  });
});