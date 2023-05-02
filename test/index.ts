import Express, { urlencoded, json } from 'express';
import { injectControllers } from '../src';
import CustomController from './Explicit'
import MixedController from './Mixed'
import Greeting from './Implicit'
import ErrorHandler from './ExplicitError'
import ImplicitErrorHandler from './ImplicitError'
import Middlewares from './Middlewares'

const app = Express()

app.use(urlencoded({ extended: true }))
app.use(json())

const customController = new CustomController();
const mixedController = new MixedController();
const greeting = new Greeting();
const errorHandler = new ErrorHandler();
const implicitErrorHandler = new ImplicitErrorHandler();
const middlewares = new Middlewares();

injectControllers(app, [customController, mixedController, greeting, errorHandler, implicitErrorHandler, middlewares])
app.listen(8080, () => {
    console.log("Server is listening on port 8080")
})

export default app;
