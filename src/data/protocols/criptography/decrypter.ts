export interface IDecrypter {
  decrypt: (token: string) => Promise<any>
}
