const http = require('http'); // The main server package
const fs = require('fs'); // The file system package, used to deal with files
var mysql = require('mysql');
var formidable = require('formidable');
const { count } = require('console');


// To access the server from the browser use: 127.0.0.1:3000
const hostname = '127.0.0.1'; // The server IP
const port = process.env.port || 3000; // The server port

var mysqlConnection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '',
  database: 'mydatasql',
  multipleStatements: true
});

// Creating a server
const server = http.createServer((request, response) => {
  // Getting the requested URL from the browser
  let url = request.url;
  if (url === '/') { // The home page route
    mysqlConnection.query('SELECT * FROM article', (err, article_rows, fields) => {
      if (!err) {
        let res = `
          <!DOCTYPE html>
          <html>
            <head>
              <title>article</title>
            </head>
            <body">
              <div>
                <h1>All article</h1>
              </div>
              <div.
          `
        if (!err) {
          for (let i = 0; i < article_rows.length; i++) {
            res += "<h3><a href='/view_article/" + article_rows[i].id + "'>" + article_rows[i].heading + "</a></h3>";
          }
          res += "<h1><a href='/add_article'>add new article</a><h1></body></html>"
          response.statusCode = 200;
          response.setHeader('Content-Type', 'text/html');
          response.end(res);
        } else {
          console.log(err);
          send_failed_msg(response, 500)
        }
      } else {
        console.log(err);
        send_failed_msg(response, 500)
      }
    })
  } else if (url === '/add_article') { // The add new article page route
    fs.readFile('pages/add_article.html', null, function (error, data) {
      if (error) {
        send_failed_msg(response, 404)
      } else {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(data);
        response.end();
      }
    });
  } else if (url === '/add_article_handler') { // The add new article handler
    var form = new formidable.IncomingForm();
    let a = 0;
    form.parse(request, function (err, fields, files) {
      let query = "INSERT INTO article (heading,name,Summary,linkk) VALUES (?,?,?,?);";
      let values_to_insert = [
        fields.heading,
        fields.name,
        fields.Summary,
        fields.linkk
      ];
      mysqlConnection.query('SELECT * FROM CODE', (errr, rowss, fieldss) => {
        if (!errr) {
          for (let i = 0; i < rowss.length; i++) {
            if (fields.code == rowss[i].code_n) {
              a = 1;
            }
          }
        }
        if (a > 0) {
          mysqlConnection.query(query, values_to_insert, (err, rows) => {
            if (err) throw err;
          });
        }
      });
      redirect_user(response, '/');
    });

  } else if (url.startsWith('/view_article/')) {
    let split_url = url.split("/")
    let article_id = split_url[split_url.length - 1]
    mysqlConnection.query('SELECT * FROM article where id =' + article_id, (err, rows, fields) => {
      if (!err) {
        let res = `
          <!DOCTYPE html>
          <html>
            <head>
              <title>All article</title>
            </head>
            <body>
              <div>
                <h1>All article</h1>
              </div>
              <div><a href ="/" >Return Home</a>
              <div>
                <table border="2px">
                  <tr>
                    <th> heaing </th>
                    <th> names </th>
                    <th> Summary </th>
                    <th> linkk </th>
                  </tr>
          `
        res += "<tr><td>"
          + rows[0].heading
          + "</td><td>"
          + rows[0].name
          + "</td><td>"
          + rows[0].Summary
          + "</td><td>"
          + rows[0].linkk
          + "</td></tr>";
        res += "</table> <br> <a href='/view/delete/" + rows[0].id + "'>Delete</a> <a href='/view/update/" + rows[0].id + "'>update</a> </body></html>";
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/html');
        response.end(res)
      } else {
        console.log(err);
        send_failed_msg(response, 500)
      }
    });


  } else if (url.startsWith("/view/delete/")) {
    let split_url = url.split("/")
    idd = split_url[split_url.length - 1]
    let ress = `
    <!DOCTYPE html>
    <html>

      <head>
        <title>article delete </title>
      </head>

      <body>
        <form action='/delete' method='post'> <label for='check_code'>code</label>
          <br>
          <input  type='password' id='code' name='code' />
          <br>
          <input type="submit" value="Add" /><br>
        </form>  
      </body>

    </html>
      `;
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');
    response.end(ress)

  }
  else if (url === "/delete") {

    var form = new formidable.IncomingForm();
    form.parse(request, function (err, fields, files) {
      a = 0;
      mysqlConnection.query('SELECT * FROM CODE', (errr, rowss, fieldss) => {
        for (let i = 0; i < rowss.length; i++) {
          if (fields.code == rowss[i].code_n) {
            a = 1;
          }
        }
        if (a == 1) {
          mysqlConnection.query('DELETE FROM article WHERE id=' + idd, (err, rows, fields) => {
            if (!err) {
              redirect_user(response, '/');
            } else {
              console.log(err);
              send_failed_msg(response, 500);
            }
          });
        }
        else
          redirect_user(response, '/');
      });
    });
  }


  else if (url.startsWith("/view/update/")) {
    let split_url = url.split("/")
    idd = split_url[split_url.length - 1]
    let ress = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>article delete </title>
      </head>
      <body>
        <form action='/update' method='post'> <label for='check_code'>code</label>
          <br>
          <input  type='password' id='code' name='code' />
          <br>
          <input type="submit" value="Add" /><br>
        </form>  
      </body>
    </html>
      `;
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');
    response.end(ress)
  }
  else if (url === "/update") {
    var form = new formidable.IncomingForm();
    form.parse(request, function (err, fields, files) {
      a = 0;
      mysqlConnection.query('SELECT * FROM CODE', (errr, rowss, fieldss) => {
        for (let i = 0; i < rowss.length; i++) {
          if (fields.code == rowss[i].code_n) {
            a = 1;
          }
        }
        if (a == 1) {
          fs.readFile('pages/update_page.html', null, function (error, data) {
            if (error) {
              send_failed_msg(response, 404)
            } else {
              response.writeHead(200, { 'Content-Type': 'text/html' });
              response.write(data);
              response.end();
            }
          });
        }
        else
          redirect_user(response, '/');
      });
    });
  }

  else if (url === '/update_page') {
    var form = new formidable.IncomingForm();
    form.parse(request, function (err, fields, files) {
      mysqlConnection.query("UPDATE article SET heading = '" + fields.heading + "' , name = '" + fields.name + "' , Summary = '" + fields.Summary + "' , linkk = '" + fields.linkk + "' WHERE id = " + idd);
      if (!err) {
        redirect_user(response, '/')
      }
      else {
        console.log(err);
        send_failed_msg(response, 500)
      }
    });

  }
});
function send_failed_msg(response, code) {
  response.statusCode = code;
  response.setHeader('Content-Type', 'text/html');
  response.end(`<div style="color: red;">Whoops! An error occurred!</div>
                  <div><a href="/">Return home</a></div>`);
}

function redirect_user(response, location) {
  response.statusCode = 302;
  response.setHeader('Location', location);
  response.end()
}


server.listen(port, () => {
  console.log(`Server running at ${port}`);
});

