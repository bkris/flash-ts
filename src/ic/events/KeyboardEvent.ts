namespace ic.events {

    export class KeyboardEvent extends Event {

        public static KEY_DOWN	= "keyDown";
        public static KEY_UP	= "keyUp";

        public altKey:boolean;
        public ctrlKey:boolean;
        public shiftKey:boolean;
        public keyCode:number;
        public charCode:number;

        constructor (type:string, bubbles = false) {
            super(type, bubbles);

            this.altKey = false;
            this.ctrlKey = false;
            this.shiftKey = false;

            this.keyCode = 0;
            this.charCode = 0;
        }

        public _setFromDom(event)
        {
            this.altKey		= event.altKey;
            this.ctrlKey	= event.ctrlKey;
            this.shiftKey	= event.shiftKey;

            this.keyCode	= event.keyCode;
            this.charCode	= event.charCode;
        }
    }
}
