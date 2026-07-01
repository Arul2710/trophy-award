document.addEventListener('DOMContentLoaded', function() {
  const navbarHTML = `
  <nav class="main-navbar" id="mainNavbar">
    <div class="nav-container">
      <a href="index.html" class="nav-logo">
        <img src="img/nav-logo.svg" alt="TrophyCraft" style="height: 38px; width: auto; display: block;">
      </a>

      <button class="mobile-toggle" id="mobileToggle" aria-label="Toggle menu">
        <i class="fas fa-bars"></i>
      </button>

      <ul class="nav-links" id="navLinks">
        <li class="nav-dropdown">
          <a href="#"><span>Home</span> <i class="fas fa-chevron-down dropdown-arrow"></i></a>
          <div class="dropdown-menu">
            <a href="index.html">Home 1</a>
            <a href="home2.html">Home 2</a>
          </div>
        </li>
        <li><a href="about.html">About</a></li>
        <li><a href="products.html">Products</a></li>
        <li><a href="services.html">Services</a></li>
        <li><a href="pricing.html">Pricing</a></li>
        <li><a href="contact.html">Contact</a></li>
        <li class="nav-dropdown">
          <a href="#"><span>Dashboard</span> <i class="fas fa-chevron-down dropdown-arrow"></i></a>
          <div class="dropdown-menu">
            <a href="admin.html">Admin Dashboard</a>
            <a href="user-dashboard.html">User Dashboard</a>
          </div>
        </li>
        <li class="mobile-divider" role="separator"></li>
        <li class="mobile-only">
          <a href="#" id="mobileDarkToggle" class="mobile-nav-link"><i class="fas fa-moon"></i> <span id="mobileDarkText">Dark Mode</span></a>
        </li>
        <li class="mobile-only">
          <a href="#" id="mobileRtlToggle" class="mobile-nav-link"><i class="fas fa-exchange-alt"></i> <span id="mobileRtlText">RTL</span></a>
        </li>
        <li class="mobile-only">
          <a href="login.html" class="mobile-nav-link"><i class="fas fa-sign-in-alt"></i> Login</a>
        </li>
        <li class="mobile-only">
          <a href="signup.html" class="mobile-nav-link"><i class="fas fa-user-plus"></i> Sign Up</a>
        </li>
      </ul>

      <div class="nav-actions">
        <button class="icon-btn" id="darkModeToggle" aria-label="Toggle dark mode">
          <i class="fas fa-moon"></i>
        </button>
        <button class="icon-btn" id="rtlToggle" aria-label="Toggle RTL layout">
          <i class="fas fa-exchange-alt"></i>
        </button>
        <a href="login.html" class="nav-btn nav-btn-outline"><i class="fas fa-sign-in-alt"></i> <span>Login</span></a>
        <a href="signup.html" class="nav-btn nav-btn-primary"><i class="fas fa-user-plus"></i> <span>Sign Up</span></a>
      </div>
    </div>
  </nav>
  `;

  const placeholder = document.getElementById('navbar-placeholder');
  if (placeholder) {
    placeholder.insertAdjacentHTML('afterend', navbarHTML);
    placeholder.remove();
  } else {
    document.body.insertAdjacentHTML('afterbegin', navbarHTML);
  }

  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  const body = document.body;

  if (mobileToggle) {
    mobileToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      const icon = this.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.className = 'fas fa-times';
        body.style.overflow = 'hidden';
      } else {
        icon.className = 'fas fa-bars';
        body.style.overflow = '';
      }
    });
  }

  initDropdowns();
  initMobileNav();
  initScrollEffect();
  initActiveLink();

  initDarkMode();
  initRtlMode();
});

function initDropdowns() {
  const isDesktop = function() { return window.innerWidth > 1024; };
  const dropdowns = document.querySelectorAll('.nav-dropdown');

  dropdowns.forEach(function(dd) {
    const link = dd.querySelector('a');
    const menu = dd.querySelector('.dropdown-menu');
    let hoverTimer = null;
    let leaveTimer = null;

    function openDropdown() {
      clearTimeout(leaveTimer);
      dd.classList.add('dropdown-open');
      if (menu) menu.classList.add('open');
    }

    function closeDropdown() {
      clearTimeout(hoverTimer);
      dd.classList.remove('dropdown-open');
      if (menu) menu.classList.remove('open');
    }

    function closeWithDelay() {
      leaveTimer = setTimeout(function() {
        closeDropdown();
      }, 150);
    }

    if (isDesktop()) {
      dd.addEventListener('mouseenter', function() {
        clearTimeout(leaveTimer);
        hoverTimer = setTimeout(function() {
          openDropdown();
        }, 80);
      });

      dd.addEventListener('mouseleave', function() {
        closeWithDelay();
      });

      if (menu) {
        menu.addEventListener('mouseenter', function() {
          clearTimeout(leaveTimer);
        });
        menu.addEventListener('mouseleave', function() {
          closeWithDelay();
        });
      }

      if (link) {
        link.addEventListener('click', function(e) {
          if (isDesktop()) {
            e.preventDefault();
          }
        });
      }
    }

    if (link) {
      link.addEventListener('click', function(e) {
        if (!isDesktop()) {
          e.preventDefault();
          const isOpen = dd.classList.contains('dropdown-open');
          dropdowns.forEach(function(other) {
            if (other !== dd) {
              other.classList.remove('dropdown-open');
              const otherMenu = other.querySelector('.dropdown-menu');
              if (otherMenu) otherMenu.classList.remove('open');
            }
          });
          if (isOpen) {
            closeDropdown();
          } else {
            openDropdown();
          }
        }
      });
    }
  });
}

function initMobileNav() {
  const navLinks = document.getElementById('navLinks');
  const mobileToggle = document.getElementById('mobileToggle');
  const body = document.body;

  document.querySelectorAll('.nav-links > li > a').forEach(function(link) {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 1024 && !this.closest('.nav-dropdown')) {
        navLinks.classList.remove('active');
        if (mobileToggle) {
          const icon = mobileToggle.querySelector('i');
          if (icon) icon.className = 'fas fa-bars';
        }
        body.style.overflow = '';
      }
    });
  });
}

function initScrollEffect() {
  window.addEventListener('scroll', function() {
    const navbar = document.getElementById('mainNavbar');
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  });
}

function initActiveLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function(link) {
    const href = link.getAttribute('href');
    if (href === currentPath && !href.startsWith('#')) {
      link.classList.add('active');
    }
  });
}

function initDarkMode() {
  const toggle = document.getElementById('darkModeToggle');
  const mobileToggle = document.getElementById('mobileDarkToggle');
  const mobileText = document.getElementById('mobileDarkText');
  const savedTheme = localStorage.getItem('trophyTheme');

  function applyTheme(isDark) {
    if (isDark) {
      document.body.classList.add('dark');
      if (toggle) toggle.innerHTML = '<i class="fas fa-sun"></i>';
      if (mobileToggle) mobileToggle.querySelector('i').className = 'fas fa-sun';
      if (mobileText) mobileText.textContent = 'Light Mode';
    } else {
      document.body.classList.remove('dark');
      if (toggle) toggle.innerHTML = '<i class="fas fa-moon"></i>';
      if (mobileToggle) mobileToggle.querySelector('i').className = 'fas fa-moon';
      if (mobileText) mobileText.textContent = 'Dark Mode';
    }
  }

  if (savedTheme === 'dark') {
    applyTheme(true);
  }

  function toggleTheme() {
    const isDark = !document.body.classList.contains('dark');
    applyTheme(isDark);
    localStorage.setItem('trophyTheme', isDark ? 'dark' : 'light');
  }

  if (toggle) {
    toggle.addEventListener('click', toggleTheme);
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', function(e) {
      e.preventDefault();
      toggleTheme();
    });
  }
}

function initRtlMode() {
  const toggle = document.getElementById('rtlToggle');
  const mobileToggle = document.getElementById('mobileRtlToggle');
  const mobileText = document.getElementById('mobileRtlText');
  const html = document.documentElement;
  const savedDir = localStorage.getItem('trophyDir');

  function applyDir(isRtl) {
    if (isRtl) {
      html.setAttribute('dir', 'rtl');
      html.setAttribute('lang', 'ar');
      if (mobileText) mobileText.textContent = 'LTR';
    } else {
      html.setAttribute('dir', 'ltr');
      html.setAttribute('lang', 'en');
      if (mobileText) mobileText.textContent = 'RTL';
    }
  }

  if (savedDir === 'rtl') {
    applyDir(true);
  }

  function toggleDir() {
    const isRtl = html.getAttribute('dir') === 'rtl';
    applyDir(!isRtl);
    localStorage.setItem('trophyDir', isRtl ? 'ltr' : 'rtl');
  }

  if (toggle) {
    toggle.addEventListener('click', toggleDir);
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', function(e) {
      e.preventDefault();
      toggleDir();
    });
  }
}
