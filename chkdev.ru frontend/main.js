var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LogoSVG = function (_React$Component) {
    _inherits(LogoSVG, _React$Component);

    function LogoSVG(props) {
        _classCallCheck(this, LogoSVG);

        var _this = _possibleConstructorReturn(this, (LogoSVG.__proto__ || Object.getPrototypeOf(LogoSVG)).call(this, props));

        _this.state = {
            optimalScale: ""
        };

        _this.eStandartWidth = 169;
        _this.eStandartHeight = 104;
        return _this;
    }

    _createClass(LogoSVG, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var optimalScale = document.documentElement.clientWidth / 1000;
            console.log(optimalScale);
            this.setState({
                optimalScale: optimalScale
            });

            this.getElementsSizes(optimalScale);
        }
    }, {
        key: "getElementsSizes",
        value: function getElementsSizes(scale) {
            this.eWidth = Math.ceil(this.eStandartWidth * scale);
            this.eHeight = Math.ceil(this.eStandartHeight * scale);

            chkdev.eventVariables.evLogoNeedWidth = this.eWidth;
            chkdev.eventVariables.evLogoNeedHeight = this.eHeight;
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "svg",
                { xmlns: "http://www.w3.org/2000/svg", viewBox: "-18 0 169 104", width: "0px", height: "0px" },
                React.createElement(
                    "clipPath",
                    { id: "ev-logo-clippath" },
                    React.createElement("path", { d: "M 0 0 L -18 104 L 59 104 L 62 92 L -3 92 L 3 57 L 61 56 L 63 44 L 6 44 L 12 11 L 58 11 L 76 104 L 93 104 L 151 0 L 131 0 L 88 83 L 76 0 L 0 0 Z",
                        style: { transform: "scale(" + this.state.optimalScale + ") translateX(20px)" }, id: "evlphath" })
                )
            );
        }
    }]);

    return LogoSVG;
}(React.Component);

var EvLogoContainer = function (_React$Component2) {
    _inherits(EvLogoContainer, _React$Component2);

    function EvLogoContainer(props) {
        _classCallCheck(this, EvLogoContainer);

        var _this2 = _possibleConstructorReturn(this, (EvLogoContainer.__proto__ || Object.getPrototypeOf(EvLogoContainer)).call(this, props));

        _this2.state = {
            width: '',
            height: '',
            BGImageLeft: ''
        };

        _this2.variableWidth = "evLogoNeedWidth";
        _this2.variableHeight = "evLogoNeedHeight";
        _this2.bgImageLeftOffset = 0;
        chkdev.eventVariables[_this2.variableWidth] = "";
        chkdev.eventVariables[_this2.variableHeight] = "";

        _this2.setVariablesEventListeners();

        return _this2;
    }

    _createClass(EvLogoContainer, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this3 = this;

            setInterval(function () {
                if (_this3.bgImageLeftOffset < -2000) {
                    _this3.back = true;
                }

                if (_this3.bgImageLeftOffset === 0) {
                    _this3.back = false;
                }

                if (_this3.back) _this3.bgImageLeftOffset += 1;else _this3.bgImageLeftOffset -= 1;

                _this3.setState({
                    BGImageLeft: _this3.bgImageLeftOffset
                });
            }, 25);
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "EvLogo", style: { width: this.state.width, height: this.state.height } },
                React.createElement("div", { className: "image", style: { left: this.state.BGImageLeft + "px" } })
            );
        }
    }, {
        key: "setVariablesEventListeners",
        value: function setVariablesEventListeners() {
            var self = this;

            chkdev.setVariableChangeEvent(this.variableWidth, function (value) {
                self.setState({
                    width: value
                });
            });
            chkdev.setVariableChangeEvent(this.variableHeight, function (value) {
                self.setState({
                    height: value
                });
            });
        }
    }]);

    return EvLogoContainer;
}(React.Component);

var StartPage = function (_React$Component3) {
    _inherits(StartPage, _React$Component3);

    function StartPage(props) {
        _classCallCheck(this, StartPage);

        return _possibleConstructorReturn(this, (StartPage.__proto__ || Object.getPrototypeOf(StartPage)).call(this, props));
    }

    _createClass(StartPage, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(LogoSVG, null),
                React.createElement(EvLogoContainer, null)
            );
        }
    }]);

    return StartPage;
}(React.Component);

document.addEventListener("DOMContentLoaded", () => {
    var documentRoot = document.querySelector("#root");
    ReactDOM.render(React.createElement(StartPage, null), documentRoot);
    setInterval(() => {
        let element = document.querySelector(".image");
        //alert(window.getComputedStyle(element, null).getPropertyValue("left"));
    }, 100)
});

