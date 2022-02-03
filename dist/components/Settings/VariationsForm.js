"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = VariationsForm;

var _react = _interopRequireWildcard(require("react"));

var _styles = require("@material-ui/core/styles");

var _TextField = _interopRequireDefault(require("@material-ui/core/TextField"));

var _Autocomplete = _interopRequireDefault(require("@material-ui/lab/Autocomplete"));

var _InventoryProvider = require("./InventoryProvider");

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _core = require("@material-ui/core");

var _AddCircleOutline = _interopRequireDefault(require("@material-ui/icons/AddCircleOutline"));

var _DeleteOutlined = _interopRequireDefault(require("@material-ui/icons/DeleteOutlined"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch"
      },
      heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular
      }
    }
  };
});

function VariationForm(_ref) {
  var index = _ref.index,
      variation = _ref.variation,
      setState = _ref.setState;
  return /*#__PURE__*/_react.default.createElement("div", {
    elavation: 0,
    style: {
      marginTop: 10,
      flexDirection: 'row',
      display: 'flex',
      width: '100%',
      alignItems: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement(_TextField.default, {
    style: {
      flex: 3
    },
    id: "name",
    value: variation ? variation.name || "" : "",
    label: "Variation Name",
    onChange: function onChange(e) {
      setState(_objectSpread(_objectSpread({}, variation), {}, {
        name: e.target.value
      }));
    }
  }), /*#__PURE__*/_react.default.createElement(_TextField.default, {
    style: {
      flex: 3
    },
    id: "price",
    label: "Price",
    value: variation ? variation.price || "" : "",
    onChange: function onChange(e) {
      setState(_objectSpread(_objectSpread({}, variation), {}, {
        price: parseFloat(e.target.value)
      }));
    }
  }), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: 20
    }
  }, /*#__PURE__*/_react.default.createElement(_core.IconButton, {
    "aria-label": "delete",
    size: "small",
    onClick: function onClick() {
      setState(null, index);
    }
  }, /*#__PURE__*/_react.default.createElement(_DeleteOutlined.default, {
    style: {
      color: 'red'
    },
    fontSize: "inherit"
  }))));
}

function VariationsForm(_ref2) {
  var itemId = _ref2.itemId,
      _ref2$variations = _ref2.variations,
      variations = _ref2$variations === void 0 ? [] : _ref2$variations,
      setVariations = _ref2.setVariations;
  var classes = useStyles();

  var _useState = (0, _react.useState)({
    count: variations.length
  }),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  (0, _react.useEffect)(function () {
    setState({
      count: variations.length
    });
  }, [variations]);
  var VariationFormArray = [];

  var _loop = function _loop(i) {
    VariationFormArray.push( /*#__PURE__*/_react.default.createElement(VariationForm, {
      key: "key-".concat(i),
      setState: function setState(variationState, index) {
        var newVariations = _toConsumableArray(variations);

        if (!variationState) {
          // User wants it removed
          var variationsWithoutIndex = newVariations.filter(function (item, j) {
            return j !== index;
          });
          return setVariations(variationsWithoutIndex);
        }

        if (!newVariations[i]) newVariations[i] = {};
        newVariations[i] = _objectSpread(_objectSpread(_objectSpread({}, newVariations[i]), variationState), {}, {
          itemId: itemId
        });
        setVariations(newVariations);
      },
      index: i,
      variation: variations[i]
    }));
  };

  for (var i = 0; i < state.count; i++) {
    _loop(i);
  }

  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      fontFamily: "Roboto",
      marginTop: 20,
      marginBottom: 10,
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/_react.default.createElement(_core.Typography, {
    className: classes.heading
  }, "Variations"), /*#__PURE__*/_react.default.createElement(_core.IconButton, {
    "aria-label": "delete",
    size: "small",
    onClick: function onClick() {
      setState(_objectSpread(_objectSpread({}, state), {}, {
        count: state.count + 1
      }));
    }
  }, /*#__PURE__*/_react.default.createElement(_AddCircleOutline.default, {
    fontSize: "inherit"
  }))), VariationFormArray);
}