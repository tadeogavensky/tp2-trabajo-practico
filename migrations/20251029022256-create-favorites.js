export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('favorites', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    userId: { type: Sequelize.INTEGER, allowNull: false },
    movieId: { type: Sequelize.INTEGER, allowNull: false },
    createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
    updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
  })

  await queryInterface.addConstraint('favorites', {
    fields: ['userId'],
    type: 'foreign key',
    name: 'fk_favorites_user',
    references: { table: 'users', field: 'id' },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  await queryInterface.addConstraint('favorites', {
    fields: ['movieId'],
    type: 'foreign key',
    name: 'fk_favorites_movie',
    references: { table: 'movies', field: 'id' },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })

  await queryInterface.addConstraint('favorites', {
    fields: ['userId', 'movieId'],
    type: 'unique',
    name: 'favorites_user_movie_unique',
  })
}

export async function down(queryInterface) {
  await queryInterface.dropTable('favorites')
}
