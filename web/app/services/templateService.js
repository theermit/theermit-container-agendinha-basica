const nunjucks = require('nunjucks');

nunjucks_configure = (app) => 
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

module.exports = nunjucks_configure;