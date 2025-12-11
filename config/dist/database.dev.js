"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var mysql = require('mysql2/promise');

require('dotenv').config();

var Database =
/*#__PURE__*/
function () {
  function Database() {
    _classCallCheck(this, Database);

    this.config = {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_NAME || 'praktika',
      port: process.env.DB_PORT || 3307,
      waitForConnections: true,
      connectionLimit: 5,
      queueLimit: 0
    };
    this.pool = null;
  }

  _createClass(Database, [{
    key: "connect",
    value: function connect() {
      var connection;
      return regeneratorRuntime.async(function connect$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              this.pool = mysql.createPool(this.config); // Проверяем подключение

              _context.next = 4;
              return regeneratorRuntime.awrap(this.pool.getConnection());

            case 4:
              connection = _context.sent;
              console.log('✅ Успешно подключено к базе данных MySQL');
              connection.release();
              return _context.abrupt("return", this.pool);

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](0);
              console.error('❌ Ошибка подключения к базе данных:', _context.t0.message);
              process.exit(1);

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, null, this, [[0, 10]]);
    }
  }, {
    key: "disconnect",
    value: function disconnect() {
      return regeneratorRuntime.async(function disconnect$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!this.pool) {
                _context2.next = 4;
                break;
              }

              _context2.next = 3;
              return regeneratorRuntime.awrap(this.pool.end());

            case 3:
              console.log('📴 Отключено от базы данных');

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "query",
    value: function query(sql) {
      var params,
          _ref,
          _ref2,
          results,
          _args3 = arguments;

      return regeneratorRuntime.async(function query$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              params = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : [];

              if (this.pool) {
                _context3.next = 4;
                break;
              }

              _context3.next = 4;
              return regeneratorRuntime.awrap(this.connect());

            case 4:
              _context3.prev = 4;
              _context3.next = 7;
              return regeneratorRuntime.awrap(this.pool.query(sql, params));

            case 7:
              _ref = _context3.sent;
              _ref2 = _slicedToArray(_ref, 1);
              results = _ref2[0];
              return _context3.abrupt("return", results);

            case 13:
              _context3.prev = 13;
              _context3.t0 = _context3["catch"](4);
              console.error('❌ Ошибка выполнения запроса:', _context3.t0.message);
              throw _context3.t0;

            case 17:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this, [[4, 13]]);
    }
  }]);

  return Database;
}();

module.exports = new Database();