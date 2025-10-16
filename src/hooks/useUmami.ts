// src/hooks/useUmami.ts

import { useCallback } from 'react';

// Etkinlik verilerinin (Custom Data) yapısını tanımlayan bir arayüz (interface).
// Bu, eventData'nın her zaman bir nesne (key-value çifti) olmasını sağlar.
interface UmamiEventData {
  [key: string]: string | number | boolean | null | undefined;
}

// Umami global nesnesinin tipini, güvenli bir şekilde tanımlıyoruz.
// Next.js (browser) ortamında umami nesnesi window üzerinde bulunur.
declare global {
  interface Window {
    umami?: {
      track: (eventName: string, eventData?: UmamiEventData) => void;
      // İsteğe bağlı olarak, Umami'nin diğer fonksiyonlarını da buraya ekleyebilirsiniz.
    };
  }
}

/**
 * Umami'nin özel etkinlik takibi için tip güvenli bir React Hook'u.
 *
 * @returns {object} trackEvent: Özel bir Umami etkinliğini tetiklemek için fonksiyon.
 */
export const useUmami = () => {
  const trackEvent = useCallback((eventName: string, eventData: UmamiEventData = {}) => {
    // 1. Tip Güvenli ve Çevre Kontrolü: 
    // TypeScript ile window.umami'yi kontrol ederken global tip tanımı kullanılır.
    if (typeof window !== 'undefined' && window.umami) {
      try {
        window.umami.track(eventName, eventData);
        
        // Opsiyonel: Geliştirme ortamında konsola log atma
        if (process.env.NODE_ENV === 'development') {
          console.log(`[Umami Tracker] Etkinlik Gönderildi: ${eventName}`, eventData);
        }
      } catch (error) {
        // İzleme fonksiyonu çağrılırken oluşabilecek potansiyel hataları yakalama
        console.error(`Umami etkinlik takibi başarısız oldu: ${eventName}`, error);
      }
    } else if (process.env.NODE_ENV === 'development') {
      console.warn(`[Umami Tracker] UYARI: Umami nesnesi tanımlı değil. Etkinlik gönderilemedi: ${eventName}`);
    }
  }, []);

  return { trackEvent };
};