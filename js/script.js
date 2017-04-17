window.onload=function(){
var elements = document.querySelectorAll('.el');

for (var i = 0; i < elements.length; i++) {
  if (elements[i].getAttribute('class') === 'el') {
    var divOne = document.createElement('div');
    var divTwo = document.createElement('div');
    divOne.setAttribute('class', 'elastic');
    divTwo.setAttribute('class', 'elastic__block');
    divTwo.innerHTML = elements[i].outerHTML;
    divOne.appendChild(divTwo);
    elements[i].parentNode.replaceChild(divOne, elements[i])
  }
}

var elBlock = document.querySelectorAll('.elastic__block');
var elWidth = $('.el').css('width');
var elheight = $('.el').css('height');
$('.elastic__block').css('width', 'calc(' + elWidth + ' + 10px)');
$('.elastic__block').css('height', 'calc(' + elheight + ' + 10px)');
$('.elastic__block').css('margin', '0');
$('.elastic__block').css('padding', '0');
$('.elastic__block').css('padding-top', '10px');
$('.elastic__block').css('margin-top', '-5px');

for (var i = 0; i < elBlock.length; i++) {
  elBlock[i].setAttribute('data-morph-active', 'M110,110 C110,110 84,118 60,118 C31,118 10,110 10,110 S6,94 6,60 C6,31 10,10 10,10 S31,0 60,0 C91,0 110,10 110,10 S114,27 114,61 C114,93 110,110 110,110 L110,110 z');
  elBlock[i].setAttribute('data-morph-reset', 'M110,110 C110,110 71,110 60,110 C46,110 10,110 10,110 S10,70 10,58 C10,45 10,10 10,10 S47,10 60,10 C72,10 110,10 110,10 S110,45 110,58 C110,70 110,110 110,110 z');
  elBlock[i].className += (' ' + elements[i].getAttribute('class') + '');
  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  document.querySelectorAll('.elastic__block')[i].appendChild(svg);
  document.querySelectorAll('.elastic__block svg')[i].appendChild(path);

  var blockPath = document.querySelectorAll('.elastic__block path')
  blockPath[i].setAttribute("transform", "translate(" + (elBlock[i].offsetWidth) / -10 + "," + (elBlock[i].offsetHeight) / -10 + ") scale(" + (elBlock[i].offsetWidth) / 100 + "," + (elBlock[i].offsetHeight) / 100 + ")");

  document.querySelectorAll('.elastic__block svg path')[i].setAttribute('d', 'M110,110 C110,110 71,110 60,110 C46,110 10,110 10,110 S10,70 10,58 C10,45 10,10 10,10 S47,10 60,10 C72,10 110,10 110,10 S110,45 110,58 C110,70 110,110 110,110 z');
}

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


}