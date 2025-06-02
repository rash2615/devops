import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <nav style={{
      width: '200px',
      height: '100vh',
      backgroundColor: '#f0f0f0',
      padding: '20px'
    }}>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={{ marginBottom: '10px' }}>
          <Link to="/">Accueil</Link>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <Link to="/about">À propos</Link>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar; 