# express-annotations
An annotation system for express.
## Installation
```sh
$ npm install express-annotations
```
## Usage
Controller.js
```JavaScript
import { BaseController, controller, route, middlewares } from "express-annotations";
...

@controller("/orders")
class OrderController extends BaseController {

    // This will generate the ALL route /orders/greeting
    @route("all", "greeting")
    public greeting(req: Request, res: Response) {
        ...
    }
    
    // This will generate the GET route /orders/my-orders and apply the middleware auth
    @route() // We can omit this decorator since we use the default behaviour and we use @middlewares below
    @middlewares([auth])
    public getMyOrders(req: Request, res: Response) {
        ...
    }
    
    // This will generate the POST route /orders/ and apply the middleware auth
    @route("post", "/")
    @middlewares([auth])
    public addNewOrder(req: Request, res: Response) {
        ...
    }
    
    // This will generate the DELETE route /orders/all-my-orders and apply the middleware auth
    @route("delete")
    @middlewares([auth])
    public allMyOrders(req: Request, res: Response) {
        ...
    }
}

export default new OrderController();

```

index.js
```JavaScript
import { injectControllers } from "express-annotations";
...

const app = express();

...

injectControllers(app, [orderController]);

```
## Classes
### `BaseController`
This is a class that all controllers must extend. It contains some internal information used by the system.
## Annotations
### `@controller(path: string)`
A class decorator that sets up the `path` in which the controller will be injected. If the `path` doesn't start with a `/`, it will be automatically added by the system. The default `path` is `/`.
### `@route(method?: RESTMethod, path?: string)`
This is a method decorator that assigns the method to a `path`. 
By default if no parameters are provided the system will analyze the method name and assign a rest `method` and `path` automatically,
for this the method name must start with a RESTMethod (i.e `get`, `post`, `put`, `patch`, `delete`, `all`) followed by the path written in CamelCase 
which will be transformed automatically in kebab case. If only the `method` is specified the name will still be asigned automatically. If the `method` or `path` is specified, they will be used instead of the system generated ones.
If the `path` doesn't start with `/`, it will be added automatically.
### `@middlewares(middlewares: Middleware[])`
This method decorator is used to specify the `middlewares` that should apply to the `route` of the method. 
It can be used without `@route()` decorator, in which case the default behaviour of `@route()` specified above will apply.
## Functions
### `injectControllers(app: Express, controllers: BaseController[])`
This function is used to inject the `controllers` into the `express` application.
