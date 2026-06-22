import { ScrollViewStyleReset } from 'expo-router/html';
import type { PropsWithChildren } from 'react';

const SITE_URL = 'https://guitar.brilworks.com';
const SITE_NAME = 'Guitar Practice Companion';
const DESCRIPTION =
  'Free guitar practice app with auto-ramping metronome, major scale fretboard visualizer, 8 picking drills, and daily progress tracking. Available on iOS, Android, and web.';
const OG_IMAGE = `${SITE_URL}/og-image.png`;

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: DESCRIPTION,
      inLanguage: 'en-US',
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/favicon.ico`,
        width: 512,
        height: 512,
      },
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'drdhavaltrivedi5@gmail.com',
        contactType: 'customer support',
      },
      sameAs: [
        'https://play.google.com/store/apps/details?id=com.guitarapp.practice',
        'https://apps.apple.com/us/app/guitar-practice-companion/id6778313335',
      ],
    },
    {
      '@type': 'MobileApplication',
      '@id': `${SITE_URL}/#app`,
      name: SITE_NAME,
      alternateName: ['Guitar Practice App', 'Guitar Metronome App', 'Guitar Scale Trainer'],
      description:
        'Structured guitar training app with auto-ramping metronome, major scale fretboard visualizer, 8 picking and dexterity drills, and daily progress log. 100% free, offline, no account needed.',
      applicationCategory: 'MusicApplication',
      applicationSubCategory: 'Guitar Practice Tool',
      operatingSystem: 'iOS 15+, Android 8+, Web',
      url: SITE_URL,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      installUrl: [
        'https://apps.apple.com/us/app/guitar-practice-companion/id6778313335',
        'https://play.google.com/store/apps/details?id=com.guitarapp.practice',
      ],
      featureList: [
        'Auto-ramping metronome with custom start and target BPM',
        '8 structured picking and dexterity drills',
        'Major scale fretboard visualizer for C, G, D, A, E, B',
        'Daily practice log and streak tracking',
        'Weekly goal progress',
        '100% offline – no internet required',
        'Zero data collection – no account or sign-up',
      ],
      softwareVersion: '1.0.0',
      author: {
        '@type': 'Person',
        name: 'Dhaval Trivedi',
        email: 'drdhavaltrivedi5@gmail.com',
      },
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is Guitar Practice Companion?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Guitar Practice Companion is a free mobile and web app for structured guitar practice. It includes an auto-ramping metronome, a major scale fretboard visualizer (C, G, D, A, E, B), 8 targeted picking and dexterity drills, and a daily practice log with streak tracking. It works fully offline and requires no account.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I improve alternate picking speed on guitar?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'To improve alternate picking speed, start at a slow BPM (60–80) where every note is clean, then increase tempo by 5 BPM each day. Guitar Practice Companion automates this with its auto-ramping metronome — set a start BPM and a target BPM, and the app progressively pushes your speed while keeping your technique tight.',
          },
        },
        {
          '@type': 'Question',
          name: 'What BPM should I start practicing guitar at?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Start at a BPM slow enough to play each note cleanly without tension — typically 60–80 BPM for most drills. Accuracy before speed is the golden rule. Guitar Practice Companion lets you set a comfortable start BPM and auto-ramp up to your goal tempo, building muscle memory correctly from day one.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I learn major scale positions on guitar?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Learn major scales by visualizing each position on the fretboard, then practicing slowly with a metronome. Guitar Practice Companion includes an interactive fretboard visualizer for the C, G, D, A, E, and B major scales across multiple fingering positions, making it easy to memorize patterns before practicing with the metronome.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is Guitar Practice Companion free?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, Guitar Practice Companion is completely free. It is available on iOS (App Store), Android (Google Play), and as a web app at guitar.brilworks.com. There are no subscriptions, no in-app purchases, no ads, and no account required.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does Guitar Practice Companion work offline?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. The iOS and Android apps work completely offline — no internet connection required for the metronome, scale visualizer, or drills. All practice data is stored locally on your device and is never uploaded anywhere.',
          },
        },
        {
          '@type': 'Question',
          name: 'What guitar practice drills are included in the app?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Guitar Practice Companion includes 8 structured drills: alternate picking exercises for right-hand speed and precision, spider/finger independence drills for left-hand coordination, and melodic Alankar drills for advanced picking patterns. Every drill integrates with the auto-ramping metronome for tempo-based progression.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the best free metronome app for guitar?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Guitar Practice Companion is a top free metronome app built specifically for guitarists. Unlike generic metronomes, it features auto-ramping (automatically increases BPM over time), a lookahead precision engine for rock-solid timing, and is paired with structured picking drills and a scale visualizer — all in one free app on iOS, Android, and web.',
          },
        },
        {
          '@type': 'Question',
          name: 'How many hours should I practice guitar per day?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Most guitar teachers recommend 30–60 minutes of focused, structured practice per day over long unstructured sessions. Guitar Practice Companion helps you make every minute count with targeted drills, a precise metronome, and a progress log to stay consistent and see measurable improvement week over week.',
          },
        },
      ],
    },
    {
      '@type': 'HowTo',
      '@id': `${SITE_URL}/#howto`,
      name: 'How to use Guitar Practice Companion to build guitar speed and technique',
      description:
        'A step-by-step guide to structured guitar practice using Guitar Practice Companion on iOS, Android, or web.',
      totalTime: 'PT30M',
      supply: [{ '@type': 'HowToSupply', name: 'Guitar' }],
      tool: [
        {
          '@type': 'HowToTool',
          name: 'Guitar Practice Companion app',
          url: SITE_URL,
        },
      ],
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Choose your drill',
          text: 'Open the Exercises tab and select one of 8 picking or dexterity drills — right-hand alternate picking, left-hand independence, or melodic Alankar patterns.',
          url: `${SITE_URL}/#drills`,
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Set your tempo',
          text: 'Configure a starting BPM you can play cleanly, a target BPM goal, and an auto-ramp interval. The metronome will push your speed up automatically during each session.',
          url: `${SITE_URL}/#metronome`,
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Visualize your scale',
          text: 'Use the Scales tab to study the fretboard pattern for your scale of the day (C, G, D, A, E, or B major). Play it along with the metronome at a slow tempo.',
          url: `${SITE_URL}/#scales`,
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Log your progress',
          text: 'After each session, record your achieved BPM and notes in the Progress tab. Build your daily streak and track your weekly practice goal.',
          url: `${SITE_URL}/#progress`,
        },
      ],
    },
  ],
};

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        {/* Charset & Viewport */}
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

        {/* Primary SEO */}
        <title>{SITE_NAME} – Free Metronome, Scale Trainer & Picking Drills for Guitar</title>
        <meta name="description" content={DESCRIPTION} />
        <meta
          name="keywords"
          content="guitar practice app, guitar metronome, alternate picking speed, major scale guitar, guitar scale visualizer, picking drills, guitar dexterity exercises, free guitar app, guitar training app, metronome app for guitar, guitar BPM trainer, guitar progress tracker"
        />
        <meta name="author" content="Dhaval Trivedi" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href={SITE_URL} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={`${SITE_NAME} – Free Guitar Metronome & Practice Drills`} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Guitar Practice Companion app screenshot" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter / X Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${SITE_NAME} – Free Guitar Metronome & Practice Drills`} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE} />

        {/* App Store Smart Banners */}
        <meta name="apple-itunes-app" content="app-id=6778313335" />
        <meta name="google-play-app" content="app-id=com.guitarapp.practice" />

        {/* PWA / Mobile */}
        <meta name="application-name" content={SITE_NAME} />
        <meta name="apple-mobile-web-app-title" content={SITE_NAME} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#FF6B00" />
        <meta name="msapplication-TileColor" content="#0A0A0A" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />

        {/* Expo web style reset */}
        <ScrollViewStyleReset />

        {/* Structured Data: SEO + AEO + GEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
