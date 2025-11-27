(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })

  // Check for saved user preference, if any, on load
const getPreferredTheme = () => {
    return localStorage.getItem('theme') || 'light';
};

// Apply the theme
const setTheme = (theme) => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update the toggle switch position
    const toggle = document.getElementById('darkModeToggle');
    if(toggle) {
        toggle.checked = theme === 'dark';
    }
};

// Initialize theme on load
setTheme(getPreferredTheme());

// Event Listener for the Switch
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('themeToggle');
    const icon = document.getElementById('themeIcon');
    
    if(toggle && icon) {
        // 1. Set Initial Icon
        const currentTheme = getPreferredTheme();
        if (currentTheme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }

        // 2. Handle Click
        toggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-bs-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            setTheme(newTheme);

            // Swap Icon
            if (newTheme === 'dark') {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        });
    }
});
})()
