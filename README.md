# express-ts-annotations
An annotation system for express.
## Installation
```sh
$ npm install express-ts-annotations
```
## Usage
The easiest way of using the annotations is by explictily stating the routes and methods of the controller.
```JavaScript
import { Request, Response } from "express";
import { controller, route } from "express-ts-annotations";

// Set the controller route to "/myRoute"
@controller("/myRoute")
export default class CustomController {
    // Create the GET route "/myRoute/helloWorld"
    @route("get", "/helloWorld")
    public helloMethod(_: Request, res: Response) {
        return res.status(200).json("Hello world!")
    }

    // Create the POST route "/myRoute/ping"
    @route("post", "/ping")
    public ping(req: Request, res: Response) {
        return res.status(200).json(req.body)
    }
}
```
Annotation parameters can also be omitted, which will make the system use the default behaviour.
``` JavaScript
import { Request, Response } from "express"
import { controller, route } from "express-ts-annotations"

// Set the controller route to "/greeting"
@controller()
export default class Greeting {
    private _greet = 'Hi!'

    // Create the GET route "/greeting/greet"
    @route()
    public getGreet(_: Request, res: Response) {
        return res.status(200).json(this._greet)
    }

    // Create the POST route "/greeting/greet"
    @route()
    public postGreet(req: Request, res: Response) {
        this._greet = req.body.msg
        return res.status(200).json(`Changed greet message to ${JSON.stringify(this._greet)}!`)
    }
}
```
It's also possible to specify just some of the parameters and have the rest with the default behaviour.

``` JavaScript
import { Request, Response } from "express";
import { controller, route } from "express-ts-annotations";

// Set the controller route to "/mixed"
@controller("mixed")
export default class MixedController {

    // Create the GET route "/mixed/getter"
    @route("get")
    public getter(_: Request, res: Response) {
        return res.status(200).json("Some response")
    }
}
```
### Middlewares
Middlewares can be easily be set up using the `@middlewares()` annotation to which we pass the array of middlewares.

``` JavaScript
import { NextFunction, Request, Response } from "express";
import { controller, middlewares, route } from "express-ts-annotations"

function mid1(req: Request, res: Response, next: NextFunction) {
    console.log("Middleware 1 called");
    next();
}

function mid2(req: Request, res: Response, next: NextFunction) {
    console.log("Middleware 2 called");
    next();
}

// Set the controller route to "/middlewares"
@controller()
export default class Middlewares {

    // Create the GET route "/middlewares/both-middlewares"
    // Call middlewares "mid1" and "mid2" before calling the controller method
    @middlewares([mid1, mid2])
    public getBothMidds(req: Request, res: Response) {
        return res.status(200).json("Mid1-Mid2")
    }

    // Create the GET route "/middlewares/mid2"
    @route("get", "mid2")
    // Call the middleware "mid2" before calling the controller method
    @middlewares([mid2])
    public someMethod(req: Request, res: Response) {
        return res.status(200).json("Mid2")
    }
}
```
### Error handling
The system also offers the posibility to create a controller-wide error handler. Which will be used to handle thrown errors from all the route controller methods and will again be able to be defined explictily by using the `@errorHandler` annotation

``` JavaScript
import { NextFunction, Request, Response } from "express";
import { ControllerFunction, controller, errorHandler, route } from "express-ts-annotations";

// Set the controller route to "/errors"
@controller("errors")
export default class ErrorHandler {

    // Create the GET route "/errors/message"
    @route("get", "message")
    public errorThrower(req: Request, res: Response) {
        throw new Error("Bad credentials for access!")
    }

    // Set the controller error handler method to the method below
    @errorHandler
    public async handler(fn: ControllerFunction, req: Request, res: Response, next: NextFunction) {
        try {
            await fn(req, res, next);
        } catch(e) {
            if((e as Error).message.includes("Bad credentials")) {
                return res.status(401).json("Unauthorized!")
            }
            else {
                return res.status(500).json("Server error!")
            }
        }
    }
}
```
or implicitly by having a class method named `errorHandler`.

``` JavaScript

import { NextFunction, Request, Response } from "express";
import { ControllerFunction, controller, route } from "express-ts-annotations"

// Set the controller route to "/implicit-error-handler"
@controller()
export default class ImplicitErrorHandler {
    private _errorMsg = "Error msg!"
    
    // Creathe the GET route "/implicit-error-handler/error-message"
    @route()
    public getErrorMessage(req: Request, res: Response) {
        throw new Error()
    }

    // Set the controller error handler method to the method below
    public async errorHandler(fn: ControllerFunction, req: Request, res: Response, next: NextFunction) {
        try {
            await fn(req, res, next);
        } catch(e) {
            return res.status(500).json(this._errorMsg)
        }
    }
}
```

And for setting up the server we simply inject an instance of each controller in our app using the `injectControllers` function.
```JavaScript
import { injectControllers } from "express-ts-annotations";
import Controller1 from "./C1"
import Controller2 from "./C1"
...

const app = express();

const con1 = new Controller1();
const con2 = new Controller2();
...

injectControllers(app, [con1, con2]);

```
## Annotations
### `@controller(path?: string)`
A class decorator that sets up the `path` in which the controller will be injected. If the `path` doesn't start with a `/`, it will be automatically added by the system. The default `path` is the name of the class.
### `@route(method?: RESTMethod, path?: string)`
This is a method decorator that assigns the controller method to a `path`. 
By default if no parameters are provided the system will analyze the controller method name and assign a rest `method` and `path` automatically,
for this the method name must start with a case insensitive RESTMethod (i.e `get`, `post`, `put`, `patch`, `delete`, `all`) followed by the path written in CamelCase which will be transformed automatically in kebab case. If only the `method` is specified the name will still be asigned automatically. If the `method` or `path` is specified, they will be used instead of the system generated ones.
If the `path` doesn't start with `/`, it will be added automatically.
### `@middlewares(middlewares: Middleware[])`
This method decorator is used to specify the `middlewares` that should apply to the `route` of the controller method. It can be used without `@route()` decorator, in which case the default behaviour of `@route()` specified above will apply.
### `@errorHandler`
This method decorator will asign the controller error handling function. This can be omitted if the method name is `errorHandler`. If both a method with the name `errorHandler` and a method wit the `@errorHandler` annotation exist in the class, the annotated method will be used.
## Functions
### `injectControllers(app: Express, controllers: any[])`
This function is used to inject the `controllers` into the `express` application.
## Disclaimer
- Version `2.0.0^` has migrated to Typescript `5.0` decorators as opposed to the `experimentalDecorators` from previous versions. Also I removed the `BaseController` class from previous versions.
- The decorated class methods must be public in order to bind the class context to them.
- The types are a bit loose, feel free to improve them and send PR requests on github.
