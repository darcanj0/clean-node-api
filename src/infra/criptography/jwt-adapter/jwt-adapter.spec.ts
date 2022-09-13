import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

const secret = 'any_secret'

interface SutTypes {
  sut: JwtAdapter
}

const makeSut = (): SutTypes => {
  const sut = new JwtAdapter(secret)
  return { sut }
}

describe('Jwt Adapter', () => {
  test('Should call sign with correct values', async () => {
    const { sut } = makeSut()
    const encrypterSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt('any_id')
    expect(encrypterSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'any_secret')
  })
})
