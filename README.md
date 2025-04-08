# TindaMo - Local Buy, Sell & Barter App 🇵🇭

**TindaMo** is a hyperlocal mobile marketplace app for Filipinos to easily buy, sell, or barter second-hand goods and services. Built with React Native + Expo + Firebase, styled using NativeWind (Tailwind for mobile).

---

## 📱 Target Platform

- **React Native with Expo (Go for testing)**
- **iOS device:** iPhone 16 Pro (for preview via QR)
- **Dev machine:** Windows 11
- **Navigation:** TypeScript template with React Navigation
- **Styling:** NativeWind (Tailwind-style for React Native)

---

## 🎯 App Goals

1. Deliver a fast and friendly MVP experience for community-based online selling and bartering.
2. Empower local users to earn/swap goods without relying on big marketplaces.
3. Build trust via ratings and barangay-based filtering.
4. Monetize via boosts, subscriptions, and ads.

---

## 🧩 Core Features (MVP)

- [ ] Firebase Authentication (Email, Google, Phone)
- [ ] Create, Edit, and Delete listings (items/services)
- [ ] Toggle between **For Sale** or **For Barter**
- [ ] Search and Filter by Barangay/City
- [ ] Native chat feature (Firebase Firestore)
- [ ] Push notifications (Expo + FCM)
- [ ] User profiles with ratings and verification

---

## 🛠️ Tech Stack

| Layer        | Technology                          |
|--------------|--------------------------------------|
| Frontend     | React Native + Expo Go               |
| Styling      | NativeWind (Tailwind-style for RN)   |
| State Mgmt   | Context API / Zustand (TBD)          |
| Backend      | Firebase (Auth, Firestore, Storage)  |
| Navigation   | React Navigation (TypeScript config) |
| Routing      | File-based screen routing            |
| Notifications| Expo + Firebase Cloud Messaging      |
| Payments     | GCash / PayMongo (planned)           |
| Maps         | Google Maps or OpenStreetMap (TBD)   |

---

## 🎨 Styling Rules

- All UI must use **NativeWind** classes like:
```tsx
<View className="bg-white p-4 rounded-xl shadow-sm">
  <Text className="text-lg font-semibold text-gray-800">TindaMo</Text>
</View>
```
- Avoid inline StyleSheet.create unless absolutely needed
- Reuse class names via utility classes for consistency

## 📈 Monetization Plan

- Listing boosts (₱20–₱100 per slot)
- Premium seller subscription (₱199/mo)
- Optional GCash/PayMongo checkout with service fee
- Ads via AdMob SDK

## 🧠 Development Phases

### ✅ Phase 1: MVP
- Auth + User profiles
- Listing creation + upload with images
- Feed display + search
- Barter toggle
- Chat + Firestore connection

### 🚀 Phase 2: Engagement
- Rating system
- Notification system
- Geo filtering by location
- Save/bookmark listings

### 💸 Phase 3: Monetization
- Ad integration (AdMob)
- Featured boost listings
- GCash integration
- Seller dashboard

## 🧠 Notes for Cursor AI

- **IMPORTANT:** Do not remove `import '../global.css';` from `app/_layout.tsx`. It is required for NativeWind styling.
- All code should follow file-based routing (Next.js/Expo Router style)
- All UI must use NativeWind classes for styling
- TypeScript-first approach with strict types
- Firebase config and Firestore access should be modular (lib/firebase.ts)
- Break screens into components for maintainability
- Clean and semantic folder structure
- Use image optimization for listing uploads (compress before upload to Firebase Storage)

## 💻 Maintained by

[Jerald Baroro](https://jeraldbaroro.xyz)  
Full Stack Mobile & Web Dev