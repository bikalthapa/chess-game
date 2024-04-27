import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);





// function Parent() {
//   // Parent constructor
// }

// Parent.prototype.parentMethod = function () {
//   console.log("Parent method called");
// };

// function Child() {
//   // Call the parent constructor
//   Parent.call(this);
// }

// // Set up inheritance
// Child.prototype = Object.create(Parent.prototype);
// Child.prototype.constructor = Child;

// Child.prototype.childMethod = function () {
//   // Call the parent method
//   this.parentMethod();
//   console.log("Child method called");
// };

// const childInstance = new Child();
// childInstance.childMethod();
