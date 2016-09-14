namespace ic.events {

    export class Event {

        public static ENTER_FRAME			= "enterFrame";
        public static RESIZE				= "resize";
        public static ADDED_TO_STAGE 		= "addedToStage";
        public static REMOVED_FROM_STAGE 	= "removedFromStage";

        public static CHANGE				= "change";

        public static OPEN					= "open";
        public static PROGRESS				= "progress";
        public static COMPLETE				= "complete";

        public type:string;
        public bubbles:boolean;
        public target;
        public currentTarget;

        constructor (type:string, bubbles = false) {
            this.type = type;
            this.target = null;
            this.currentTarget = null;
            this.bubbles = bubbles;
        }
    }
}
