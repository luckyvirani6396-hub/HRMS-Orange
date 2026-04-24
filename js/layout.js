// Toggle sidebar collapse
const toggleBtn = document.getElementById('toggleSidebar');
const sidebar = document.getElementById('sidebar');
const icon = document.getElementById('toggleIcon');

if (toggleBtn && sidebar && icon) {
  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    icon.textContent = sidebar.classList.contains('collapsed') ? 'chevron_right' : 'chevron_left';
  });
}

// ── Mobile sidebar open/close ──
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const sidebarOverlay = document.getElementById('sidebarOverlay');

function openMobileSidebar() {
  if (sidebar) sidebar.classList.add('mobile-open');
  if (sidebarOverlay) sidebarOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMobileSidebar() {
  if (sidebar) sidebar.classList.remove('mobile-open');
  if (sidebarOverlay) sidebarOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', openMobileSidebar);
}

if (sidebarOverlay) {
  sidebarOverlay.addEventListener('click', closeMobileSidebar);
}

// Close mobile sidebar on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMobileSidebar();
});

// Dropdown sub-nav toggle - Custom implementation
document.querySelectorAll('.nav-parent').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();

    const li = btn.closest('.has-children');
    const subNav = li.querySelector('.sub-nav');
    const isOpen = li.classList.contains('open');

    // Close all other open dropdowns
    document.querySelectorAll('.has-children.open').forEach(openLi => {
      if (openLi !== li) {
        openLi.classList.remove('open');
        openLi.querySelector('.sub-nav')?.classList.remove('open');
      }
    });

    // Toggle current
    li.classList.toggle('open', !isOpen);
    subNav?.classList.toggle('open', !isOpen);
  });
});

// Sub-item click - activate child and parent
document.querySelectorAll('.nav-sub').forEach(btn => {
  btn.addEventListener('click', () => {
    // Deactivate all nav items
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    
    // Activate the clicked sub-item
    btn.classList.add('active');
    
    // Find and activate the parent nav-parent button
    const li = btn.closest('.has-children');
    if (li) {
      const parentBtn = li.querySelector('.nav-parent');
      if (parentBtn) {
        parentBtn.classList.add('active');
      }
    }
    
    // Navigate if URL exists
    const url = btn.dataset.url;
    if (url) {
      window.location.href = url;
    }
  });
});

// Regular nav items (no children)
document.querySelectorAll('.nav-item:not(.nav-parent):not(.nav-sub)').forEach(item => {
  item.addEventListener('click', () => {
    const url = item.dataset.url;
    if (url) {
      window.location.href = url;
      return;
    }
    
    // Deactivate all items and activate this one
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    item.classList.add('active');
  });
});

// Profile dropdown
const profileBtn = document.getElementById('profileBtn');
const profileDropdown = document.getElementById('profileDropdown');
if (profileBtn && profileDropdown) {
  profileBtn.addEventListener('click', e => {
    e.stopPropagation();
    profileDropdown.classList.toggle('active');
  });
}
document.addEventListener('click', () => {
  if (profileDropdown) profileDropdown.classList.remove('active');
});

// Date
const currentDateEl = document.getElementById('currentDate');
if (currentDateEl) {
  currentDateEl.textContent = new Date().toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  });
}

// On page load: open parent if child is active
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.nav-sub.active').forEach(activeSubItem => {
    const li = activeSubItem.closest('.has-children');
    if (li) {
      li.classList.add('open');
      const subNav = li.querySelector('.sub-nav');
      if (subNav) subNav.classList.add('open');
      const parentBtn = li.querySelector('.nav-parent');
      if (parentBtn) parentBtn.classList.add('active');
    }
  });
});