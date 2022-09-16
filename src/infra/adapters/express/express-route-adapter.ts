import { Request, Response } from 'express'
import { HttpRequest, IController } from '../../../presentation/protocols'

export const adaptRoute = (controller: IController) => {
  return async (req: Request, res: Response): Promise<Response> => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const httpResponse = await controller.handle(httpRequest)
    if (httpResponse.statusCode === 200) {
      return res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      return res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
