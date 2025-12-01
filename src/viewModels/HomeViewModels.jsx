import { useState, useEffect, useCallback } from 'react';
import { handleModalEvents } from '../services/modalEvents';
import Toast from 'react-native-toast-message';

export const useHomeViewModel = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedClub, setSelectedClub] = useState(null);
  const [isConnected, setIsConnected] = useState(true);

  const fetchEvents = useCallback(async () => {
    try {
      const result = await handleModalEvents(selectedClub);
      setEvents(result);
      setIsConnected(true);
    } catch (error) {
      if (error.message === 'Network request failed') {
        setIsConnected(false);
        Toast.show({
          type: 'error',
          text1: 'No Internet Connection',
          text2: 'Connect And Refresh',
          visibilityTime: 5000,
        });
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [selectedClub]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchEvents();
  }, [fetchEvents]);

  return {
    events,
    loading,
    refreshing,
    selectedClub,
    setSelectedClub,
    onRefresh,
    isConnected,
  };
};
