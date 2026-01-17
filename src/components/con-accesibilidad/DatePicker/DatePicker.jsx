import React, { useRef } from 'react';
import { monthNames } from '../../../utils/constants';
import styles from './DatePicker.module.css';

const DatePicker = ({ 
    selectedDate, 
    currentMonth, 
    currentYear, 
    onDateSelect, 
    onNextMonth, 
    onPrevMonth,
    hasError,
    labelledBy,
    ...props
}) => {
    const calendarRef = useRef(null);
    
    const handleKeyDown = (e, date) => {
        const key = e.key;
        e.preventDefault();
        
        const currentDate = date ? new Date(date) : selectedDate || new Date(currentYear, currentMonth, 1);
        let newDate = new Date(currentDate);
        
        switch (key) {
            case 'ArrowRight':
                newDate.setDate(currentDate.getDate() + 1);
                break;
            case 'ArrowLeft':
                newDate.setDate(currentDate.getDate() - 1);
                break;
            case 'ArrowUp':
                newDate.setDate(currentDate.getDate() - 7);
                break;
            case 'ArrowDown':
                newDate.setDate(currentDate.getDate() + 7);
                break;
            case 'Home':
                newDate.setDate(1);
                break;
            case 'End':
                newDate = new Date(currentYear, currentMonth + 1, 0);
                break;
            case 'PageUp':
                newDate.setMonth(currentDate.getMonth() - 1);
                break;
            case 'PageDown':
                newDate.setMonth(currentDate.getMonth() + 1);
                break;
            case 'Enter':
            case ' ':
                onDateSelect(date);
                return;
            default:
                return;
        }
        
        // Check if we need to change month
        if (newDate.getMonth() !== currentMonth) {
            if (newDate.getMonth() < currentMonth || (newDate.getMonth() === 11 && currentMonth === 0)) {
                onPrevMonth();
            } else {
                onNextMonth();
            }
        }
        
        onDateSelect(newDate);
    };

    const renderCalendar = () => {
        const firstDay = new Date(currentYear, currentMonth, 1);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());

        const days = [];

        // Add day headers first
        const dayHeaders = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
        dayHeaders.forEach((day, index) => {
            days.push(
                <div key={`header-${day}`} className={styles.dateDayHeader} role="columnheader" aria-label={getFullDayName(index)}>
                    {day}
                </div>
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
                    role="gridcell"
                    tabIndex={isCurrentMonth ? 0 : -1}
                    aria-selected={isSelected}
                    aria-label={formatDateForAria(date)}
                    aria-disabled={!isCurrentMonth}
                    onKeyDown={(e) => isCurrentMonth && handleKeyDown(e, date)}
                >
                    {date.getDate()}
                </div>
            );
        }
        return days;
    };

    const getFullDayName = (index) => {
        const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        return days[index];
    };
    
    const isDateToday = (date) => {
        const today = new Date();
        return date.getDate() === today.getDate() &&
               date.getMonth() === today.getMonth() &&
               date.getFullYear() === today.getFullYear();
    };
    
    const formatDateForAria = (date) => {
        const fullMonths = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
        
        const day = date.getDate();
        const month = fullMonths[date.getMonth()];
        const year = date.getFullYear();
        const isOtherMonth = date.getMonth() !== currentMonth;
        
        let label = `${day} de ${month} de ${year}`;
        if (isOtherMonth) {
            label += " (mes diferente)";
        }
        if (isDateToday(date)) {
            label += " (hoy)";
        }
        
        return label;
    };

    const handleNavKeyDown = (e, action) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            action();
        }
    };

    return (
        <div 
            className={`${styles.datePicker} ${hasError ? styles.error : ''}`} 
            id="datePicker"
            ref={calendarRef}
            role="application"
            aria-labelledby={labelledBy}
            {...props}
        >
            <div className={styles.datePickerHeader} role="heading" aria-level="2">
                <div 
                    className={styles.navButton} 
                    id="prevMonth" 
                    tabIndex="0" 
                    onClick={onPrevMonth}
                    onKeyDown={(e) => handleNavKeyDown(e, onPrevMonth)}
                    role="button"
                    aria-label={`Mes anterior (${monthNames[currentMonth === 0 ? 11 : currentMonth - 1]})`}
                >◀</div>
                <span className={styles.monthYear} id="monthYear">
                    {monthNames[currentMonth]} {currentYear}
                </span>
                <div 
                    className={styles.navButton} 
                    id="nextMonth" 
                    tabIndex="0" 
                    onClick={onNextMonth}
                    onKeyDown={(e) => handleNavKeyDown(e, onNextMonth)}
                    role="button"
                    aria-label={`Mes siguiente (${monthNames[currentMonth === 11 ? 0 : currentMonth + 1]})`}
                >▶</div>
            </div>
            <div 
                className={styles.dateGrid} 
                id="dateGrid"
                role="grid"
                aria-labelledby="monthYear"
            >
                <div className={styles.calendar}>
                    {renderCalendar()}
                </div>
            </div>
        </div>
    );
};

export default DatePicker;
