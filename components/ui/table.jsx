import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';

const Table = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <ScrollView
      ref={ref}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={[styles.tableContainer, props.style]}
      {...props}
    >
      <View style={styles.table}>
        {children}
      </View>
    </ScrollView>
  );
});
Table.displayName = 'Table';

const TableHeader = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <View
      ref={ref}
      style={[styles.tableHeader, props.style]}
      {...props}
    >
      {children}
    </View>
  );
});
TableHeader.displayName = 'TableHeader';

const TableBody = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <View
      ref={ref}
      style={[styles.tableBody, props.style]}
      {...props}
    >
      {children}
    </View>
  );
});
TableBody.displayName = 'TableBody';

const TableRow = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <View
      ref={ref}
      style={[styles.tableRow, props.style]}
      {...props}
    >
      {children}
    </View>
  );
});
TableRow.displayName = 'TableRow';

const TableHead = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <View
      ref={ref}
      style={[styles.tableHead, props.style]}
      {...props}
    >
      <Text style={styles.tableHeadText}>
        {children}
      </Text>
    </View>
  );
});
TableHead.displayName = 'TableHead';

const TableCell = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <View
      ref={ref}
      style={[styles.tableCell, props.style]}
      {...props}
    >
      <Text style={styles.tableCellText}>
        {children}
      </Text>
    </View>
  );
});
TableCell.displayName = 'TableCell';

const TableCaption = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <View
      ref={ref}
      style={[styles.tableCaption, props.style]}
      {...props}
    >
      <Text style={styles.tableCaptionText}>
        {children}
      </Text>
    </View>
  );
});
TableCaption.displayName = 'TableCaption';

const styles = StyleSheet.create({
  tableContainer: {
    width: '100%',
  },
  table: {
    minWidth: '100%',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 6,
    overflow: 'hidden',
  },
  tableHeader: {
    backgroundColor: '#F9FAFB',
  },
  tableBody: {
    backgroundColor: '#ffffff',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tableHead: {
    padding: 12,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
  },
  tableHeadText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    textTransform: 'uppercase',
  },
  tableCell: {
    padding: 12,
    flex: 1,
    justifyContent: 'center',
  },
  tableCellText: {
    fontSize: 14,
    color: '#111827',
  },
  tableCaption: {
    padding: 8,
    alignItems: 'center',
  },
  tableCaptionText: {
    fontSize: 12,
    color: '#6B7280',
  },
});

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption };