export const convertImageToBase64 = (data: Uint8Array): string => {
  return btoa(data.reduce((data, byte) => data + String.fromCharCode(byte), ''))
}
