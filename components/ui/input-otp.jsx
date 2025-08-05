import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
} from 'react-native';

const InputOTP = React.forwardRef(({ 
  maxLength = 6,
  value,
  onChange,
  disabled = false,
  ...props 
}, ref) => {
  const [otp, setOtp] = useState(value || '');
  const inputRefs = useRef([]);

  useEffect(() => {
    if (value !== undefined) {
      setOtp(value);
    }
  }, [value]);

  const handleChangeText = (text, index) => {
    const newOtp = otp.split('');
    newOtp[index] = text;
    const updatedOtp = newOtp.join('');
    
    setOtp(updatedOtp);
    if (onChange) {
      onChange(updatedOtp);
    }

    // Auto focus next input
    if (text && index < maxLength - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    // Handle backspace
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const renderInputs = () => {
    const inputs = [];
    for (let i = 0; i < maxLength; i++) {
      inputs.push(
        <TextInput
          key={i}
          ref={(el) => (inputRefs.current[i] = el)}
          value={otp[i] || ''}
          onChangeText={(text) => handleChangeText(text.slice(-1), i)}
          onKeyPress={(e) => handleKeyPress(e, i)}
          maxLength={1}
          keyboardType="numeric"
          textAlign="center"
          editable={!disabled}
          style={[
            styles.input,
            otp[i] && styles.inputFilled,
            disabled && styles.inputDisabled,
          ]}
          {...props}
        />
      );
    }
    return inputs;
  };

  return (
    <View ref={ref} style={styles.container}>
      <View style={styles.inputContainer}>
        {renderInputs()}
      </View>
    </View>
  );
});
InputOTP.displayName = 'InputOTP';

const InputOTPGroup = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <View ref={ref} style={[styles.group, props.style]} {...props}>
      {children}
    </View>
  );
});
InputOTPGroup.displayName = 'InputOTPGroup';

const InputOTPSlot = React.forwardRef(({ index, children, ...props }, ref) => {
  return (
    <View ref={ref} style={[styles.slot, props.style]} {...props}>
      <Text style={styles.slotText}>{children}</Text>
    </View>
  );
});
InputOTPSlot.displayName = 'InputOTPSlot';

const InputOTPSeparator = React.forwardRef(({ ...props }, ref) => {
  return (
    <View ref={ref} style={[styles.separator, props.style]} {...props}>
      <Text style={styles.separatorText}>-</Text>
    </View>
  );
});
InputOTPSeparator.displayName = 'InputOTPSeparator';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  input: {
    width: 48,
    height: 48,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    backgroundColor: '#ffffff',
  },
  inputFilled: {
    borderColor: '#4F7CFF',
  },
  inputDisabled: {
    backgroundColor: '#F9FAFB',
    color: '#9CA3AF',
  },
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  slot: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  slotText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  separator: {
    paddingHorizontal: 4,
  },
  separatorText: {
    fontSize: 16,
    color: '#6B7280',
  },
});

export {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
};