import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {ProgressChart} from 'react-native-chart-kit';
import {Avatar} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

// Move static data outside component to prevent recreation on each render
const chartData = {
  labels: ['Java', 'OS', 'Cyber Security', 'TAFL', 'TC', 'Maths'],
  data: [0.7, 0.62, 0.6, 0.82, 0.51, 0.63],
  colors: ['orange', 'green', 'lightpink', 'white', 'yellow', 'brown'],
};

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(225, 255, 255, ${opacity})`,
  propsForLabels: {
    fontSize: 10,
    fontWeight: 'bold',
  },
};

const StudentDashboard = () => {
  const {width: screenWidth} = useWindowDimensions();

  const [student] = useState({
    name: 'Harsh Raj',
    email: 'harsh23b0@abes.ac.in',
    roll: '2100320190045',
  });

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000); // Simulate refresh
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {/* Header */}
        <View style={styles.header}>
          <Avatar.Text size={60} label={student.name[0]} />
          <View style={styles.headerInfo}>
            <Text style={styles.name}>{student.name}</Text>
            <Text style={styles.email}>{student.email}</Text>
            <Text style={styles.email}>Roll No: {student.roll}</Text>
          </View>
        </View>

        {/* Attendance Chart */}
        <Text style={styles.sectionTitle}>Attendance Summary</Text>
        <View style={styles.chartContainer}>
          <ProgressChart
            data={chartData}
            width={screenWidth - 35}
            height={250}
            strokeWidth={10}
            radius={35}
            chartConfig={chartConfig}
            hideLegend={false}
            withCustomBarColorFromData
          />
        </View>

        {/* Refresh Button */}
        <TouchableOpacity onPress={onRefresh} style={styles.refreshButton}>
          <Text style={styles.btnTxt}>Refresh Data</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StudentDashboard;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerInfo: {
    marginLeft: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
  },
  email: {
    fontSize: 14,
    color: '#777',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginVertical: 10,
    color: '#f3f3f3',
  },
  chart: {
    borderRadius: 12,
    marginBottom: 20,
  },
  chartContainer: {
    paddingLeft: 0,
  },
  card: {
    marginVertical: 6,
    backgroundColor: '#f3f3f3',
  },
  refreshButton: {
    marginTop: 20,
    backgroundColor: '#f9eed0',
    padding: 8,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnTxt: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
