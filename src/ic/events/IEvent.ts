namespace ic.events {

    export interface IEvent {
        /**
         * Type of event
         * @property type
         * @type String
         */
        type:string;

        /**
         * Reference to target object
         * @property target
         * @type Object
         */
        target:any;
    }

}
