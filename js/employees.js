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

console.log('Employees page initialized successfully!');
