function initNavToggle() {
  const toggleBtn = document.getElementById('nav-toggle-btn');
  const nav = document.querySelector('header nav');

  if (!toggleBtn || !nav) return;

  toggleBtn.addEventListener('click', function () {
    nav.classList.toggle('nav-open');
  });
}

function initNavIcons() {
  const icons = {
    '🏠': 'bi-house-door-fill',
    '🧺': 'bi-basket2-fill',
    '👥': 'bi-people-fill',
    '🧾': 'bi-receipt-cutoff',
    '🔐': 'bi-shield-lock-fill',
    '➕': 'bi-plus-circle-fill',
    '↪': 'bi-box-arrow-right'
  };

  document.querySelectorAll('.nav-icon').forEach(function (icon) {
    const iconClass = icons[icon.textContent.trim()];

    if (!iconClass) return;

    icon.className = `bi ${iconClass} nav-icon`;
    icon.textContent = '';
    icon.setAttribute('aria-hidden', 'true');
  });
}

function initAuthLink() {
  const authLink = document.querySelector('.login-nav-link');
  const isLoggedIn = localStorage.getItem('laundryLoggedIn') === 'true';

  if (!authLink || !isLoggedIn) return;

  const username = localStorage.getItem('laundryUsername') || 'Pengguna';
  authLink.innerHTML = '<i class="bi bi-box-arrow-right nav-icon" aria-hidden="true"></i>Logout';
  authLink.setAttribute('aria-label', `Logout dari akun ${username}`);

  authLink.addEventListener('click', function (event) {
    event.preventDefault();
    localStorage.removeItem('laundryLoggedIn');
    localStorage.removeItem('laundryUsername');
    window.location.href = authLink.href;
  });
}

function initHapusConfirm() {
  document.addEventListener('click', function (event) {
    const button = event.target.closest('.btn-hapus');

    if (!button) return;

    const konfirmasi = confirm('Apakah Anda yakin ingin menghapus data ini?');

    if (konfirmasi) {
      const baris = button.closest('tr');
      if (baris) baris.remove();
    }
  });
}

function initTableFilter() {
  const searchBoxes = document.querySelectorAll('.search-box');

  searchBoxes.forEach(function (searchBox) {
    if (!searchBox.dataset.target) return;

    searchBox.addEventListener('keyup', function () {
      const keyword = searchBox.value.toLowerCase();
      const table = document.querySelector(searchBox.dataset.target);

      if (!table) return;

      const rows = table.querySelectorAll('tbody tr');

      rows.forEach(function (row) {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(keyword) ? '' : 'none';
      });
    });
  });
}

function tampilkanError(input, pesan) {
  hapusError(input);

  const span = document.createElement('span');
  span.className = 'error';
  span.textContent = pesan;
  input.insertAdjacentElement('afterend', span);
}

function hapusError(input) {
  const next = input.nextElementSibling;
  if (next && next.classList.contains('error')) {
    next.remove();
  }
}

function initValidasiForm() {
  const form = document.getElementById('form-tambah');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    let valid = true;

    const nama = form.querySelector("[name='nama'], [name='nama_paket']");
    if (nama && nama.value.trim() === '') {
      tampilkanError(nama, 'Field ini wajib diisi.');
      valid = false;
    } else if (nama) {
      hapusError(nama);
    }

    const jenis = form.querySelector("[name='jenis']");
    if (jenis) {
      if (jenis.value.trim() === '') {
        tampilkanError(jenis, 'Jenis laundry wajib diisi.');
        valid = false;
      } else {
        hapusError(jenis);
      }
    }

    const harga = form.querySelector("[name='harga']");
    if (harga) {
      const nilaiHarga = Number(harga.value);
      if (Number.isNaN(nilaiHarga) || nilaiHarga < 0) {
        tampilkanError(harga, 'Harga harus berupa angka valid.');
        valid = false;
      } else {
        hapusError(harga);
      }
    }

    if (!valid) {
      e.preventDefault();
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  initNavToggle();
  initNavIcons();
  initAuthLink();
  initHapusConfirm();
  initTableFilter();
  initValidasiForm();
});
