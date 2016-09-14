///<reference path='../../src/engine.ts'/>
/*// /// <reference path='../../build/engine.d.ts'/>*/

namespace game {

    import Stage = ic.display.Stage;
    import Sprite = ic.display.Sprite;
    import BitmapData = ic.display.BitmapData;
    import Bitmap = ic.display.Bitmap;
    import Event = ic.events.Event;
    import KeyboardEvent = ic.events.KeyboardEvent;

    var stage, car, angle = 0, speed = 0;
    var l, r, u, d;

    function onKD (e)
    {
        console.log(e.keyCode);
        if(e.keyCode == 37) l = true;
        if(e.keyCode == 38) u = true;
        if(e.keyCode == 39) r = true;
        if(e.keyCode == 40) d = true;
    }

    function onKU (e)
    {
        if(e.keyCode == 37) l = false;
        if(e.keyCode == 38) u = false;
        if(e.keyCode == 39) r = false;
        if(e.keyCode == 40) d = false;
    }

    function onEF (e)
    {
        speed *= 0.9;
        if(u) speed += 1+speed*0.06;
        if(d) speed -= 1;

        if(r) angle += speed * 0.003;
        if(l) angle -= speed * 0.003;

        car.rotation = angle*180/Math.PI;
        car.x += Math.cos(angle) * speed;
        car.y += Math.sin(angle) * speed;
    }

    window.onload = () => {
        stage = new Stage("gameCanvas");

        // background
        var s = new Sprite();
        s.graphics.beginBitmapFill(new BitmapData("asphalt.jpg"));
        s.graphics.drawRect(0,0,stage.stageWidth, stage.stageHeight);
        stage.addChild(s);

        // car
        car = new Sprite();
        car.x = stage.stageWidth/2;
        car.y = stage.stageHeight/2;
        var cb = new Bitmap(new BitmapData("car.png"));
        cb.x = -123; cb.y = -50; car.addChild(cb);
        stage.addChild(car);

        // events
        stage.addEventListener(KeyboardEvent.KEY_DOWN, onKD);
        stage.addEventListener(KeyboardEvent.KEY_UP  , onKU);
        stage.addEventListener(Event.ENTER_FRAME     , onEF);
    }
}
