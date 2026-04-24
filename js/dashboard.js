const actionBtns = document.querySelectorAll('.action-btn');
actionBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const label = btn.querySelector('span')?.textContent || 'Action';
    console.log('Clicked:', label);
  });
});

const moreBtns = document.querySelectorAll('.more-btn');
moreBtns.forEach(btn => {
  btn.addEventListener('click', (event) => {
    event.stopPropagation();
    console.log('More options clicked');
  });
});

const reportBtn = document.querySelector('.report-btn');
if (reportBtn) {
  reportBtn.addEventListener('click', () => {
    console.log('Generate Report clicked');
  });
}

const viewAllBtns = document.querySelectorAll('.view-all-btn');
viewAllBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    console.log('View All clicked');
  });
});

const barSegments = document.querySelectorAll('.bar-segment');
barSegments.forEach(segment => {
  segment.addEventListener('mouseenter', () => {
    segment.style.opacity = '0.8';
  });
  segment.addEventListener('mouseleave', () => {
    segment.style.opacity = '1';
  });
});

const deptItems = document.querySelectorAll('.dept-item');
deptItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.style.opacity = '0.8';
  });
  item.addEventListener('mouseleave', () => {
    item.style.opacity = '1';
  });
});

const eventItems = document.querySelectorAll('.event-item');
eventItems.forEach(item => {
  item.addEventListener('click', () => {
    const eventName = item.querySelector('p')?.textContent || 'Event';
    console.log('Event clicked:', eventName);
  });
});

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
