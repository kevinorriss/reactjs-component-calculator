# Calculator

A simple calculator component with the basic operations

## Prerequisites

* [React ^16.9.0](https://reactjs.org/) - Javascript library for user interfaces

## Installing

```
npm install @kevinorriss/calculator
```

## Usage

Import the component

```
import Calculator from '@kevinorriss/calculator'

...

<!-- JSX -->
<div className="your-container">
    <Calculator />
</div>
```

## Development

This repo comes with a react app for development purposes. To get started, open a terminal in the root of the project and then:

### Link the component to the app
```
cd ./component
npm link

cd ..
npm link @kevinorriss/calculator
```

### Start the app
```
npm start
```

### Start the rollup watcher
```
cd ./component
npm run dev
```

Whenever you make a change to the component code, the react app will update.

## Tests
```
npm test
```

This project uses Jest and Enzyme for its unit tests, simply run the above code to run the test suites.

## Author

* **Kevin Orriss** - [orriss.io](http://orriss.io)

## License

This project is licensed under the ISC License