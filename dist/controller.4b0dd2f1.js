// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, cache, entry, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject.parcelRequire === 'function' &&
    globalObject.parcelRequire;
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  globalObject.parcelRequire = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"1db0a94c68fb241ef4e571314d10dc74":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "4b0dd2f1559f293c25d5a9291da00cbd";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH */

var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept, acceptedAssets; // eslint-disable-next-line no-redeclare

var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
  var port = HMR_PORT || location.port;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    acceptedAssets = {};
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH); // Handle HMR Update

      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || hmrAcceptCheck(global.parcelRequire, asset.id);

        if (didAccept) {
          handled = true;
        }
      });

      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });

        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];

          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      } // Render the fancy html overlay


      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      document.body.appendChild(overlay);
    }
  };

  ws.onerror = function (e) {
    console.error(e.message);
  };

  ws.onclose = function (e) {
    console.warn('[parcel] 🚨 Connection to the HMR server was lost');
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}

function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';

  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }

  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push([bundle, k]);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    if (link.parentNode !== null) {
      link.parentNode.removeChild(link);
    }
  };

  newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now());
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      var absolute = /^https?:\/\//i.test(links[i].getAttribute('href'));

      if (!absolute) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    if (asset.type === 'css') {
      reloadCSS();
    } else {
      var fn = new Function('require', 'module', 'exports', asset.output);
      modules[asset.id] = [fn, asset.depsByBundle[bundle.HMR_BUNDLE_ID]];
    }
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1]);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached && cached.hot) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      var assetsToAlsoAccept = cb(function () {
        return getParents(global.parcelRequire, id);
      });

      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }

  acceptedAssets[id] = true;
}
},{}],"175e469a7ea7db1c8c0744d04372621f":[function(require,module,exports) {
'use strict'; // canvas

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext('2d');
const colorArray = ['rgba(0, 138, 229,0.5)', 'rgb(76, 184, 255,0.5)', 'rgba(144, 211, 255, 0.5)', 'rgba(97, 186, 255, 0.5)', 'rgba(111, 210, 231, 0.5)'];
let mouse = {
  x: undefined,
  y: undefined
};

class Circle {
  constructor(_fillColor) {
    _defineProperty(this, "radius", Math.random() * 5 + 1);

    _defineProperty(this, "maxRadius", 20);

    _defineProperty(this, "minRadius", this.radius);

    _defineProperty(this, "x", Math.random() * (innerWidth - this.radius * 2) + this.radius);

    _defineProperty(this, "y", Math.random() * (innerHeight - this.radius * 2) + this.radius);

    _defineProperty(this, "dx", Math.random() * 0.5);

    _defineProperty(this, "dy", Math.random() * 0.5);

    _defineProperty(this, "dxMin", this.dx);

    _defineProperty(this, "dyMin", this.dy);

    _defineProperty(this, "increaseV", 0.3);

    _defineProperty(this, "fillColor", undefined);

    _defineProperty(this, "draw", function (fillColor) {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.strokeStyle = `transparent`;
      c.stroke();
      c.fillStyle = fillColor;
      c.fill();
    });

    _defineProperty(this, "update", function () {
      if (this.x + this.radius > innerWidth || this.x - this.radius < 0) this.dx = -this.dx;
      if (this.y + this.radius > innerHeight || this.y - this.radius < 0) this.dy = -this.dy;
      this.x += this.dx;
      this.y += this.dy; // interactivity

      if (Math.abs(mouse.x - this.x) < 50 && Math.abs(mouse.y - this.y) < 50) {
        this.dx > 0 ? this.dx += this.increaseV : this.dx -= this.increaseV;
        this.dy > 0 ? this.dy += this.increaseV : this.dy -= this.increaseV;
      } else {
        if (Math.abs(this.dx) > Math.abs(this.dxMin)) this.dx > 0 ? this.dx -= this.increaseV : this.dx += this.increaseV;
        if (Math.abs(this.dy) > Math.abs(this.dyMin)) this.dy > 0 ? this.dy -= this.increaseV : this.dy += this.increaseV;
      }

      this.draw(this.fillColor);
    });

    this.draw(_fillColor);
    this.fillColor = colorArray[Math.floor(Math.random() * colorArray.length)];
  }

}

let circleArray = [];

for (let i = 0; i < 200; i++) {
  let fillColor = `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},${Math.random()})`;
  circleArray.push(new Circle(fillColor));
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < circleArray.length; i++) circleArray[i].update();
}

animate();
window.addEventListener('mousemove', function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});
window.addEventListener('resize', function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
const nav = document.querySelector('.header__navigation');

const stickyNavBar = function () {
  const navHeight = nav.getBoundingClientRect().height;
  const header = document.querySelector('.header');

  const stickyNav = function (entries) {
    const [entry] = entries;
    !entry.isIntersecting ? nav.classList.add('sticky') : nav.classList.remove('sticky');
  };

  const headerObserve = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0.15,
    rootMargin: `-${navHeight}px`
  });
  headerObserve.observe(header);
};

const scrollToEffect = function () {
  const sectionAbout = document.querySelector('#section-about');
  document.querySelector('.toSectionAbout').addEventListener('click', function (event) {
    event.preventDefault();
    sectionAbout.scrollIntoView({
      behavior: 'smooth'
    });
  });

  const scrollSmooth = function (event) {
    const id = event.target.getAttribute('href');
    if (id != /^#/) return;
    event.preventDefault();
    const coords = document.querySelector(id).getBoundingClientRect();

    window: scrollTo({
      left: coords.left + window.pageXOffset,
      top: coords.top + window.pageYOffset,
      behavior: 'smooth'
    });
  };

  document.querySelector('.navigation__list').addEventListener('click', function (event) {
    if (event.target.classList.contains('navigation__link')) {
      scrollSmooth(event);
      document.querySelector('.navigation__checkbox').checked = false;
    }
  });
  document.querySelector('.menu').addEventListener('click', function (event) {
    if (event.target.classList.contains('nav_link') && !event.target.classList.contains('download__link')) {
      scrollSmooth(event);
    }
  });
};

const fadeIn = function () {
  //const projectBox = document.querySelector('.project-cards-box');
  const projectCards = document.querySelectorAll('.project-card');

  const showSection = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entries.forEach(entry => entry.target.classList.remove('section--hidden'));
    observer.unobserve(entry.target);
  };

  const sectionObserve = new IntersectionObserver(showSection, {
    root: null,
    threshold: 0.15
  }); //sectionObserve.observe(projectBox);
  //projectBox.classList.add('section--hidden');

  projectCards.forEach(projectCard => {
    sectionObserve.observe(projectCard);
    projectCard.classList.add('section--hidden');
  });
}; // const toggleClassCheckbox = function () {
//   const checkbox = document.querySelector('.classes__checkbox');
//   document.querySelector('body').addEventListener('click', function (event) {
//     if (
//       !event.target.classList.contains('classes__checkbox') &&
//       !event.target.classList.contains('nav_link-btn')
//     ) {
//       if (checkbox.checked) checkbox.checked = false;
//     }
//   });
// };
// toggleClassCheckbox();


stickyNavBar();
scrollToEffect();
fadeIn();
},{}]},{},["1db0a94c68fb241ef4e571314d10dc74","175e469a7ea7db1c8c0744d04372621f"], null)

//# sourceMappingURL=controller.4b0dd2f1.js.map
