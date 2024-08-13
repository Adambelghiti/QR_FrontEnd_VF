// src/qrcode.d.ts
declare module 'qrcode' {
  export function toDataURL(
    text: string,
    callback: (error: any, url: string) => void
  ): void;
}
