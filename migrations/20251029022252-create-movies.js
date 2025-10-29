export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('movies', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    tmdbId: { type: Sequelize.INTEGER, allowNull: false, unique: true },
    title: { type: Sequelize.STRING, allowNull: false },
    posterPath: { type: Sequelize.STRING, allowNull: true },
    backdropPath: { type: Sequelize.STRING, allowNull: true },
    releaseDate: { type: Sequelize.DATEONLY, allowNull: true },
    originalLanguage: { type: Sequelize.STRING, allowNull: true },
    last_fetched_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
    createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
    updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
  })

  await queryInterface.addIndex('movies', ['tmdbId'], { unique: true, name: 'movies_tmdbId_unique' })
  await queryInterface.addIndex('movies', ['last_fetched_at'], { name: 'movies_last_fetched_idx' })
}

export async function down(queryInterface) {
  await queryInterface.dropTable('movies')
}
