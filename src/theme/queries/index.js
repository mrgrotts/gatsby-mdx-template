const SIZES = {
  xs: 576, // 36rem
  sm: 768, // 48rem
  md: 992, // 62rem
  lg: 1200, // 75 rem
  xl: 1440 // 90 rem
}

export const DesktopFirstMediaQuery = size =>
  `@media (max-width: ${SIZES[size]}px)`

export const MobileFirstMediaQuery = size =>
  `@media (min-width: ${SIZES[size]}px)`
