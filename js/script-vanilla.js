// Sidebar Toggle
const toggleBtn = document.getElementById('toggleSidebar');
const sidebar = document.getElementById('sidebar');
const icon = document.getElementById('toggleIcon');

toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('collapsed');

  if (sidebar.classList.contains("collapsed")) {
    icon.textContent = "chevron_right";
  } else {
    icon.textContent = "chevron_left";
  }
});
// Profile Dropdown
const profileBtn = document.getElementById('profileBtn');
const profileDropdown = document.getElementById('profileDropdown');

if (profileBtn && profileDropdown) {
  profileBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    profileDropdown.classList.toggle('active');
  });
}

// Close dropdown when clicking outside
document.addEventListener('click', () => {
  if (profileDropdown) {
    profileDropdown.classList.remove('active');
  }
});

// Navigation items
const navItems = document.querySelectorAll('.nav-item');
const pageViews = document.querySelectorAll('.page-view');

navItems.forEach(item => {
  item.addEventListener('click', () => {
    navItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');

    const page = item.dataset.page;
    if (!page) {
      return;
    }

    pageViews.forEach(view => {
      view.classList.toggle('active', view.id === `${page}Page`);
    });
  });
});

// Update current date
const currentDateEl = document.getElementById('currentDate');
const today = new Date();
const options = { year: 'numeric', month: 'short', day: 'numeric' };
currentDateEl.textContent = today.toLocaleDateString('en-US', options);

// Quick actions buttons
const actionBtns = document.querySelectorAll('.action-btn');
actionBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const label = btn.querySelector('span').textContent;
    console.log('Clicked:', label);
  });
});

// More button functionality
const moreBtns = document.querySelectorAll('.more-btn');
moreBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    console.log('More options clicked');
  });
});

// Employees page controls
const employeeViewBtns = document.querySelectorAll('.view-toggle button');
employeeViewBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    employeeViewBtns.forEach(item => item.classList.remove('active'));
    btn.classList.add('active');
  });
});

const addEmployeeBtn = document.querySelector('.add-employee-btn');
if (addEmployeeBtn) {
  addEmployeeBtn.addEventListener('click', () => {
    console.log('Add New Employee clicked');
  });
}

const exportBtn = document.querySelector('.export-btn');
if (exportBtn) {
  exportBtn.addEventListener('click', () => {
    console.log('Export employees clicked');
  });
}

// Profile menu actions
const profileMenuBtns = document.querySelectorAll('.profile-dropdown button');
profileMenuBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const text = btn.textContent;
    if (text === 'Sign Out') {
      console.log('Signing out...');
    } else {
      console.log('Clicked:', text);
    }
  });
});

// Generate Report button
const reportBtn = document.querySelector('.report-btn');
if (reportBtn) {
  reportBtn.addEventListener('click', () => {
    console.log('Generate Report clicked');
  });
}

// View all buttons
const viewAllBtns = document.querySelectorAll('.view-all-btn');
viewAllBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    console.log('View All clicked');
  });
});

// Bar chart hover effect
const barSegments = document.querySelectorAll('.bar-segment');
barSegments.forEach(segment => {
  segment.addEventListener('mouseenter', () => {
    segment.style.opacity = '0.8';
  });
  segment.addEventListener('mouseleave', () => {
    segment.style.opacity = '1';
  });
});

// Department items hover
const deptItems = document.querySelectorAll('.dept-item');
deptItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.style.opacity = '0.8';
  });
  item.addEventListener('mouseleave', () => {
    item.style.opacity = '1';
  });
});

// Event items click
const eventItems = document.querySelectorAll('.event-item');
eventItems.forEach(item => {
  item.addEventListener('click', () => {
    const eventName = item.querySelector('p').textContent;
    console.log('Event clicked:', eventName);
  });
});

// Stats card hover animation
const statsCards = document.querySelectorAll('.stats-card');
statsCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-2px)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
  });
});

console.log('Dashboard initialized successfully!');
