var express = require("express");
var bcrypt = require("bcrypt");
var router = express.Router();

// 데이터베이스
var mysql = require("mysql");
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1",
  database: "project",
});

con.connect(function (err) {
  if (err) {
    console.log("> DB Connection Failed");
    return;
  }

  console.log("> DB Connection Success");
});

// 로그인시 아이디와 비밀번호 체크
router.post("/login", function (req, res) {
  const user = {
    id: req.body.id,
    password: req.body.password,
  };

  con.query(
    'SELECT id, password FROM user WHERE id = "' + user.id + '"',
    function (err, row) {
      if (err) {
        // 매칭되는 아이디 없을 경우
        res.json({
          success: false,
          message:
            "로그인하지 못했습니다. 아이디 또는 비밀번호를 확인하십시오!",
        });
      }

      if (row[0] !== undefined && row[0].id === user.id) {
        bcrypt.compare(user.password, row[0].password, function (err, res2) {
          if (res2) {
            // 로그인 성공
            res.json({
              success: true,
              message: "로그인 성공!",
            });
          } else {
            // 매칭되는 아이디는 있으나, 비밀번호가 틀린 경우
            res.json({
              success: false,
              message:
                "로그인하지 못했습니다. 아이디 또는 비밀번호를 확인하십시오!",
            });
          }
        });
      }
    }
  );
});

// 회원가입시 아이디 중복체크
router.post("/register", function (req, res) {
  const user = {
    id: req.body.id,
    password: req.body.password,
  };

  con.query('SELECT id FROM user WHERE id = "' + user.id + '"', function (
    err,
    row
  ) {
    if (row[0] === undefined) {
      const salt = bcrypt.genSaltSync();
      const encryptedPassword = bcrypt.hashSync(user.password, salt);

      con.query(
        'INSERT INTO user (id, password) VALUES ("' +
          user.id +
          '", "' +
          encryptedPassword +
          '")',
        user,
        function (err, row2) {
          if (err) throw err;
        }
      );

      res.json({
        success: true,
        message: "회원가입 성공",
      });
    } else {
      res.json({
        success: false,
        message: "아이디가 중복 되었습니다.",
      });
    }
  });
});

module.exports = router;