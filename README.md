# Guitar Practice App (Riiyazi)

A premium, high-fidelity guitar practice companion built with **React Native + Expo SDK 54**. Featuring a sophisticated "Midnight & Amber" UI, precision metronome, and comprehensive exercise library.

---

## ✨ Premium UI: Midnight & Amber
The app has been completely overhauled with a state-of-the-art design language:
- **Audio-Grade Aesthetics**: Vibrant amber accents (#FF6B00) on an OLED-black background.
- **Glassmorphic Components**: Deep shadows, subtle glows, and semi-transparent surfaces.
- **Responsive Architecture**: Universal scaling engine (`rs`/`rf` utilities) ensures a perfect experience on any screen size.
- **Micro-Animations**: Pulsing session indicators, spring-based expansions, and smooth rotary gestures.

---

## 🛠 Feature Overview

| Module | Features |
|---|---|
| **Practice Dashboard** | Hero session timer, daily routine checklist, 7-day streak tracking, and weekly goals. |
| **Precision Metronome** | Circular SVG arc dial with **Rotary Drag Gestures**, Tap Tempo, BPM Ramp, and high-precision lookahead scheduler. |
| **Scale Explorer** | Professional fretboard diagrams with glow-dot indicators, multiple positions, and interactive key selectors. |
| **Exercise Library** | 20+ built-in exercises (Right Hand, Left Hand, Alankars) with **Mastery Progress Tracking** and video guides. |
| **Mastery Tracking** | Real-time mastery bars, practice heatmaps, and educational tooltips for every exercise. |

---

## 🚀 Tech Stack

| Concern | Library |
|---|---|
| **Core** | React Native + Expo (SDK 54) |
| **Navigation** | expo-router (File-based) |
| **State Management** | Zustand (Persistent) |
| **Graphics** | react-native-svg + custom PanResponder Gestures |
| **Responsiveness** | custom `responsive.ts` scaling engine |
| **Safe Area** | react-native-safe-area-context (Multi-edge optimized) |
| **Audio** | expo-av (Low-latency scheduler) |

---

## 📈 Architecture: The Mastery Loop

1. **Plan**: Set your weekly goal (e.g., 7 hours) on the Dashboard.
2. **Execute**: Start a session, use the Metronome or Scale Explorer.
3. **Learn**: Tap the **(i)** Info Button on any exercise for professional pedagogical guidance.
4. **Track**: Watch your Mastery Bar grow on the Exercises tab as you beat your BPM records.
5. **Analyze**: Review your progress heatmap and streak on the Progress tab.

---

## 🏗 Setup & Build

### Auto-Versioning
The project is configured with **EAS Auto-Increment**. Every build automatically bumps the `versionCode` (Android) and `buildNumber` (iOS) via the EAS remote app version source.

### Local Development
```bash
# Install dependencies
npm install --legacy-peer-deps

# Start the premium experience
npx expo start --clear
```

### Build Production APK (Android)
```bash
# Trigger a build with auto-incrementing version
eas build --profile preview --platform android
```

---

## 🛡 Credits
Developed by **Dr. Dhaval Trivedi**.  
*Passionate about music, pedagogy, and pixel-perfect performance.*

---

## 📜 License
MIT License - Copyright (c) 2026 Dr. Dhaval Trivedi
