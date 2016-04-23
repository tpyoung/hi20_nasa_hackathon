Class(function Wobble() {
    Inherit(this, Controller);
    var _this = this;
    var $container;
    var _stage, _renderer;
    var _wobble = [];

    //*** Constructor
    (function() {
        Mouse.capture();
        initContainer();
        initCanvas();
        initWobble();
        addListeners();
        Render.startRender(loop);
    })();

    function initContainer() {
        $container = _this.container;
        $container.size('100%').bg('#ffffff');
        Stage.add($container);
    }

    function initCanvas() {
        _stage = new PIXI.Stage();
        _renderer = PIXI.autoDetectRenderer(Stage.width/2, Stage.height, null, true);
        $container.add(_renderer.view);
    }

    function initWobble() {
        _wobble = [];

        var colors = [0x0092CC, 0x00B6FF, 0x4CCCFF];
        var height = Stage.height * .65;
        var y = height;
        for (var i = 0; i < 3; i++) {
            var wobble = _this.initClass(LiquidWobble, Stage.width, Stage.height, colors[i]);
            wobble.graphics.position.y = y;
            _stage.addChild(wobble.graphics);

            _wobble.push(wobble);

            y += height;
        }

        ///wobble.left.y = 200;

    }

    function loop(t) {
       if (!Mouse.ready) {
            Mouse.x = Stage.width/6;
            Mouse.y = Stage.height/4 + (Math.sin(t * 0.002) * Stage.height*.25);
        }

        for (var i = 0; i < _wobble.length; i++) {
            var w = _wobble[i];
            w.render();
        }

        _renderer.render(_stage);
    }

    //*** Event handlers
    function addListeners() {
        _this.events.subscribe(HydraEvents.RESIZE, resizeHandler);
    }

    function resizeHandler() {
        for (var i = 0; i < _wobble.length; i++) {
            _stage.removeChild(_wobble[i].graphics);
            _wobble[i].destroy();
        }
        initWobble();
        _renderer.resize(Stage.width, Stage.height);
    }

    //*** Public Methods
});

Class(function LiquidWobble(_width, _height, _color) {
    Inherit(this, Component);
    var _this = this;
    var _canvas, _context;
    var _liquid, _particles, _lines;
    var _left, _right, _graphics, _wobble;

    var _mouse = new Vector2();
    var _dist = new Vector2();

    this.points = Device.graphics.webgl ? 100 : (Device.mobile ? 30 : 60);
    this.opacity = 1;
    this.graphics = new PIXI.Graphics();
    this.color = _color;

    //*** Constructor
    (function() {
        initLiquid();
    })();

    function initLiquid() {
        _graphics = _this.graphics;

        _liquid = _this.initClass(LiquidLine, 0.1, 0.1, _width, _height, _this.points);
        _particles = _this.particles = _liquid.particles;
        _lines = _liquid.lines;

        for (var i = 0; i < _particles.length; i++) {
            _particles[i].origin = _particles[i].position.clone();
        }

        _this.elasticity = _liquid.elasticity = 2;
        //_this.dampening = _liquid.dampening = .000002;

        _particles[0].fixed = true;
        _particles[_particles.length - 1].fixed = true;
        _lines[0].tension(0);
        _lines[_lines.length - 1].tension(1);

        _this.left = _left = _this.particles[0].position;
        _this.right = _right = _this.particles[_particles.length-1].position;
    }

    function loop(time, fps, diff) {
        var mult = Stage.height / 800;
        _mouse.set(Mouse.x, Mouse.y-_graphics.position.y);
        var len = _particles.length;
        for (var i = 1; i < len; i++) {
            var particle = _particles[i];
            if (i != 0 && i != len-1) {
                _dist.subVectors(_mouse, particle.origin);
                if (_dist.length() < 50) {
                    if (!_wobble) _wobble = particle;
                    _dist.normalize().multiply(200 * mult);
                    particle.position.y = _dist.y;
                }

            }
        }

        _liquid.render(diff);

        _graphics.clear();
        _graphics.beginFill(_color);
        _graphics.moveTo(_particles[0].position.x, _particles[0].position.y);

        for (var i = 1; i < _particles.length; i++) {
            var particle = _particles[i];
            if (particle.position.y > _height) particle.position.y = _height-1;

            var xc = (particle.position.x + _particles[i].position.x) / 2;
            var yc = (particle.position.y + _particles[i].position.y) / 2;
            _graphics.lineTo(particle.position.x, particle.position.y);
        }

        _graphics.lineTo(_particles[_particles.length - 1].position.x, _height);
        _graphics.lineTo(0, _height);
        _graphics.lineTo(_particles[0].position.x, _particles[0].position.y);
        _graphics.endFill();
    }

    //*** Event handlers

    //*** Public Methods
    this.destroy = function() {
        _graphics.clear();
        return this._destroy();
    }

    this.render = function(diff) {
        loop(null, null, diff);
    }
});

Class(function LiquidLine(_x, _y, _width, _height, _numberPoints) {
    var _this = this;
    var _point = new Vector2(_width, _height);
    var _canvas, _context;
    var _particles = new Array();
    var _lines = new Array();

    this.elasticity = 10;
    this.dampening = .00002;

    //*** Constructor
    (function() {
        initObjects();
    })();

    function initObjects() {
        var num = _numberPoints || 10;
        var inter = _point.x / (num - 1);

        for (var i = 0; i < num; i++) {
            var particle = new LiquidParticle(i * inter, _y, _this.dampening);
            _particles.push(particle)
        }

        for (i = 1; i < _particles.length; i++) {
            var line = new LiquidParticleLine(_particles[i - 1], _particles[i]);
            _lines.push(line)
        }

        _this.particles = _particles;
        _this.lines = _lines;
    }

    //*** Event handlers

    //*** Public Methods
    this.render = function(delta) {
        delta = 16;
        for (var i = 0; i < _particles.length; i++) {
            _particles[i].update(delta);
        }

        for (i = 0; i < _this.elasticity; i++) {
            for (var j = 0; j < _lines.length; j++) {
                _lines[j].update(delta);
            }
        }
    }
});

Class(function LiquidParticle(x, y, _dampening) {
    var _this = this;
    var p1, p2, p3;

    this.fixed = false;
    this.position = new Vector2(x, y);
    this.velocity = new Vector2();
    this.dampening = _dampening || 0;

    //*** Constructor
    (function() {
        p1 = new Vector2(0, _this.dampening);
        p2 = new Vector2();
        p3 = new Vector2();
    })();

    //*** Event handlers

    //*** Public Methods
    this.shift = function() {
        p2.x = this.position.x;
        p2.y = this.position.y;
        p3.x = this.velocity.x;
        p3.y = this.velocity.y;
    }

    this.update = function(delta) {
        this.shift();
        if (!this.fixed) {
            this.velocity.x += delta * p1.x;
            this.velocity.y += delta * p1.y;
            this.position.x += delta * this.velocity.x;
            this.position.y += delta * this.velocity.y;
        }
    }
});

Class(function LiquidParticleLine(_p1, _p2, _t) {
    var _this = this;
    var _dist, _point;

    //*** Constructor
    (function() {
        _t = _t || 0.5;
        _point = new Vector2();
        _dist = Utils.findDistance(_p1.position, _p2.position);
    })();

    //*** Event handlers

    //*** Public Methods
    this.update = function(delta) {
        var ax = _p1.position.x + ((_p2.position.x - _p1.position.x) * _t);
        var ay = _p1.position.y + ((_p2.position.y - _p1.position.y) * _t);

        _point.x = _p2.position.x - _p1.position.x;
        _point.y = _p2.position.y - _p1.position.y;
        _point.normalize();

        var p1x = ax + (_point.x * -_t * length);
        var p1y = ay + (_point.y * -_t * length);
        var p2x = ax + (_point.x * (1 - _t) * length);
        var p2y = ay + (_point.y * (1 - _t) * length);

        _p1.shift();
        _p2.shift();

        if (!_p1.fixed) {
            _p1.velocity.x += (p1x - _p1.position.x) / delta;
            _p1.velocity.y += (p1y - _p1.position.y) / delta;
            _p1.position.x = p1x;
            _p1.position.y = p1y;
        }

        if (!_p2.fixed) {
            _p2.velocity.x += (p2x - _p2.position.x) / delta;
            _p2.velocity.y += (p2y - _p2.position.y) / delta;
            _p2.position.x = p2x;
            _p2.position.y = p2y;
        }
    }

    this.tension = function(t) {
        _t = t;
    }
});

Hydra.ready(function() {
    new Wobble();
});