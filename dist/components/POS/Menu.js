"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CenteredGrid;

var _List = _interopRequireDefault(require("@material-ui/core/List"));

var _ListItem = _interopRequireDefault(require("@material-ui/core/ListItem"));

var _ListItemIcon = _interopRequireDefault(require("@material-ui/core/ListItemIcon"));

var _ListItemSecondaryAction = _interopRequireDefault(require("@material-ui/core/ListItemSecondaryAction"));

var _ListItemText = _interopRequireDefault(require("@material-ui/core/ListItemText"));

var _currency = _interopRequireDefault(require("currency.js"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = require("@material-ui/core/styles");

var _AppBar = _interopRequireDefault(require("@material-ui/core/AppBar"));

var _Tabs = _interopRequireDefault(require("@material-ui/core/Tabs"));

var _Tab = _interopRequireDefault(require("@material-ui/core/Tab"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _Box = _interopRequireDefault(require("@material-ui/core/Box"));

var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));

var _Grid = _interopRequireDefault(require("@material-ui/core/Grid"));

var _core = require("@material-ui/core");

var _html2canvas = _interopRequireDefault(require("html2canvas"));

var _POSProvider = require("./POSProvider");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// import { AppContext } from '../providers/AppProvider';
var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary
    }
  };
});

var printOrder = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var canvas;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _html2canvas.default)(document.querySelector('#orderlist'));

          case 2:
            canvas = _context.sent;
            return _context.abrupt("return", canvas.toDataURL('image/png'));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function printOrder() {
    return _ref.apply(this, arguments);
  };
}();

function CenteredGrid() {
  var classes = useStyles();

  var _useContext = (0, _react.useContext)(_POSProvider.POSContext),
      menu = _useContext.menu,
      order = _useContext.order,
      dispatch = _useContext.dispatch;

  var _useState = (0, _react.useState)(menu),
      _useState2 = _slicedToArray(_useState, 2),
      cursor = _useState2[0],
      setCursor = _useState2[1];

  var cursorStack = (0, _react.useRef)([]);
  (0, _react.useEffect)(function () {
    if (!menu) return;
    setCursor(menu);
  }, [menu]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: classes.root
  }, /*#__PURE__*/_react.default.createElement(_Grid.default, {
    container: true,
    spacing: 3
  }, /*#__PURE__*/_react.default.createElement(_Grid.default, {
    item: true,
    xs: 8
  }, /*#__PURE__*/_react.default.createElement(_Grid.default, {
    container: true,
    spacing: 3
  }, cursor.items.map(function (item) {
    return /*#__PURE__*/_react.default.createElement(_Grid.default, {
      item: true,
      xs: 4
    }, /*#__PURE__*/_react.default.createElement(_core.Button, {
      variant: "contained",
      style: {
        width: '100%',
        height: 80
      },
      onClick: function onClick() {
        if (item.items) {
          // Traverse
          cursorStack.current.push(cursor);
          setCursor(item);
        } else {
          // Variation is being added
          // let len = cursorStack.current.length
          // let lastNavItem = cursorStack.current[len - 1]
          dispatch({
            type: 'add-item',
            id: item.id,
            name: "".concat(cursor.name, " - ").concat(item.name),
            price: item.price
          });
        }
      }
    }, item.name));
  })), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      marginTop: 20,
      display: 'flex'
    }
  }, /*#__PURE__*/_react.default.createElement(_core.Button, {
    variant: "contained",
    color: "primary",
    style: {
      marginRight: 5,
      width: '100%'
    },
    onClick: function onClick() {
      cursorStack.current = [];
      setCursor(menu);
    }
  }, "Home"), /*#__PURE__*/_react.default.createElement(_core.Button, {
    variant: "contained",
    color: "primary",
    style: {
      marginLeft: 5,
      width: '100%'
    },
    onClick: function onClick() {
      if (cursorStack.current.length < 1) return;
      var popped = cursorStack.current.pop();
      setCursor(popped);
    }
  }, "Back"))), /*#__PURE__*/_react.default.createElement(_Grid.default, {
    item: true,
    xs: 4
  }, /*#__PURE__*/_react.default.createElement(_List.default, {
    className: classes.root,
    id: 'orderlist'
  }, Object.keys(order.lineItems).map(function (item) {
    return /*#__PURE__*/_react.default.createElement(_ListItem.default, null, /*#__PURE__*/_react.default.createElement(_ListItemText.default, {
      primary: order.lineItems[item].name
    }), /*#__PURE__*/_react.default.createElement(_ListItemText.default, {
      style: {
        textAlign: 'right'
      },
      primary: order.lineItems[item].qty
    }));
  }), /*#__PURE__*/_react.default.createElement(_ListItem.default, null, /*#__PURE__*/_react.default.createElement(_ListItemText.default, {
    style: {
      textAlign: 'right'
    },
    primary: (0, _currency.default)(order.total).format('$0.00')
  }))), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      marginTop: 20,
      display: 'flex'
    }
  }, /*#__PURE__*/_react.default.createElement(_core.Button, {
    variant: "contained",
    color: "primary",
    style: {
      marginRight: 5,
      width: '100%'
    },
    onClick: function onClick() {
      printOrder().then(function (png) {// sendMessage({
        //   body: {
        //     mimeType: 'image/png',
        //     data: png.replace('data:image/png;base64,', ''),
        //     fileName: 'payment-request.png',
        //   },
        // });
      });
    }
  }, "Pay")))));
}