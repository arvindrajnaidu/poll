"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.POSProvider = exports.POSContext = void 0;

var _react = _interopRequireWildcard(require("react"));

var _InventoryProvider = require("../Inventory/InventoryProvider");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// import { menuData } from './menu-fixture';
var POSContext = /*#__PURE__*/(0, _react.createContext)({});
exports.POSContext = POSContext;
var initialState = {
  order: {
    lineItems: {},
    total: 0.0
  }
};

function reducer(state, action) {
  switch (action.type) {
    case "add-item":
      {
        var _newOrder = _objectSpread({}, state.order);

        var lineItems = _newOrder.lineItems;
        if (!lineItems[action.id]) lineItems[action.id] = {
          qty: 0,
          name: action.name,
          price: action.price
        };
        lineItems[action.id].qty = lineItems[action.id].qty + 1;
        _newOrder.total = Object.keys(lineItems).reduce(function (acc, varId) {
          acc = acc + lineItems[varId].price * lineItems[varId].qty;
          return acc;
        }, 0.0);
        console.log(_newOrder);
        return _objectSpread(_objectSpread({}, state), {}, {
          order: _newOrder
        });
      }

    case "remove-item":
      var newOrder = _objectSpread({}, state.order);

      if (!newOrder[action.id]) return;
      if (newOrder[action.id] === 0) return;
      newOrder[action.id] = newOrder[action.id] - 1;
      return _objectSpread(_objectSpread({}, state), {}, {
        order: newOrder
      });

    default:
      return state;
  }
}

var POSProvider = function POSProvider(_ref) {
  var children = _ref.children,
      claims = _ref.claims;

  var _useContext = (0, _react.useContext)(_InventoryProvider.InventoryContext),
      categories = _useContext.categories,
      items = _useContext.items,
      variations = _useContext.variations;

  var _useState = (0, _react.useState)({
    name: "Catalog",
    items: items
  }),
      _useState2 = _slicedToArray(_useState, 2),
      menu = _useState2[0],
      setMenu = _useState2[1];

  var _useReducer = (0, _react.useReducer)(reducer, initialState),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  (0, _react.useEffect)(function () {
    if (!categories) return;
    var dbMenu = categories.map(function (cat) {
      return {
        name: cat.name,
        items: items.filter(function (i) {
          return i.catId === cat.id;
        }).map(function (i) {
          return {
            name: i.name,
            items: variations.filter(function (v) {
              return v.isAvailable && v.itemId === i.id;
            })
          };
        }).filter(function (i) {
          return i.items.length;
        })
      };
    }).filter(function (cat) {
      return cat.items.length;
    }); // console.log(dbMenu, '<<< dbMenu')

    setMenu({
      name: "Catalog",
      items: dbMenu
    });
  }, [categories, items, variations]);
  return /*#__PURE__*/_react.default.createElement(POSContext.Provider, {
    value: _objectSpread(_objectSpread({
      menu: menu
    }, state), {}, {
      dispatch: dispatch
    })
  }, children);
};

exports.POSProvider = POSProvider;
var _default = POSProvider;
exports.default = _default;