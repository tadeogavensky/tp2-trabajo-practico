// 🟩 CREATION
await User.create({ username: 'tadeo', email: 'tadeo@mail.com', hashed_password: 'abc123' })  
await Movie.bulkCreate([{ title: 'Matrix' }, { title: 'Inception' }])  
await User.findOrCreate({ where: { email: 'test@mail.com' }, defaults: { username: 'test' } })  
await Rating.upsert({ userId: 1, movieId: 2, score: 4.5 })

// 🟨 READ
await Movie.findAll()                                  // all records
await User.findByPk(1)                                 // by primary key
await User.findOne({ where: { email: 'a@mail.com' } }) // single record
await Movie.findAndCountAll({ limit: 10, offset: 0 })  // pagination
await Rating.count({ where: { score: 5 } })            // count matching condition
await Rating.max('score')                              // max score value

// 🟦 UPDATE
await User.update({ email: 'new@mail.com' }, { where: { id: 1 } }) // update records
const user = await User.findByPk(1)
user.username = 'new'
await user.save()                                        // save changes
await Movie.increment('views', { by: 1, where: { id: 5 } }) // add 1 to “views”

// 🟥 DELETE
await Rating.destroy({ where: { id: 10 } }) // delete by condition
await Movie.truncate()                      // clear entire table

// 🧩 ADVANCED QUERIES
await User.findAll({ include: Rating })                        // eager load relation
await User.findAll({ attributes: ['id', 'username'] })         // select specific columns
await Movie.findAll({ order: [['releaseDate', 'DESC']] })      // order descending
await Rating.findAll({ limit: 10, offset: 20 })                // pagination
await Movie.findAll({ where: { tmdbId: 123 } })                // filter by field

// ⚙️ TRANSACTIONS
const t = await sequelize.transaction()
try {
  const user = await User.create({ username: 'tadeo' }, { transaction: t })
  await Rating.create({ userId: user.id, movieId: 1, score: 5 }, { transaction: t })
  await t.commit() // confirm all changes
} catch (err) {
  await t.rollback() // rollback if something fails
}

// 🧠 INSTANCE METHODS
const u = await User.findByPk(1)
console.log(u.toJSON())                 // plain object
await u.update({ email: 'new@mail.com' }) // update instance
await u.destroy()                       // delete instance
