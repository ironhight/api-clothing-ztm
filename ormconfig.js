const configuration = require('./dist/core/config/configuration');

const { db } = configuration.default();
const connectDatabase = {
    type: db.driver,
    host: db.host,
    port: db.port,
    username: db.user,
    password: db.pass,
    database: db.name,
};

module.exports = [
    {
        ...connectDatabase,
        migrations: ['src/entities/migrations/*.ts'],
        subscribers: ['src/entities/subscribers/*.ts'],
        cli: {
            entitiesDir: 'src/entities',
            migrationsDir: 'src/entities/migrations',
            subscribersDir: 'src/entities/subscriber',
        },
    },
];
