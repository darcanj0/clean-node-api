import { DbLoadAccountByToken } from './db-load-account-by-token'
import { IDecrypter, ILoadAccountByTokenRepository } from './db-load-account-by-token-protocols'

const makeFakeParams = (): ILoadAccountByTokenRepository.Params => ({ token: 'any_token', role: 'any_role' })

const makeFakeAccount = (): ILoadAccountByTokenRepository.Result => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email',
  password: 'hashed_password'
})

const makeDecrypterStub = (): IDecrypter => {
  class DecrypterStub implements IDecrypter {
    async decrypt (token: string): Promise<any> {
      return new Promise(resolve => resolve({}))
    }
  }
  return new DecrypterStub()
}

const makeLoadAccountByTokenRepositoryStub = (): ILoadAccountByTokenRepository => {
  class LoadAccountByTokenRepositoryStub implements ILoadAccountByTokenRepository {
    async loadByToken (params: ILoadAccountByTokenRepository.Params): Promise<ILoadAccountByTokenRepository.Result> {
      return new Promise(resolve => resolve(makeFakeAccount()))
    }
  }
  return new LoadAccountByTokenRepositoryStub()
}

type SutTypes = {
  decrypterStub: IDecrypter
  loadAccountByTokenRepositoryStub: ILoadAccountByTokenRepository
  sut: DbLoadAccountByToken
}

const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypterStub()
  const loadAccountByTokenRepositoryStub = makeLoadAccountByTokenRepositoryStub()
  const sut = new DbLoadAccountByToken(decrypterStub, loadAccountByTokenRepositoryStub)
  return { sut, decrypterStub, loadAccountByTokenRepositoryStub }
}

describe('DbLoadAccountByToken', () => {
  test('Should call Decrypter with correct values', async () => {
    const { decrypterStub, sut } = makeSut()
    const decrypterSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.load(makeFakeParams())
    expect(decrypterSpy).toHaveBeenCalledWith(makeFakeParams().token)
  })

  test('Should return null if Decrypter returns null', async () => {
    const { decrypterStub, sut } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const account = await sut.load(makeFakeParams())
    expect(account).toBeNull()
  })

  test('Should call LoadAccountByTokenRepository with correct values', async () => {
    const { loadAccountByTokenRepositoryStub, sut } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')
    await sut.load(makeFakeParams())
    expect(loadSpy).toHaveBeenCalledWith(makeFakeParams())
  })

  test('Should return null if Decrypter returns null', async () => {
    const { loadAccountByTokenRepositoryStub, sut } = makeSut()
    jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const account = await sut.load(makeFakeParams())
    expect(account).toBeNull()
  })

  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.load(makeFakeParams())
    expect(account).toEqual(makeFakeAccount())
  })

  test('Should throw if Decrypter throws', async () => {
    const { decrypterStub, sut } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.load(makeFakeParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should throw if LoadAccountByTokenRepository throws', async () => {
    const { loadAccountByTokenRepositoryStub, sut } = makeSut()
    jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.load(makeFakeParams())
    await expect(promise).rejects.toThrow()
  })
})
