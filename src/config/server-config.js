const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    PORT: process.env.PORT,
    ATLAS_PASSWORD:process.env.ATLAS_PASSWORD
}