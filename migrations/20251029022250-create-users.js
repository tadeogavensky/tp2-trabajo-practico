export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('users', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    username: { type: Sequelize.STRING, allowNull: false, unique: true },
    email: { type: Sequelize.STRING, allowNull: false, unique: true },
    hashed_password: { type: Sequelize.STRING, allowNull: false },
    createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
    updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
  })
}

export async function down(queryInterface) {
  await queryInterface.dropTable('users')
}
