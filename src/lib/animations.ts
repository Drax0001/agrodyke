export const ANIMATION = {
  duration: {
    fast: 0.2,
    normal: 0.3,
    slow: 0.5,
    slower: 0.8
  },
  easing: {
    easeOut: [0.0, 0.0, 0.2, 1.0],
    easeInOut: [0.4, 0.0, 0.2, 1.0],
    spring: { type: "spring", stiffness: 300, damping: 30 },
    bounce: { type: "spring", stiffness: 400, damping: 10 }
  },
  stagger: {
    fast: 0.05,
    normal: 0.1,
    slow: 0.15
  }
} as const;
