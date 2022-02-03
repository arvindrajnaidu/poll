"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.InventoryContext = void 0;

var _react = _interopRequireWildcard(require("react"));

var _uuid = require("uuid");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// import { initializeApp } from "firebase/app";
// import { getDatabase } from "firebase/database";
// import firebase from "firebase/app";
// import "firebase/database";
var InventoryContext = /*#__PURE__*/(0, _react.createContext)({});
exports.InventoryContext = InventoryContext;
var catalogId = (0, _uuid.v4)();
var catId = (0, _uuid.v4)();
var itemId = (0, _uuid.v4)();
var variationId1 = (0, _uuid.v4)();
var variationId2 = (0, _uuid.v4)();
var intialState = {
  catalogs: [{
    id: catalogId,
    name: "morning",
    from: 6,
    to: 11,
    items: [itemId]
  }],
  categories: [{
    id: catId,
    name: "Mexican"
  }],
  items: [{
    id: itemId,
    name: "Burrito",
    catId: catId
  }],
  variations: [{
    id: variationId1,
    itemId: itemId,
    name: "Wet",
    price: 10.45
  }, {
    id: variationId2,
    itemId: itemId,
    name: "Eggs and cheese",
    price: 12.45
  }]
};

function reducer(state, action) {
  switch (action.type) {
    case "load_inventory":
      {
        return _objectSpread({}, action.inventory);
      }

    case "set_selected_item":
      {
        var selectedItem = state.items.find(function (i) {
          return i.id === action.id;
        });
        return _objectSpread(_objectSpread({}, state), {}, {
          selectedItem: selectedItem
        });
      }

    case "cancel_selected_item":
      {
        var cancelledState = _objectSpread({}, state);

        delete cancelledState.selectedItem;
        return cancelledState;
      }

    case "create_category":
      {
        var categories = _toConsumableArray(state.categories);

        categories.push({
          id: (0, _uuid.v4)(),
          name: action.name
        });
        return _objectSpread(_objectSpread({}, state), {}, {
          categories: categories
        });
      }

    case "delete_category":
      {
        var _categories = state.categories.filter(function (c) {
          return c.id !== action.id;
        });

        return _objectSpread(_objectSpread({}, state), {}, {
          categories: _categories
        });
      }

    case "update_categofy":
      {
        var _categories2 = state.categories.map(function (c) {
          if (c.id === action.id) {
            return {
              id: c.id,
              name: action.name
            };
          }

          return c;
        });

        return _objectSpread(_objectSpread({}, state), {}, {
          categories: _categories2
        });
      }

    case "create_item":
      {
        var _catId = action.catId,
            catName = action.catName,
            name = action.name,
            variations = action.variations;

        var _categories3 = _toConsumableArray(state.categories);

        if (catName && !_catId) {
          _catId = (0, _uuid.v4)();

          _categories3.push({
            id: _catId,
            name: action.catName
          });
        }

        var items = _toConsumableArray(state.items);

        var _itemId = (0, _uuid.v4)();

        items.push({
          id: _itemId,
          catId: _catId,
          name: name
        });
        var newVariations = variations.map(function (v) {
          return {
            price: v.price,
            name: v.name || "Regular",
            id: (0, _uuid.v4)(),
            itemId: _itemId
          };
        });
        return _objectSpread(_objectSpread({}, state), {}, {
          categories: _categories3,
          items: items,
          variations: [].concat(_toConsumableArray(state.variations), _toConsumableArray(newVariations))
        });
      }

    case "delete_item":
      {
        var id = action.id;

        var _items = _toConsumableArray(state.items).filter(function (i) {
          return i.id !== id;
        });

        var _variations = _toConsumableArray(state.variations).filter(function (v) {
          return v.itemId !== id;
        });

        return _objectSpread(_objectSpread({}, state), {}, {
          items: _items,
          variations: _variations
        });
      }

    case "update_item":
      {
        // During updates a variant may have been added
        var updatedItemVariations = action.variations.map(function (v) {
          if (!v.id) {
            v.id = (0, _uuid.v4)();
          }

          return v;
        });
        var variationsWithoutThisItem = state.variations.filter(function (v) {
          return v.itemId !== action.id;
        });

        var updateItems = _toConsumableArray(state.items).map(function (i) {
          if (i.id === action.id) {
            return _objectSpread(_objectSpread({}, i), {}, {
              name: action.name || i.name,
              catId: action.catId || i.catId,
              isAvailable: !!action.isAvailable
            });
          }

          return i;
        });

        return _objectSpread(_objectSpread({}, state), {}, {
          variations: [].concat(_toConsumableArray(variationsWithoutThisItem), _toConsumableArray(updatedItemVariations)),
          items: updateItems
        });
      }

    case "update_variation":
      {
        // During updates a variant may have been added
        var updatedVariations = state.variations.map(function (v) {
          if (v.id === action.id) {
            return _objectSpread(_objectSpread({}, v), {}, {
              isAvailable: action.isAvailable
            });
          }

          return v;
        });
        return _objectSpread(_objectSpread({}, state), {}, {
          variations: updatedVariations
        });
      }

    default:
      return state;
  }
}

var AppProvider = function AppProvider(_ref) {
  var children = _ref.children,
      claims = _ref.claims;

  var _useReducer = (0, _react.useReducer)(reducer, intialState),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      didLoadFromStorage = _useState2[0],
      setDidLoadFromStorage = _useState2[1];

  (0, _react.useEffect)(function () {
    var inventoryStr = window.localStorage.getItem("inventory");
    setDidLoadFromStorage(true);
    if (!inventoryStr) return; // console.log("Loading", inventoryStr);

    dispatch({
      type: "load_inventory",
      inventory: JSON.parse(inventoryStr)
    });
  }, []);
  (0, _react.useEffect)(function () {
    if (!didLoadFromStorage) return; // console.log("Writing inventory");

    var categories = state.categories,
        variations = state.variations,
        items = state.items,
        catalogs = state.catalogs;
    var dbState = {
      categories: categories,
      variations: variations,
      items: items,
      catalogs: catalogs
    };
    window.localStorage.setItem("inventory", JSON.stringify(dbState));
  }, [state]);
  return /*#__PURE__*/_react.default.createElement(InventoryContext.Provider, {
    value: _objectSpread(_objectSpread({}, state), {}, {
      dispatch: dispatch
    })
  }, children);
};

var _default = AppProvider;
exports.default = _default;