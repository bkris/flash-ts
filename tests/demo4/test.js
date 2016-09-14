/// <reference path='../../build/engine.d.ts'/>
var game;
(function (game) {
    var Point = ic.geom.Point;
    var Stage = ic.display.Stage;
    var BitmapData = ic.display.BitmapData;
    var Bitmap = ic.display.Bitmap;
    var MouseEvent = ic.events.MouseEvent;
    var stage, p = new Point(0, 0), cur = null;
    function onMOv(e) {
        e.target.alpha = 1.0;
    }
    function onMOu(e) {
        e.target.alpha = 0.7;
    }
    function onMD(e) {
        cur = e.target;
        p.x = cur.mouseX;
        p.y = cur.mouseY;
    }
    function onMU(e) {
        cur = null;
    }
    function onMM(e) {
        if (cur == null)
            return;
        cur.x = stage.mouseX - p.x;
        cur.y = stage.mouseY - p.y;
    }
    window.onload = function () {
        stage = new Stage("gameCanvas");
        var bd = new BitmapData("ball.png");
        for (var i = 0; i < 20; i++) {
            var b = new Bitmap(bd);
            b.x = Math.random() * 900;
            b.y = Math.random() * 500;
            b.buttonMode = true;
            b.alpha = 0.7;
            stage.addChild(b);
            b.addEventListener(MouseEvent.MOUSE_OVER, onMOv);
            b.addEventListener(MouseEvent.MOUSE_OUT, onMOu);
            b.addEventListener(MouseEvent.MOUSE_DOWN, onMD);
            b.addEventListener(MouseEvent.MOUSE_UP, onMU);
        }
        stage.addEventListener(MouseEvent.MOUSE_MOVE, onMM);
    };
})(game || (game = {}));
//# sourceMappingURL=test.js.map