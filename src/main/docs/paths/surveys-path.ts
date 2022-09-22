export const surveysPath = {
  post: {
    tags: ['Survey'],
    summary: 'Realiza criação de uma enquete',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/survey'
          }
        }
      }
    },
    responses: {
      204: {
        description: 'no content - criado com sucesso'
      },
      400: {
        $ref: '#/components/badRequest'
      },
      401: {
        $ref: '#/components/unauthorized'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  },
  get: {
    tags: ['Survey'],
    summary: 'Lista todas as enquetes',
    responses: {
      200: {
        description: 'sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/surveys'
            }
          }
        }
      },
      403: {
        $ref: '#/components/forbidden'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
