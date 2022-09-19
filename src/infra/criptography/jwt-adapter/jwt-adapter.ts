import jwt from 'jsonwebtoken'
import { IEncrypter } from '../../../data/protocols/criptography/encrypter'
import { IDecrypter } from '../../../data/protocols/criptography/decrypter'

export class JwtAdapter implements IEncrypter, IDecrypter {
  constructor (private readonly secret: string) {}

  async encrypt (id: string): Promise<string> {
    return jwt.sign({ id }, this.secret)
  }

  async decrypt (token: string): Promise<any> {
    return jwt.verify(token, this.secret)
  }
}
