///<reference path='../../src/engine.ts'/>

namespace game {

    import Stage = ic.display.Stage;
    import Sprite = ic.display.Sprite;

    window.onload = () => {
        var stage = new Stage("gameCanvas");
        var s = new Sprite();
        stage.addChild(s);

        //  shapes
        for (var i = 0; i < 50; i++) {
            var color = Math.floor(Math.random() * 0xffffff);
            s.graphics.beginFill(color, 0.6);
            if (i < 25) s.graphics.drawRect(Math.random() * 800, Math.random() * 600, 70, 70);
            else     s.graphics.drawCircle(Math.random() * 800, Math.random() * 600, 40);
            s.graphics.endFill();
        }

        //  line
        s.graphics.lineStyle(3, 0xff0000);
        s.graphics.moveTo(20, 20);
        s.graphics.lineTo(400, 400);

        //  curve
        s.graphics.moveTo(50, 300);
        s.graphics.curveTo(400, 400, 300, 50);

        //  "buffered" triangle
        s.graphics.beginFill(0x0066ff);
        s.graphics.drawTriangles([350, 100, 600, 50, 500, 300], [0, 1, 2]);
        s.graphics.endFill();


    };

}
