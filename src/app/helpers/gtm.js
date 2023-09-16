export function initializeGTM() {
    const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
    
    if (GTM_ID) {
      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`;
      script.async = true;
      document.head.appendChild(script);
  
      script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          window.dataLayer.push(arguments);
        }
        gtag("js", new Date());
        gtag("config", GTM_ID);
      };
    }
  }
  