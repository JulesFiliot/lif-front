import React, { useState } from 'react';
import { t } from 'i18next';
import Title from './ui/Title';
import TextInput from './ui/TextInput';

import '../styles/components/authenticationPages.scss';
import Button from './ui/Button';
import { maxPwdLength, minPwdLength } from '../utils/formsConstants';

export default function Login() {
  const [errors, setErrors] = useState({ email: null, password: null });
  const credentials = { email: null, password: null };

  const credentialsCheck = (creds) => {
    let valid = true;
    const newErrors = { email: null, password: null };

    if (!creds.email || !creds.password) {
      newErrors.email = t('errors.required');
      newErrors.password = t('errors.required');
      valid = false;
    }
    if (creds.password?.length < minPwdLength) {
      newErrors.password = t('errors.minLength').replace('{{minLimit}}', minPwdLength);
      valid = false;
    }
    if (creds.password?.length > maxPwdLength) {
      newErrors.password = t('errors.maxLength').replace('{{maxLimit}}', maxPwdLength);
      valid = false;
    }
    setErrors(newErrors);
    if (!valid) return false;
    return true;
  };

  return (
    <div className="authentication-container">
      <Title text={t('login.title')} />
      <TextInput
        onChange={(e) => { credentials.email = e.target.value; }}
        placeholder={t('login.email')}
        error={errors.email}
      />
      <TextInput
        type="password"
        onChange={(e) => { credentials.password = e.target.value; }}
        placeholder={t('login.password')}
        error={errors.password}
      />
      <Button
        style={{ marginTop: '5px' }}
        primary
        text={t('login.title')}
        clickAction={() => {
          console.log({ credentials });
          const check = credentialsCheck(credentials);
          console.log({ check });
        }}
      />
    </div>
  );
}
