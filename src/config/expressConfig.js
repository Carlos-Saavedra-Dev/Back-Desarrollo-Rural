const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const jwt = require('../utils/Middleware/JWTValidation');
const authRoutes = require('../routes/AuthRoutes');

const configureExpress = (app) => {

    app.get('/', (req, res) => {
        res.status(200).send('OK');
    });
    app.use(helmet());

    const corsOptions = {
        origin: 'https://www.patreon.com', 
        methods: ['GET', 'POST','PUT','PATCH','DELETE'], 
        allowedHeaders: ['Content-Type', 'Authorization'], 
    };
    app.use(cors(corsOptions));
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));


    app.use('/auth',authRoutes)
    app.use(jwt.accessTokenValidation)

};

module.exports = {configureExpress}