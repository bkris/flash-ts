///<reference path="ic/geom/Point.ts"/>
///<reference path="ic/geom/Rectangle.ts"/>
///<reference path="ic/geom/Transform.ts"/>
///<reference path="ic/events/Event.ts"/>
///<reference path="ic/events/EventDispatcher.ts"/>
///<reference path="ic/events/MouseEvent.ts"/>
///<reference path="ic/events/TouchEvent.ts"/>
///<reference path="ic/events/KeyboardEvent.ts"/>
///<reference path="ic/display/Graphics.ts"/>
///<reference path="ic/display/DisplayObject.ts"/>
///<reference path="ic/display/InteractiveObject.ts"/>
///<reference path="ic/display/DisplayObjectContainer.ts"/>
///<reference path="ic/display/Stage.ts"/>
///<reference path="ic/display/Bitmap.ts"/>
///<reference path="ic/display/BitmapData.ts"/>
///<reference path="ic/display/Sprite.ts"/>
///<reference path="ic/text/TextField.ts"/>
///<reference path="ic/text/TextFormat.ts"/>
///<reference path="ic/geom/Vector3D.ts"/>

/**
 * Secure replacement of the requestAnimationFrame if not available in the browser.
 */
var requestAnimFrame: (callback: () => void) => void = (function(){
    return window.requestAnimationFrame ||
        (<any>window).webkitRequestAnimationFrame ||
        (<any>window).mozRequestAnimationFrame ||
        (<any>window).oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback){
            window.setTimeout(callback, 1000 / 60, new Date().getTime());
        };
})();
