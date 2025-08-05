import React, { useState, useRef } from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

const Carousel = React.forwardRef(({ 
  children, 
  showArrows = true,
  autoPlay = false,
  autoPlayInterval = 3000,
  ...props 
}, ref) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null);
  const screenWidth = Dimensions.get('window').width;

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / screenWidth);
    setCurrentIndex(index);
  };

  const scrollToIndex = (index) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: index * screenWidth, animated: true });
    }
  };

  const goToPrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : React.Children.count(children) - 1;
    scrollToIndex(newIndex);
  };

  const goToNext = () => {
    const newIndex = currentIndex < React.Children.count(children) - 1 ? currentIndex + 1 : 0;
    scrollToIndex(newIndex);
  };

  return (
    <View ref={ref} style={[styles.carousel, props.style]} {...props}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        style={styles.scrollView}
      >
        {React.Children.map(children, (child, index) => (
          <View key={index} style={[styles.slide, { width: screenWidth }]}>
            {child}
          </View>
        ))}
      </ScrollView>

      {showArrows && (
        <>
          <TouchableOpacity onPress={goToPrevious} style={[styles.arrow, styles.leftArrow]}>
            <ChevronLeft size={24} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={goToNext} style={[styles.arrow, styles.rightArrow]}>
            <ChevronRight size={24} color="#ffffff" />
          </TouchableOpacity>
        </>
      )}

      {/* Dots indicator */}
      <View style={styles.dotsContainer}>
        {React.Children.map(children, (_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => scrollToIndex(index)}
            style={[
              styles.dot,
              index === currentIndex && styles.activeDot
            ]}
          />
        ))}
      </View>
    </View>
  );
});
Carousel.displayName = 'Carousel';

const CarouselContent = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <View ref={ref} style={[styles.content, props.style]} {...props}>
      {children}
    </View>
  );
});
CarouselContent.displayName = 'CarouselContent';

const CarouselItem = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <View ref={ref} style={[styles.item, props.style]} {...props}>
      {children}
    </View>
  );
});
CarouselItem.displayName = 'CarouselItem';

const styles = StyleSheet.create({
  carousel: {
    position: 'relative',
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    flex: 1,
  },
  arrow: {
    position: 'absolute',
    top: '50%',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  leftArrow: {
    left: 10,
    marginTop: -20,
  },
  rightArrow: {
    right: 10,
    marginTop: -20,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D1D5DB',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#4F7CFF',
  },
  content: {
    flex: 1,
  },
  item: {
    flex: 1,
  },
});

export { Carousel, CarouselContent, CarouselItem };