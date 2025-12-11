const mysql = require('mysql2/promise');
require('dotenv').config();

class Database {
  constructor() {
    this.config = {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_NAME || 'mydb',
      port: process.env.DB_PORT || 3307,
      waitForConnections: true,
      connectionLimit: 5,
      queueLimit: 0
    };
    
    this.pool = null;
  }

  async connect() {
    try {
      this.pool = mysql.createPool(this.config);
      
      // Проверяем подключение
      const connection = await this.pool.getConnection();
      console.log('✅ Успешно подключено к базе данных MySQL');
      connection.release();
      
      return this.pool;
    } catch (error) {
      console.error('❌ Ошибка подключения к базе данных:', error.message);
      process.exit(1);
    }
  }

  async disconnect() {
    if (this.pool) {
      await this.pool.end();
      console.log('📴 Отключено от базы данных');
    }
  }

  async query(sql, params = []) {
    if (!this.pool) {
      await this.connect();
    }
    
    try {
      const [results] = await this.pool.query(sql, params);
      return results;
    } catch (error) {
      console.error('❌ Ошибка выполнения запроса:', error.message);
      throw error;
    }
  }
}

module.exports = new Database();