import _regeneratorRuntime from 'babel-runtime/regenerator';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _this = this;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import React from 'react';
import User from './components/User';
import Repository from './components/Repository';

var ENDPOINT = 'https://wt-7aae5801f0beb40510fbf7db372fc5c9-0.sandbox.auth0-extend.com/jv_code_git_repositories';

var getUserRepositories = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    var useCache = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    var cacheExpiration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 24;
    var cacheEnabled, localData, diffHours, request, response;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            cacheEnabled = useCache && window.localStorage;
            localData = void 0;

            if (!cacheEnabled) {
              _context.next = 9;
              break;
            }

            localData = window.localStorage.getItem('gb-recent-activity');

            if (!localData) {
              _context.next = 9;
              break;
            }

            localData = JSON.parse(localData);
            diffHours = Math.abs(localData.createdAt - Date.now()) / 3600000;

            if (!(parseInt(diffHours) <= cacheExpiration)) {
              _context.next = 9;
              break;
            }

            return _context.abrupt('return', localData.response);

          case 9:
            _context.next = 11;
            return fetch(ENDPOINT);

          case 11:
            request = _context.sent;
            _context.next = 14;
            return request.json();

          case 14:
            response = _context.sent;


            if (cacheEnabled) {
              window.localStorage.setItem('gb-recent-activity', JSON.stringify({
                createdAt: Date.now(),
                response: response
              }));
            }

            return _context.abrupt('return', response);

          case 17:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  }));

  return function getUserRepositories() {
    return _ref.apply(this, arguments);
  };
}();

var resolveQuery = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(data) {
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt('return', function (state) {
              var ignoreRepository = state.ignoreRepository;

              var result = {};

              result.user = {
                name: data.user.name,
                url: data.user.url
              };

              result.repositories = [];

              if (data.user.repositories) {
                data.user.repositories.edges.forEach(function (_ref3) {
                  var node = _ref3.node;

                  if (ignoreRepository.indexOf(node.name) > -1) {
                    return;
                  }

                  var repository = {
                    name: node.name,
                    id: node.id,
                    url: node.url,
                    description: node.description,
                    commits: []
                  };

                  try {
                    repository.commitsTotalCount = node.defaultBranchRef.target.history.totalCount;
                    repository.commitListUrl = node.url + '/commits/' + node.defaultBranchRef.name;

                    var latestCommits = node.defaultBranchRef.target.history.edges;

                    repository.commits = latestCommits.map(function (_ref4) {
                      var node = _ref4.node;
                      return node;
                    });
                  } catch (error) {
                    console.log(error);
                  }

                  result.repositories.push(repository);
                });
              }

              return result;
            });

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  }));

  return function resolveQuery(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

var GithubActivity = function (_React$Component) {
  _inherits(GithubActivity, _React$Component);

  function GithubActivity(props) {
    _classCallCheck(this, GithubActivity);

    var _this2 = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this2.state = _extends({
      login: null,
      user: null,
      repositories: null,
      errors: null,
      ignoreRepository: [],
      useCache: true,
      cacheExpiration: 6

    }, props);
    return _this2;
  }

  GithubActivity.prototype.componentDidMount = function componentDidMount() {
    this.onFetchFromGithub();
  };

  GithubActivity.prototype.onFetchFromGithub = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
      var _ref6, data, _ref6$errors, errors;

      return _regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return getUserRepositories(this.state.useCache, this.state.cacheExpiration);

            case 3:
              _ref6 = _context3.sent;
              data = _ref6.data;
              _ref6$errors = _ref6.errors;
              errors = _ref6$errors === undefined ? null : _ref6$errors;


              this.setState({ errors: errors });

              if (errors) {
                _context3.next = 14;
                break;
              }

              _context3.t0 = this;
              _context3.next = 12;
              return resolveQuery(data);

            case 12:
              _context3.t1 = _context3.sent;

              _context3.t0.setState.call(_context3.t0, _context3.t1);

            case 14:
              _context3.next = 19;
              break;

            case 16:
              _context3.prev = 16;
              _context3.t2 = _context3['catch'](0);

              console.log(_context3.t2);

            case 19:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this, [[0, 16]]);
    }));

    function onFetchFromGithub() {
      return _ref5.apply(this, arguments);
    }

    return onFetchFromGithub;
  }();

  GithubActivity.prototype.render = function render() {
    var _state = this.state,
        login = _state.login,
        user = _state.user,
        repositories = _state.repositories,
        errors = _state.errors;


    return React.createElement(
      'div',
      { className: 'c-git-activity' },
      errors && React.createElement(
        'div',
        { 'class': 'c-git-activity__error-msg' },
        'Unexpected error. Data could not be loaded.'
      ),
      !errors && user && React.createElement(User, { user: user, login: login }),
      repositories && repositories.length ? React.createElement(
        'section',
        { className: 'c-git-activity__repositories' },
        repositories.map(function (x) {
          return React.createElement(Repository, _extends({
            key: x.id
          }, x));
        })
      ) : React.createElement(
        'div',
        { className: 'c-git-activity__loading' },
        'Loading...'
      )
    );
  };

  return GithubActivity;
}(React.Component);

export default GithubActivity;