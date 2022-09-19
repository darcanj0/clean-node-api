import { HttpRequest } from '../protocols/http'
import { forbidden } from '../helpers/http/http-helper'
import { AccessDeniedError } from '../errors'
import { AuthMiddleware } from './auth-middleware'
import { AccountModel } from '../../domain/models/account'
import { ILoadAccountByToken } from '../../domain/usecases/load-account-by-token'

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password'
})

const makeLoadAccountByTokenStub = (): ILoadAccountByToken => {
  class LoadAccountByTOkenStub implements ILoadAccountByToken {
    async load (token: string, role?: string): Promise<AccountModel | null> {
      return new Promise(resolve => resolve(makeFakeAccount()))
    }
  }
  return new LoadAccountByTOkenStub()
}

describe('AuthMiddleware', () => {
  test('Should return 403 if no x-access-token exists in headers', async () => {
    const sut = new AuthMiddleware(makeLoadAccountByTokenStub())
    const httpRequest: HttpRequest = {
      headers: {}
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should call LoadAccountByToken with correct x-access-token', async () => {
    const loadAccountByTokenStub = makeLoadAccountByTokenStub()
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load')
    const sut = new AuthMiddleware(loadAccountByTokenStub)
    const httpRequest: HttpRequest = {
      headers: {
        'x-access-token': 'any_token'
      }
    }
    await sut.handle(httpRequest)
    expect(loadSpy).toHaveBeenCalledWith('any_token')
  })
})
