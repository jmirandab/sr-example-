import React, { useState } from 'react';
import CustomSelect from '../CustomSelect/CustomSelect';
import { useI18n } from '../../../i18n';

const BookingForm = ({ appState }) => {
    const { t } = useI18n();
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        nombre: '',
        nuevoPassword: ''
    });

    // Generate province options from translations
    const provinceOptions = [
        { value: '', label: t('provinces.default') },
        { value: 'san-jose', label: t('provinces.san-jose') },
        { value: 'alajuela', label: t('provinces.alajuela') },
        { value: 'cartago', label: t('provinces.cartago') },
        { value: 'heredia', label: t('provinces.heredia') },
        { value: 'guanacaste', label: t('provinces.guanacaste') },
        { value: 'puntarenas', label: t('provinces.puntarenas') },
        { value: 'limon', label: t('provinces.limon') }
    ];

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        
        // Validate nombre
        if (!formData.nombre) {
            newErrors.nombre = t('common.required');
        } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]{4}$/.test(formData.nombre)) {
            newErrors.nombre = t('form.nameErrorAccessible');
        }

        // Validate password
        if (!formData.nuevoPassword) {
            newErrors.password = t('common.required');
        } else if (!validatePassword(formData.nuevoPassword)) {
            newErrors.password = t('form.passwordErrorAccessible');
        }

        // Validate province
        if (!appState.selectedProvince) {
            newErrors.provincia = t('form.provinceErrorAccessible');
        }

        // Validate date
        if (!appState.selectedDate) {
            newErrors.fecha = t('form.dateErrorAccessible');
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validatePassword = (password) => {
        if (password.length < 3) return false;
        
        const firstThree = password.substring(0, 3);
        if (!/^\d{3}$/.test(firstThree)) return false;
        
        const num1 = parseInt(firstThree[0]);
        const num2 = parseInt(firstThree[1]);
        const num3 = parseInt(firstThree[2]);
        
        return (num2 === num1 + 1 && num3 === num2 + 1) || 
               (num2 === num1 - 1 && num3 === num2 - 1);
    };

    const handleSubmit = (e) => {
        if (!validateForm()) {
            e.preventDefault();
        }
        // Native form submission will handle the rest
    };

    return (
        <form className="form-container" action={window.location.pathname} method="get" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="nombre" className="form-label">{t('form.name')}</label>
                <input 
                    type="text" 
                    id="nombre" 
                    autocomplete="name"
                    name="nombre"
                    className={`form-input ${errors.nombre ? 'error' : ''}`}
                    value={formData.nombre}
                    onChange={(e) => handleInputChange('nombre', e.target.value)}
                    aria-describedby="errorNombre"
                    aria-invalid={!!errors.nombre}
                    required
                />
                <span className="input-hint">{t('form.nameHint')}</span>
                <span className="error-message" id="errorNombre" role="alert">{errors.nombre || ''}</span>
            </div>

            <div className="form-group">
                <label htmlFor="nuevoPassword" className="form-label">{t('form.password')}</label>
                <input 
                    type="password"
                    id="nuevoPassword"
                    name="nuevoPassword" 
                    autocomplete="new-password"
                    className={`form-input ${errors.password ? 'error' : ''}`}
                    value={formData.nuevoPassword}
                    onChange={(e) => handleInputChange('nuevoPassword', e.target.value)}
                    aria-describedby="errorPassword passwordHint"
                    aria-invalid={!!errors.password}
                    required
                />
                <span className="input-hint" id="passwordHint">{t('form.passwordHint')}</span>
                <span className="error-message" id="errorPassword" role="alert">{errors.password || ''}</span>
            </div>

            <div className="form-group">
                <span className="form-label" id="provincia-label">{t('form.province')}</span>
                <CustomSelect 
                    options={provinceOptions}
                    selectedValue={appState.selectedProvince}
                    onChange={appState.updateSelectedProvince}
                    hasError={!!errors.provincia}
                />
                <span className="error-message" id="errorProvincia" role="alert">{errors.provincia || ''}</span>
            </div>
                    
            <div className="form-group">
                <label htmlFor="fecha" className="form-label">{t('form.date')}</label>
                <input 
                    type="date" 
                    id="fecha" 
                    name="fecha"
                    autocomplete="bday"
                    className={`form-input ${errors.fecha ? 'error' : ''}`}
                    value={appState.selectedDate ? appState.selectedDate.toISOString().split('T')[0] : ''}
                    onChange={(e) => {
                        const date = e.target.value ? new Date(e.target.value) : null;
                        appState.updateSelectedDate(date);
                    }}
                    aria-describedby="errorFecha"
                    required
                />
                <span className="error-message" id="errorFecha" role="alert">{errors.fecha || ''}</span>
            </div>

            <div className="form-group">
                <label htmlFor="tecnologia-asistiva" className="form-label">Tecnología asistiva</label>
                <select 
                    id="tecnologia-asistiva" 
                    name="tecnologia-asistiva" 
                    className="form-input"
                    aria-describedby="tecnologia-asistiva-hint" 
                    title="Seleccione una tecnología asistiva"
                >
                    <option value="" disabled selected>Seleccione una tecnología asistiva</option>
                    <option value="audifonos-con-audio-descriptivo">Audífonos con audio descriptivo</option>
                    <option value="audifonos-con-control-independiente">Audífonos con control independiente de efectos, diálogos y música</option>
                    <option value="transcripciones">Transcripciones en su teléfono inteligente</option>
                </select>
                <span className="input-hint" id="tecnologia-asistiva-hint">Seleccione la tecnología asistiva que necesita</span>
            </div>

            <div className="form-actions">
                <button 
                    type="submit" 
                    className="submit-button" 
                    id="submitButton"
                >
                    {t('common.submit')}
                </button>
            </div>
        </form>
    );
};

export default BookingForm;
