import { DbLoadAccountByToken } from './db-load-account-by-token'
import { IDecrypter } from './db-load-account-by-token-protocols'

const makeFakeToken = (): string => 'any_token'

const makeDecrypterStub = (): IDecrypter => {
  class DecrypterStub implements IDecrypter {
    async decrypt (token: string): Promise<any> {
      return new Promise(resolve => resolve({}))
    }
  }
  return new DecrypterStub()
}

interface SutTypes {
  decrypterStub: IDecrypter
  sut: DbLoadAccountByToken
}

const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypterStub()
  const sut = new DbLoadAccountByToken(decrypterStub)
  return { sut, decrypterStub }
}

describe('DbLoadAccountByToken', () => {
  test('Should call Decrypter with correct values', async () => {
    const { decrypterStub, sut } = makeSut()
    const decrypterSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.load(makeFakeToken())
    expect(decrypterSpy).toHaveBeenCalledWith(makeFakeToken())
  })

  test('Should return null if Decrypter returns null', async () => {
    const { decrypterStub, sut } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const account = await sut.load(makeFakeToken())
    expect(account).toBeNull()
  })
})
