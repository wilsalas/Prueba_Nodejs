'use strict'

module.exports = {
    DATABASE: process.env.MONGODB || 'mongodb://127.0.0.1:27017/educativodb',
    PORT: process.env.PORT || 3000,
    SECRECT_TOKEN: 'miclavetokens'
}