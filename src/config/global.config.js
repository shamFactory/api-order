import dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();

module.exports = {
    DB: `mongodb://${process.env.MONGO_URL}/${process.env.MONGO_DB}`,
    port: process.env.PORT,

    path_csv: path.resolve(__dirname, '..', '..', 'public', 'csv'),

    api_host: process.env.API_HOST,
    api_port: process.env.API_PORT,
    api_version: process.env.API_VERSION,
    api_key: process.env.API_KEY,

    refresh_since: process.env.REFRESH_DATA_SINCE_DAYS,
};