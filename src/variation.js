(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
// For more information about browser field, check out the browser field at https://github.com/substack/browserify-handbook#browser-field.

var styleElementsInsertedAtTop = [];

var insertStyleElement = function(styleElement, options) {
    var head = document.head || document.getElementsByTagName('head')[0];
    var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];

    options = options || {};
    options.insertAt = options.insertAt || 'bottom';

    if (options.insertAt === 'top') {
        if (!lastStyleElementInsertedAtTop) {
            head.insertBefore(styleElement, head.firstChild);
        } else if (lastStyleElementInsertedAtTop.nextSibling) {
            head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
        } else {
            head.appendChild(styleElement);
        }
        styleElementsInsertedAtTop.push(styleElement);
    } else if (options.insertAt === 'bottom') {
        head.appendChild(styleElement);
    } else {
        throw new Error('Invalid value for parameter \'insertAt\'. Must be \'top\' or \'bottom\'.');
    }
};

module.exports = {
    // Create a <link> tag with optional data attributes
    createLink: function(href, attributes) {
        var head = document.head || document.getElementsByTagName('head')[0];
        var link = document.createElement('link');

        link.href = href;
        link.rel = 'stylesheet';

        for (var key in attributes) {
            if ( ! attributes.hasOwnProperty(key)) {
                continue;
            }
            var value = attributes[key];
            link.setAttribute('data-' + key, value);
        }

        head.appendChild(link);
    },
    // Create a <style> tag with optional data attributes
    createStyle: function(cssText, attributes, extraOptions) {
        extraOptions = extraOptions || {};

        var style = document.createElement('style');
        style.type = 'text/css';

        for (var key in attributes) {
            if ( ! attributes.hasOwnProperty(key)) {
                continue;
            }
            var value = attributes[key];
            style.setAttribute('data-' + key, value);
        }

        if (style.sheet) { // for jsdom and IE9+
            style.innerHTML = cssText;
            style.sheet.cssText = cssText;
            insertStyleElement(style, { insertAt: extraOptions.insertAt });
        } else if (style.styleSheet) { // for IE8 and below
            insertStyleElement(style, { insertAt: extraOptions.insertAt });
            style.styleSheet.cssText = cssText;
        } else { // for Chrome, Firefox, and Safari
            style.appendChild(document.createTextNode(cssText));
            insertStyleElement(style, { insertAt: extraOptions.insertAt });
        }
    }
};

},{}],2:[function(require,module,exports){
'use strict';

// NOTE: component!
// NOTE: using Constructors instead of the other thing. Because O'Reilly.
var ShoppingCart = function ShoppingCart(html) {
  var items;
  var randomItem;
  var el = document.createElement('html');
  el.innerHTML = html;

  var foundCarts = el.getElementsByClassName('cart__list');

  this.getItemCount = function () {
    var itemsInCart = foundCarts[0].children.length;
    return itemsInCart;
  };

  if (foundCarts.length > 0) {
    console.log('what are you', foundCarts[0]);
    items = foundCarts[0].children;
    randomItem = items[Math.floor(Math.random() * items.length)];
  }

  this.randomItem = function () {
    return randomItem;
  };

  this.getImage = function () {
    var itemImage = this.randomItem().getElementsByClassName('cart__item__image');
    console.log('this is the image', itemImage[0].children[0].src);
    return itemImage[0].children[0].src;
  };

  this.getItemName = function () {
    var itemName = this.randomItem().getElementsByClassName('cart__item__info');
    console.log('this is the name', itemName[0].innerText.trim());
    return itemName[0].innerText.trim();
  };

  this.getQty = function () {
    var qty = this.randomItem().getElementsByClassName('cart__item__price');
    console.log('this is the qty', qty[0].children[0].value);
    return qty[0].children[0].value;
  };

  this.getColor = function () {
    var color = this.randomItem().querySelector('[id$="selected-color"]').children[1].outerText;
    console.log('this is the color', color);
    return color;
  };
};

module.exports = ShoppingCart;

// TODO: set timeout for modal trigger
// TODO: view cart hover effect
// TODO: name hover effect
// TODO: modal size style
// TODO: close and button click or outside click close

},{}],3:[function(require,module,exports){
var css = ".clearhead-modal-container {\n  display: block;\n  height: 100vh;\n  width: 100vw;\n  position: fixed;\n  z-index: 800;\n  background-color: rgba(0,0,0,0.4);\n}\n.clearhead-modal-content {\n  position: fixed;\n  padding: 0 5px;\n  z-index: 1;\n  background: #fff;\n  display: flex;\n  flex-direction: column;\n  height: 425px;\n  width: 425px;\n  margin: 0 auto;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}\n.clearhead-modal-close {\n  width: 40px;\n  text-align: center;\n  height: 40px;\n  position: fixed;\n  right: 0;\n  cursor: pointer;\n  font-size: 25px;\n}\n.clearhead-modal-content h1 {\n  margin-top: 41px;\n  color: #476887;\n  font-size: 48px;\n  text-align: center;\n  line-height: 1em;\n  font-family: \"Sentinel A\",\"Sentinel B\",Georgia,serif;\n  margin-bottom: 17px;\n}\n.clearhead-modal-content h3 {\n  color: #666;\n  font-size: 16px;\n  text-align: center;\n  letter-spacing: 1px;\n  line-height: 24px;\n  font-family: \"Gotham Narrow SSm A\",\"Gotham Narrow SSm B\",Helvetica,sans-serif;\n}\n.clearhead-modal-content p {\n  color: #888;\n  text-align: center;\n  margin-top: 16px;\n  margin-bottom: 14px;\n}\n.clearhead-modal-content a {\n  text-align: center;\n  background: #476887;\n  color: #fff;\n  border: none;\n  width: 173px;\n  height: 40px;\n  margin: 0 auto;\n  line-height: 2.5;\n  font-family: \"Sentinel A\",\"Sentinel B\",Georgia,serif;\n}\n.clearhead-modal-item {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  margin-top: 25px;\n}\n.clearhead-modal-item img {\n  height: 110px;\n  width: 110px;\n  padding: 5px;\n}\n.clearhead-modal-item-details {\n  padding: 5px;\n}\n.clearhead-modal-item-details a {\n  font-size: 18px;\n  color: #476887;\n  background: none;\n  font-weight: bold;\n  font-family: \"Gotham Narrow SSm A\",\"Gotham Narrow SSm B\",Helvetica,sans-serif;\n}\n.clearhead-modal-item-details p {\n  font-size: 14px;\n  color: #666;\n  text-align: left;\n  margin-top: 0;\n  font-family: \"Gotham Narrow SSm A\",\"Gotham Narrow SSm B\",Helvetica,sans-serif;\n}\n"; (require("browserify-css").createStyle(css, { "href": "src/style.css" }, { "insertAt": "bottom" })); module.exports = css;
},{"browserify-css":1}],4:[function(require,module,exports){
'use strict';

// NOTE: what is CommonJS? Watch all the youtubes. Oh, I've done that before.
var ShoppingCart = require('./shopping_cart');
var stylesheet = require('./style.css');

var css = stylesheet;

// NOTE: just watched a video on Treehouse about how to AJAX. Thank goodness.
var xhr = new XMLHttpRequest();
xhr.open('GET', '/us/en_us/Shop/Shopping-Cart');
xhr.onreadystatechange = function () {
  if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
    var list = new ShoppingCart(xhr.response);
    console.log(list.randomItem());

    var modalContainer = document.createElement('div');

    // TODO: refactor modal builder
    var modalContent = '\n    <div class="clearhead-modal-content">\n    <span id="clearhead-modal-close" class="clearhead-modal-close">&times;</span>\n    <h1>Welcome back!</h1>\n    <h3>You left something in your cart. <br> Check out today!</h3>\n      <div class="clearhead-modal-item">\n        <img src="' + list.getImage() + '" alt="' + list.getItemName() + ' picture">\n        <div class="clearhead-modal-item-details">\n          <a href="https://www.vitamix.com/us/en_us/shop/' + list.getItemName() + '">' + list.getItemName() + '</a>\n          <p>Qty: ' + list.getQty() + '<br>' + list.getColor() + '</p>\n        </div>\n      </div>\n    <p>Showing 1 of ' + list.getItemCount() + '</p>\n    <a href="https://www.vitamix.com/us/en_us/Shop/Shopping-Cart">View Cart</a>\n    </div>\n    ';

    modalContainer.setAttribute("id", "clearhead-modal-container");
    modalContainer.setAttribute("class", "clearhead-modal-container");
    modalContainer.innerHTML = modalContent;

    // TODO: put setTimeout after AJAX request is finished instead of this.
    setTimeout(function () {
      document.body.prepend(modalContainer);

      // Get the modal
      var modal = document.getElementById("clearhead-modal-container");

      // Get the <span> element that closes the modal
      var span = document.getElementById("clearhead-modal-close");

      // When the user clicks on <span> (x), close the modal
      span.onclick = function () {
        modal.style.display = "none";
      };

      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function (event) {
        console.log('you clicked on', event.target);
        if (event.target == modal) {
          modal.style.display = "none";
        }
      };
    }, 3000);
  } // if statement
};
xhr.send();

},{"./shopping_cart":2,"./style.css":3}]},{},[4]);
