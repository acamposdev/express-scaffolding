var i18n = require('i18n');

i18n.configure({
  // setup some locales - other locales default to en silently
  locales:['en-GB', 'es-ES'],

  // where to store json files - defaults to './locales' relative to modules directory
  directory: __dirname + '/locale',

  defaultLocale: 'en-GB',

  // sets a custom cookie name to parse locale settings from  - defaults to NULL
  cookie: 'lang',
});



module.exports = function(req, res, next) {
  i18n.init(req, res);
  res.locals.msg = res.__;
  if (req.session && req.session.user && req.session.user.language) {
    var user_locale = req.session.user.language;
    req.setLocale(user_locale);
    i18n.setLocale(user_locale);
  } else {
    req.setLocale(i18n.getLocale());
  }

  var current_locale = i18n.getLocale();

  return next();
};
