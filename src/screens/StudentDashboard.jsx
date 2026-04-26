import React, { useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  useWindowDimensions,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {ProgressChart} from 'react-native-chart-kit';
import {Avatar} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import { COLORS } from '../constants/theme';
import useStudentDashboardViewModel from '../viewModels/StudentDashboardViewModel';

// Move static configuration outside the component
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

const StudentDashboard = ({ route }) => {
  const {width: screenWidth} = useWindowDimensions();
  const {
    student,
    attendanceData,
    subjectList,
    loading,
    refreshing,
    onRefresh,
  } = useStudentDashboardViewModel(route.params);

  const chartWidth = useMemo(() => screenWidth - 35, [screenWidth]);

  if (loading && !refreshing) {
    return (
      <View className="flex-1 justify-center items-center bg-primaryDark">
        <ActivityIndicator size="large" color={COLORS.accent} />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        className="flex-1 p-4 bg-primaryDark"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {/* Header */}
        <View className="flex-row items-center mb-5">
          <Avatar.Text size={60} label={student.name[0]} style={{backgroundColor: COLORS.accent}} />
          <View className="ml-3">
            <Text className="text-textPrimary text-lg font-semibold">{student.name}</Text>
            <Text className="text-textMuted text-sm">{student.email}</Text>
            <Text className="text-textMuted text-sm">Roll No: {student.roll}</Text>
          </View>
        </View>

        {/* Attendance Chart */}
        <Text className="text-textPrimary text-base font-bold my-2">Attendance Summary</Text>
        <View style={styles.chartContainer}>
          {attendanceData.data.length > 0 ? (
            <ProgressChart
              data={attendanceData}
              width={chartWidth}
              height={250}
              strokeWidth={10}
              radius={35}
              chartConfig={chartConfig}
              hideLegend={false}
              withCustomBarColorFromData
            />
          ) : (
            <Text className="text-textMuted py-10">No attendance data available</Text>
          )}
        </View>

        {/* Subject Details List */}
        <Text className="text-textPrimary text-base font-bold mt-5 mb-2">Subject Details</Text>
        {subjectList.map((subject, index) => (
          <View key={index} className="bg-cardBackground p-4 rounded-xl mb-3 border border-cardBorder/20">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-textPrimary font-bold flex-1 mr-2">{subject.subject}</Text>
              <Text className={`font-bold ${parseFloat(subject.percent) < 75 ? 'text-error' : 'text-success'}`}>
                {subject.percent}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-textMuted text-xs">Held: {subject.held}</Text>
              <Text className="text-textMuted text-xs">Attended: {subject.attended}</Text>
            </View>
          </View>
        ))}

        {/* Refresh Button */}
        <TouchableOpacity onPress={onRefresh} className="mt-5 bg-buttonPrimary py-2 rounded-xl items-center mb-10">
          <Text className="text-textOnAccent font-bold text-base">Refresh Data</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    paddingLeft: 0, 
    alignItems: 'center'
  }
});

export default StudentDashboard;
