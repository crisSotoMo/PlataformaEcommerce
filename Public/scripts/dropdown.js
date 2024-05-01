const dropdownToggle = document.getElementById('dropdownToggle');
const dropdownContent = document.querySelector('.dropdown-content');

dropdownToggle.addEventListener('click', function() {
  dropdownContent.classList.toggle('show'); // Toggle 'show' class for visibility
});
