export async function up(queryInterface, Sequelize) {
    await queryInterface.createTable("comments", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        movieId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: { 
                model: 'movies',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        comment: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
        updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
    });
}

export async function down(queryInterface) {
    await queryInterface.dropTable("comments");
}