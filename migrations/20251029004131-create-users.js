export async function up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
        // Campo ID
        id: { 
            type: Sequelize.INTEGER, 
            primaryKey: true, 
            autoIncrement: true, 
            allowNull: false 
        },
        
        // Campos de la primera migración
        username: { 
            type: Sequelize.STRING, 
            allowNull: false, 
            unique: true 
        },
        email: { 
            type: Sequelize.STRING, 
            allowNull: false, 
            unique: true 
        },
        
        //segunda migración
        firstName: { 
            type: Sequelize.STRING, 
            allowNull: false 
        },
        lastName: { 
            type: Sequelize.STRING, 
            allowNull: false 
        },
        age: { 
            type: Sequelize.INTEGER, 
            allowNull: false 
        },
        hashedPassword: { 
            type: Sequelize.STRING, 
            allowNull: false, 
            unique: false
        },
        
        // Timestamps
        createdAt: { 
            type: Sequelize.DATE, 
            allowNull: false, 
            defaultValue: Sequelize.fn('NOW') 
        },
        updatedAt: { 
            type: Sequelize.DATE, 
            allowNull: false, 
            defaultValue: Sequelize.fn('NOW') 
        },
    });
}

export async function down(queryInterface) {
    await queryInterface.dropTable("users");
}