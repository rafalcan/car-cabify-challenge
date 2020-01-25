module.exports = {
  'development': {
    'dialect': 'sqlite',
    'storage': 'app/database/carpooling.sqlite'
  },
  'test': {
    'logging': false,
    'dialect': 'sqlite',
    'storage': 'app/database/carpooling-test.sqlite'
  },
  'acceptance': {
    'logging': false,
    'dialect': 'sqlite',
    'storage': 'app/database/carpooling-acceptance.sqlite'
  }
};
