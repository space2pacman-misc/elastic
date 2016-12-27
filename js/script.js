// create the container div
var d = document.createElement('div');
// create the container div
var dv = document.createElement('div');
// get all divs
var divs = document.getElementsByTagName('input');
// get the body element
var body = document.getElementsByTagName('body')[0];
// apply class to container div
dv.setAttribute('class', 'elastic__block');
d.setAttribute('class', 'elastic');

// find out all those divs having class C
for (var i = 0; i < divs.length; i++) {
  if (divs[i].getAttribute('class') === 'el') {
    // put the divs having class C inside container div
    dv.appendChild(divs[i]);
    d.appendChild(dv);
  }
}
// finally append the container div to body
body.appendChild(d);

var block = document.querySelector('.elastic__block');
var elWidth = $('.el').css('width');
var elheight = $('.el').css('height');
$('.elastic__block').css('width', 'calc(' + elWidth + ' + 10px)');
$('.elastic__block').css('height', 'calc(' + elheight + ' + 10px)');

document.querySelector('.elastic__block').setAttribute('data-morph-active', 'M110,110 C110,110 84,118 60,118 C31,118 10,110 10,110 S6,94 6,60 C6,31 10,10 10,10 S31,0 60,0 C91,0 110,10 110,10 S114,27 114,61 C114,93 110,110 110,110 L110,110 z');
document.querySelector('.elastic__block').setAttribute('data-morph-reset', 'M110,110 C110,110 71,110 60,110 C46,110 10,110 10,110 S10,70 10,58 C10,45 10,10 10,10 S47,10 60,10 C72,10 110,10 110,10 S110,45 110,58 C110,70 110,110 110,110 z');

var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

document.querySelector('.elastic__block').appendChild(svg);
document.querySelector('.elastic__block svg').appendChild(path);

var blockPath = document.querySelector('.elastic__block path')
blockPath.setAttribute("transform", "translate(" + (block.offsetWidth) / -10 + "," + (block.offsetHeight) / -10 + ") scale(" + (block.offsetWidth) / 100 + "," + (block.offsetHeight) / 100 + ")");

document.querySelector('.elastic__block svg path').setAttribute('d', 'M110,110 C110,110 71,110 60,110 C46,110 10,110 10,110 S10,70 10,58 C10,45 10,10 10,10 S47,10 60,10 C72,10 110,10 110,10 S110,45 110,58 C110,70 110,110 110,110 z');

(function() {

  function extend(a, b) {
    for (var key in b) {
      if (b.hasOwnProperty(key)) {
        a[key] = b[key];
      }
    }
    return a;
  }

  function SVGButton(el, options) {
    this.el = el;
    this.options = extend({}, this.options);
    extend(this.options, options);
    this.init();
  }

  SVGButton.prototype.options = {
    speed: {
      reset: 800,
      active: 150
    },
    easing: {
      reset: mina.elastic,
      active: mina.easein
    }
  };

  SVGButton.prototype.init = function() {
    this.shapeEl = this.el.querySelector('div.elastic__block');

    var s = Snap(this.shapeEl.querySelector('svg'));
    this.pathEl = s.select('path');
    this.paths = {
      reset: this.shapeEl.getAttribute('data-morph-reset'),
      active: this.shapeEl.getAttribute('data-morph-active')
    };

    this.initEvents();
  };

  SVGButton.prototype.initEvents = function() {
    this.el.addEventListener('mousedown', this.down.bind(this));
    this.el.addEventListener('touchstart', this.down.bind(this));

    this.el.addEventListener('mouseup', this.up.bind(this));
    this.el.addEventListener('touchend', this.up.bind(this));

    this.el.addEventListener('mouseout', this.up.bind(this));
  };

  SVGButton.prototype.down = function() {
    this.pathEl.stop().animate({
      'path': this.paths.active
    }, this.options.speed.active, this.options.easing.active);
  };

  SVGButton.prototype.up = function() {
    this.pathEl.stop().animate({
      'path': this.paths.reset
    }, this.options.speed.reset, this.options.easing.reset);
  };

  [].slice.call(document.querySelectorAll('div.elastic')).forEach(function(el) {
    new SVGButton(el);
  });

})();
