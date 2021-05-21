# AuctioShop
## Frontend part
Project made by Łukasz Jankowski.
Page: http://auctioshop.xyz/

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
- [x] Modular build, lazy loading of modules

## Endopoints and Angular
AuctioShop uses endpoints that are documented in the backend part of the app. For more info go [there](https://github.com/Lukas-max/shop-backend).

## Structure
```
 app -> - core
        - shared
        - other modules -> - products
                           - users
                           - admin
                           - auth
```

## Modules
### Core
Components:
 - HeaderComponent  
 - InfoComponent  
 - NavbarComponent  
 - FooterComponent  
 
 Services:  
 `ErrorHanlderInterceptor (HttpInterceptor for global error handling)`,  
 `MessageToastrService`.  
 
 ### Shared
 LoadingSpinnerComponent  
 
 Services:  
 `MatchValidationService`
 
 ### Users (Lazy loaded)
 Components:
  - ItemsPurchasedComponent  
  - RegisterComponent  
  - SingleUserOrdersComponent  

Services:
`UsersService`
 
 Services : `UsersService`
 
 ### Products
 Components:  
 - CartDetailsComponent           (products in the cart, quantity and price)  
 - CartStatusComponent            (viewing how many products in the cart icon top right side of the screen)  
 - CheckoutComponent              (purchase form)  
 - ProductAddComponent            (add a new produc - admin only)  
 - ProductDetailsComponent        (viewing a single product)  
 - ProductUpdateComponent         (update single product - admin only)  
 - ProductsComponent              (get and view all products, search by name, or by category)  
        - ProductItemComponent    (view of a single product)  
 - SidebarComponent  
  
Services:  
`CartService`,  
`OrderService`,  
`ProductService`,  
`ProductCategoryService`.  

### Admin (lazy loaded)
Components:  
- OrderDetailsComponent
- OrdersComponent  
- UserDetailsComponent  

### Auth
Component:  
 - JwtLoginComponent
 - LoginComponent

Services: 
 `BasicAuthenticationService`  
 `JwtAuthenticationService`  
 
 Guards:
 `AuthenticationGuard`  
 `AuthenticationLoginGuard`  
 `OrderAuthenticationGuard`  
