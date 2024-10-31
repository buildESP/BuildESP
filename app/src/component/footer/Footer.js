import React from 'react';

function Footer() {
  return (
    <footer style={{ padding: '20px', textAlign: 'center', background: '#f1f1f1' }}>
      <p>© 2024 My Website. All Rights Reserved.</p>
      <p>
        <a href="/privacy-policy">Privacy Policy</a> | <a href="/terms-of-service">Terms of Service</a>
      </p>
    </footer>
  );
}

export default Footer;
