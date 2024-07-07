
const issueRoutes = require('./issue');
const constructorMethod = (app) => {
  app.use('/', issueRoutes);
  
  app.use('*', (req, res) => {
    res.status(404).json({error: 'Not found'});
  });
};

module.exports = constructorMethod;