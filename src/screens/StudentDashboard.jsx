import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, RefreshControl, TouchableOpacity } from 'react-native';
import { Avatar, Card, Button } from 'react-native-paper';
import { BarChart } from 'react-native-chart-kit';
import { SafeAreaView } from 'react-native-safe-area-context';

const screenWidth = Dimensions.get('window').width;

const StudentDashboard = () => {
  const [student, setStudent] = useState({
    name: 'Harsh Raj',
    email: 'harsh.raj@abes.ac.in',
    roll: '2100320190045',
  });

  const [attendance, setAttendance] = useState([
    { subject: 'DSA', held: 30, attended: 26 },
    { subject: 'DBMS', held: 28, attended: 21 },
    { subject: 'Maths', held: 25, attended: 22 },
  ]);


  const [quizzes, setQuizzes] = useState([
    { subject: 'DBMS', quizTitle: 'Quiz 1', score: 18, total: 20, date: '2025-04-10' },
    { subject: 'Maths', quizTitle: 'Quiz 1', score: 16, total: 20, date: '2025-04-12' },
  ]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    // Fetch data logic here
    setTimeout(() => setRefreshing(false), 1000); // Simulate refresh
  };

  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  }

  return (
    <SafeAreaView style={{flex:1}}>
    <ScrollView 
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {/* Header */}
      <View style={styles.header}>
        <Avatar.Text size={60} label={student.name[0]} />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.name}>{student.name}</Text>
          <Text style={styles.email}>{student.email}</Text>
          <Text style={styles.email}>Roll No: {student.roll}</Text>
        </View>
      </View>

      {/* Attendance Chart */}
      <Text style={styles.sectionTitle}>Attendance Summary</Text>
{/* {attendance.length > 0 ? (
  (() => {
    try {
      return (
        <BarChart
          data={{
            labels: attendance.map(a => a.subject),
            datasets: [{ data: attendance.map(a => Math.round((a.attended / a.held) * 100)) }],
          }}
          width={screenWidth - 30}
          height={220}
          yAxisSuffix="%"
          chartConfig={{
            backgroundGradientFrom: '#f9f9f9',
            backgroundGradientTo: '#f9f9f9',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(58, 53, 84, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(58, 53, 84, ${opacity})`,
          }}
          style={styles.chart}
        />
      );
    } catch (error) {
      console.error('Error rendering BarChart:', error);
      return <Text style={styles.emptyText}>Error loading chart</Text>;
    }
  })()
) : (
  <Text style={styles.emptyText}>No attendance data available</Text>
)} */}

      {/* Quiz Cards */}
      <Text style={styles.sectionTitle}>Quiz Results</Text>
      {quizzes.map((quiz, index) => (
        <Card key={index} style={styles.card}>
          <TouchableOpacity onPress={() => toggleExpand(index)}>
            <Card.Title title={`${quiz.subject} - ${quiz.quizTitle}`} />
          </TouchableOpacity>
          {expandedIndex === index && (
            <Card.Content>
              <Text>Score: {quiz.score}/{quiz.total}</Text>
              <Text>Date: {quiz.date}</Text>
            </Card.Content>
          )}
        </Card>
      ))}

      {/* Refresh Button */}
      <TouchableOpacity  onPress={onRefresh} style={styles.refreshButton}>
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
    // width:100,
    // height:30,
    padding:8,
    borderRadius:12,
    // justifyContent:'center',
    alignItems:'center'
  },
  btnTxt:{
    color:'#000000',
    fontWeight:'bold',
    fontSize:15,
  }
});
