/* =============================================
   ADD EMPLOYEE FORM – JS Controller
   ============================================= */

// ---- Edit button handler (employees.html) ----
document.querySelectorAll('.employee-edit-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const raw = btn.getAttribute('data-emp');
    if (!raw) return;
    try {
      sessionStorage.setItem('editEmployee', raw);
      window.location.href = 'employeesadd.html';
    } catch (e) { /* sessionStorage unavailable */ }
  });
});

(function () {
  // Only run the wizard when the step sections are present (employeesadd.html)
  if (!document.getElementById('step-0')) return;

  const TOTAL_STEPS = 5;
  let currentStep = 0;

  const stepTitles = [
    'Personal Information',
    'Job Details',
    'Identity & Documents',
    'Bank & Payroll',
    'Work Schedule'
  ];
  const stepSubtitles = [
    'Enter the employee\'s basic personal details below',
    'Configure job role, department, and reporting structure',
    'Add identification numbers and legal documents',
    'Set up banking details and payroll preferences',
    'Define shift timings and weekly schedule'
  ];

  // ---- DOM refs ----
  const stepSections   = document.querySelectorAll('.step-section');
  const stepItems      = document.querySelectorAll('.step-item');
  const stepConnectors = document.querySelectorAll('.step-connector');
  const prevBtn        = document.getElementById('prevBtn');
  const nextBtn        = document.getElementById('nextBtn');
  const submitBtn      = document.getElementById('submitBtn');
  const stepTitle      = document.getElementById('stepTitle');
  const stepSubtitle   = document.getElementById('stepSubtitle');

  const stepDots       = document.getElementById('stepDots');
  const toast          = document.getElementById('successToast');

  // ---- Init step dots ----
  function buildDots() {
    stepDots.innerHTML = '';
    for (let i = 0; i < TOTAL_STEPS; i++) {
      const d = document.createElement('div');
      d.className = 'dot-pip' + (i === currentStep ? ' active' : '');
      stepDots.appendChild(d);
    }
  }

  // ---- Ribbon (removed) ----
  function updateRibbon() {}

  // ---- Render step ----
  function renderStep(direction = 'forward') {
    // Sections
    stepSections.forEach((s, i) => {
      s.classList.remove('active', 'exit');
      if (i === currentStep) s.classList.add('active');
    });

    // Sidebar items
    stepItems.forEach((el, i) => {
      el.classList.remove('active', 'done');
      if (i < currentStep)  el.classList.add('done');
      if (i === currentStep) el.classList.add('active');
    });

    // Connectors
    stepConnectors.forEach((c, i) => {
      c.classList.toggle('done', i < currentStep);
    });

    // Header text
    if (stepTitle)    stepTitle.textContent    = stepTitles[currentStep];
    if (stepSubtitle) stepSubtitle.textContent = stepSubtitles[currentStep];

    // Buttons
    prevBtn.disabled = currentStep === 0;
    if (currentStep === TOTAL_STEPS - 1) {
      nextBtn.classList.add('hidden');
      submitBtn.classList.remove('hidden');
    } else {
      nextBtn.classList.remove('hidden');
      submitBtn.classList.add('hidden');
    }

    buildDots();
    updateRibbon();
  }

  // ---- Navigation ----
  nextBtn.addEventListener('click', () => {
    if (currentStep < TOTAL_STEPS - 1) {
      currentStep++;
      renderStep('forward');
      document.querySelector('.steps-wrapper').scrollTop = 0;
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentStep > 0) {
      currentStep--;
      renderStep('back');
      document.querySelector('.steps-wrapper').scrollTop = 0;
    }
  });

  // ---- Sidebar step click ----
  stepItems.forEach((el, i) => {
    el.addEventListener('click', () => {
      currentStep = i;
      renderStep();
      document.querySelector('.steps-wrapper').scrollTop = 0;
    });
  });

  // ---- Day chips ----
  document.querySelectorAll('.day-chip').forEach(chip => {
    const cb = chip.querySelector('input[type="checkbox"]');
    chip.addEventListener('click', (e) => {
      // Prevent double-toggle when clicking the checkbox itself
      if (e.target === cb) {
        chip.classList.toggle('selected', cb.checked);
        return;
      }
      chip.classList.toggle('selected');
      if (cb) cb.checked = chip.classList.contains('selected');
    });
  });

  // ---- Same address checkbox ----
  const sameAddress = document.getElementById('sameAddress');
  const presAddress = document.getElementById('presAddress');
  const permAddress = document.getElementById('permAddress');
  if (sameAddress) {
    sameAddress.addEventListener('change', () => {
      if (sameAddress.checked) {
        presAddress.value = permAddress.value;
        presAddress.disabled = true;
      } else {
        presAddress.disabled = false;
      }
    });
    permAddress.addEventListener('input', () => {
      if (sameAddress.checked) presAddress.value = permAddress.value;
    });
  }

  // ---- Submit ----
  submitBtn.addEventListener('click', () => {
    // collect form data (stub)
    const formData = collectFormData();
    console.log('Employee Form Data:', formData);
    showToast();
  });

  function collectFormData() {
    return {
      personal: {
        empCode:      val('empCode'),
        firstName:    val('firstName'),
        middleName:   val('middleName'),
        lastName:     val('lastName'),
        contact:      val('contact'),
        dob:          val('dob'),
        doj:          val('doj'),
        fatherName:   val('fatherName'),
        motherName:   val('motherName'),
        gender:       val('gender'),
        empType:      val('empType'),
        permAddress:  val('permAddress'),
        presAddress:  val('presAddress'),
      },
      job: {
        designation:  val('designation'),
        department:   val('department'),
        location:     val('location'),
        reportingTo:  val('reportingTo'),
        emailId:      val('emailId'),
        personalEmail:val('personalEmail'),
        status:       val('status'),
        projectName:  val('projectName'),
        costCenter:   val('costCenter'),
        grade:        val('grade'),
        remarks:      val('remarks'),
      },
      identity: {
        aadhar:       val('aadhar'),
        pan:          val('pan'),
        voterId:      val('voterId'),
        passport:     val('passport'),
        maritalStatus:val('maritalStatus'),
        dom:          val('dom'),
        bloodGroup:   val('bloodGroup'),
        category:     val('category'),
        assetDetails: val('assetDetails'),
        medHistory:   val('medHistory'),
      },
      bank: {
        bankName:     val('bankName'),
        accountNo:    val('accountNo'),
        ifsc:         val('ifsc'),
        pfUan:        val('pfUan'),
        uanNo:        val('uanNo'),
        esiAc:        val('esiAc'),
        voluntaryPf:  val('voluntaryPf'),
      },
      schedule: {
        workingType:    val('workingType'),
        inTime:         val('inTime'),
        outTime:        val('outTime'),
        weeklyOffCount: val('weeklyOffCount'),
        lateEntry:      val('lateEntry'),
        payDeduction:   val('payDeduction'),
        mobileAttendance: val('mobileAttendance'),
        weeklyOff: [...document.querySelectorAll('.day-chip.selected')]
                      .map(c => c.querySelector('input').value),
      }
    };
  }

  function val(id) {
    const el = document.getElementById(id);
    return el ? el.value : '';
  }

  // ---- Toast ----
  function showToast() {
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
      window.location.href = 'employees.html';
    }, 2000);
  }

  // ---- Bootstrap ----
  renderStep();

  // ---- Prefill from sessionStorage (edit mode) ----
  const editRaw = sessionStorage.getItem('editEmployee');
  if (editRaw) {
    try {
      const emp = JSON.parse(editRaw);
      sessionStorage.removeItem('editEmployee');

      // Update page title
      const topbarTitle = document.querySelector('.topbar-title');
      if (topbarTitle) topbarTitle.textContent = 'Edit Employee';

      // Helper: set value if element exists
      function setVal(id, v) {
        const el = document.getElementById(id);
        if (el && v !== undefined) el.value = v;
      }

      // Personal Info
      setVal('empCode',    emp.empCode);
      setVal('firstName',  emp.firstName);
      setVal('middleName', emp.middleName);
      setVal('lastName',   emp.lastName);
      setVal('contact',    emp.contact);
      setVal('dob',        emp.dob);
      setVal('doj',        emp.doj);
      setVal('fatherName', emp.fatherName);
      setVal('motherName', emp.motherName);
      setVal('gender',     emp.gender);
      setVal('empType',    emp.empType);

      // Job Details
      setVal('designation',   emp.designation);
      setVal('department',    emp.department);
      setVal('location',      emp.location);
      setVal('reportingTo',   emp.reportingTo);
      setVal('emailId',       emp.emailId);
      setVal('personalEmail', emp.personalEmail);
      setVal('status',        emp.status);
      setVal('grade',         emp.grade);

      // Update employee code display
      const codeDisplay = document.getElementById('empCodeDisplay');
      if (codeDisplay && emp.empCode) codeDisplay.textContent = emp.empCode;

    } catch (e) { /* invalid JSON, skip */ }
  }
})();