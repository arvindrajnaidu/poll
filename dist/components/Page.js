"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page;

require("./Page.css");

var _react = _interopRequireWildcard(require("react"));

var _core = require("@material-ui/core");

var _Header = _interopRequireDefault(require("./Header"));

var _Inventory = _interopRequireDefault(require("./Inventory"));

var _POS = _interopRequireDefault(require("./POS"));

var _AppProvider = require("./AppProvider");

var _Settings = _interopRequireDefault(require("./Settings"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function Router(_ref) {
  var route = _ref.route;

  switch (route) {
    case "catalog":
      {
        return /*#__PURE__*/_react.default.createElement(_Inventory.default, null);
      }

    case "pos":
      {
        return /*#__PURE__*/_react.default.createElement(_POS.default, null);
      }

    case "settings":
      {
        return /*#__PURE__*/_react.default.createElement(_Settings.default, null);
      }

    default:
      {
        return /*#__PURE__*/_react.default.createElement(_Inventory.default, null);
      }
  }
}

function Page() {
  var _useContext = (0, _react.useContext)(_AppProvider.AppContext),
      route = _useContext.route,
      navigateTo = _useContext.navigateTo;

  return /*#__PURE__*/_react.default.createElement("div", {
    className: 'page'
  }, /*#__PURE__*/_react.default.createElement(_Header.default, {
    navigateTo: navigateTo
  }), /*#__PURE__*/_react.default.createElement(_core.Container, {
    style: {
      padding: 20,
      display: "flex",
      justifyContent: "center",
      flexDirection: "column"
    }
  }, /*#__PURE__*/_react.default.createElement(Router, {
    route: route
  })));
}