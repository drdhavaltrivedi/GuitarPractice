# Guitar Practice App

A mobile-first guitar practice companion built with **React Native + Expo SDK 54**. It covers daily practice sessions, a precision lookahead metronome, scale fretboard diagrams, right/left-hand exercises, Indian classical alankars, and a full progress tracker.

---

## Table of Contents

1. [Feature Overview](#feature-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Architecture Diagram](#architecture-diagram)
5. [Data Model (ER Diagram)](#data-model-er-diagram)
6. [User Flow Diagrams](#user-flow-diagrams)
   - [App Startup Flow](#app-startup-flow)
   - [Practice Session Flow](#practice-session-flow)
   - [Metronome Engine Flow](#metronome-engine-flow)
   - [Scales Navigation Flow](#scales-navigation-flow)
   - [Exercise-to-Metronome Deep Link Flow](#exercise-to-metronome-deep-link-flow)
7. [State Management](#state-management)
8. [Metronome Engine — Lookahead Scheduler](#metronome-engine--lookahead-scheduler)
9. [Storage Layer](#storage-layer)
10. [Component Tree](#component-tree)
11. [Theme System](#theme-system)
12. [Getting Started](#getting-started)
13. [Known Issues / Gotchas](#known-issues--gotchas)
14. [Roadmap](#roadmap)

---

## Feature Overview

| Tab | What it does |
|---|---|
| **Practice** | Session timer (HH:MM:SS), daily checklist, 7-day streak dots, quick navigation |
| **Metronome** | Lookahead scheduler, BPM stepper, tap tempo, time signature, BPM ramp (slow→fast) |
| **Scales** | C/G/D/A/E/B major scales with SVG fretboard diagrams across multiple positions |
| **Exercises** | Right Hand (8 exercises), Left Hand / Spider (6 strings), Alankars (8 patterns) |
| **Progress** | Total days, streak, monthly minutes, 35-day calendar heatmap, BPM records bar chart |

---

## Tech Stack

| Concern | Library | Version |
|---|---|---|
| Framework | React Native + Expo | `0.81.5` / `~54.0.33` |
| Routing | expo-router (file-based) | `~6.0.23` |
| State | Zustand | `^4.5.2` |
| Audio | expo-av | `~16.0.8` |
| Haptics | expo-haptics | `~15.0.8` |
| Fretboard SVG | react-native-svg | `15.12.1` |
| Animations | React Native built-in `Animated` API | (bundled) |
| Persistence | @react-native-async-storage/async-storage | `2.2.0` |
| Web support | react-native-web + react-dom | `~0.19.13` |
| Language | TypeScript | `~5.9.2` |

> **Why not react-native-reanimated?**
> Reanimated v4 introduces `react-native-worklets` which requires a TurboModule that is incompatible with Expo Go SDK 54. All animations use the built-in `Animated` API instead (`Animated.spring`, `Animated.timing`). This is revisited in a native build / EAS build context.

---

## Project Structure

```
GuitarPractice/
├── app/                          # expo-router screens (file = route)
│   ├── _layout.tsx               # Root layout: audio init, splash screen
│   └── (tabs)/
│       ├── _layout.tsx           # Tab bar configuration
│       ├── index.tsx             # Practice Home (/)
│       ├── metronome.tsx         # Metronome (/metronome)
│       ├── scales.tsx            # Scales (/scales)
│       ├── exercises.tsx         # Exercises (/exercises)
│       └── progress.tsx          # Progress (/progress)
│
├── src/
│   ├── audio/
│   │   ├── tick.wav              # Regular beat sound (sine burst, ~2kHz)
│   │   ├── tock.wav              # Accent beat sound (sine burst, ~1kHz)
│   │   └── tick_soft.wav         # Soft beat variant
│   │
│   ├── components/
│   │   ├── exercises/
│   │   │   ├── ExerciseCard.tsx  # RH exercise card (pattern display + practice button)
│   │   │   └── AlankaarCard.tsx  # Alankar card (expandable, ascending/descending)
│   │   ├── fretboard/
│   │   │   └── FretboardSVG.tsx  # SVG fretboard renderer (dynamic fret range)
│   │   ├── metronome/
│   │   │   ├── BeatIndicator.tsx # Animated pulsing beat dots
│   │   │   ├── BpmDisplay.tsx    # Large BPM number (tap to edit inline)
│   │   │   ├── BpmStepper.tsx    # ±1/±5/±10 buttons with long-press repeat
│   │   │   ├── PlayStopButton.tsx# Large play/stop toggle
│   │   │   ├── PresetButtons.tsx # Quick BPM presets (60,80,100,120,140,160)
│   │   │   ├── RampControl.tsx   # BPM ramp config (expandable panel)
│   │   │   ├── TapTempoButton.tsx# Tap to detect BPM
│   │   │   └── TimeSignature.tsx # 2/4, 3/4, 4/4, 6/8 selector
│   │   └── ui/
│   │       ├── KeySelector.tsx   # Horizontal key (C/G/D/A/E/B) tabs
│   │       └── NoteChip.tsx      # Scale note pill (highlights sharps)
│   │
│   ├── data/
│   │   ├── types.ts              # All TypeScript interfaces (Scale, Exercise, Alankar, ...)
│   │   ├── scales.ts             # 6 major scales × multiple fretboard positions
│   │   ├── exercises.ts          # 8 RH exercises + 6 LH string exercises
│   │   └── alankars.ts           # 8 Indian classical alankars (C scale)
│   │
│   ├── engine/
│   │   ├── MetronomeEngine.ts    # Lookahead scheduler singleton
│   │   ├── TapTempo.ts           # Rolling average tap-tempo calculator
│   │   └── BpmRamp.ts            # Linear BPM ramp over time (setInterval)
│   │
│   ├── hooks/
│   │   └── useMetronome.ts       # Single owner of onBeat callback (haptics + UI)
│   │
│   ├── storage/
│   │   ├── practiceLog.ts        # AsyncStorage CRUD for PracticeEntry[]
│   │   └── settings.ts           # AsyncStorage CRUD for UserSettings
│   │
│   ├── store/
│   │   ├── metronomeStore.ts     # Zustand: BPM, play state, time sig, ramp
│   │   ├── practiceStore.ts      # Zustand: session timer, checklist items
│   │   └── progressStore.ts      # Zustand: log, streak, BPM records
│   │
│   └── theme/
│       ├── colors.ts             # Dark theme palette (gold on dark brown)
│       ├── typography.ts         # Font families + size scale
│       └── spacing.ts            # 4-pt spacing scale (xs/sm/md/lg/xl/xxl)
│
├── app.json                      # Expo config (scheme, permissions, plugins)
├── babel.config.js               # babel-preset-expo only (no reanimated plugin)
├── package.json
└── tsconfig.json
```

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        EXPO APP SHELL                           │
│   app/_layout.tsx  →  SplashScreen + Audio init + Engine init  │
└─────────────────────────┬───────────────────────────────────────┘
                          │  expo-router
         ┌────────────────▼────────────────┐
         │        Tab Navigator            │
         │   app/(tabs)/_layout.tsx        │
         └──┬──────┬──────┬──────┬────────┘
            │      │      │      │      │
      index │  metro│  scales│  exer │  progress
            │      │      │      │      │
            ▼      ▼      ▼      ▼      ▼
       ┌────────────────────────────────────┐
       │            SCREENS                 │
       │  (pure UI — read stores, dispatch) │
       └──────────────┬─────────────────────┘
                      │  reads / calls
       ┌──────────────▼─────────────────────┐
       │           ZUSTAND STORES           │
       │  ┌─────────────┐  ┌─────────────┐  │
       │  │metronomeStore│  │practiceStore│  │
       │  └──────┬──────┘  └──────┬──────┘  │
       │         │                │         │
       │  ┌──────▼──────┐  ┌──────▼──────┐  │
       │  │progressStore│  │  (session)  │  │
       │  └──────┬──────┘  └─────────────┘  │
       └─────────┼──────────────────────────┘
                 │  async
       ┌─────────▼──────────────────────────┐
       │         STORAGE LAYER              │
       │  AsyncStorage  (JSON serialized)   │
       │  practice_log_v1 | user_settings_v1│
       └────────────────────────────────────┘

       ┌────────────────────────────────────┐
       │         ENGINE LAYER               │
       │  MetronomeEngine (singleton)       │
       │    ↳ setInterval @ 25ms            │
       │    ↳ setTimeout per beat           │
       │    ↳ expo-av Sound playback        │
       │  TapTempoCalculator                │
       │    ↳ rolling avg of last 8 taps    │
       │  BpmRampController                 │
       │    ↳ setInterval @ 1000ms          │
       └────────────────────────────────────┘

       ┌────────────────────────────────────┐
       │         STATIC DATA                │
       │  scales.ts    — 6 keys, positions  │
       │  exercises.ts — 8 RH + 6 LH       │
       │  alankars.ts  — 8 patterns         │
       └────────────────────────────────────┘
```

---

## Data Model (ER Diagram)

```
┌──────────────────────────────────────────────────────────────┐
│                      TYPE DEFINITIONS                         │
└──────────────────────────────────────────────────────────────┘

┌─────────────┐       ┌──────────────────┐
│    Scale    │1    * │  ScalePosition   │
│─────────────│───────│──────────────────│
│ key: string │       │ label: string    │
│ notes: str[]│       │ startFret: number│
│ sharps: num │       │ strings: Record< │
│ sharpNotes  │       │   GuitarString,  │
│   : str[]   │       │   NoteOnString[] │
└─────────────┘       │ >                │
                      └────────┬─────────┘
                               │ 1..*
                      ┌────────▼─────────┐
                      │  NoteOnString    │
                      │──────────────────│
                      │ fret: number     │
                      │ note: string     │
                      │ finger?: 1|2|3|4 │
                      └──────────────────┘

┌─────────────┐
│  RHExercise │
│─────────────│
│ id: string  │
│ number: num │
│ label: str  │
│ pattern:    │   e.g. ["D","U","D","U"]
│   string[]  │
│ targetBpm   │
│ startBpm    │
│ note: string│
└─────────────┘

┌─────────────┐       ┌────────────────────┐
│  LHExercise │1    * │   FingerNote       │
│─────────────│───────│────────────────────│
│ stringName  │       │ note: string       │
│ openNote    │       │ finger: number     │
│ patterns:   │       │ fret: number       │
│   string[]  │       └────────────────────┘
└─────────────┘

┌─────────────┐
│   Alankar   │
│─────────────│
│ number: num │
│ type: string│   e.g. "Straight", "Skip", "Triplet"
│ ascending:  │   e.g. ["C","D","E","F","G","A","B","C"]
│   string[]  │
│ descending: │
│   string[]  │
│ groupSize   │
│ targetBpm   │
│ startBpm    │
└─────────────┘

┌────────────────────────────────────────────────────────┐
│                  PERSISTENCE ENTITIES                   │
└────────────────────────────────────────────────────────┘

┌──────────────────┐       ┌─────────────────────────────┐
│  PracticeEntry   │       │       UserSettings          │
│──────────────────│       │─────────────────────────────│
│ id: string (PK)  │       │ defaultBpm: number          │
│ date: string     │       │ defaultKey: string          │
│   ("YYYY-MM-DD") │       │ hapticEnabled: boolean      │
│ durationSeconds  │       │ theme: 'dark'               │
│ completedItems:  │       └─────────────────────────────┘
│   string[]       │         stored at: user_settings_v1
│ bpmAchieved:     │
│   Record<        │
│   string,number> │
└──────────────────┘
  stored at: practice_log_v1
  (array of entries, full replace on write)

                    ┌──────────────────────────────┐
                    │      ProgressStore (RAM)      │
                    │──────────────────────────────│
                    │ log: PracticeEntry[]         │
                    │ bpmRecords:                  │
                    │   Record<exerciseId, bpm>    │
                    │ streak: number               │
                    │   (computed from log.dates)  │
                    └──────────────────────────────┘

Streak algorithm:
  1. Collect unique dates from log[], sort descending
  2. Starting from today, walk backwards
  3. Increment streak for each consecutive date found
  4. Break on first missing day

AsyncStorage keys:
  "practice_log_v1"   →  JSON array of PracticeEntry
  "user_settings_v1"  →  JSON object of UserSettings
```

---

## User Flow Diagrams

### App Startup Flow

```
App Launch
    │
    ▼
app/_layout.tsx
    │
    ├── SplashScreen.preventAutoHideAsync()
    │
    ├── Audio.setAudioModeAsync({
    │     staysActiveInBackground: true,
    │     playsInSilentModeIOS: true
    │   })
    │
    ├── metronomeEngine.init()
    │     ├── Load tick.wav  ──┐
    │     └── Load tock.wav  ──┴── await Promise.all()
    │
    ├── setReady(true)
    └── SplashScreen.hideAsync()
         │
         ▼
    Tab Navigator renders
         │
    ┌────┴────────────────────────────────┐
    │  index  │ metro │ scales │ exer │ prog │
    └─────────────────────────────────────┘
         │
    index.tsx mounts
         │
    progressStore.loadFromStorage()
         └── AsyncStorage.getItem("practice_log_v1")
               └── calcStreak(log) → streak

    App unmounts
         └── metronomeEngine.destroy()
               ├── stop scheduler
               ├── tickSound.unloadAsync()
               └── tockSound.unloadAsync()
```

---

### Practice Session Flow

```
User opens Practice tab (index.tsx)
    │
    ▼
"Start Session" pressed
    │
    ├── practiceStore.startSession()
    │     └── { sessionActive:true, elapsedSeconds:0, sessionStart:Date.now() }
    │
    └── useEffect detects sessionActive=true
          └── setInterval(tickSecond, 1000) starts
                └── every 1s: elapsedSeconds++
                      └── timer display updates (HH:MM:SS)

User taps checklist item
    │
    └── practiceStore.toggleItem(id)
          └── completedItems: [...existing, id]  OR  filter out id

"Stop Session" pressed
    │
    ├── practiceStore.stopSession()
    │     └── { sessionActive:false }
    │         (elapsedSeconds preserved until next startSession)
    │
    ├── clearInterval(tickRef.current)
    │
    └── progressStore.addEntry({
          id: Date.now().toString(),
          date: "2026-05-10",
          durationSeconds: elapsedSeconds,
          completedItems: [...],
          bpmAchieved: {}
        })
          ├── log = [...existing, newEntry]
          ├── streak = calcStreak(log)
          └── AsyncStorage.setItem("practice_log_v1", JSON)
```

---

### Metronome Engine Flow

```
The lookahead scheduler fires every 25ms, looks 150ms ahead,
and schedules individual beats via setTimeout for precise timing.
This avoids the ±16ms jitter of using setInterval directly for beats.

metronomeStore.togglePlay()  ──►  metronomeEngine.start()
                                        │
                                  nextBeatTime = now
                                  setInterval(runScheduler, 25ms)
                                        │
                            ┌───────────┘  every 25ms
                            ▼
                      runScheduler()
                            │
                      now = Date.now() / 1000
                      window = now + 0.15s
                            │
                      while nextBeatTime < window:
                            │
                            ├── scheduleBeat(currentBeat, nextBeatTime)
                            │       │
                            │   delayMs = (scheduledTime - now) * 1000
                            │       │
                            │   setTimeout(async () => {
                            │     sound.setPositionAsync(0)
                            │     sound.playAsync()          ← expo-av
                            │     onBeat(beatNumber, time)   ← callback
                            │   }, delayMs)
                            │
                            ├── nextBeatTime += 60 / bpm
                            └── currentBeat = (currentBeat+1) % timeSignature


onBeat callback  (owned by useMetronome hook)
    │
    ├── metronomeStore.setCurrentBeat(beat)
    │     └── BeatIndicator re-renders → Animated.spring pulse
    │
    └── expo-haptics.impactAsync(
          beat === 0 ? Heavy : Light
        )


BPM Ramp (optional):
    startRamp()
        └── BpmRampController.start(startBpm, endBpm, durationMin, ...)
              └── setInterval every 1000ms:
                    progress = elapsed / totalMs
                    bpm = startBpm + (endBpm - startBpm) * progress
                    metronomeEngine.setBpm(bpm)   ← engine picks it up next scheduler tick
                    when progress >= 1: stop()


Tap Tempo:
    TapTempoButton pressed
        └── metronomeStore.tapTempo()
              └── TapTempoCalculator.tap()
                    ├── gap > 2000ms? → reset taps[]
                    ├── push timestamp
                    ├── keep last 8 taps
                    └── avg interval → 60000 / avg → BPM (clamped 20–400)
```

---

### Scales Navigation Flow

```
User opens Scales tab
    │
    ▼
ScalesScreen mounts
    │
    ├── selectedKey = 'C'  (default)
    └── selectedPos = 0

User taps key chip (e.g. "G")
    │
    └── setSelectedKey("G")
        setSelectedPos(0)       ← reset to first position
              │
        scale = SCALES.find(s => s.key === "G")
              │
        FretboardSVG receives new position data
              │
        ┌─────────────────────────────┐
        │      FretboardSVG render     │
        │─────────────────────────────│
        │  1. Scan all strings for     │
        │     min/max fret used        │
        │  2. startFret = minFret - 1  │
        │  3. Compute fretW, stringH   │
        │  4. Draw:                    │
        │     - Fret lines (nut=thick) │
        │     - String lines (colored) │
        │     - Fret numbers above     │
        │     - String labels (E,A..e) │
        │     - Note circles (gold)    │
        │       + note name inside     │
        │       + finger number above  │
        └─────────────────────────────┘

User taps "▶ Play with Metronome"
    │
    └── router.push('/metronome?bpm=80&label=G+Scale')
          │
          ▼
    MetronomeScreen mounts
          │
    useLocalSearchParams() → { bpm:"80", label:"G Scale" }
          │
    setBpm(80)
    setExerciseContext({ label:"G Scale", targetBpm:80 })
          │
    Context banner shows at top of metronome screen
```

---

### Exercise-to-Metronome Deep Link Flow

```
User opens Exercises tab → selects "Right Hand" sub-tab
    │
    ▼
ExerciseCard renders (e.g. "Ex 1 – D U D U", startBpm:60, targetBpm:120)
    │
User taps "▶ Practice"
    │
    └── router.push('/metronome?bpm=60&label=RH+1+–+D+U+D+U')
              │
              ▼
        metronome.tsx receives params
              │
        setBpm(60)           ← sets engine + store BPM
        setExerciseContext({
          label: "RH 1 – D U D U",
          targetBpm: 120
        })
              │
        Context bar appears:
        ┌──────────────────────────────────┐
        │  RH 1 – D U D U · target 120 BPM│
        └──────────────────────────────────┘

Same flow for Alankars:
    AlankaarCard "▶ Practice" → /metronome?bpm=80&label=Alankar+1+–+Straight
    
Same flow for Scales:
    "▶ Play with Metronome" → /metronome?bpm=80&label=C+Scale
```

---

## State Management

Three Zustand stores — each owns a distinct concern.

```
┌──────────────────────────────────────────────────────────────┐
│  metronomeStore                                              │
│──────────────────────────────────────────────────────────────│
│  STATE                          ACTIONS                      │
│  bpm: number (20–400)           setBpm(n)                   │
│  isPlaying: boolean             togglePlay()                 │
│  timeSignature: 2|3|4|6         setTimeSignature(ts)        │
│  currentBeat: number            setCurrentBeat(n)           │
│  rampEnabled: boolean           setRampEnabled(b)           │
│  rampStartBpm: number           setRampStartBpm(n)          │
│  rampEndBpm: number             setRampEndBpm(n)            │
│  rampDurationMin: number        setRampDurationMin(n)       │
│  rampProgress: number           startRamp() / stopRamp()    │
│  exerciseContext: obj|null      setExerciseContext(ctx)      │
│                                 tapTempo()                   │
└──────────────────────────────────────────────────────────────┘
  NOTE: setBpm() calls metronomeEngine.setBpm() directly.
        togglePlay() calls metronomeEngine.start()/stop().
        onBeat is NOT set here — useMetronome hook owns it.

┌──────────────────────────────────────────────────────────────┐
│  practiceStore                                               │
│──────────────────────────────────────────────────────────────│
│  STATE                          ACTIONS                      │
│  sessionActive: boolean         startSession()               │
│  sessionStart: number|null      stopSession()                │
│  elapsedSeconds: number         tickSecond()                 │
│  completedItems: string[]       toggleItem(id)               │
│                                 resetSession()               │
└──────────────────────────────────────────────────────────────┘
  NOTE: The timer interval lives in the component (index.tsx),
        not in the store, to avoid Zustand closure issues.

┌──────────────────────────────────────────────────────────────┐
│  progressStore                                               │
│──────────────────────────────────────────────────────────────│
│  STATE                          ACTIONS                      │
│  log: PracticeEntry[]           loadFromStorage()           │
│  bpmRecords: Record<id,bpm>     addEntry(entry)             │
│  streak: number                 updateBpmRecord(id, bpm)    │
│  loaded: boolean                                             │
└──────────────────────────────────────────────────────────────┘
  NOTE: streak is recomputed on every addEntry() call.
        bpmRecords is in-memory only (not persisted to storage).
```

---

## Metronome Engine — Lookahead Scheduler

The core insight: `setInterval` has ±10–30ms jitter which is musically unacceptable. The lookahead pattern fires a fast polling loop (25ms) that schedules individual beats via `setTimeout` with a calculated future delay. By the time the delay fires, the scheduler has already moved on — eliminating the accumulation of interval jitter.

```
Time →

  t=0ms   t=25ms  t=50ms  t=75ms  t=100ms  t=125ms  t=150ms  t=175ms
  │       │       │       │       │        │        │        │
  ▼       ▼       ▼       ▼       ▼        ▼        ▼        ▼
 [S]     [S]     [S]     [S]     [S]      [S]      [S]      [S]
                                                             ↑
                                                    Beat fires here

  S = scheduler tick (setInterval 25ms)
  Each S looks 150ms ahead and schedules any beats in that window

  At t=0ms, scheduler sees beat at t=120ms → setTimeout(beat, 120ms)
  At t=25ms, beat at t=120ms already scheduled, nothing to do
  ...
  At t=120ms, setTimeout fires → sound.playAsync() + onBeat callback

Constants (MetronomeEngine.ts):
  LOOKAHEAD_SECONDS  = 0.15   (schedule 150ms ahead)
  SCHEDULER_INTERVAL = 25ms   (poll every 25ms)

BPM range: 20 – 400 (enforced in setBpm())
```

---

## Storage Layer

```
┌─────────────────────────────────────────────────────────────┐
│                 AsyncStorage (device-local)                  │
├───────────────────────┬─────────────────────────────────────┤
│  Key                  │  Value (JSON)                        │
├───────────────────────┼─────────────────────────────────────┤
│  practice_log_v1      │  PracticeEntry[]                    │
│                       │  Full array replaced on each write  │
├───────────────────────┼─────────────────────────────────────┤
│  user_settings_v1     │  UserSettings                       │
│                       │  Merged with DEFAULTS on read       │
└───────────────────────┴─────────────────────────────────────┘

practiceLog.ts:
  loadLog()  → AsyncStorage.getItem → JSON.parse → PracticeEntry[]
  saveLog()  → JSON.stringify → AsyncStorage.setItem

settings.ts:
  loadSettings() → merge with DEFAULTS (partial JSON safe)
  saveSettings(partial) → load current → spread partial → save

Failure handling: all storage calls are wrapped in try/catch.
  Failed reads return [] or DEFAULTS (never throws to UI).
  Failed writes fail silently (non-critical data).
```

---

## Component Tree

```
RootLayout (app/_layout.tsx)
└── Stack (expo-router)
    └── TabLayout (app/(tabs)/_layout.tsx)
        │
        ├── PracticeHome  (app/(tabs)/index.tsx)
        │     Uses: usePracticeStore, useProgressStore
        │
        ├── MetronomeScreen  (app/(tabs)/metronome.tsx)
        │     Uses: useMetronome()  →  useMetronomeStore + metronomeEngine.onBeat
        │     ├── BeatIndicator      [Animated.spring pulsing dots]
        │     ├── BpmDisplay         [large number, inline edit]
        │     ├── BpmStepper         [±1/±5/±10, long-press repeat]
        │     ├── PresetButtons      [60/80/100/120/140/160]
        │     ├── PlayStopButton     [togglePlay]
        │     ├── TapTempoButton     [tapTempo]
        │     ├── TimeSignature      [2/3/4/6 selector]
        │     └── RampControl        [Animated.timing expandable]
        │
        ├── ScalesScreen  (app/(tabs)/scales.tsx)
        │     ├── KeySelector        [C/G/D/A/E/B tabs]
        │     ├── NoteChip[]         [scale notes, sharps highlighted]
        │     ├── Position tabs      [Position 1, Position 2, ...]
        │     └── FretboardSVG       [react-native-svg diagram]
        │
        ├── ExercisesScreen  (app/(tabs)/exercises.tsx)
        │     Tab: "rh"
        │     └── ExerciseCard[]     [pattern display + practice button]
        │     Tab: "lh"
        │     └── LH string selector + fingerNote list + pattern grid
        │     Tab: "alankars"
        │     └── AlankaarCard[]     [expandable ascending/descending]
        │
        └── ProgressScreen  (app/(tabs)/progress.tsx)
              Uses: useProgressStore
              ├── Stats row          [total days / streak / monthly mins]
              ├── Calendar heatmap   [35 day grid, gold = practiced]
              └── BPM record bars    [RH exercises + Alankars]
```

---

## Theme System

All colors, fonts, and spacing are imported from `src/theme/`. Never hardcode values in components.

```typescript
// src/theme/colors.ts
colors.background    // '#0d0803'  — near-black warm brown
colors.surface       // '#1a1208'  — card background
colors.surfaceHigh   // '#2a1808'  — elevated card
colors.gold          // '#d4a55a'  — primary accent
colors.goldDim       // '#8a6030'  — muted accent
colors.textPrimary   // '#e8d4b0'  — body text
colors.textSecondary // '#7a6050'  — labels, captions
colors.success       // '#7cd87c'  — green
colors.error         // '#e87c7c'  — red
colors.strings.E     // '#e8a87c'  — per-string colors for fretboard

// src/theme/spacing.ts  (4-pt grid)
spacing.xs  =  4
spacing.sm  =  8
spacing.md  = 12
spacing.lg  = 16
spacing.xl  = 24
spacing.xxl = 32

// src/theme/typography.ts
typography.heading  // bold font family
typography.mono     // monospace font family
typography.sm / .md / .lg / .xl  // font sizes
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI: `npm install -g expo-cli`
- Expo Go app on your iOS/Android device, OR Android emulator / iOS Simulator

### Install & Run

```bash
# 1. Clone / navigate to the project
cd GuitarPractice

# 2. Install dependencies
npm install --legacy-peer-deps

# 3. Start the dev server (clear cache on first run)
npx expo start --clear

# 4. Scan QR code with Expo Go (Android)
#    Or press 'a' to open Android emulator
#    Or press 'w' to open in web browser
```

### Platform-specific notes

| Platform | Command | Notes |
|---|---|---|
| Android (Expo Go) | `npx expo start --clear` then scan QR | Audio + haptics fully work |
| iOS (Expo Go) | Same | Silent switch must be off for audio |
| Web | Press `w` | Audio works; haptics silently no-op |
| Android emulator | Press `a` | Haptics silently no-op |

### TypeScript check

```bash
npx tsc --noEmit
```

### Export static bundle (CI / testing)

```bash
npx expo export --platform android --dev
npx expo export --platform web --dev
```

---

## Known Issues / Gotchas

| Issue | Root cause | Status |
|---|---|---|
| `expo-av` deprecation warning | SDK 54 ships expo-audio as replacement | Deferred — audio still works |
| `react-native-reanimated` not used | v4 TurboModule incompatible with Expo Go | Replaced with `Animated` API |
| `bpmRecords` not persisted | Stored in RAM only (progressStore) | Will persist in v2 |
| Web haptics | `expo-haptics` no-ops silently on web | Expected behavior |
| `--legacy-peer-deps` required | react-dom version mismatch with react 19 | npm install must use this flag |

---

## Roadmap

- **v1.1** — Persist `bpmRecords` to AsyncStorage; add settings screen (default BPM, key, haptic toggle)
- **v1.2** — Migrate `expo-av` → `expo-audio` (SDK 54 preferred API)
- **v1.3** — Native build via EAS Build (unlocks react-native-reanimated v4 animations)
- **v2.0** — Custom exercise builder; MIDI metronome output; iCloud/Google Drive sync
- **App Store** — EAS Build + `eas.json` config; 1024×1024 icon; privacy policy (AsyncStorage is local-only, no network calls)
