import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const from = location.state?.from?.pathname || '/';

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, 'Username must be at least 3 characters')
      .required('Username is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required')
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    const result = await login(values.username, values.password);
    
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setErrors({ form: result.error });
    }
    setSubmitting(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-subtitle">Sign in to your account</p>

        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors }) => (
            <Form>
              {errors.form && (
                <div className="alert alert-error">{errors.form}</div>
              )}

              <div className="form-group">
                <label htmlFor="username" className="form-label">Username</label>
                <Field 
                  type="text" 
                  name="username" 
                  id="username"
                  className={`form-input ${errors.username ? 'error' : ''}`}
                  placeholder="Enter your username"
                />
                <ErrorMessage name="username" component="div" className="form-error" />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <Field 
                  type="password" 
                  name="password" 
                  id="password"
                  className={`form-input ${errors.password ? 'error' : ''}`}
                  placeholder="Enter your password"
                />
                <ErrorMessage name="password" component="div" className="form-error" />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary btn-lg" 
                style={{ width: '100%' }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing in...' : 'Sign In'}
              </button>
            </Form>
          )}
        </Formik>

        <div className="auth-footer">
          Don't have an account? <Link to="/register">Create one</Link>
        </div>

        <div className="mt-3" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          <p><strong>Demo Accounts:</strong></p>
          <p>Admin: admin / admin123</p>
          <p>Owner: owner / owner123</p>
          <p>Tenant: tenant / tenant123 (requires verification)</p>
        </div>
      </div>
    </div>
  );
};

export default Login;

