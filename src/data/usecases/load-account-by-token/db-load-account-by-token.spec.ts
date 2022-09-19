import { DbLoadAccountByToken } from './db-load-account-by-token'
import { IDecrypter } from './db-load-account-by-token-protocols'

const makeFakeToken = (): string => 'any_token'
const makeFakeRole = (): string => 'any_role'

describe('DbLoadAccountByToken', () => {
  test('Should call Decrypter with correct values', async () => {
    class DecrypterStub implements IDecrypter {
      async decrypt (token: string): Promise<any> {
        return new Promise(resolve => resolve({}))
      }
    }
    const decrypterStub = new DecrypterStub()
    const sut = new DbLoadAccountByToken(decrypterStub)
    const decrypterSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.load(makeFakeToken(), makeFakeRole())
    expect(decrypterSpy).toHaveBeenCalledWith(makeFakeToken())
  })
})
