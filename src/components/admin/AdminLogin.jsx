import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User } from 'lucide-react';
import { loginAdmin } from '../../utils/storage';

export default function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (loginAdmin(username, password)) {
      onLogin?.();
      navigate('/portal-privado-dani/dashboard');
    } else {
      setError('Credenciales incorrectas. Intente de nuevo.');
    }
  };

  return (
    <div className="admin-login" id="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-logo">
          <div className="admin-login-logo-icon" style={{ fontSize: '1rem', fontWeight: 800 }}>PDC</div>
          <h1 className="admin-login-title">Panel Admin</h1>
          <p className="admin-login-subtitle">Persianas &amp; Cortinas Dany</p>
        </div>

        {error && <div className="admin-login-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="admin-user">
              <User size={14} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} />
              Usuario
            </label>
            <input
              id="admin-user"
              className="form-input"
              type="text"
              placeholder="admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="admin-pass">
              <Lock size={14} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} />
              Contraseña
            </label>
            <input
              id="admin-pass"
              className="form-input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center', marginTop: 'var(--space-2)' }}>
            <Lock size={18} />
            Iniciar Sesión
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 'var(--space-5)', fontSize: 'var(--text-xs)', color: 'var(--color-gray-400)' }}>
          Demo: usuario <strong>admin</strong> / contraseña <strong>admin123</strong>
        </p>
      </div>
    </div>
  );
}
