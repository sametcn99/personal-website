// GoogleTagManager.js or GoogleTagManager.ts
import React from "react";

export function GoogleTagManager({ GTM_ID }) {
  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag() {
              dataLayer.push(arguments);
            }
            gtag("js", new Date());
            gtag("config", "${GTM_ID}");
          `,
        }}
      />
    </>
  );
}
