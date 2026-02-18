import type { Transition } from "framer-motion";

export const ANIMATION = {
  duration: {
    fast: 0.2,
    normal: 0.3,
    slow: 0.5,
    slower: 0.8
  },
  easing: {
    easeOut: [0.0, 0.0, 0.2, 1.0] as [number, number, number, number],
    easeInOut: [0.4, 0.0, 0.2, 1.0] as [number, number, number, number]
  },
  stagger: {
    fast: 0.05,
    normal: 0.1,
    slow: 0.15
  }
} as const;

/** Pre-built Framer Motion transition objects — spread these at the transition root level */
export const TRANSITIONS = {
  spring: {
    type: "spring",
    stiffness: 300,
    damping: 30
  } satisfies Transition,
  bounce: {
    type: "spring",
    stiffness: 400,
    damping: 10
  } satisfies Transition,
  smooth: {
    duration: ANIMATION.duration.slow,
    ease: ANIMATION.easing.easeOut
  } satisfies Transition,
  fast: {
    duration: ANIMATION.duration.fast,
    ease: ANIMATION.easing.easeOut
  } satisfies Transition
};
