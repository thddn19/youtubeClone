const express = require("express");
const app = express();

const config = require("./config/key");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log(err));


const bodyParser = require("body-parser");
// 클라이언트에서 받아온 정보를 서버사이드에서 분석해서 res할 수 있도록 하는 것이 bodyParser의 역할

// application/x-www-form-urlencoded 데이터를 분석해서 갖고올 수 있게 함
app.use(bodyParser.urlencoded({ extended: true }));
// application/json 타입으로 된 데이터를 분석해서 갖고올 수 있게 함
app.use(bodyParser.json());
app.use(cookieParser());

  


app.use('/api/users', require('./routes/users'));
app.use('/api/video', require('./routes/video'));
app.use('/api/subscribe', require('./routes/subscribe'));
app.use('/api/comment', require('./routes/comment'));

//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/uploads', express.static('uploads'));

const port = 5000;
app.listen(port, () => console.log(`Example app listening on port ${port}`));
