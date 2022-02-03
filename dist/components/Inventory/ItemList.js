"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ItemList;

var _react = _interopRequireWildcard(require("react"));

var _styles = require("@material-ui/core/styles");

var _InventoryProvider = require("./InventoryProvider");

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _List = _interopRequireDefault(require("@material-ui/core/List"));

var _ListItem = _interopRequireDefault(require("@material-ui/core/ListItem"));

var _Accordion = _interopRequireDefault(require("@material-ui/core/Accordion"));

var _AccordionSummary = _interopRequireDefault(require("@material-ui/core/AccordionSummary"));

var _AccordionDetails = _interopRequireDefault(require("@material-ui/core/AccordionDetails"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _ExpandMore = _interopRequireDefault(require("@material-ui/icons/ExpandMore"));

var _currency = _interopRequireDefault(require("currency.js"));

var _core = require("@material-ui/core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper
    },
    accordianRoot: {
      width: "100%"
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular
    }
  };
});

function ListItemLink(props) {
  return /*#__PURE__*/_react.default.createElement(_ListItem.default, _extends({
    button: true,
    component: "a"
  }, props));
}

function ItemList() {
  var _useContext = (0, _react.useContext)(_InventoryProvider.InventoryContext),
      catalog = _useContext.catalog,
      categories = _useContext.categories,
      items = _useContext.items,
      variations = _useContext.variations,
      dispatch = _useContext.dispatch;

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      itemList = _useState2[0],
      setItemList = _useState2[1]; // const classes = useStyles();


  (0, _react.useEffect)(function () {
    if (!items) return; // console.log(items)

    var dbItems = items.map(function (item) {
      return {
        id: item.id,
        name: item.name,
        catId: item.catId,
        categoryName: categories.find(function (c) {
          return c.id === item.catId;
        }).name,
        variations: variations.filter(function (v) {
          return v.itemId === item.id;
        })
      };
    });
    console.log(dbItems, "<<< Items");
    setItemList(dbItems);
  }, [categories, items, variations]);
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      textAlign: "right"
    }
  }, /*#__PURE__*/_react.default.createElement(_Typography.default, null, "Item List")), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      marginTop: 20
    }
  }, itemList.map(function (il) {
    return /*#__PURE__*/_react.default.createElement(_Accordion.default, {
      key: il.id
    }, /*#__PURE__*/_react.default.createElement(_AccordionSummary.default, {
      expandIcon: /*#__PURE__*/_react.default.createElement(_ExpandMore.default, null),
      id: il.id,
      style: {
        display: 'flex',
        marginLeft: 8,
        marginRight: 8
      }
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: {
        display: "flex",
        // backgroundColor: "red",
        justifyContent: "space-between",
        width: "100%"
      }
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: {
        flex: 2
      }
    }, /*#__PURE__*/_react.default.createElement(_Typography.default, null, il.name)), /*#__PURE__*/_react.default.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/_react.default.createElement(_Typography.default, null, il.categoryName)))), /*#__PURE__*/_react.default.createElement(_AccordionDetails.default, null, /*#__PURE__*/_react.default.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        width: '100%'
      }
    }, /*#__PURE__*/_react.default.createElement(_List.default, {
      style: {
        flex: "100%"
      }
    }, il.variations.map(function (v) {
      return /*#__PURE__*/_react.default.createElement(_ListItem.default, {
        button: true,
        key: v.id
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          marginRight: 100
        }
      }, /*#__PURE__*/_react.default.createElement(_Typography.default, null, v.name), /*#__PURE__*/_react.default.createElement(_Typography.default, null, (0, _currency.default)(v.price).format("$0.00"))), /*#__PURE__*/_react.default.createElement(_core.ListItemSecondaryAction, null, /*#__PURE__*/_react.default.createElement(_core.Switch, {
        checked: !!v.isAvailable,
        onChange: function onChange(e) {
          dispatch({
            type: "update_variation",
            id: v.id,
            isAvailable: e.target.checked
          });
        },
        name: "isAvailable" // inputProps={{ 'aria-label': 'secondary checkbox' }}

      })));
    })), /*#__PURE__*/_react.default.createElement("div", {
      style: {
        display: "flex",
        margin: 10,
        justifyContent: "space-between"
      }
    }, /*#__PURE__*/_react.default.createElement(_Button.default, {
      color: "secondary",
      onClick: function onClick() {
        dispatch({
          type: "delete_item",
          id: il.id
        });
      }
    }, "Delete"), /*#__PURE__*/_react.default.createElement(_Button.default, {
      onClick: function onClick() {
        dispatch({
          type: "set_selected_item",
          id: il.id
        });
      }
    }, "Edit")))));
  })));
}