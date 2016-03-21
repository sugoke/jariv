//This is a simple package to handle application transition events from the background to the foreground.
//Every time the application enters a foreground or background state, the stateReactive variable will be changed,
//enabling the use of it in a reactive context such as a tracker.
AppState = {
    STATES : {
        BACKGROUND : 'background',
        FOREGROUND : 'foreground'
    },
    state : 'foreground',
    stateReactive :  new ReactiveVar('foreground'),
    changeAppVisibility : function(state) {
        this.state = state;
        this.stateReactive.set(state);
    },
    eventBackground : function() {
        //Throw out if the state is already background (important for reactivity)
        if(this.state === this.STATES.BACKGROUND) return;

        this.changeAppVisibility(this.STATES.BACKGROUND)
    },
    eventForeground : function() {
        //Throw out if the state is already foreground (important for reactivity)
        if(this.state === this.STATES.FOREGROUND) return;

        this.changeAppVisibility(this.STATES.FOREGROUND)
    },
    isForeground : function() {
        return this.state === this.STATES.FOREGROUND;
    },
    isBackground : function() {
        return this.state === this.STATES.BACKGROUND;
    }
};

if(Meteor.isCordova) {
    // App Pause
    document.addEventListener('pause', onPause, false);
    function onPause () {
        AppState.eventBackground();
    }

    // App Resume
    document.addEventListener('resume', onResume, false);
    function onResume () {
        AppState.eventForeground();
    }

    // App Resign
    document.addEventListener('resign', onResign, false);
    function onResign () {
        AppState.eventBackground();
    }

    // App Active
    document.addEventListener('active', onActive, false);
    function onActive () {
        AppState.eventForeground();
    }
}