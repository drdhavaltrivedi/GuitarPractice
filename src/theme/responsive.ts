import { Dimensions, Platform } from 'react-native';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

// Design baseline is 390px wide (iPhone 14)
const BASE_WIDTH = 390;
const scale = SCREEN_W / BASE_WIDTH;

/** Scale a size relative to screen width — capped so large tablets don't over-inflate */
export function rs(size: number, maxScale = 1.3): number {
  return Math.round(size * Math.min(scale, maxScale));
}

/** Scale font sizes — slightly tighter cap than layout */
export function rf(size: number): number {
  return Math.round(size * Math.min(scale, 1.2));
}

/** True on tablets (width ≥ 768px) */
export const isTablet = SCREEN_W >= 768;

/** True on small phones (width < 360px) */
export const isSmall = SCREEN_W < 360;

/**
 * Bottom safe padding for scroll views — accounts for the tab bar.
 * Tab bar is ~60px + safe area bottom. Use this in contentContainerStyle paddingBottom.
 */
export const TAB_BAR_HEIGHT = rs(60);
export const SCROLL_BOTTOM_PAD = TAB_BAR_HEIGHT + rs(24);

export { SCREEN_W, SCREEN_H };
