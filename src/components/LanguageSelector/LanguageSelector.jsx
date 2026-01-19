import React from 'react';
import { useI18n } from '../../i18n';
import styles from './LanguageSelector.module.css';

const LanguageSelector = () => {
  const { language, setLanguage, t } = useI18n();

  return (
    <div className={styles.languageSelector}>
      <label htmlFor="language-select" className={styles.label}>
        {t('language.select')}:
      </label>
      <select
        id="language-select"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className={styles.select}
        aria-label={t('language.select')}
      >
        <option value="es">{t('language.spanish')}</option>
        <option value="en">{t('language.english')}</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
