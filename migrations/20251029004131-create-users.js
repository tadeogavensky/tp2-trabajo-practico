export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("users", {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    firstName: { type: Sequelize.STRING, allowNull: false },
    lastName: { type: Sequelize.STRING, allowNull: false },
    age: { type: Sequelize.INTEGER, allowNull: false },
    username: { type: Sequelize.STRING, allowNull: false, unique: true },
    email: { type: Sequelize.STRING, allowNull: false, unique: true },
    hashedPassword: { type: Sequelize.STRING, allowNull: false, unique: true },
    createdAt: { type: Sequelize.DATE, allowNull: false },
    updatedAt: { type: Sequelize.DATE, allowNull: false },
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable("users");
}
