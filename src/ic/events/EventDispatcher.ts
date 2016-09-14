namespace ic.events {

    /**
     * Base class for dispatching events
     *
     * @class EventDispatcher
     */
    export class EventDispatcher {

        /** hash table for listeners ... Key (Event type) : Array of functions */
        private _listeners = {};
        /** hash table for objects   ... Key (Event type) : Array of Objects, on which function should be called */
        private _targetObjects = {};

        /** objects, on which EnterFrame will be broadcast */
        public static efbc = [];

        /**
         * Registers an event listener object with an EventDispatcher object so that the listener receives notification of an event.
         * @param type
         * @param callback
         * @param object
         */
        public addEventListener(type: string, callback: Function, object: Object = null) {
            if (this._listeners[type] == null) {
                this._listeners[type] = [];
                this._targetObjects[type] = [];
            }
            this._listeners[type].push(callback);
            this._targetObjects[type].push(object);

            if (type == Event.ENTER_FRAME) {
                var arEF = EventDispatcher.efbc;
                if (arEF.indexOf(this) < 0) arEF.push(this);
            }
        }

        /**
         * Dispatches an event into the event flow. The event target is the EventDispatcher object upon which the
         * dispatchEvent() method is called.
         * @param event The event object dispatched into the event flow.
         */
        public dispatchEvent(event: Event) {
            event.currentTarget = this;
            if (event.target == null) event.target = this;

            var fs = this._listeners[event.type];
            if (fs == null) return;
            var cs = this._targetObjects[event.type];

            for (var i = 0; i < fs.length; i++) {
                if (cs[i] == null) fs[i](event);
                else fs[i].call(cs[i], event);
            }
        }

        /**
         * Checks whether the EventDispatcher object has any listeners registered for a specific type of event.
         * @param type
         * @returns {boolean}
         */
        public hasEventListener(type: string): boolean {
            var fs = this._listeners[type];		// functions for this event
            if (fs == null) return false;
            return (fs.length > 0);
        }

        /**
         * Removes a listener from the EventDispatcher object.
         * @param type
         * @param callback
         */
        public removeEventListener(type: string, callback: Function) {
            var fs = this._listeners[type];		// functions for this event
            if (fs == null) return;
            var ind = fs.indexOf(callback);
            if (ind < 0) return;
            var cs = this._targetObjects[type];
            fs.splice(ind, 1);
            cs.splice(ind, 1);

            if (type == Event.ENTER_FRAME && fs.length == 0) {
                var arEF = EventDispatcher.efbc;
                arEF.splice(arEF.indexOf(this), 1);
            }
        }

    }
}
