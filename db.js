const Sequelize = require('sequelize');
const sequelize = new Sequelize('journal-walkthrough',
'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
     function() {
        console.log('Connected to journal-walkthrough postgres database');
  },
  function(err){
      consolelog(err);
  });
  
module.exports = sequelize;