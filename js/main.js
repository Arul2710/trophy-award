// ===== MAIN JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', function() {
  // ===== AOS-like Scroll Animations =====
  initScrollAnimations();

  // ===== Scroll to Top Button =====
  initScrollToTop();

  // ===== Smooth Scroll for Anchor Links =====
  initSmoothScroll();

  // ===== Counter Animation =====
  initCounters();

  // ===== FAQ Accordion =====
  initFAQ();

  // ===== Product Filter =====
  initProductFilter();

  // ===== Testimonial Slider =====
  initTestimonialSlider();

  // ===== Toast Notification System =====
  initToastSystem();
});

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('[data-aos]');

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-aos-delay') || 0;
        setTimeout(function() {
          entry.target.classList.add('aos-animate');
        }, parseInt(delay));
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(function(el) {
    observer.observe(el);
  });
}

// ===== SCROLL TO TOP =====
function initScrollToTop() {
  const scrollBtn = document.createElement('button');
  scrollBtn.className = 'scroll-top';
  scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollBtn.setAttribute('aria-label', 'Scroll to top');
  document.body.appendChild(scrollBtn);

  window.addEventListener('scroll', function() {
    if (window.scrollY > 400) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });

  scrollBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });
}

// ===== COUNTER ANIMATION =====
function initCounters() {
  const counters = document.querySelectorAll('.counter-value');

  const observerOptions = {
    threshold: 0.5
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-target'));
        const duration = 2000;
        const step = Math.ceil(target / (duration / 16));
        let current = 0;

        const timer = setInterval(function() {
          current += step;
          if (current >= target) {
            entry.target.textContent = target.toLocaleString() + (entry.target.getAttribute('data-suffix') || '');
            clearInterval(timer);
          } else {
            entry.target.textContent = current.toLocaleString() + (entry.target.getAttribute('data-suffix') || '');
          }
        }, 16);

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  counters.forEach(function(counter) {
    observer.observe(counter);
  });
}

// ===== FAQ ACCORDION =====
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(function(question) {
    question.addEventListener('click', function() {
      const item = this.parentElement;
      const isActive = item.classList.contains('active');

      // Close all
      document.querySelectorAll('.faq-item.active').forEach(function(el) {
        el.classList.remove('active');
      });

      // Open clicked
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

// ===== PRODUCT FILTER =====
function initProductFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const filterItems = document.querySelectorAll('.filter-item');

  filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');

      filterBtns.forEach(function(b) { b.classList.remove('active'); });
      this.classList.add('active');

      filterItems.forEach(function(item) {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'block';
          setTimeout(function() {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 100);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(function() {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// ===== TESTIMONIAL SLIDER =====
function initTestimonialSlider() {
  const sliders = document.querySelectorAll('.testimonial-slider');

  sliders.forEach(function(slider) {
    const slides = slider.querySelectorAll('.testimonial-slide');
    const dots = slider.querySelectorAll('.slider-dot');
    let currentIndex = 0;

    if (slides.length === 0) return;

    function showSlide(index) {
      slides.forEach(function(slide, i) {
        slide.style.display = i === index ? 'block' : 'none';
      });
      dots.forEach(function(dot, i) {
        dot.classList.toggle('active', i === index);
      });
    }

    dots.forEach(function(dot, i) {
      dot.addEventListener('click', function() {
        currentIndex = i;
        showSlide(currentIndex);
      });
    });

    // Auto slide
    if (slides.length > 1) {
      setInterval(function() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
      }, 5000);
    }

    showSlide(0);
  });
}

// ===== TOAST SYSTEM =====
function initToastSystem() {
  const container = document.createElement('div');
  container.className = 'toast-container';
  container.id = 'toastContainer';
  document.body.appendChild(container);
}

function showToast(message, type, duration) {
  type = type || 'info';
  duration = duration || 3000;

  const container = document.getElementById('toastContainer');
  if (!container) return;

  const icons = {
    success: 'fa-check-circle',
    error: 'fa-times-circle',
    info: 'fa-info-circle'
  };

  const toast = document.createElement('div');
  toast.className = 'toast toast-' + type;
  toast.innerHTML = '<i class="fas ' + (icons[type] || icons.info) + '"></i> ' + message;

  container.appendChild(toast);

  setTimeout(function() {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(function() {
      toast.remove();
    }, 300);
  }, duration);
}

// ===== SEARCH FUNCTIONALITY =====
function filterProducts() {
  const searchInput = document.getElementById('productSearch');
  if (!searchInput) return;

  searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase().trim();
    const items = document.querySelectorAll('.filter-item');

    items.forEach(function(item) {
      const title = item.querySelector('h3')?.textContent?.toLowerCase() || '';
      const desc = item.querySelector('p')?.textContent?.toLowerCase() || '';

      if (title.includes(query) || desc.includes(query) || query === '') {
        item.style.display = 'block';
        setTimeout(function() {
          item.style.opacity = '1';
        }, 100);
      } else {
        item.style.display = 'none';
      }
    });
  });
}

// ===== DASHBOARD CHART SIMULATION =====
function initDashboardCharts() {
  const charts = document.querySelectorAll('.chart-bar');

  charts.forEach(function(chart) {
    const bars = chart.querySelectorAll('.bar');
    bars.forEach(function(bar, index) {
      const height = parseInt(bar.getAttribute('data-height')) || 30;
      setTimeout(function() {
        bar.style.height = height + '%';
      }, index * 100);
    });
  });
}

// Call these on page specific load
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('productSearch')) {
    filterProducts();
  }
  if (document.querySelector('.chart-bar')) {
    // Charts will animate only when visible
    const chartObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          initDashboardCharts();
          chartObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('.chart-bar').forEach(function(chart) {
      chartObserver.observe(chart);
    });
  }
});
