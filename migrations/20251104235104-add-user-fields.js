export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn("users", "firstName", {
    type: Sequelize.STRING,
    allowNull: false,
  })
  await queryInterface.addColumn("users", "lastName", {
    type: Sequelize.STRING,
    allowNull: false,
  })
  await queryInterface.addColumn("users", "age", {
    type: Sequelize.INTEGER,
    allowNull: false,
  })
  await queryInterface.addColumn("users", "hashedPassword", {
    type: Sequelize.STRING,
    allowNull: false,
  })
}

export async function down(queryInterface) {
  await queryInterface.removeColumn("users", "firstName")
  await queryInterface.removeColumn("users", "lastName")
  await queryInterface.removeColumn("users", "age")
  await queryInterface.removeColumn("users", "hashedPassword")
}
