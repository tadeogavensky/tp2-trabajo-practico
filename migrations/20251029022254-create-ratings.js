export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('ratings', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    userId: { type: Sequelize.INTEGER, allowNull: false },
    movieId: { type: Sequelize.INTEGER, allowNull: false },
    score: { type: Sequelize.DECIMAL(2, 1), allowNull: false }, // 0.5–5.0
    comment: { type: Sequelize.TEXT, allowNull: true },
    createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
    updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
  })

  // FK + CASCADE
  await queryInterface.addConstraint('ratings', {
    fields: ['userId'],
    type: 'foreign key',
    name: 'fk_ratings_user',
    references: { table: 'users', field: 'id' },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  await queryInterface.addConstraint('ratings', {
    fields: ['movieId'],
    type: 'foreign key',
    name: 'fk_ratings_movie',
    references: { table: 'movies', field: 'id' },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })

  // Unicidad compuesta
  await queryInterface.addConstraint('ratings', {
    fields: ['userId', 'movieId'],
    type: 'unique',
    name: 'ratings_user_movie_unique',
  })

  // Índices de lectura
  await queryInterface.addIndex('ratings', ['movieId'], { name: 'ratings_movie_idx' })
  await queryInterface.addIndex('ratings', ['userId', 'createdAt'], { name: 'ratings_user_created_idx' })
}

export async function down(queryInterface) {
  await queryInterface.dropTable('ratings')
}
