import { IEncrypter } from '../../../data/protocols/criptography/encrypter'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements IEncrypter {
  constructor (private readonly secret: string) {}

  async encrypt (id: string): Promise<string> {
    return jwt.sign({ id }, this.secret)
  }
}
