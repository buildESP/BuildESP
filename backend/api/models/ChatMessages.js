// models/ChatMessages.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const ChatMessages = sequelize.define('ChatMessage', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	exchange_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	sender_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	message: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	timestamp: {
		type: DataTypes.DATE,
		defaultValue: DataTypes.NOW,
	},
	is_read: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	}
}, {
	tableName: 'chat_messages',
	timestamps: false
});

ChatMessages.prototype.markAsRead = async function () {
    this.is_read = true;
    await this.save();
};

module.exports = ChatMessages;