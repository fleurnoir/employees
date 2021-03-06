import * as express from 'express';
import { json, urlencoded } from 'body-parser';
import * as path from 'path';
import * as cors from 'cors';
import * as compression from 'compression';

// import { loginRouter } from './routes/login';
// import { protectedRouter } from './routes/protected';
// import { publicRouter } from './routes/public';
// import { feedRouter } from './routes/feed';
// import { userRouter } from "./routes/user";
import { employeeRouter } from './routes/employees';

const app: express.Application = express();

var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/employees");

app.disable('x-powered-by');

app.use(json());
app.use(compression());
app.use(urlencoded({ extended: true }));

app.use('/api/employees', employeeRouter);

if (app.get('env') === 'production') {

  // in production mode run application from dist folder
  app.use(express.static(path.join(__dirname, '/../client')));
}

// catch 404 and forward to error handler
app.use(function(req: express.Request, res: express.Response, next) {
  let err = new Error('Not Found');
  next(err);
});

// production error handler
// no stacktrace leaked to user
app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {

  res.status(err.status || 500);
  res.json({
    error: {},
    message: err.message
  });
});

export { app }
