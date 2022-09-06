import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri)
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  },

  map (collection: any): any {
  // _id é desconstruído e armazenado numa variável homônima
  // 'accountWithoutId' é um objetos com todos os atributos de 'accountById', exceto o _id, que virou variável
    const { _id, ...collectionWithoutId } = collection
    return Object.assign({}, collectionWithoutId, { id: _id.toHexString() })
  }
}
