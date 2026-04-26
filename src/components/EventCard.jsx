import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { getFilePreview } from '../services/storageService';

const EventCard = ({ event, onRegister, onDetails, onEdit, onDelete, isAdmin = false }) => {
  return (
    <View className="bg-cardBackground rounded-card p-4 mb-5 border border-cardBorder/20 shadow-card">
      {/* Event Title */}
      <View className="items-center mb-3">
        {event.imageId ? (
          <Image
            source={{ uri: getFilePreview(event.imageId) }}
            className="w-full h-40 rounded-lg mb-2"
            resizeMode="cover"
          />
        ) : null}
        <Text className="text-textPrimary text-xl font-bold text-center leading-6">
          {event.title}
        </Text>
      </View>

      {/* Club and Fee Container */}
      <View className="flex-row justify-between items-center mb-3">
        <View className="flex-1">
          <Text className="text-textMuted text-base font-semibold">
            by {event.clubName}
          </Text>
        </View>
        <View className="bg-accent rounded-full px-4 py-2">
          <Text className="text-textOnAccent text-sm font-bold">
            ₹ {event.fee}/-
          </Text>
        </View>
      </View>

      {/* Event Details */}
      <View className="space-y-2 mb-4">
        <View className="bg-surfaceLight/30 rounded-lg p-2">
          <Text className="text-textSecondary text-sm font-medium">
            📅 Date: {event.date}
          </Text>
        </View>
        <View className="bg-surfaceLight/30 rounded-lg p-2">
          <Text className="text-textSecondary text-sm font-medium">
            📍 Location: {event.location}
          </Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View className="flex-row space-x-3">
        {isAdmin ? (
          <>
            <TouchableOpacity 
              className="flex-1 bg-warning rounded-button py-3 items-center active:opacity-80"
              onPress={onEdit}
            >
              <Text className="text-white text-base font-bold">Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className="flex-1 bg-error rounded-button py-3 items-center active:opacity-80"
              onPress={onDelete}
            >
              <Text className="text-white text-base font-bold">Delete</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity 
              className="flex-1 bg-buttonPrimary rounded-button py-3 items-center mr-2 active:opacity-80 shadow-sm"
              onPress={onRegister}
            >
              <Text className="text-textOnAccent text-base font-bold">Register</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className="flex-1 bg-buttonSecondary rounded-button py-3 items-center active:opacity-80 shadow-sm"
              onPress={onDetails}
            >
              <Text className="text-textOnAccent text-base font-bold">Details</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default EventCard;