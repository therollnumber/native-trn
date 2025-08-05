import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react-native';

const Pagination = React.forwardRef(({ 
  totalPages = 1,
  currentPage = 1,
  onPageChange,
  showPrevNext = true,
  siblingCount = 1,
  ...props 
}, ref) => {
  const generatePageNumbers = () => {
    const delta = siblingCount;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, 'dots1');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('dots2', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const pageNumbers = totalPages > 1 ? generatePageNumbers() : [1];

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange?.(page);
    }
  };

  return (
    <View ref={ref} style={[styles.pagination, props.style]} {...props}>
      {/* Previous Button */}
      {showPrevNext && (
        <TouchableOpacity
          onPress={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={[
            styles.pageButton,
            styles.navButton,
            currentPage === 1 && styles.pageButtonDisabled
          ]}
          activeOpacity={0.7}
        >
          <ChevronLeft 
            size={16} 
            color={currentPage === 1 ? '#9CA3AF' : '#374151'} 
          />
          <Text style={[
            styles.navButtonText,
            currentPage === 1 && styles.pageButtonTextDisabled
          ]}>
            Previous
          </Text>
        </TouchableOpacity>
      )}

      {/* Page Numbers */}
      <View style={styles.pageNumbers}>
        {pageNumbers.map((pageNumber, index) => {
          if (pageNumber === 'dots1' || pageNumber === 'dots2') {
            return (
              <View key={pageNumber} style={styles.dotsContainer}>
                <MoreHorizontal size={16} color="#9CA3AF" />
              </View>
            );
          }

          const isActive = pageNumber === currentPage;

          return (
            <TouchableOpacity
              key={pageNumber}
              onPress={() => handlePageChange(pageNumber)}
              style={[
                styles.pageButton,
                isActive && styles.pageButtonActive
              ]}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.pageButtonText,
                isActive && styles.pageButtonTextActive
              ]}>
                {pageNumber}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Next Button */}
      {showPrevNext && (
        <TouchableOpacity
          onPress={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={[
            styles.pageButton,
            styles.navButton,
            currentPage === totalPages && styles.pageButtonDisabled
          ]}
          activeOpacity={0.7}
        >
          <Text style={[
            styles.navButtonText,
            currentPage === totalPages && styles.pageButtonTextDisabled
          ]}>
            Next
          </Text>
          <ChevronRight 
            size={16} 
            color={currentPage === totalPages ? '#9CA3AF' : '#374151'} 
          />
        </TouchableOpacity>
      )}
    </View>
  );
});
Pagination.displayName = 'Pagination';

const PaginationContent = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <View ref={ref} style={[styles.paginationContent, props.style]} {...props}>
      {children}
    </View>
  );
});
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <View ref={ref} style={[styles.paginationItem, props.style]} {...props}>
      {children}
    </View>
  );
});
PaginationItem.displayName = 'PaginationItem';

const PaginationLink = React.forwardRef(({ children, isActive, onPress, ...props }, ref) => {
  return (
    <TouchableOpacity
      ref={ref}
      onPress={onPress}
      style={[
        styles.pageButton,
        isActive && styles.pageButtonActive,
        props.style
      ]}
      activeOpacity={0.7}
      {...props}
    >
      <Text style={[
        styles.pageButtonText,
        isActive && styles.pageButtonTextActive
      ]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
});
PaginationLink.displayName = 'PaginationLink';

const PaginationPrevious = React.forwardRef(({ onPress, disabled, ...props }, ref) => {
  return (
    <TouchableOpacity
      ref={ref}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.pageButton,
        styles.navButton,
        disabled && styles.pageButtonDisabled,
        props.style
      ]}
      activeOpacity={0.7}
      {...props}
    >
      <ChevronLeft size={16} color={disabled ? '#9CA3AF' : '#374151'} />
      <Text style={[
        styles.navButtonText,
        disabled && styles.pageButtonTextDisabled
      ]}>
        Previous
      </Text>
    </TouchableOpacity>
  );
});
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = React.forwardRef(({ onPress, disabled, ...props }, ref) => {
  return (
    <TouchableOpacity
      ref={ref}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.pageButton,
        styles.navButton,
        disabled && styles.pageButtonDisabled,
        props.style
      ]}
      activeOpacity={0.7}
      {...props}
    >
      <Text style={[
        styles.navButtonText,
        disabled && styles.pageButtonTextDisabled
      ]}>
        Next
      </Text>
      <ChevronRight size={16} color={disabled ? '#9CA3AF' : '#374151'} />
    </TouchableOpacity>
  );
});
PaginationNext.displayName = 'PaginationNext';

const PaginationEllipsis = React.forwardRef(({ ...props }, ref) => {
  return (
    <View ref={ref} style={[styles.dotsContainer, props.style]} {...props}>
      <MoreHorizontal size={16} color="#9CA3AF" />
    </View>
  );
});
PaginationEllipsis.displayName = 'PaginationEllipsis';

const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  paginationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  paginationItem: {
    // Base item styles
  },
  pageNumbers: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  pageButton: {
    minWidth: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#ffffff',
  },
  pageButtonActive: {
    backgroundColor: '#4F7CFF',
    borderColor: '#4F7CFF',
  },
  pageButtonDisabled: {
    opacity: 0.5,
  },
  pageButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  pageButtonTextActive: {
    color: '#ffffff',
  },
  pageButtonTextDisabled: {
    color: '#9CA3AF',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    minWidth: 'auto',
  },
  navButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginHorizontal: 4,
  },
  dotsContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};