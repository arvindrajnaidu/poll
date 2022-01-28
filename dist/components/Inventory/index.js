"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _react = _interopRequireDefault(require("react"));

var _Inventory = _interopRequireDefault(require("./Inventory"));

var _InventoryProvider = _interopRequireDefault(require("./InventoryProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
function _default(args) {
  return /*#__PURE__*/_react.default.createElement(_InventoryProvider.default, null, /*#__PURE__*/_react.default.createElement(_Inventory.default, args));
}