import React, { createContext, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';

const ChartContext = createContext({});

const ChartContainer = React.forwardRef(({ 
  children, 
  config = {}, 
  className,
  ...props 
}, ref) => {
  return (
    <ChartContext.Provider value={{ config }}>
      <View ref={ref} style={[styles.container, className]} {...props}>
        {children}
      </View>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = 'ChartContainer';

const ChartTooltip = React.forwardRef(({ 
  children, 
  content,
  ...props 
}, ref) => {
  if (!content) return null;
  
  return (
    <View ref={ref} style={[styles.tooltip, props.style]} {...props}>
      {typeof content === 'function' ? content() : content}
    </View>
  );
});
ChartTooltip.displayName = 'ChartTooltip';

const ChartTooltipContent = React.forwardRef(({ 
  active,
  payload,
  label,
  hideLabel = false,
  hideIndicator = false,
  indicator = 'dot',
  nameKey = 'name',
  labelKey = 'label',
  ...props 
}, ref) => {
  if (!active || !payload?.length) return null;

  return (
    <View ref={ref} style={[styles.tooltipContent, props.style]} {...props}>
      {!hideLabel && label && (
        <Text style={styles.tooltipLabel}>{label}</Text>
      )}
      {payload.map((entry, index) => (
        <View key={index} style={styles.tooltipItem}>
          {!hideIndicator && (
            <View style={[
              styles.tooltipIndicator,
              indicator === 'line' && styles.tooltipIndicatorLine,
              { backgroundColor: entry.color }
            ]} />
          )}
          <Text style={styles.tooltipName}>
            {entry[nameKey] || entry.name}
          </Text>
          <Text style={styles.tooltipValue}>
            {entry.value}
          </Text>
        </View>
      ))}
    </View>
  );
});
ChartTooltipContent.displayName = 'ChartTooltipContent';

const ChartLegend = React.forwardRef(({ 
  children, 
  content,
  ...props 
}, ref) => {
  return (
    <View ref={ref} style={[styles.legend, props.style]} {...props}>
      {typeof content === 'function' ? content() : content || children}
    </View>
  );
});
ChartLegend.displayName = 'ChartLegend';

const ChartLegendContent = React.forwardRef(({ 
  payload,
  nameKey = 'value',
  ...props 
}, ref) => {
  if (!payload?.length) return null;

  return (
    <View ref={ref} style={[styles.legendContent, props.style]} {...props}>
      {payload.map((entry, index) => (
        <View key={index} style={styles.legendItem}>
          <View style={[
            styles.legendIndicator,
            { backgroundColor: entry.color }
          ]} />
          <Text style={styles.legendLabel}>
            {entry[nameKey] || entry.value}
          </Text>
        </View>
      ))}
    </View>
  );
});
ChartLegendContent.displayName = 'ChartLegendContent';

// Simple Bar Chart Component
const SimpleBarChart = React.forwardRef(({ 
  data = [], 
  width = Dimensions.get('window').width - 32,
  height = 200,
  margin = { top: 20, right: 30, bottom: 20, left: 20 },
  ...props 
}, ref) => {
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;
  
  const maxValue = Math.max(...data.map(d => d.value || 0));
  const barWidth = chartWidth / data.length - 10;

  return (
    <View ref={ref} style={[styles.chartContainer, { width, height }]} {...props}>
      <View style={styles.chart}>
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * chartHeight;
          return (
            <View key={index} style={styles.barContainer}>
              <View 
                style={[
                  styles.bar, 
                  { 
                    width: barWidth, 
                    height: barHeight,
                    backgroundColor: item.color || '#4F7CFF'
                  }
                ]} 
              />
              <Text style={styles.barLabel}>{item.label}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
});
SimpleBarChart.displayName = 'SimpleBarChart';

// Simple Line Chart Component
const SimpleLineChart = React.forwardRef(({ 
  data = [], 
  width = Dimensions.get('window').width - 32,
  height = 200,
  strokeColor = '#4F7CFF',
  strokeWidth = 2,
  ...props 
}, ref) => {
  // This would need SVG or Canvas implementation for actual lines
  // For now, showing data points
  return (
    <View ref={ref} style={[styles.chartContainer, { width, height }]} {...props}>
      <View style={styles.lineChart}>
        {data.map((item, index) => (
          <View key={index} style={styles.dataPoint}>
            <View style={[styles.point, { backgroundColor: strokeColor }]} />
            <Text style={styles.pointLabel}>{item.label}</Text>
            <Text style={styles.pointValue}>{item.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
});
SimpleLineChart.displayName = 'SimpleLineChart';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
  },
  tooltip: {
    position: 'absolute',
    zIndex: 50,
  },
  tooltipContent: {
    backgroundColor: '#ffffff',
    borderRadius: 6,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tooltipLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 4,
  },
  tooltipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  tooltipIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  tooltipIndicatorLine: {
    width: 12,
    height: 2,
    borderRadius: 1,
  },
  tooltipName: {
    fontSize: 12,
    color: '#374151',
    flex: 1,
  },
  tooltipValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111827',
  },
  legend: {
    marginTop: 16,
  },
  legendContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  legendLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  chartContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
  },
  chart: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
  },
  barContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  bar: {
    borderRadius: 2,
  },
  barLabel: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 4,
  },
  lineChart: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
  },
  dataPoint: {
    alignItems: 'center',
    flex: 1,
  },
  point: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  pointLabel: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 4,
  },
  pointValue: {
    fontSize: 12,
    fontWeight: '500',
    color: '#111827',
    marginTop: 2,
  },
});

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  SimpleBarChart,
  SimpleLineChart,
};