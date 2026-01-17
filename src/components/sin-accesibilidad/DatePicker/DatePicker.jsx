import React from 'react';
import { useI18n } from '../../../i18n';
import styles from './DatePicker.module.css';

const DatePicker = ({ 
    selectedDate, 
    currentMonth, 
    currentYear, 
    onDateSelect, 
    onNextMonth, 
    onPrevMonth,
    hasError 
}) => {
    const { t } = useI18n();

    const isDateToday = (date) => {
        const today = new Date();
        return date.getDate() === today.getDate() &&
               date.getMonth() === today.getMonth() &&
               date.getFullYear() === today.getFullYear();
    };

    const renderCalendar = () => {
        const firstDay = new Date(currentYear, currentMonth, 1);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());

        const days = [];

        // Add day headers first
        const dayHeaders = t('days.short');
        dayHeaders.forEach(day => {
            days.push(
                <div key={`header-${day}`} className={styles.dateDayHeader}>{day}</div>
            );
        });

        // Add 42 days (6 weeks)
        for (let i = 0; i < 42; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);

            const isCurrentMonth = date.getMonth() === currentMonth;
            const isSelected = selectedDate && 
                date.getDate() === selectedDate.getDate() &&
                date.getMonth() === selectedDate.getMonth() &&
                date.getFullYear() === selectedDate.getFullYear();
            
            const isToday = isDateToday(date);

            days.push(
                <div 
                    key={`day-${i}`}
                    className={`${styles.dateDay} ${!isCurrentMonth ? styles.otherMonth : ''} ${isSelected ? styles.selected : ''} ${isToday ? styles.today : ''}`}
                    onClick={() => isCurrentMonth && onDateSelect(new Date(date))}
                >
                    {date.getDate()}
                </div>
            );
        }
        return days;
    };

    return (
        <div className={`${styles.datePicker} ${hasError ? styles.error : ''}`} id="datePicker">
            <div className={styles.datePickerHeader}>
                <div className={styles.navButton} id="prevMonth" tabIndex="0" onClick={onPrevMonth}>◀</div>
                <span className={styles.monthYear} id="monthYear">
                    {t(`months.${currentMonth}`)} {currentYear}
                </span>
                <div className={styles.navButton} id="nextMonth" tabIndex="0" onClick={onNextMonth}>▶</div>
            </div>
            <div className={styles.dateGrid} id="dateGrid">
                <div className={styles.calendar}>
                    {renderCalendar()}
                </div>
            </div>
        </div>
    );
};

export default DatePicker;
