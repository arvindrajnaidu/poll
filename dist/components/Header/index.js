"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ButtonAppBar;

var _react = _interopRequireDefault(require("react"));

var _styles = require("@material-ui/core/styles");

var _AppBar = _interopRequireDefault(require("@material-ui/core/AppBar"));

var _Toolbar = _interopRequireDefault(require("@material-ui/core/Toolbar"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Menu = _interopRequireDefault(require("@material-ui/icons/Menu"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    }
  };
});

function ButtonAppBar(_ref) {
  var navigateTo = _ref.navigateTo;
  var classes = useStyles();
  return /*#__PURE__*/_react.default.createElement("div", {
    className: classes.root
  }, /*#__PURE__*/_react.default.createElement(_AppBar.default, {
    position: "static"
  }, /*#__PURE__*/_react.default.createElement(_Toolbar.default, null, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "h6",
    className: classes.title
  }), /*#__PURE__*/_react.default.createElement(_Button.default, {
    color: "inherit",
    onClick: function onClick() {
      return navigateTo('catalog');
    }
  }, "Catalog"), /*#__PURE__*/_react.default.createElement(_Button.default, {
    color: "inherit",
    onClick: function onClick() {
      return navigateTo('pos');
    }
  }, "POS"), /*#__PURE__*/_react.default.createElement(_Button.default, {
    color: "inherit",
    onClick: function onClick() {
      return navigateTo('settings');
    }
  }, "Settings"))));
}