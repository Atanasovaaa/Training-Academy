const fs = require("fs");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");

const server = jsonServer.create();
const router = jsonServer.router("./db/db.json");
const database = JSON.parse(fs.readFileSync("./db/db.json"));

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

const SECRET_KEY = "123456789";

const expiresIn = "1h";

// Create a token from a payload
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Verify the token
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) =>
    decode !== undefined ? decode : err
  );
}

// Check if the user exists in database
function isAuthenticated({ email, password }) {
  return (
    database.users.findIndex(
      (user) => user.email === email && user.password === password
    ) !== -1
  );
}

function getUser({ email, password }) {
  return database.users.find(
    (user) => user.email === email && user.password === password
  );
}

function checkIsAdmin({ email, password }) {
  return database.users.find(
    (user) => user.email === email && user.password === password
  ).isAdmin;
}

// Register New User
server.post("/auth/register", (req, res) => {
  console.log("register endpoint called; request body:");
  console.log(req.body);
  const { email, password, firtsName, lastName } = req.body;

  if (database.users.find((user) => user.email === email)) {
    const status = 401;
    const message = "email already exist";
    res.status(status).json({ status, message });
    return;
  }

  var last_item_id = database.users[database.users.length - 1].id;
  database.users.push({
    id: last_item_id + 1,
    email: email,
    password: password,
    firtsName: firtsName,
    lastName: lastName,
    isAdmin: false,
  });

  fs.readFile("./db/db.json", (err, data) => {
    if (err) {
      const status = 401;
      const message = err;
      res.status(status).json({ status, message });
      return;
    }

    // Get current users data
    var data = JSON.parse(data.toString());

    //Add new user
    data.users.push({
      id: last_item_id + 1,
      email: email,
      password: password,
      firtsName: firtsName,
      lastName: lastName,
      isAdmin: false,
    }); //add some data
    var writeData = fs.writeFile(
      "./db/db.json",
      JSON.stringify(data),
      (err, result) => {
        // WRITE
        if (err) {
          const status = 401;
          const message = err;
          res.status(status).json({ status, message });
          return;
        }
      }
    );
  });

  // Create token for new user
  res.status(200).json(true);
});

server.post("/auth/login", (req, res) => {
  console.log("login endpoint called; request body:");
  console.log(req.body);
  const { email, password } = req.body;

  if (isAuthenticated({ email, password }) === false) {
    const status = 401;
    const message = "Incorrect email or password";
    res.status(status).json({ status, message });
    return;
  }
  const user = getUser({ email, password });
  const access_token = createToken({ ...user });
  console.log("Access Token:" + access_token);
  res.status(200).json({ access_token });
});

server.get("/users", (req, res) => {
  console.log("Get users");
  const users = database.users;
  res.status(200).json({ users });
});

server.get("/courses/:id", (req, res) => {
  let id = req.params.id;
  console.log("Get courses");
  const courses = database.courses;
  res.status(200).json({ courses });
});

server.get("/course/:id", (req, res) => {
  let id = req.params.id;
  console.log("Get course by id " + id);
  const course = database.courses.find((courseDb) => courseDb.id === +id);
  if (!course || course === undefined) {
    const status = 404;
    const message = "Course not found";
    res.status(status).json({ status, message });
    return;
  }
  res.status(200).json({ course });
});

server.use(/^(?!\/auth).*$/, (req, res, next) => {
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(" ")[0] !== "Bearer"
  ) {
    const status = 401;
    const message = "Error in authorization format";
    res.status(status).json({ status, message });
    return;
  }
  try {
    let verifyTokenResult;
    verifyTokenResult = verifyToken(req.headers.authorization.split(" ")[1]);

    if (verifyTokenResult instanceof Error) {
      const status = 401;
      const message = "Access token not provided";
      res.status(status).json({ status, message });
      return;
    }
    next();
  } catch (err) {
    const status = 401;
    const message = "Error access_token is revoked";
    res.status(status).json({ status, message });
  }
});

server.use(router);

server.listen(8000, () => {
  console.log("Run Auth API Server");
});
