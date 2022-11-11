const { Model } = require("objection")
import knex from "@/config/connection"

Model.knex(knex)

class Client extends Model {
  static get tableName() {
    return "users_informations"
  }

  // to make relation with other tables
  //static get relationMappings() {}
}

export default Client
