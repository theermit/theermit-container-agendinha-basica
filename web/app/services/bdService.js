const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize( 'mydb', 'postgres', '123', {
    host: 'db-pg',
    dialect: 'postgres'
  });

sequelize
  .authenticate()
  .then(() => console.log("conexao com bd efetuada com sucesso!"))
  .catch(error => console.log("falha na conexao com o bd!"));

const Contato = sequelize.define("Contato", {
  nome: {
      type: DataTypes.STRING,
      allowNull: false
  },
  telefone: {
      type: DataTypes.STRING,
      allowNull: false
  }
});

const Usuario = sequelize.define("Usuario", {
  nome: {
      type: DataTypes.STRING,
      allowNull: false
  },
  email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
  },
  senha: {
      type: DataTypes.STRING,
      allowNull: false
  }
});

Usuario.hasMany(Contato);

Contato.belongsTo(Usuario);

sequelize.sync();

module.exports = {
  Contato: Contato,
  Usuario: Usuario
};