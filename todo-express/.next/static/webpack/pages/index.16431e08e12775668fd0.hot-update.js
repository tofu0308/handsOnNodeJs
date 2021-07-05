/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./components/Todos.js":
/*!*****************************!*\
  !*** ./components/Todos.js ***!
  \*****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Todos; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Users_fujiitakeshi_workspace_handsOnNodeJs_todo_express_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ \"./node_modules/@babel/runtime/regenerator/index.js\");\n/* harmony import */ var _Users_fujiitakeshi_workspace_handsOnNodeJs_todo_express_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Users_fujiitakeshi_workspace_handsOnNodeJs_todo_express_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _Users_fujiitakeshi_workspace_handsOnNodeJs_todo_express_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/head */ \"./node_modules/next/head.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var isomorphic_fetch__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! isomorphic-fetch */ \"./node_modules/isomorphic-fetch/fetch-npm-browserify.js\");\n/* harmony import */ var isomorphic_fetch__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(isomorphic_fetch__WEBPACK_IMPORTED_MODULE_6__);\n/* module decorator */ module = __webpack_require__.hmd(module);\n\n\n\n\n\nvar _jsxFileName = \"/Users/fujiitakeshi/workspace/handsOnNodeJs/todo-express/components/Todos.js\",\n    _this = undefined,\n    _s = $RefreshSig$();\n\n// 外部モジュールで公開されたものを利用するためのimport文\n\n\n\n // 各ページに関する情報の定義\n\nvar pages = {\n  index: {\n    title: 'すべてのToDo',\n    fetchQuery: ''\n  },\n  active: {\n    title: '未完了のToDo',\n    fetchQuery: '?completed=false'\n  },\n  completed: {\n    title: '完了したのToDo',\n    fetchQuery: '?completed=false'\n  }\n}; // CSRでページを切り替えるためのリンク\n\nvar pageLinks = Object.keys(pages).map(function (page, index) {\n  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_4___default()), {\n    href: \"/\".concat(page === 'index' ? '' : page),\n    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"a\", {\n      style: {\n        marginRight: 10\n      },\n      children: pages[page].title\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 17,\n      columnNumber: 5\n    }, _this)\n  }, index, false, {\n    fileName: _jsxFileName,\n    lineNumber: 16,\n    columnNumber: 3\n  }, _this);\n}); // Reactコンポーネントを実装し、外部のモジュールで利用可能なようexport文で公開\n\nfunction Todos(props) {\n  _s();\n\n  var _this2 = this;\n\n  var _pages$props$page = pages[props.page],\n      title = _pages$props$page.title,\n      fetchQuery = _pages$props$page.fetchQuery; // コンポーネントの状態の初期化とpropsの値に応じた更新\n\n  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)([]),\n      todos = _useState[0],\n      setTodos = _useState[1];\n\n  (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(function () {\n    fetch(\"/api/todos\".concat(fetchQuery)).then( /*#__PURE__*/function () {\n      var _ref = (0,_Users_fujiitakeshi_workspace_handsOnNodeJs_todo_express_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__.default)( /*#__PURE__*/_Users_fujiitakeshi_workspace_handsOnNodeJs_todo_express_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee(res) {\n        return _Users_fujiitakeshi_workspace_handsOnNodeJs_todo_express_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee$(_context) {\n          while (1) {\n            switch (_context.prev = _context.next) {\n              case 0:\n                if (!res.ok) {\n                  _context.next = 8;\n                  break;\n                }\n\n                _context.t1 = setTodos;\n                _context.next = 4;\n                return res.json();\n\n              case 4:\n                _context.t2 = _context.sent;\n                _context.t0 = (0, _context.t1)(_context.t2);\n                _context.next = 13;\n                break;\n\n              case 8:\n                _context.t3 = alert;\n                _context.next = 11;\n                return res.text();\n\n              case 11:\n                _context.t4 = _context.sent;\n                _context.t0 = (0, _context.t3)(_context.t4);\n\n              case 13:\n                return _context.abrupt(\"return\", _context.t0);\n\n              case 14:\n              case \"end\":\n                return _context.stop();\n            }\n          }\n        }, _callee);\n      }));\n\n      return function (_x) {\n        return _ref.apply(this, arguments);\n      };\n    }());\n  }, [props.pages]); // このコンポーネントが描画するUIをJSXで記述して返す\n\n  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_5___default()), {\n      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"title\", {\n        children: title\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 39,\n        columnNumber: 9\n      }, this)\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 38,\n      columnNumber: 7\n    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n      children: title\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 41,\n      columnNumber: 7\n    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"ul\", {\n      children: todos.map(function (_ref2) {\n        var id = _ref2.id,\n            title = _ref2.title,\n            completed = _ref2.completed;\n        return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n          children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n            style: completed ? {\n              textDecoration: 'line-through'\n            } : {},\n            children: title\n          }, void 0, false, {\n            fileName: _jsxFileName,\n            lineNumber: 47,\n            columnNumber: 13\n          }, _this2)\n        }, id, false, {\n          fileName: _jsxFileName,\n          lineNumber: 46,\n          columnNumber: 11\n        }, _this2);\n      })\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 44,\n      columnNumber: 7\n    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n      children: pageLinks\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 53,\n      columnNumber: 7\n    }, this)]\n  }, void 0, true);\n}\n\n_s(Todos, \"4w2FR3x+JAhc2MKl4V8naiLXs70=\");\n\n_c = Todos;\n\nvar _c;\n\n$RefreshReg$(_c, \"Todos\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9Ub2Rvcy5qcz9kNTI1Il0sIm5hbWVzIjpbInBhZ2VzIiwiaW5kZXgiLCJ0aXRsZSIsImZldGNoUXVlcnkiLCJhY3RpdmUiLCJjb21wbGV0ZWQiLCJwYWdlTGlua3MiLCJPYmplY3QiLCJrZXlzIiwibWFwIiwicGFnZSIsIm1hcmdpblJpZ2h0IiwiVG9kb3MiLCJwcm9wcyIsInVzZVN0YXRlIiwidG9kb3MiLCJzZXRUb2RvcyIsInVzZUVmZmVjdCIsImZldGNoIiwidGhlbiIsInJlcyIsIm9rIiwianNvbiIsImFsZXJ0IiwidGV4dCIsImlkIiwidGV4dERlY29yYXRpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0NBR0E7O0FBQ0EsSUFBTUEsS0FBSyxHQUFHO0FBQ1pDLE9BQUssRUFBRTtBQUFDQyxTQUFLLEVBQUUsVUFBUjtBQUFvQkMsY0FBVSxFQUFDO0FBQS9CLEdBREs7QUFFWkMsUUFBTSxFQUFFO0FBQUNGLFNBQUssRUFBRSxVQUFSO0FBQW9CQyxjQUFVLEVBQUM7QUFBL0IsR0FGSTtBQUdaRSxXQUFTLEVBQUU7QUFBQ0gsU0FBSyxFQUFFLFdBQVI7QUFBcUJDLGNBQVUsRUFBQztBQUFoQztBQUhDLENBQWQsQyxDQU1BOztBQUNBLElBQU1HLFNBQVMsR0FBR0MsTUFBTSxDQUFDQyxJQUFQLENBQVlSLEtBQVosRUFBbUJTLEdBQW5CLENBQXVCLFVBQUNDLElBQUQsRUFBT1QsS0FBUDtBQUFBLHNCQUN2Qyw4REFBQyxrREFBRDtBQUFNLFFBQUksYUFBTVMsSUFBSSxLQUFLLE9BQVQsR0FBbUIsRUFBbkIsR0FBd0JBLElBQTlCLENBQVY7QUFBQSwyQkFDRTtBQUFHLFdBQUssRUFBRTtBQUFFQyxtQkFBVyxFQUFFO0FBQWYsT0FBVjtBQUFBLGdCQUFnQ1gsS0FBSyxDQUFDVSxJQUFELENBQUwsQ0FBWVI7QUFBNUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURGLEtBQXFERCxLQUFyRDtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBRHVDO0FBQUEsQ0FBdkIsQ0FBbEIsQyxDQUtBOztBQUNlLFNBQVNXLEtBQVQsQ0FBZUMsS0FBZixFQUFzQjtBQUFBOztBQUFBOztBQUFBLDBCQUNQYixLQUFLLENBQUNhLEtBQUssQ0FBQ0gsSUFBUCxDQURFO0FBQUEsTUFDNUJSLEtBRDRCLHFCQUM1QkEsS0FENEI7QUFBQSxNQUNyQkMsVUFEcUIscUJBQ3JCQSxVQURxQixFQUduQzs7QUFIbUMsa0JBSVRXLCtDQUFRLENBQUMsRUFBRCxDQUpDO0FBQUEsTUFJNUJDLEtBSjRCO0FBQUEsTUFJckJDLFFBSnFCOztBQU1uQ0Msa0RBQVMsQ0FBQyxZQUFNO0FBQ2RDLFNBQUsscUJBQWNmLFVBQWQsRUFBTCxDQUNHZ0IsSUFESDtBQUFBLHFVQUNRLGlCQUFNQyxHQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBYUEsR0FBRyxDQUFDQyxFQUFqQjtBQUFBO0FBQUE7QUFBQTs7QUFBQSw4QkFDRkwsUUFERTtBQUFBO0FBQUEsdUJBQ2FJLEdBQUcsQ0FBQ0UsSUFBSixFQURiOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSw4QkFFRkMsS0FGRTtBQUFBO0FBQUEsdUJBRVVILEdBQUcsQ0FBQ0ksSUFBSixFQUZWOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BRFI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLRCxHQU5RLEVBTU4sQ0FBQ1gsS0FBSyxDQUFDYixLQUFQLENBTk0sQ0FBVCxDQU5tQyxDQWNuQzs7QUFDQSxzQkFDRTtBQUFBLDRCQUNFLDhEQUFDLGtEQUFEO0FBQUEsNkJBQ0U7QUFBQSxrQkFBUUU7QUFBUjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREY7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQURGLGVBSUU7QUFBQSxnQkFBS0E7QUFBTDtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBSkYsZUFPRTtBQUFBLGdCQUNHYSxLQUFLLENBQUNOLEdBQU4sQ0FBVTtBQUFBLFlBQUVnQixFQUFGLFNBQUVBLEVBQUY7QUFBQSxZQUFNdkIsS0FBTixTQUFNQSxLQUFOO0FBQUEsWUFBYUcsU0FBYixTQUFhQSxTQUFiO0FBQUEsNEJBQ1Q7QUFBQSxpQ0FDRTtBQUFNLGlCQUFLLEVBQUVBLFNBQVMsR0FBRztBQUFDcUIsNEJBQWMsRUFBRTtBQUFqQixhQUFILEdBQXNDLEVBQTVEO0FBQUEsc0JBQ0d4QjtBQURIO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFERixXQUFTdUIsRUFBVDtBQUFBO0FBQUE7QUFBQTtBQUFBLGtCQURTO0FBQUEsT0FBVjtBQURIO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFQRixlQWdCRTtBQUFBLGdCQUFNbkI7QUFBTjtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBaEJGO0FBQUEsa0JBREY7QUFvQkQ7O0dBbkN1Qk0sSzs7S0FBQUEsSyIsImZpbGUiOiIuL2NvbXBvbmVudHMvVG9kb3MuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyDlpJbpg6jjg6Ljgrjjg6Xjg7zjg6vjgaflhazplovjgZXjgozjgZ/jgoLjga7jgpLliKnnlKjjgZnjgovjgZ/jgoHjga5pbXBvcnTmlodcbmltcG9ydCB7dXNlRWZmZWN0LCB1c2VTdGF0ZX0gZnJvbSAncmVhY3QnXG5pbXBvcnQgTGluayBmcm9tICduZXh0L2xpbmsnXG5pbXBvcnQgSGVhZCBmcm9tICduZXh0L2hlYWQnXG5pbXBvcnQgJ2lzb21vcnBoaWMtZmV0Y2gnXG5cbi8vIOWQhOODmuODvOOCuOOBq+mWouOBmeOCi+aDheWgseOBruWumue+qVxuY29uc3QgcGFnZXMgPSB7XG4gIGluZGV4OiB7dGl0bGU6ICfjgZnjgbnjgabjga5Ub0RvJywgZmV0Y2hRdWVyeTonJ30sXG4gIGFjdGl2ZToge3RpdGxlOiAn5pyq5a6M5LqG44GuVG9EbycsIGZldGNoUXVlcnk6Jz9jb21wbGV0ZWQ9ZmFsc2UnfSxcbiAgY29tcGxldGVkOiB7dGl0bGU6ICflrozkuobjgZfjgZ/jga5Ub0RvJywgZmV0Y2hRdWVyeTonP2NvbXBsZXRlZD1mYWxzZSd9LFxufVxuXG4vLyBDU1Ljgafjg5rjg7zjgrjjgpLliIfjgormm7/jgYjjgovjgZ/jgoHjga7jg6rjg7Pjgq9cbmNvbnN0IHBhZ2VMaW5rcyA9IE9iamVjdC5rZXlzKHBhZ2VzKS5tYXAoKHBhZ2UsIGluZGV4KSA9PiBcbiAgPExpbmsgaHJlZj17YC8ke3BhZ2UgPT09ICdpbmRleCcgPyAnJyA6IHBhZ2V9YH0ga2V5PXtpbmRleH0+XG4gICAgPGEgc3R5bGU9e3sgbWFyZ2luUmlnaHQ6IDEwIH19PntwYWdlc1twYWdlXS50aXRsZX08L2E+XG4gIDwvTGluaz4pXG5cbi8vIFJlYWN044Kz44Oz44Od44O844ON44Oz44OI44KS5a6f6KOF44GX44CB5aSW6YOo44Gu44Oi44K444Ol44O844Or44Gn5Yip55So5Y+v6IO944Gq44KI44GGZXhwb3J05paH44Gn5YWs6ZaLXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBUb2Rvcyhwcm9wcykge1xuICBjb25zdCB7dGl0bGUsIGZldGNoUXVlcnl9ID0gcGFnZXNbcHJvcHMucGFnZV1cblxuICAvLyDjgrPjg7Pjg53jg7zjg43jg7Pjg4jjga7nirbmhYvjga7liJ3mnJ/ljJbjgahwcm9wc+OBruWApOOBq+W/nOOBmOOBn+abtOaWsFxuICBjb25zdCBbdG9kb3MsIHNldFRvZG9zXSA9IHVzZVN0YXRlKFtdKVxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgZmV0Y2goYC9hcGkvdG9kb3Mke2ZldGNoUXVlcnl9YClcbiAgICAgIC50aGVuKGFzeW5jIHJlcyA9PiByZXMub2tcbiAgICAgICAgPyBzZXRUb2Rvcyhhd2FpdCByZXMuanNvbigpKVxuICAgICAgICA6IGFsZXJ0KGF3YWl0IHJlcy50ZXh0KCkpXG4gICAgICApXG4gIH0sIFtwcm9wcy5wYWdlc10pXG5cbiAgLy8g44GT44Gu44Kz44Oz44Od44O844ON44Oz44OI44GM5o+P55S744GZ44KLVUnjgpJKU1jjgafoqJjov7DjgZfjgabov5TjgZlcbiAgcmV0dXJuKFxuICAgIDw+XG4gICAgICA8SGVhZD5cbiAgICAgICAgPHRpdGxlPnt0aXRsZX08L3RpdGxlPlxuICAgICAgPC9IZWFkPlxuICAgICAgPGgxPnt0aXRsZX08L2gxPlxuXG4gICAgICB7LyogVG9Eb+S4gOimp+OBruihqOekuiAqL31cbiAgICAgIDx1bD5cbiAgICAgICAge3RvZG9zLm1hcCgoe2lkLCB0aXRsZSwgY29tcGxldGVkfSkgPT4gXG4gICAgICAgICAgPGxpIGtleT17aWR9PlxuICAgICAgICAgICAgPHNwYW4gc3R5bGU9e2NvbXBsZXRlZCA/IHt0ZXh0RGVjb3JhdGlvbjogJ2xpbmUtdGhyb3VnaCd9IDoge319PlxuICAgICAgICAgICAgICB7dGl0bGV9XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgKX1cbiAgICAgIDwvdWw+XG4gICAgICA8ZGl2PntwYWdlTGlua3N9PC9kaXY+XG4gICAgPC8+XG4gIClcbn1cblxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./components/Todos.js\n");

/***/ })

});