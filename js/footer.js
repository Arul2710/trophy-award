// ===== FOOTER COMPONENT =====
document.addEventListener('DOMContentLoaded', function() {
  const footerHTML = `
  <footer class="main-footer" id="mainFooter">
    <div class="footer-grid">
      <div class="footer-col">
        <h4><a href="index.html" style="text-decoration: none;"><span style="font-weight: 800; font-size: 1.2rem; background: linear-gradient(135deg, #b8860b, #e8c25e); -webkit-background-clip: text; background-clip: text; color: transparent;">Trophy<span style="background: linear-gradient(135deg, #e8c25e, #b8860b); -webkit-background-clip: text; background-clip: text; color: transparent;">Craft</span></span></a></h4>
        <p>Your premier destination for custom trophies, awards, and engraving services. With over 20 years of excellence, we craft moments of achievement that last a lifetime.</p>
        <div class="footer-social">
          <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
          <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
          <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
          <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
          <a href="#" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
        </div>
      </div>

      <div class="footer-col">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="index.html"><i class="fas fa-chevron-right"></i> Home</a></li>
          <li><a href="about.html"><i class="fas fa-chevron-right"></i> About Us</a></li>
          <li><a href="products.html"><i class="fas fa-chevron-right"></i> Products</a></li>
          <li><a href="services.html"><i class="fas fa-chevron-right"></i> Services</a></li>
          <li><a href="pricing.html"><i class="fas fa-chevron-right"></i> Pricing</a></li>
          <li><a href="contact.html"><i class="fas fa-chevron-right"></i> Contact</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Products</h4>
        <ul>
          <li><a href="products.html"><i class="fas fa-chevron-right"></i> Sports Trophies</a></li>
          <li><a href="products.html"><i class="fas fa-chevron-right"></i> Corporate Awards</a></li>
          <li><a href="products.html"><i class="fas fa-chevron-right"></i> Crystal Awards</a></li>
          <li><a href="products.html"><i class="fas fa-chevron-right"></i> Medals & Plaques</a></li>
          <li><a href="products.html"><i class="fas fa-chevron-right"></i> Custom Badges</a></li>
          <li><a href="products.html"><i class="fas fa-chevron-right"></i> Recognition Gifts</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Services</h4>
        <ul>
          <li><a href="services.html"><i class="fas fa-chevron-right"></i> Laser Engraving</a></li>
          <li><a href="services.html"><i class="fas fa-chevron-right"></i> Trophy Engraving</a></li>
          <li><a href="services.html"><i class="fas fa-chevron-right"></i> Corporate Awards</a></li>
          <li><a href="services.html"><i class="fas fa-chevron-right"></i> Custom Design</a></li>
          <li><a href="services.html"><i class="fas fa-chevron-right"></i> Bulk Orders</a></li>
          <li><a href="services.html"><i class="fas fa-chevron-right"></i> Rush Delivery</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Contact Info</h4>
        <div class="footer-contact-item">
          <i class="fas fa-map-marker-alt"></i>
          <span>123 Trophy Avenue, Suite 100, New York, NY 10001</span>
        </div>
        <div class="footer-contact-item">
          <i class="fas fa-phone-alt"></i>
          <span>+1 (555) 123-4567</span>
        </div>
        <div class="footer-contact-item">
          <i class="fas fa-envelope"></i>
          <span>info@trophycraft.com</span>
        </div>
        <div class="footer-contact-item">
          <i class="fas fa-clock"></i>
          <span>Mon-Fri: 9:00 AM - 7:00 PM<br>Sat: 10:00 AM - 5:00 PM</span>
        </div>

        <div class="footer-newsletter" style="margin-top: 15px;">
          <h4 style="margin-bottom: 12px; font-size: 0.95rem;">Newsletter</h4>
          <form id="footerNewsletterForm">
            <input type="email" placeholder="Enter your email" required>
            <button type="submit">Subscribe</button>
          </form>
          <div class="newsletter-success" id="newsletterSuccess">Thank you for subscribing!</div>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <p>&copy; 2026 TrophyCraft. All rights reserved. | Crafted with <i class="fas fa-heart" style="color: var(--primary);"></i> for champions</p>
    </div>
  </footer>
  `;

  // Insert footer before closing body tag (or at end of body)
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    footerPlaceholder.insertAdjacentHTML('afterend', footerHTML);
    footerPlaceholder.remove();
  } else {
    document.body.insertAdjacentHTML('beforeend', footerHTML);
  }

  // Newsletter form
  const newsletterForm = document.getElementById('footerNewsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const successEl = document.getElementById('newsletterSuccess');
      if (successEl) {
        successEl.style.display = 'block';
        this.querySelector('input').value = '';
        setTimeout(function() {
          successEl.style.display = 'none';
        }, 3000);
      }
    });
  }
});
