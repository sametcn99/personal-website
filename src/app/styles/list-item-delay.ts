export default function applyDelayedAnimation(index: any) {
    const animationDelay = index * 0.2; // Her öğe için farklı gecikme hesapla
    return {
      animation: `listItemFadeIn 0.5s ease forwards`,
      animationDelay: `${animationDelay}s`,
      opacity: 0,
      transform: 'translateX(-10px)'
    };
  }
  