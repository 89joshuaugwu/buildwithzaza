export {};

// Paystack Inline.js attaches this to window once the script tag loads
// (see /shop, which loads it via next/script). Declared once here so any
// page that needs it gets the type without redeclaring the global.
declare global {
  interface Window {
    PaystackPop?: {
      setup: (options: {
        key: string | undefined;
        email: string;
        amount: number;
        currency?: string;
        metadata?: Record<string, unknown>;
        callback: (response: { reference: string }) => void;
        onClose: () => void;
      }) => { openIframe: () => void };
    };
  }
}
