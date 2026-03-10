// ─── NewCab — App Theme ──────────────────────────────────────────────────────

export const Colors = {
  // Brand
  primary:          '#FF6600',
  primaryDark:      '#E05500',

  // Backgrounds
  pageBg:           '#F0F0F0',   // grey page behind booking card
  white:            '#FFFFFF',
  headerBg:         '#FF6600',

  // Text
  textPrimary:      '#111111',
  textSecondary:    '#444444',
  textMuted:        '#999999',
  textWhite:        '#FFFFFF',

  // Inputs
  inputBorder:      '#C8C8C8',
  divider:          '#E5E5E5',

  // Toggle
  toggleActiveBorder: '#3B82F6',
  toggleActiveText:   '#3B82F6',
  toggleInactiveBg:   '#EBEBEB',
  toggleInactiveText: '#888888',

  // Misc
  dotBullet:        '#888888',
  error:            '#EF4444',

  // Bottom nav
  navBg:            '#1A1A1A',
  navActive:        '#FF6600',
  navInactive:      '#7A7A7A',
};

export const FontSize = {
  xs:      10,
  sm:      12,
  md:      14,
  base:    15,
  lg:      16,
  xl:      18,
  xxl:     20,
  display: 22,
};

export const FontWeight = {
  regular:   '400' as const,
  medium:    '500' as const,
  semiBold:  '600' as const,
  bold:      '700' as const,
  extraBold: '800' as const,
};

export const Spacing = {
  xs:  4,
  sm:  8,
  md:  12,
  lg:  16,
  xl:  20,
  xxl: 24,
};

export const Radius = {
  sm:   8,
  md:   12,
  lg:   16,
  xl:   20,
  full: 999,
};

export const Shadow = {
  card: {
    shadowColor:   '#000',
    shadowOffset:  { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius:  6,
    elevation:     4,
  },
  centerBtn: {
    shadowColor:   '#FF6600',
    shadowOffset:  { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius:  8,
    elevation:     10,
  },
};

const AppTheme = { Colors, FontSize, FontWeight, Spacing, Radius, Shadow };
export default AppTheme;