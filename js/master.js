const masterTabs = document.querySelectorAll('.master-tabs button');
const masterTables = document.querySelectorAll('[data-master-table]');
const masterSummaryCards = document.querySelectorAll('.master-summary-card');
const masterBackdrop = document.getElementById('masterModalBackdrop');
const masterFormModal = document.getElementById('masterFormModal');
const deleteMasterModal = document.getElementById('deleteMasterModal');
const masterModalTitle = document.getElementById('masterModalTitle');
const masterNameInput = document.getElementById('masterNameInput');
const masterCodeInput = document.getElementById('masterCodeInput');
const masterTypeInput = document.getElementById('masterTypeInput');
const deleteMasterMessage = document.getElementById('deleteMasterMessage');

const openMasterModal = (modal) => {
  if (!masterBackdrop || !modal) {
    return;
  }

  if (masterFormModal) {
    masterFormModal.classList.remove('active');
  }
  if (deleteMasterModal) {
    deleteMasterModal.classList.remove('active');
  }

  masterBackdrop.classList.add('active');
  masterBackdrop.setAttribute('aria-hidden', 'false');
  modal.classList.add('active');
};

const closeMasterModals = () => {
  if (!masterBackdrop) {
    return;
  }

  masterBackdrop.classList.remove('active');
  masterBackdrop.setAttribute('aria-hidden', 'true');
  if (masterFormModal) {
    masterFormModal.classList.remove('active');
  }
  if (deleteMasterModal) {
    deleteMasterModal.classList.remove('active');
  }
};

masterTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.masterTab;

    masterTabs.forEach(item => item.classList.remove('active'));
    tab.classList.add('active');

    masterTables.forEach(table => {
      table.classList.toggle('hidden', table.dataset.masterTable !== target);
      table.querySelectorAll('.master-row').forEach(row => {
        row.style.display = '';
      });
    });

    const masterSearchInput = document.getElementById('masterSearch');
    if (masterSearchInput) {
      masterSearchInput.value = '';
    }

    masterSummaryCards.forEach((card, cardIndex) => {
      card.classList.toggle('active', cardIndex === index);
    });
  });
});

masterSummaryCards.forEach((card, index) => {
  card.addEventListener('click', () => {
    const targetTab = masterTabs[index];
    if (targetTab) {
      targetTab.click();
    }
  });
});

const openAddMasterBtn = document.getElementById('openAddMaster');
if (openAddMasterBtn) {
  openAddMasterBtn.addEventListener('click', () => {
    if (masterModalTitle) {
      masterModalTitle.textContent = 'Add Designation';
    }
    if (masterNameInput) {
      masterNameInput.value = '';
    }
    if (masterCodeInput) {
      masterCodeInput.value = '';
    }

    const activeTab = document.querySelector('.master-tabs button.active');
    if (masterTypeInput && activeTab) {
      masterTypeInput.value = activeTab.textContent.trim();
    }

    openMasterModal(masterFormModal);
  });
}

document.querySelectorAll('.master-edit-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const recordName = btn.dataset.record || 'Master record';

    if (masterModalTitle) {
      masterModalTitle.textContent = 'Edit Designation';
    }
    if (masterNameInput) {
      masterNameInput.value = recordName;
    }
    if (masterCodeInput) {
      const row = btn.closest('.master-row');
      masterCodeInput.value = row ? row.children[1].textContent.trim() : '';
    }

    openMasterModal(masterFormModal);
  });
});

document.querySelectorAll('.master-delete-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const recordName = btn.dataset.record || 'this record';
    if (deleteMasterMessage) {
      deleteMasterMessage.textContent = `Delete "${recordName}"? This action cannot be undone.`;
    }

    openMasterModal(deleteMasterModal);
  });
});

document.querySelectorAll('[data-modal-close]').forEach(btn => {
  btn.addEventListener('click', closeMasterModals);
});

if (masterBackdrop) {
  masterBackdrop.addEventListener('click', (event) => {
    if (event.target === masterBackdrop) {
      closeMasterModals();
    }
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMasterModals();
  }
});

const masterSearchInput = document.getElementById('masterSearch');
if (masterSearchInput) {
  masterSearchInput.addEventListener('input', () => {
    const query = masterSearchInput.value.trim().toLowerCase();
    const activeTable = document.querySelector('.master-table:not(.hidden)');

    if (!activeTable) {
      return;
    }

    activeTable.querySelectorAll('.master-row:not(.master-table-head)').forEach(row => {
      row.style.display = row.textContent.toLowerCase().includes(query) ? 'grid' : 'none';
    });
  });
}

const saveMasterBtn = document.getElementById('saveMasterBtn');
if (saveMasterBtn) {
  saveMasterBtn.addEventListener('click', () => {
    console.log('Master record saved');
    closeMasterModals();
  });
}

const confirmDeleteMaster = document.getElementById('confirmDeleteMaster');
if (confirmDeleteMaster) {
  confirmDeleteMaster.addEventListener('click', () => {
    console.log('Master record deleted');
    closeMasterModals();
  });
}

console.log('Master page initialized successfully!');
