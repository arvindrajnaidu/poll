"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ItemForm;

var _react = _interopRequireWildcard(require("react"));

var _styles = require("@material-ui/core/styles");

var _TextField = _interopRequireDefault(require("@material-ui/core/TextField"));

var _Autocomplete = _interopRequireWildcard(require("@material-ui/lab/Autocomplete"));

var _green = _interopRequireDefault(require("@material-ui/core/colors/green"));

var _InventoryProvider = require("./InventoryProvider");

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _VariationsForm = _interopRequireDefault(require("./VariationsForm"));

var _core = require("@material-ui/core");

var _SaveOutlined = _interopRequireDefault(require("@material-ui/icons/SaveOutlined"));

var _CheckOutlined = _interopRequireDefault(require("@material-ui/icons/CheckOutlined"));

var _ajv = _interopRequireDefault(require("ajv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ajv = new _ajv.default();
var validator = {
  create_item: ajv.compile({
    type: "object",
    properties: {
      name: {
        type: "string"
      },
      catId: {
        type: "string"
      },
      variations: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: {
              type: "string"
            },
            price: {
              type: "integer"
            },
            itemId: {
              type: "string"
            }
          },
          required: ["name", "price"]
        }
      }
    },
    required: ["name", "catId", "variations"],
    additionalProperties: false
  })
};
var filter = (0, _Autocomplete.createFilterOptions)();
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

function CategoriesInput(_ref) {
  var catId = _ref.catId,
      onSelected = _ref.onSelected;

  var _useContext = (0, _react.useContext)(_InventoryProvider.InventoryContext),
      categories = _useContext.categories,
      dispatch = _useContext.dispatch;

  var createdCat = (0, _react.useRef)(false);

  var _useState = (0, _react.useState)(),
      _useState2 = _slicedToArray(_useState, 2),
      category = _useState2[0],
      setCategory = _useState2[1];

  (0, _react.useEffect)(function () {
    if (!catId) {
      return setCategory(undefined);
    }

    setCategory(categories.find(function (c) {
      return c.id === catId;
    }));
  }, [catId]);
  (0, _react.useEffect)(function () {
    if (createdCat.current) {
      // A Cat was just added. Make it the current cat
      createdCat.current = false;
      onSelected(categories[categories.length - 1].id);
    }
  }, [categories]);
  return /*#__PURE__*/_react.default.createElement(_Autocomplete.default, {
    id: "category",
    options: categories || [],
    freeSolo: true,
    selectOnFocus: true,
    clearOnBlur: true,
    handleHomeEndKeys: true //   defaultValue={catId || ''}
    //   value = {category ? {inputValue: category.id, title: category.name} : null}
    ,
    inputValue: category ? category.name : "",
    onChange: function onChange(e, v) {
      var result;

      if (typeof v === "string") {
        result = dispatch({
          type: "create_category",
          name: v
        });
        createdCat.current = true;
      } else if (v && v.inputValue) {
        result = dispatch({
          type: "create_category",
          name: v.inputValue
        });
        createdCat.current = true;
      } else if (v) {
        onSelected(v.id);
      }
    },
    onInputChange: function onInputChange(e, v) {
      setCategory({
        name: v
      });
    },
    filterOptions: function filterOptions(options, params) {
      var filtered = filter(options, params); // Suggest the creation of a new value

      if (params.inputValue !== "") {
        filtered.push({
          inputValue: params.inputValue,
          name: "Add \"".concat(params.inputValue, "\"")
        });
      }

      return filtered;
    },
    getOptionLabel: function getOptionLabel(option) {
      // Value selected with enter, right from the input
      if (typeof option === "string") {
        return option;
      } // Add "xxx" option created dynamically


      if (option.inputValue) {
        return option.inputValue;
      } // Regular option


      return option.name || "";
    } //   getOptionLabel={(option) => option.name || ""}
    ,
    renderInput: function renderInput(params) {
      return /*#__PURE__*/_react.default.createElement(_TextField.default, _extends({}, params, {
        label: "Category",
        margin: "normal"
      }));
    }
  }); //   return (
  //     <Autocomplete
  //       id="category"
  //       options={categories || []}
  //       value={category || {}}
  //       inputValue={category ? category.name : ""}
  //       onInputChange={(e, v) => {
  //         setCategory({ name: v });
  //       }}
  //       freeSolo
  //       onChange={(e, v) => {
  //         console.log(e, v);
  //         if (typeof v === "string") {
  //           dispatch({
  //             type: "create_category",
  //             name: v,
  //           });
  //         } else if (v) {
  //           onSelected(v.id);
  //         }
  //       }}
  //       getOptionLabel={(option) => option.name || ""}
  //       renderInput={(params) => (
  //         <TextField {...params} label="Category" margin="normal" />
  //       )}
  //     />
  //   );
}

function isValidItem() {
  return validator["create_item"].apply(validator, arguments);
}

function ItemForm() {
  var classes = useStyles();
  var all = (0, _react.useContext)(_InventoryProvider.InventoryContext);

  var _useState3 = (0, _react.useState)({
    saved: false
  }),
      _useState4 = _slicedToArray(_useState3, 2),
      state = _useState4[0],
      setState = _useState4[1]; //   useEffect(() => {
  //     // console.log(state, "<<< State");
  //     // const payload = {
  //     //     name: state.name,
  //     //     catId: state.catId,
  //     //     variations: state.variations,
  //     // };
  //     // setState({isValidItem : })
  //   }, [state]);


  (0, _react.useEffect)(function () {
    console.log(all, "<<< Context");
  }, [all]);
  (0, _react.useEffect)(function () {
    if (!all.selectedItem) return;
    var variations = all.variations.filter(function (v) {
      return v.itemId === all.selectedItem.id;
    });
    console.log("Setting state with selected item", all.selectedItem);
    setState(_objectSpread(_objectSpread({}, all.selectedItem), {}, {
      variations: variations
    }));
  }, [all.selectedItem]);
  (0, _react.useEffect)(function () {
    if (state.saved) {
      setTimeout(function () {
        setState(_objectSpread(_objectSpread({}, state), {}, {
          saved: false
        }));
      }, 1000);
    }
  }, [state.saved]);
  var payload = {
    name: state.name,
    catId: state.catId,
    variations: state.variations
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      textAlign: "right"
    }
  }, /*#__PURE__*/_react.default.createElement(_core.Typography, null, all.selectedItem ? "New Item Form" : "Edit Item Form")), /*#__PURE__*/_react.default.createElement("form", {
    noValidate: true,
    autoComplete: "off"
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/_react.default.createElement(_TextField.default, {
    id: "name",
    label: "Name",
    value: state.name || "",
    onChange: function onChange(e) {
      setState(_objectSpread(_objectSpread({}, state), {}, {
        name: e.target.value
      }));
    }
  }), /*#__PURE__*/_react.default.createElement(CategoriesInput, {
    catId: state.catId || null,
    onSelected: function onSelected(catId) {
      setState(_objectSpread(_objectSpread({}, state), {}, {
        catId: catId
      }));
    }
  }), /*#__PURE__*/_react.default.createElement(_VariationsForm.default, {
    setVariations: function setVariations(variations) {
      setState(_objectSpread(_objectSpread({}, state), {}, {
        variations: variations
      }));
    },
    itemId: state.id,
    variations: state.variations || []
  })), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "row-reverse",
      marginTop: 20
    }
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    variant: "contained",
    style: {
      backgroundColor: state.saved ? _green.default["500"] : null
    },
    color: "primary",
    disabled: !isValidItem(payload),
    startIcon: state.saved ? /*#__PURE__*/_react.default.createElement(_CheckOutlined.default, null) : /*#__PURE__*/_react.default.createElement(_SaveOutlined.default, null),
    onClick: function onClick() {
      if (all.selectedItem) {
        all.dispatch(_objectSpread({
          type: "update_item",
          id: state.id
        }, payload));
      } else {
        all.dispatch(_objectSpread({
          type: "create_item"
        }, payload));
      }

      setState(_objectSpread(_objectSpread({}, state), {}, {
        saved: true
      }));
    }
  }, all.selectedItem ? "Save Item" : "Create Item"), all.selectedItem ? /*#__PURE__*/_react.default.createElement(_Button.default, {
    style: {
      marginRight: 10
    },
    variant: "outlined",
    color: "primary",
    onClick: function onClick() {
      all.dispatch({
        type: "cancel_selected_item"
      });
      setState({});
    }
  }, "Cancel") : null)));
}