import React, { useState } from 'react';
import { t } from 'i18next';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Title from './ui/Title';
import TextInput from './ui/TextInput';
import Button from './ui/Button';
import Loader from './ui/Loader';

import { login } from '../api/auth';

import { maxPwdLength, minPwdLength } from '../constants/formsConstants';
import lifLogo from '../assets/lif_logo.png';

import '../styles/components/authenticationPages.scss';
import { SET_USER } from '../core/reducer/user/userActions';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({ email: null, password: null });
  const [credentials, setCredentials] = useState({ email: null, password: null });
  const [isLoading, setIsLoading] = useState(false);

  const credentialsCheck = (creds) => {
    let valid = true;
    const newErrors = { email: null, password: null };

    if (creds.password?.length < minPwdLength) {
      newErrors.password = t('errors.minLength').replace('{{minLimit}}', minPwdLength);
      valid = false;
    }
    if (creds.password?.length > maxPwdLength) {
      newErrors.password = t('errors.maxLength').replace('{{maxLimit}}', maxPwdLength);
      valid = false;
    }
    if (!creds.email) {
      newErrors.email = t('errors.required');
      valid = false;
    }
    if (!creds.password) {
      newErrors.password = t('errors.required');
      valid = false;
    }
    setErrors(newErrors);
    if (!valid) return false;
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (credentialsCheck(credentials)) {
      login({ email: credentials.email, password: credentials.password })
        .then((res) => {
          dispatch({
            type: SET_USER,
            payload: {
              email: res?.user?.email,
              id: res?.user?.id,
              username: res?.user?.username,
              bio: res?.user?.bio,
              token: res?.token,
            },
          });
          navigate('/profile');
        })
        .catch((err) => {
          if (err?.response?.status === 404) {
            toast.error(t('errors.wrongCredentials'));
          } else {
            toast.error(err.message);
          }
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="authentication-container">
        <img src={lifLogo} alt="LIF Logo" className="logo" />
        <Title text={t('login.title')} />
        <TextInput
          value={credentials.email}
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
          placeholder={t('login.email')}
          error={errors.email}
          disabled={isLoading}
        />
        <TextInput
          type="password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          placeholder={t('login.password')}
          error={errors.password}
          disabled={isLoading}
        />
        <Button
          type="submit"
          style={{ marginTop: '5px' }}
          primary
          disabled={isLoading}
          noStylingOnDisabled
          content={
            !isLoading
              ? t('login.title')
              : (
                <div
                  style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}
                >
                  <Loader />
                </div>
              )
          }
        />
        <Button
          primary
          empty
          disabled={isLoading}
          content={t('login.createAccount')}
          clickAction={() => navigate('/register')}
        />
      </div>
    </form>
  );
}
