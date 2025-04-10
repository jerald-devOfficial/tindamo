import { Stack } from 'expo-router'
import React from 'react'

export default function OnboardingLayout() {
  return (
    <Stack>
      <Stack.Screen
        name='personal-info'
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name='profile-picture'
        options={{
          headerShown: false
        }}
      />
    </Stack>
  )
}
