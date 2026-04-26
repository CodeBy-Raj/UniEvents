import { useState, useEffect, useCallback } from 'react';
import { getStudentData } from '../services/simplifiResponse';
import { useFocusEffect } from '@react-navigation/native';

const useStudentDashboardViewModel = (routeParams) => {
  const { token, username } = routeParams || {};

  const [student, setStudent] = useState({
    name: username || 'Student', 
    email: 'student@example.com',
    roll: username || 'N/A',
  });

  const [attendanceData, setAttendanceData] = useState({
    labels: [],
    data: [],
    colors: [],
  });

  const [subjectList, setSubjectList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Generate random colors for the chart
  const generateColors = (count) => {
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#C9CBCF', '#FFCD56'];
    return Array.from({ length: count }, (_, i) => colors[i % colors.length]);
  };

  const processData = (apiResponse) => {
    if (!apiResponse || !apiResponse.response || !apiResponse.response.data) return;

    const rawData = apiResponse.response.data;
    const subjects = [];
    const labels = [];
    const values = [];

    rawData.forEach((item) => {
      // Skip the "Total" summary object which might not have an ID or specific structure
      if (item.cdata && item.cdata.course_code === 'Total') return;
      
      // Ensure we have necessary data
      if (item.cdata && item.attendance_summary) {
        const subjectName = item.cdata.course_code || item.cdata.course_name || 'Unknown';
        const percentString = item.attendance_summary.Percent || '0%';
        const percentValue = parseFloat(percentString.replace('%', '')) / 100;

        subjects.push({
          subject: subjectName,
          held: item.attendance_summary.Total || 0,
          attended: item.attendance_summary.Present || 0,
          percent: percentString
        });

        subjects.push({
          subject: subjectName,
          held: item.attendance_summary.Total || 0,
          attended: item.attendance_summary.Present || 0,
          percent: percentString
        });

        labels.push(subjectName);
        values.push(percentValue);
      }
    });

    setSubjectList(subjects);
    setAttendanceData({
      labels: labels,
      data: values,
      colors: generateColors(labels.length),
    });
  };

  const fetchData = async () => {
    if (!token) {
        setLoading(false);
        return;
    }
    try {
      const data = await getStudentData(token);
      if (data) {
        processData(data);
        // Try to extract name if available in data, otherwise keep username
        // setStudent(prev => ({...prev, name: data.studentName || prev.name})); 
      }
    } catch (error) {
      console.error("Error fetching student data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, [token]);

  return {
    student,
    attendanceData,
    subjectList,
    loading,
    refreshing,
    onRefresh,
  };
};

export default useStudentDashboardViewModel;
