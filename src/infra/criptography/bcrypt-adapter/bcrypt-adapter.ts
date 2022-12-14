import bcrypt from 'bcrypt'
import { IHashComparer } from '../../../data/protocols/criptography/hash-comparer'
import { IHasher } from '../../../data/protocols/criptography/hasher'

export class BcryptAdapter implements IHasher, IHashComparer {
  constructor (private readonly salt: number) {}

  async hash (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }

  async compare (value: string, hashedValue: string): Promise<boolean> {
    const compairson = await bcrypt.compare(value, hashedValue)
    return compairson
  }
}
