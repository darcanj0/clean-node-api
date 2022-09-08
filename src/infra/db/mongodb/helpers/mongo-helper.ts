import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  uri: null as string,

  async connect (uri: string): Promise<void> {
    this.uri = uri
    if (!this.client)
      this.client = await MongoClient.connect(uri)
  },

  async getCollection (name: string): Promise<Collection> {
    await this.connect(this.uri)
    return this.client.db().collection(name)
  },

  async disconnect (): Promise<void> {
    if (this.client !== null) {
      await this.client.close()
      this.client = null
    }
  },

  map (collection: any): any {
  // _id é desconstruído e armazenado numa variável homônima
  // 'accountWithoutId' é um objetos com todos os atributos de 'accountById', exceto o _id, que virou variável
    const { _id, ...collectionWithoutId } = collection
    return Object.assign({}, collectionWithoutId, { id: _id.toHexString() })
  }
}
