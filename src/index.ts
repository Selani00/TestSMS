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
import ClientRoutes from "./routes/AccountRoutes";
import LogsRoutes from "./routes/LogsRoutes";
import PaymentRoutes from "./routes/PaymentRoutes";
import BillRoutes from "./routes/BillRoutes";
import WalletRoutes from "./routes/WalletRoutes";

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


app.use('/account', ClientRoutes)
app.use('/logs', LogsRoutes)
app.use('/payment', PaymentRoutes)
app.use('/bill', BillRoutes)
app.use('/wallet', WalletRoutes)

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

sequelize.sync({force: false, alter: true})  // or just sequelize.sync()
    .then(() => {
        console.log('Database synchronized');
    })
    .catch((error) => {
        console.error('Error synchronizing database:', error);
    });

//set global error handler middleware
app.use(GlobalErrorHandler.exceptionHandler)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
