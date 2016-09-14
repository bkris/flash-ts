/// <reference path='../../build/engine.d.ts'/>
var game;
(function (game) {
    var Stage = ic.display.Stage;
    var Bitmap = ic.display.Bitmap;
    var BitmapData = ic.display.BitmapData;
    var Point = ic.geom.Point;
    var Event = ic.events.Event;
    var balls = []; // balls
    var dirs = []; // directions
    var stage;
    function onEF(e) {
        var w = stage.stageWidth - 100, h = stage.stageHeight - 100;
        for (var i = 0; i < balls.length; i++) {
            var b = balls[i], d = dirs[i];
            b.x += d.x;
            b.y += d.y;
            if (b.x < 0)
                d.x = Math.abs(d.x);
            if (b.x > w)
                d.x = -Math.abs(d.x);
            if (b.y < 0)
                d.y = Math.abs(d.y);
            if (b.y > h)
                d.y = -Math.abs(d.y);
        }
    }
    window.onload = function () {
        stage = new Stage("gameCanvas");
        // background
        var bg = new Bitmap(new BitmapData("night.jpg"));
        bg.scaleX = stage.stageWidth / 1024;
        bg.scaleY = stage.stageHeight / 512;
        stage.addChild(bg);
        var bd = new BitmapData("ball.png");
        for (var i = 0; i < 100; i++) {
            var b = new Bitmap(bd);
            b.x = Math.random() * 900;
            b.y = Math.random() * 500;
            balls.push(b);
            dirs.push(new Point(2 + Math.random() * 8, 2 + Math.random() * 8));
            stage.addChild(b);
        }
        stage.addEventListener(Event.ENTER_FRAME, onEF);
    };
})(game || (game = {}));
//# sourceMappingURL=test.js.map