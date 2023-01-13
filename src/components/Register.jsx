import React, { useState } from 'react';
import { t } from 'i18next';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Title from './ui/Title';
import TextInput from './ui/TextInput';
import Button from './ui/Button';
import Loader from './ui/Loader';

import { register } from '../api/auth';

import {
  maxPseudoLength, maxPwdLength, minPseudoLength, minPwdLength,
} from '../constants/formsConstants';

import '../styles/components/authenticationPages.scss';

export default function Register() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({ email: null, password: null, username: null });
  const [credentials, setCredentials] = useState({ email: null, password: null, username: null });
  const [isLoading, setIsLoading] = useState(false);

  const credentialsCheck = (creds) => {
    let valid = true;
    const newErrors = { email: null, password: null, username: null };

    if (creds.password?.length < minPwdLength) {
      newErrors.password = t('errors.minLength').replace('{{minLimit}}', minPwdLength);
      valid = false;
    }
    if (creds.password?.length > maxPwdLength) {
      newErrors.password = t('errors.maxLength').replace('{{maxLimit}}', maxPwdLength);
      valid = false;
    }
    if (creds.username?.length < minPseudoLength) {
      newErrors.username = t('errors.minLength').replace('{{minLimit}}', minPseudoLength);
      valid = false;
    }
    if (creds.username?.length > maxPseudoLength) {
      newErrors.username = t('errors.maxLength').replace('{{maxLimit}}', maxPseudoLength);
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
    if (!creds.username) {
      newErrors.username = t('errors.required');
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
      register({
        email: credentials.email,
        password: credentials.password,
        username: credentials.username,
      })
        .then(() => {
          toast.success(t('register.accountCreated'));
          navigate('/login');
        })
        .catch((err) => toast.error(err.message))
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="authentication-container">
        <Title text={t('register.title')} />
        <TextInput
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          placeholder={t('register.pseudo')}
          error={errors.username}
          disabled={isLoading}
        />
        <TextInput
          value={credentials.email}
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
          placeholder={t('register.email')}
          error={errors.email}
          disabled={isLoading}
        />
        <TextInput
          type="password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          placeholder={t('register.password')}
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
              ? t('register.title')
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
          content={t('register.backToLogin')}
          clickAction={() => navigate('/login')}
        />
      </div>
    </form>
  );
}
