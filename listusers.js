
const mysql = require('mysql2');

const app = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'mydb',
  port: 3307
});

app.connect((err) => {
  if (err) {
    console.error('Ошибка подключения:', err.message);
    process.exit(1);
  }
  
  console.log('Подключено к базе данных\n');
  
  const query = `
  SELECT * FROM user
  ORDER BY username ASC;
  `;
  
 app.query(query, (err, results) => {
    if (err) {
      console.error('Ошибка запроса:', err.message);
      app.end();
      return;
    }
    
    if (results.length === 0) {
      console.log('Пользователи не найдены');
    } else {
      console.log('Пользователи:');
      console.log('='.repeat(50));
      
      results.forEach((user, index) => {
        console.log(`\n${index + 1}. ${user.email} (ID: ${user.user_id})`);
        console.log(`Имя: ${user.username || 'Не указано'}`);
        console.log(`Дата: ${user.date_of_create}`);
        console.log(`Статус: ${user.is_active === '1' ? 'Активен' : 'Неактивен'}`);
        console.log(`Роль: ${user.role_name || 'Нет'}`);
        console.log(`Права: ${user.permissions || 'Нет'}`);
      });
      
      console.log(`\nВсего: ${results.length} пользователей`);
    }
    
    app.end();
  });
});