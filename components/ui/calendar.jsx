import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

const Calendar = React.forwardRef(({ 
  selected, 
  onSelect, 
  disabled,
  mode = 'single',
  ...props 
}, ref) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const isSelected = (date) => {
    if (!selected || !date) return false;
    if (mode === 'single') {
      return selected.toDateString() === date.toDateString();
    }
    // Add logic for range mode if needed
    return false;
  };

  const isDisabled = (date) => {
    if (!date) return true;
    if (typeof disabled === 'function') {
      return disabled(date);
    }
    return false;
  };

  const handleDateSelect = (date) => {
    if (!date || isDisabled(date)) return;
    if (onSelect) {
      onSelect(date);
    }
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const days = getDaysInMonth(currentDate);

  return (
    <View ref={ref} style={[styles.calendar, props.style]} {...props}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigateMonth(-1)} style={styles.navButton}>
          <ChevronLeft size={20} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.monthYear}>
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </Text>
        <TouchableOpacity onPress={() => navigateMonth(1)} style={styles.navButton}>
          <ChevronRight size={20} color="#374151" />
        </TouchableOpacity>
      </View>

      {/* Week days header */}
      <View style={styles.weekHeader}>
        {weekDays.map((day) => (
          <View key={day} style={styles.weekDayCell}>
            <Text style={styles.weekDayText}>{day}</Text>
          </View>
        ))}
      </View>

      {/* Calendar grid */}
      <View style={styles.grid}>
        {days.map((date, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleDateSelect(date)}
            disabled={!date || isDisabled(date)}
            style={[
              styles.dayCell,
              !date && styles.emptyCay,
              date && isSelected(date) && styles.selectedDay,
              date && isDisabled(date) && styles.disabledDay,
            ]}
            activeOpacity={0.7}
          >
            {date && (
              <Text style={[
                styles.dayText,
                isSelected(date) && styles.selectedDayText,
                isDisabled(date) && styles.disabledDayText,
              ]}>
                {date.getDate()}
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
});
Calendar.displayName = 'Calendar';

const styles = StyleSheet.create({
  calendar: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  navButton: {
    padding: 8,
    borderRadius: 4,
  },
  monthYear: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  weekHeader: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  weekDayCell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  weekDayText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  emptyCay: {
    backgroundColor: 'transparent',
  },
  selectedDay: {
    backgroundColor: '#4F7CFF',
  },
  disabledDay: {
    opacity: 0.3,
  },
  dayText: {
    fontSize: 14,
    color: '#111827',
  },
  selectedDayText: {
    color: '#ffffff',
    fontWeight: '500',
  },
  disabledDayText: {
    color: '#9CA3AF',
  },
});

export { Calendar };