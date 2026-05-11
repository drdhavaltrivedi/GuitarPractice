# Guitar Practice App (Riiyazi)

A state-of-the-art, premium guitar practice companion built with **React Native + Expo SDK 54**. Designed for both modern pedagogy and high-performance practice, featuring the signature "Midnight & Amber" UI.

---

## ✨ Design Philosophy: Midnight & Amber
The application is built on a design system optimized for low-light practice environments and high visual focus:
- **Aesthetics**: OLED-black backgrounds with vibrant amber (#FF6B00) and cyan (#00E5FF) highlights.
- **Responsiveness**: A custom scaling engine (`rs`/`rf` utilities) ensures pixel-perfect layouts across all mobile and tablet devices.
- **Safe Area Mastery**: Multi-edge safe area handling optimized for notches, home indicators, and tab-bar transparency.

---

## 🛠 Feature Overview

| Module | Purpose | Key Features |
|---|---|---|
| **Practice Home** | The Daily Hub | Session timer, routine checklist, streak tracking, and weekly goal progress. |
| **Tempo (Metronome)** | Precision Timing | Circular SVG arc dial with **Rotary Pan Gestures**, Tap Tempo, and Linear BPM Ramping. |
| **Scales** | Visual Mastery | SVG Fretboard diagrams with glow-dot indicators and multi-position key selection. |
| **Exercises** | Technique Library | Right-Hand picking, Left-Hand spider patterns, and Alankars with **Mastery Tracking**. |
| **Progress** | Data Insights | 35-day activity heatmap, BPM records, and session history analysis. |

---

## 🏗 System Architecture

```mermaid
graph TD
    A[App Root] --> B[Root Layout / Stack]
    B --> C[Tab Navigator]
    
    subgraph Screens
        C --> D[Practice Home]
        C --> E[Metronome]
        C --> F[Scales]
        C --> G[Exercises]
        C --> H[Progress]
    end
    
    subgraph Engine Layer
        E --> I[Metronome Engine]
        I --> J[Audio Scheduler]
        I --> K[Haptic Feedback]
    end
    
    subgraph Data & State
        D & E & F & G & H --> L[Zustand Stores]
        L --> M[AsyncStorage Persistence]
        G --> N[Static Exercise Data]
    end
```

---

## 📊 Data Model (ER Diagram)

```mermaid
erDiagram
    PRACTICE_ENTRY {
        string id PK
        string date "YYYY-MM-DD"
        number durationSeconds
        stringArray completedItems
    }
    
    USER_SETTINGS {
        number defaultBpm
        boolean hapticEnabled
        string defaultKey
    }
    
    RH_EXERCISE {
        string id PK
        number number
        string label
        stringArray pattern
        number targetBpm
    }
    
    ALANKAR {
        number number PK
        string type
        stringArray ascending
        stringArray descending
        number targetBpm
    }

    PRACTICE_ENTRY ||--o{ RH_EXERCISE : "achieved BPM"
    PRACTICE_ENTRY ||--o{ ALANKAR : "achieved BPM"
```

---

## 🔄 User Flows

### 1. Practice Session Flow
1. User lands on **Dashboard** → Hits **Start Session**.
2. Timer begins pulsing; **Routine Checklist** becomes active.
3. User completes "RH Exercises" → Dashboard updates progress count.
4. User hits **Finish Session** → Entry is persisted; **Streak** is recalculated.

### 2. Technique Training Flow
1. User enters **Exercises** tab → Selects **Alankar 3**.
2. Taps **(i)** button for detailed instructions and mastery tips.
3. Taps **Start Practice** → App deep-links to **Metronome** with Alankar context.
4. Metronome sets BPM to starting speed; user practices with the high-precision engine.

---

## 🚀 Technical Highlights

### 1. High-Precision Metronome Engine
Built using a **Lookahead Scheduler** pattern to eliminate the ±15ms jitter common in JavaScript `setInterval`.
- **Scheduler**: Polls every 25ms.
- **Window**: Schedules audio beats 150ms in advance via `setTimeout`.
- **Rotary UI**: Custom `PanResponder` calculates polar coordinates for an intuitive circular drag experience.

### 2. Responsive Scaling Engine
The app uses a custom `responsive.ts` utility that scales fonts and layout sizes based on screen width, capped for tablet optimization:
- `rs(size)`: Scales layout units.
- `rf(size)`: Scales font sizes.
- `SCROLL_BOTTOM_PAD`: Dynamic padding accounting for Safe Area + Tab Bar height.

---

## 📦 Tech Stack

- **Framework**: Expo (SDK 54) / React Native
- **Routing**: Expo Router (File-based)
- **State**: Zustand + AsyncStorage
- **Graphics**: React Native SVG
- **Animations**: React Native Animated API (Friction/Tension Springs)
- **Audio**: Expo-AV

---

## 🏗 Development & Build

### Auto-Versioning
Configured with **EAS Auto-Increment**.
- **Version Source**: Remote (managed by EAS).
- **Profile**: `preview` (APK) and `production`.

### Setup
```bash
npm install --legacy-peer-deps
npx expo start --clear
```

### Build
```bash
eas build --profile preview --platform android
```

---

## 🛡 Credits & Legal
Developed by **Dr. Dhaval Trivedi**.  
*MIT License © 2026 Dr. Dhaval Trivedi*
