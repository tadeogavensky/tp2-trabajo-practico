export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('watchlists', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    userId: { type: Sequelize.INTEGER, allowNull: false },
    movieId: { type: Sequelize.INTEGER, allowNull: false },
    createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
    updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
  })

  await queryInterface.addConstraint('watchlists', {
    fields: ['userId'],
    type: 'foreign key',
    name: 'fk_watchlists_user',
    references: { table: 'users', field: 'id' },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  await queryInterface.addConstraint('watchlists', {
    fields: ['movieId'],
    type: 'foreign key',
    name: 'fk_watchlists_movie',
    references: { table: 'movies', field: 'id' },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })

  await queryInterface.addConstraint('watchlists', {
    fields: ['userId', 'movieId'],
    type: 'unique',
    name: 'watchlists_user_movie_unique',
  })
}

export async function down(queryInterface) {
  await queryInterface.dropTable('watchlists')
}
