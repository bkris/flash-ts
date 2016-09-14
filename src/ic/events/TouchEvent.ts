namespace ic.events {

    export class TouchEvent extends Event {

        public static TOUCH_BEGIN = "touchBegin";
        public static TOUCH_END = "touchEnd";
        public static TOUCH_MOVE = "touchMove";
        public static TOUCH_OUT = "touchOut";
        public static TOUCH_OVER = "touchOver";
        //public static TOUCH_ROLL_OUT = "touchRollOut";
        //public static TOUCH_ROLL_OVER = "touchRollOver";
        public static TOUCH_TAP = "touchTap";

        public stageX: number;
        public stageY: number;
        public touchPointID;

        constructor(type: string, bubbles = false) {
            super(type, bubbles);

            this.stageX = 0;
            this.stageY = 0;
            this.touchPointID = -1;
        }

        public _setFromDom(touchEvent) {
            var devicePixelRatio = window.devicePixelRatio || 1;
            this.stageX = touchEvent.clientX * devicePixelRatio;
            this.stageY = touchEvent.clientY * devicePixelRatio;
            this.touchPointID = touchEvent.identifier;
        }
    }

}
