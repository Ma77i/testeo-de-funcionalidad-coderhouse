const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

// gzip compression
const compression = require("compression");

const cookieParser = require("cookie-parser");
const session = require("express-session");

// mongoose, mongoStore
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");

// passport
const flash = require("express-flash");
const passport = require("passport");
const initializePassport = require("./passport/local");

// models
const chatModel = require("./models/chatModel");

// initialize Passport
initializePassport(passport);

// session store
const { mongoConfig } = require("./config");

const { HOSTNAME, SCHEMA, OPTIONS, DATABASE, USER, PASSWORD } = mongoConfig;

// websocket
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// template handlebars
const templateEngine = require("./engine");

templateEngine(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(path.join(__dirname, "../public")));

app.use(flash());
app.use(cookieParser("This is a secret"));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,

    store: new MongoStore({
      mongoUrl: `${SCHEMA}://${USER}:${PASSWORD}@${HOSTNAME}/${DATABASE}?${OPTIONS}`,
      ttl: 10 * 60,
      expire: 1000 * 1 * 60,
      autoRemove: "native"
    })
  })
);

// passport
app.use(passport.initialize());
app.use(passport.session());
app.use(compression());

// Socket connection
io.on("connection", async (socket) => {
  // leo el mensaje nuevo y lo guardo en la base de datos
  socket.on("newMsj", async (data) => {
    const msj = await chatModel.create(data);
    return msj;
  });

  // obtengo los mensajes y los envio por socket emit
  const msjs = await chatModel.find();
  io.sockets.emit("msjs", msjs);

  // obtengo los mensajes normalizados
  const norm = await chatModel.getNorm();
  socket.emit("msNorm", norm);
});

// routers
const adminRouter = require("./routes/admin.routes");
const cartRouter = require("./routes/api.cart.routes");
const chatRouter = require("./routes/api.chat.routes");
const productRouter = require("./routes/api.products.routes");
const userRouter = require("./routes/api.user.routes");
const homeRouter = require("./routes/home.routes");
const infoRouter = require("./routes/info");

app.use("/admin", adminRouter);
app.use("/api/cart", cartRouter);
app.use("/api/chat", chatRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/", homeRouter);
app.use("/info", infoRouter);

// Mongoose connection
mongoose
  .connect(`${SCHEMA}://${USER}:${PASSWORD}@${HOSTNAME}/${DATABASE}?${OPTIONS}`)
  .then(() => {
    console.log("Connected to mongoose");
  })
  .catch((err) => console.log("Error on mongo: ", err));

// server.listen(process.env.PORT, () => console.log(`Server running on http://localhost:8080`))
// server.on("err", (err) => console.log(`Error: ${err}`))

module.exports = server;
