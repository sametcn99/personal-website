export default function applyDelayedAnimation(index: number, delay: number) {
  return {
    animation: `listItemFadeIn 1s ease forwards`,
    animationDelay: `${index * delay}s`,
  };
}
