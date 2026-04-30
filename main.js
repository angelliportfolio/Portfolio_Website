document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.accordion-tab');

  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const item = this.parentElement;
      const isActive = item.classList.contains('active');
      
      // Close all accordion items
      document.querySelectorAll('.accordion-item').forEach(el => {
        el.classList.remove('active');
      });

      // If it wasn't active, open it
      if (!isActive) {
        item.classList.add('active');
        
        // Wait a small amount for the grid transition to start, then scroll
        setTimeout(() => {
          // Smooth scroll to the top of the clicked item
          item.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }, 300);
      }
    });
  });
});
