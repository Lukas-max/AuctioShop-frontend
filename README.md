# AuctioShop
## Frontend part
Project made by Łukasz Jankowski.

## Prerequisites
- Nodejs
- TypeScript 3.9.7
- AuctioShop backend part. [link](https://github.com/Lukas-max/shop-backend)

## Build with:
- Angular 10.0.3
- Angular-CLI 10.0.3
- Bootstrap 4.5.0
- Ng-bootstrap 7.0.0
- Ngx-toastr 13.0.0
- HTML, CSS
- Font Awesome
- IntelliJ IDEA 2020.1 Ultimate Edition

The backend part of the application is right [here](https://github.com/Lukas-max/shop-backend). 

# RUN 
Step 1: Install backend part.
Step 2: Copy/clone this repo and open in your compiler. 
Step 3: Go to app folder to app.consts.ts and change API_URL to `http://localhost:8080'`
Step 4: Run `npm install` and its ready to go.

## Features:
- [x] Responsive Web Design
- [x] Pagination with Ng-bootstrap 7.0.0
- [x] Routing
- [x] CanActivate
- [x] HTTP Interceptor
- [x] Basic and JSON Web Token authentication. (Active is JWT)
- [x] User registration with double password validation and username and email validation against the database
- [x] Reactive and Template driven forms with validation

## Endopoints
AuctioShop uses endpoints that are documented in the backend part of the app. For more info go [there](https://github.com/Lukas-max/shop-backend).
The only difference are endpoints:
`GET` `/api/order/{id}` and `GET` `/api/order` 
which there is no component to serve this requests and you'll need to manualy write them in the browser. :shit:

## Structure
```
 app -> - core
        - shared
        - modules -> - products
                     - users
```

## Modules
### Core
Components:
 - header
 - info
 - jwtlogin
 - login
 - navbar
 - sidebar
 
 Services:
 `AuthenticationGuard (CanActivate)`, `AuthenticationLoginGuard (CanActivate)`, `BasicAuthInterceptor and JwtAuthInterceptor (HttpInterceptors)`, `ErrorHanlderInterceptor (HttpInterceptor for global error handling)`, `MessageToastrService`.
 
 ### Shared
 No components here.
 
 Services: `MatchValidationService`
 
 ### Users
 Components:
 - register
 - items-purchased
 - orders (show all orders, [only admin])
 - order-details (show customer address)
 - user-details (show all users, [only admin])
 - single-user-order (show orders of a user [for registered users])
 
 Services : `UsersService`
 
 ### Products
 Components: 
 - cart-details           (products in the cart, quantity and price)
 - cart-status            (viewing how many products in the cart icon top right side of the screen)
 - checkout               (purchase form)
 - product-add            (add a new produc - admin only)
 - product-details        (viewing a single product)
 - product-update         (update single product - admin only)
 - products               (get and view all products, search by name, or by category)
  
Services:
`CartService`, `OrderService`, `ProductService`, `ProductCategoryService`.
