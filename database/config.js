//crear conexion con base de datos(cluster) que retorna refernci a de conexion

const mongoose = require('mongoose');

// db connection
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.URL_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log('Conectado a DB');
  } catch (e) {
    console.error(e);
  }
};

module.exports = { dbConnection };
