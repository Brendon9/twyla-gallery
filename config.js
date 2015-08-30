var connectionString = process.env.DATABASE_URL || 'postgres://postgres:mysecretpassword@172.17.0.13:5432/twyla';

module.exports = connectionString;
