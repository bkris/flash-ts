/// <reference path='../../build/engine.d.ts'/>

namespace game {

    import Stage = ic.display.Stage;
    import Bitmap = ic.display.Bitmap;
    import BitmapData = ic.display.BitmapData;

    window.onload = () => {

        var stage = new Stage("gameCanvas");

        var bd1 = new BitmapData("ball.png");

        for(var i=0; i<30; i++)
        {
            var b = new Bitmap(bd1);
            b.x = Math.random()*stage.stageWidth;
            b.y = Math.random()*stage.stageHeight;
            b.rotation = Math.random()*360;
            b.scaleX = b.scaleY = 0.5 + Math.random();
            stage.addChild(b);
        }

    };

}

