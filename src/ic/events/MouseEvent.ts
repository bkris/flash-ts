namespace ic.events {

    export class MouseEvent extends Event {

        public static CLICK		= "click";
        public static MOUSE_DOWN	= "mouseDown";
        public static MOUSE_UP		= "mouseUp";

        public static MIDDLE_CLICK	= "middleClick";
        public static MIDDLE_MOUSE_DOWN	= "middleMouseDown";
        public static MIDDLE_MOUSE_UP		= "middleMouseUp";

        public static RIGHT_CLICK	= "rightClick";
        public static RIGHT_MOUSE_DOWN	= "rightMouseDown";
        public static RIGHT_MOUSE_UP	= "rightMouseUp";

        public static MOUSE_MOVE	= "mouseMove";
        public static MOUSE_OVER	= "mouseOver";
        public static MOUSE_OUT	= "mouseOut";

        public movementX:number;
        public movementY:number;
        
        public constructor(type:string, bubbles = false)
        {
            super(type, bubbles);

            this.movementX = 0;
            this.movementY = 0;
        }
        
    }
}
