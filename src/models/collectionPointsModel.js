const connection = require('./connection')

const addressModel = require('./addressModel')

const { defaultStatus }  = require('../enum/defaultStatus')

const { cryptoFunction } = require('../helpers/crypto')

const getAll = async () => {
  try {
      const [points] = await connection.execute('SELECT * FROM collection_points');

      const promises = points.map(async (point) => {
          const [waste] = await connection.execute(`
              SELECT waste.name
              FROM waste_status
              JOIN waste ON waste_status.waste_id = waste.id
              WHERE collection_point_id = ?`, [point.cnpj]);

          return {
              ...point,
              wastes: waste
          };
      });
      const results = await Promise.all(promises);
      return results;
  } catch (error) {
      console.error('Erro ao executar a consulta:', error);
      throw error;
  }
};


const getCollectionPoint = async ({ login, password }) => {
  const [point] = await connection.execute(`SELECT * FROM collection_points WHERE email='${login}' AND password='${password}'`)
  return point
}

const insertCollectionPoint = async (point) => {

  const { address } = point

  const insertedAddress = await addressModel.insertAddress(address)
    .then(({ insertId }) => { return insertId })

  const {
    cnpj,
    corporate_name,
    trade_name,
    telephone,
    email,
    collection_days,
    collection_responsible_name,
    collection_responsible_email,
    password
  } = point

  const cnpjInt = parseInt(cnpj)
  const cipherpwd = cryptoFunction(password)

  const query = `INSERT INTO collection_points(cnpj, corporate_name, trade_name, telephone, email, collection_days, collection_responsible_name, collection_responsible_email, address_id, status, password)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

  const [insertedPoint] = await connection.query(query, [cnpjInt, corporate_name, trade_name, telephone, email, collection_days, collection_responsible_name, collection_responsible_email, insertedAddress, defaultStatus.active, cipherpwd])

  return insertedPoint

}

const getCollectionPointByWastes = async ({ wastes }) => {
  const wasteIds = wastes.join(', '); // Transforma o vetor em uma string separada por vírgulas

  const query = `SELECT collection_point_id FROM waste_status WHERE waste_id IN (${wasteIds}) AND status='${defaultStatus.active}'`;

  const [wastesToFilter] = await connection.execute(query);

  if(wastesToFilter.length >= 1 ) {
    const collectionPointIds = wastesToFilter.map(waste => waste.collection_point_id);
    const collectionPointIdsString = collectionPointIds.join(', ');
  
    const secondQuery = `SELECT * FROM collection_points WHERE cnpj IN (${collectionPointIdsString});`;
  
    const [result] = await connection.execute(secondQuery);
  
  
    return result

  } else {
    return []
  }

}

const deleteCollectionPoint = async (cnpj) => {
  const query = `UPDATE collection_points SET status='${defaultStatus.inactive}' WHERE cnpj='${cnpj}'`
  const deletedPoint = await connection.query(query)
  return deletedPoint
}

const getCollectionPointByCnpj = async (cnpj) => {
  const [point] = await connection.execute(` SELECT
    collection_points.*,
    JSON_OBJECT(
        'id', address.id,
        'street', address.street,
        'city', address.city
    ) AS address_details,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'id', waste.id,
            'name', waste.name
        )
    ) AS waste_details
  FROM collection_points
  INNER JOIN address ON collection_points.address_id = address.id
  LEFT JOIN waste_status ON collection_points.cnpj = waste_status.collection_point_id
  LEFT JOIN waste ON waste_status.waste_id = waste.id
  WHERE collection_points.cnpj=${cnpj}
  GROUP BY collection_points.cnpj, address.id; `)
  return point
}

module.exports = {
  getAll,
  insertCollectionPoint,
  getCollectionPointByWastes,
  deleteCollectionPoint,
  getCollectionPoint,
  getCollectionPointByCnpj
}