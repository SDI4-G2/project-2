const {DataTypes, Model} = require('sequelize');
const {sequelize} = require('./DBConn');

class Videos extends Model {}
Videos.init (
    {
        videoid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        categoryid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        freeToView: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            field: 'free_to_view'

        }
    },
    {
        sequelize,
        modelName: 'Videos',
        tableName: 'videos'
    }

);

module.exports = Videos;