import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaUserCircle, FaShoppingCart, FaVideo } from 'react-icons/fa';
import api from '../api/axios';

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // store user info
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    // Fetch logged-in user info
    api.get('/api/auth/me', { withCredentials: true })
      .then(res => setUser(res.data.user))
      .catch(() => setUser(null));
  }, []);

  const handleSignOut = async () => {
    try {
      await api.post('/api/auth/logout', {}, { withCredentials: true });
      setUser(null);
      navigate('/user/login');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <FaHome size={24} style={styles.icon} onClick={() => navigate('/')} />
        <FaVideo size={24} style={styles.icon} onClick={() => navigate('/home')} />
        <FaShoppingCart size={24} style={styles.icon} onClick={() => navigate('/cart')} />
      </div>

      <input
        type="text"
        placeholder="Search for dishes, restaurants..."
        style={styles.search}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            navigate(`/search?q=${e.target.value}`);
          }
        }}
      />

      <div style={styles.right}>
        {user ? (
          <div style={{ position: 'relative' }}>
            <FaUserCircle size={28} style={styles.icon} onClick={() => setDropdown(!dropdown)} />
            {dropdown && (
              <div style={styles.dropdown}>
                <p style={styles.dropdownItem}>Logged in as: {user.name} ({user.role})</p>
                <p
                  style={styles.dropdownItem}
                  onClick={() => navigate('/orders')}
                >
                  Orders
                </p>
                <p style={styles.dropdownItem} onClick={handleSignOut}>Sign Out</p>
              </div>
            )}
          </div>
        ) : (
          <Link to="/user/login" style={styles.loginBtn}>Login</Link>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 25px',
    background: '#fff',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  left: { display: 'flex', gap: '20px', alignItems: 'center' },
  right: { display: 'flex', alignItems: 'center', gap: '15px' },
  search: { flex: 1, margin: '0 20px', padding: '8px 12px', borderRadius: '8px', border: '1px solid #ccc' },
  icon: { cursor: 'pointer', color: '#333' },
  loginBtn: { background: '#e23744', color: '#fff', padding: '6px 16px', borderRadius: '8px', textDecoration: 'none' },
  dropdown: {
    position: 'absolute',
    right: 0,
    top: '36px',
    background: '#fff',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    borderRadius: '10px',
    overflow: 'hidden',
    minWidth: '180px',
    zIndex: 200
  },
  dropdownItem: {
    padding: '10px 15px',
    cursor: 'pointer',
    borderBottom: '1px solid #eee'
  }
};

export default Navbar;
