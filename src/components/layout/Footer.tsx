'use client';

import { useState, FormEvent } from 'react';
import { FOOTER_LINKS, SOCIAL_LINKS } from '@/lib/constants';
import styles from './Footer.module.css';

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubscribed(true);
    setEmail('');

    setTimeout(() => setIsSubscribed(false), 3000);
  }

  return (
    <footer className={styles.footer} id="footer" role="contentinfo">
      <div className={`${styles.inner} container`}>
        {/* Top section: Brand + Newsletter */}
        <div className={styles.topSection}>
          <div className={styles.brandColumn}>
            <div className={styles.logo}>
              <span className={styles.logoMark}>FC</span>
              <span className={styles.logoText}>FlowCart</span>
            </div>
            <p className={styles.tagline}>
              Curated everyday luxury. Thoughtfully designed, built to last.
            </p>
            {/* Social links */}
            <div className={styles.socialLinks}>
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={styles.socialLink}
                  aria-label={link.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SocialIcon name={link.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className={styles.linkColumns}>
            <div className={styles.linkColumn}>
              <h3 className={styles.columnTitle}>Shop</h3>
              <ul className={styles.linkList}>
                {FOOTER_LINKS.shop.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className={styles.footerLink}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.linkColumn}>
              <h3 className={styles.columnTitle}>Company</h3>
              <ul className={styles.linkList}>
                {FOOTER_LINKS.company.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className={styles.footerLink}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.linkColumn}>
              <h3 className={styles.columnTitle}>Support</h3>
              <ul className={styles.linkList}>
                {FOOTER_LINKS.support.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className={styles.footerLink}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className={styles.newsletterColumn}>
            <h3 className={styles.columnTitle}>Stay in the loop</h3>
            <p className={styles.newsletterText}>
              New arrivals, exclusive offers, and the occasional design story.
            </p>
            <form
              className={styles.newsletterForm}
              onSubmit={handleSubmit}
              noValidate
            >
              <div className={styles.inputWrapper}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className={styles.emailInput}
                  aria-label="Email address for newsletter"
                  id="newsletter-email"
                />
                <button
                  type="submit"
                  className={styles.submitButton}
                  aria-label="Subscribe to newsletter"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>
              {error && <p className={styles.errorText}>{error}</p>}
              {isSubscribed && (
                <p className={styles.successText}>Welcome aboard ✓</p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright} suppressHydrationWarning>
            © {new Date().getFullYear()} FlowCart. All rights reserved.
          </p>
          <div className={styles.legalLinks}>
            <a href="#" className={styles.legalLink}>
              Privacy Policy
            </a>
            <a href="#" className={styles.legalLink}>
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ name }: { name: string }) {
  switch (name) {
    case 'instagram':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'twitter':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 4l11.733 16h4.267l-11.733-16zM4 20l6.768-6.768M13.232 10.768L20 4" />
        </svg>
      );
    case 'pinterest':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 21l2.5-8.5M10.5 12.5a3.5 3.5 0 1 1 5 0c0 2-2.5 3-2.5 5" />
        </svg>
      );
    default:
      return null;
  }
}
