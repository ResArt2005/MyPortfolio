$(document).ready(function () {
    

(function () {
    var width, height, dpr, largeHeader, canvas, ctx, points, target,
        animateHeader = true, scaleFactor;

    // === Настройки ===
    const NUM_X = 30;               // точек по ширине
    const NUM_Y = 20;               // точек по высоте
    const MAX_NEIGHBORS = 5;        // сколько связей рисовать от точки
    const BASE_RADIUS_MIN = 2;      // базовый мин. радиус точки (до масштаба)
    const BASE_RADIUS_MAX = 4;      // базовый макс. радиус точки (до масштаба)
    const BASE_LINE_WIDTH = 1.2;    // базовая толщина линий (до масштаба)
    const SCALE_BASE = 1200;        // чем меньше число — тем сильнее масштаб
    const SCALE_MIN = 1;            // не уменьшать на маленьких экранах
    const SCALE_MAX = 3;            // не раздувать слишком на очень больших

    // Main
    initHeader();
    initAnimation();
    addListeners();

    function initHeader() {
        width = window.innerWidth;
        height = window.innerHeight;
        dpr = window.devicePixelRatio || 1;
        target = { x: width / 2, y: height / 2 };

        largeHeader = document.getElementById('firstBlock');
        if (largeHeader) largeHeader.style.height = height + 'px';

        canvas = document.getElementById('canvas');
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        ctx = canvas.getContext('2d');
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // чёткая отрисовка под DPR

        // Коэффициент масштаба от меньшей стороны экрана
        scaleFactor = Math.min(SCALE_MAX, Math.max(SCALE_MIN, Math.min(width, height) / SCALE_BASE));

        // Толщина линий с учётом масштаба
        ctx.lineWidth = BASE_LINE_WIDTH * scaleFactor;

        // Генерация точек (фиксированное количество)
        points = [];
        for (let gx = 0; gx < NUM_X; gx++) {
            for (let gy = 0; gy < NUM_Y; gy++) {
                const cellW = width / NUM_X;
                const cellH = height / NUM_Y;
                const px = gx * cellW + Math.random() * cellW;
                const py = gy * cellH + Math.random() * cellH;
                const p = { x: px, originX: px, y: py, originY: py };
                points.push(p);
            }
        }

        // Поиск ближайших соседей
        for (let i = 0; i < points.length; i++) {
            const p1 = points[i];
            const closest = [];
            for (let j = 0; j < points.length; j++) {
                const p2 = points[j];
                if (p1 === p2) continue;
                let placed = false;
                for (let k = 0; k < MAX_NEIGHBORS; k++) {
                    if (!placed && closest[k] === undefined) {
                        closest[k] = p2;
                        placed = true;
                    }
                }
                for (let k = 0; k < MAX_NEIGHBORS; k++) {
                    if (!placed && getDistance(p1, p2) < getDistance(p1, closest[k])) {
                        closest[k] = p2;
                        placed = true;
                    }
                }
            }
            p1.closest = closest;
        }

        // Кружки с радиусом от масштаба
        for (let i = 0; i < points.length; i++) {
            const base = BASE_RADIUS_MIN + Math.random() * (BASE_RADIUS_MAX - BASE_RADIUS_MIN);
            const c = new Circle(points[i], base * scaleFactor, 'rgba(255,255,255,0.3)');
            points[i].circle = c;
        }
    }

    // Event handling
    function addListeners() {
        if (!('ontouchstart' in window)) {
            window.addEventListener('mousemove', mouseMove);
        }
        window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);
    }

    function mouseMove(e) {
        const posx = (e.pageX || e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft);
        const posy = (e.pageY || e.clientY + document.body.scrollTop + document.documentElement.scrollTop);
        target.x = posx;
        target.y = posy;
    }

    function scrollCheck() {
        const sc = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
        animateHeader = (sc <= height);
    }

    function resize() {
        // Останавливаем твины старых точек и пересоздаём всё
        gsap.killTweensOf(points);
        initHeader();
        for (let i = 0; i < points.length; i++) {
            shiftPoint(points[i]);
        }
    }

    // animation
    function initAnimation() {
        animate();
        for (let i = 0; i < points.length; i++) {
            shiftPoint(points[i]);
        }
    }

    function animate() {
        if (animateHeader) {
            ctx.clearRect(0, 0, width, height);

            // Пороги влияния курсора масштабируем, чтобы «много линий» было на любых экранах
            const t1 = Math.pow(60 * scaleFactor, 2);
            const t2 = Math.pow(140 * scaleFactor, 2);
            const t3 = Math.pow(220 * scaleFactor, 2);

            for (let i = 0; i < points.length; i++) {
                const d2 = Math.abs(getDistance(target, points[i]));
                if (d2 < t1) {
                    points[i].active = 0.3;
                    points[i].circle.active = 0.6;
                } else if (d2 < t2) {
                    points[i].active = 0.1;
                    points[i].circle.active = 0.3;
                } else if (d2 < t3) {
                    points[i].active = 0.02;
                    points[i].circle.active = 0.1;
                } else {
                    points[i].active = 0;
                    points[i].circle.active = 0;
                }

                drawLines(points[i]);
                points[i].circle.draw();
            }
        }
        requestAnimationFrame(animate);
    }

    function shiftPoint(p) {
        gsap.to(p, 1 + Math.random(), {
            x: p.originX - 50 + Math.random() * 100,
            y: p.originY - 50 + Math.random() * 100,
            ease: "circ.inOut",
            onComplete: function () { shiftPoint(p); }
        });
    }

    // Canvas manipulation
    function drawLines(p) {
        if (!p.active) return;
        for (let i = 0; i < p.closest.length; i++) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.closest[i].x, p.closest[i].y);
            ctx.strokeStyle = 'rgba(150,60,235,' + p.active + ')';
            ctx.stroke();
        }
    }

    function Circle(pos, rad, color) {
        const _this = this;
        (function () {
            _this.pos = pos || null;
            _this.radius = rad || null;
            _this.color = color || null;
        })();

        this.draw = function () {
            if (!_this.active) return;
            ctx.beginPath();
            ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = 'rgba(150,60,235,' + _this.active + ')';
            ctx.fill();
        };
    }

    // Util
    function getDistance(p1, p2) {
        return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }
})();

    AOS.init({
        duration: 1000, 
        once: true      
    });

});