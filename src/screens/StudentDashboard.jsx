import React, {useEffect, useState} from 'react';
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
import {Avatar, Card} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

const StudentDashboard = () => {
  const {width: screenWidth} = useWindowDimensions();

  const data = {
    labels: ['Java', 'OS', 'Cyber Security', 'TAFL', 'TC', 'Maths'], // optional
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

  const [student, setStudent] = useState({
    name: 'Harsh Raj',
    email: 'harsh23b0@abes.ac.in',
    roll: '2100320190045',
  });

  const [attendance, setAttendance] = useState([
    {subject: 'DSA', held: 30, attended: 26},
    {subject: 'DBMS', held: 28, attended: 21},
    {subject: 'Maths', held: 25, attended: 22},
  ]);

  const [quizzes, setQuizzes] = useState([
    {
      subject: 'DBMS',
      quizTitle: 'Quiz 1',
      score: 18,
      total: 20,
      date: '2025-04-10',
    },
    {
      subject: 'Maths',
      quizTitle: 'Quiz 1',
      score: 16,
      total: 20,
      date: '2025-04-12',
    },
  ]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => setRefreshing(false), 1000); // Simulate refresh
  };

  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = index => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {/* Header */}
        <View style={styles.header}>
          <Avatar.Text size={60} label={student.name[0]} />
          <View style={{marginLeft: 10}}>
            <Text style={styles.name}>{student.name}</Text>
            <Text style={styles.email}>{student.email}</Text>
            <Text style={styles.email}>Roll No: {student.roll}</Text>
          </View>
        </View>

        {/* Attendance Chart */}
        <Text style={styles.sectionTitle}>Attendance Summary</Text>
        {/* <ScrollView horizontal contentOffset={{x:100,y:300}}> */}
        <View style={{paddingLeft:0}}>

        <ProgressChart
          data={data}
          width={screenWidth - 35}
          height={250}
          strokeWidth={10}
          radius={35}
          chartConfig={chartConfig}
          hideLegend={false}
          withCustomBarColorFromData
        />
        </View>
        {/* </ScrollView> */}
        {/* Quiz Cards */}

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
