# Pos

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.1.
Node version used was 10.10

# GITHUB hosted version:
## https://kubek80.github.io/
(it required to switch from ws: -> wss: to avoid mixed content)

## Frame
I've created frame that would fit in tablet:
![Alt text](readme/01.png?raw=true "POS")

## User interface
Clicking on images will add items to check out (second click will add additional product)
Clicking on names of products inside checkout area will remove item (one click removes single item)
![Alt text](readme/02.png?raw=true "POS")

## Blocking UI during call
During communication with ws UI is blocked. Clicking on 'New' will unblock UI.
![Alt text](readme/03.png?raw=true "POS")

## Basic tests
I've some component tests to checkout.component and 2 view test to app.component
![Alt text](readme/04.png?raw=true "POS")

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Test runner

Run `ng test` to run karma

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
