"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn(
            "UsernameAndPasswords",
            "verificationCode",
            {
                type: Sequelize.STRING,
                unique: true,
            }
        );
    },
    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
    },
};
