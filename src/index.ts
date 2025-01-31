// import environment variables
import dotenv from 'dotenv';
dotenv.config();

import express from 'express'
import * as process from "process";
import cors from 'cors'
import bodyParser from "body-parser";
import {AppError} from "./utils/AppError";
import {StatusCodes} from "./utils/StatusCodes";
import * as GlobalErrorHandler from "./exception/ExceptionHandler"
import {CustomResponse} from "./utils/CustomResponse";
import sequelize from "./db/DbConnection";
// import {UserType} from "./models/UserModel";
import ClientRoutes from "./routes/ClientRoutes";

// import VerifyRoutes from "./routes/VerifyRoutes";
// import {UserServiceImpl} from "./services/impl/UserServiceImpl";

const app = express();

const PORT = process.env.PORT || 5500;

//set cors police
app.use(
    cors({
      origin: '*',
      credentials: true,
    })
)

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


app.use('/api/client', ClientRoutes)


app.get('/health',
    (
        req:express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        res.status(200).send(
            new CustomResponse(
                StatusCodes.SUCCESS,
                'Back auth service server is running 🎉',
            )
        )
    }
)





// this should always be the end of the routs
//this is for unhandled routes
app.all('*',(
    req:express.Request,
    res: express.Response,
    next:express.NextFunction
) => {
  next(
      new AppError(
          `Can't find ${req.originalUrl} path on the auth server`,
          404,
          StatusCodes.URL_NOT_FOUND
      ));
})

sequelize.sync({force: true})  
    .then(() => {
        console.log('Database synchronized');
    });

//set global error handler middleware
app.use(GlobalErrorHandler.exceptionHandler)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
