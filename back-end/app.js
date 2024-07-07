const express = require('express');
const app = express();
const port = 3000;

const configRoutes = require('./routes');
const cors = require('cors');

const corsOptions ={ 
    origin:'http://localhost:5173', 
    credentials:true,
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
configRoutes(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})