class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
      if (config == null) {
				throw error; }
      this.config = config;
      this.CurentState = [this.config.initial];
      this.NumberState = 0;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
      return this.CurentState[this.NumberState];
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
				if (Object.keys(this.config.states).includes(state)){
					this.CurentState.splice(this.NumberState+1, 0, state)
					for (var i=this.CurentState.length-1; i>this.NumberState; i--){
						this.CurentState.pop();
					}
					this.CurentState.push(state);
					//console.log (this.NumberState);
					this.NumberState++;
					//console.log(this.CurentState.length);
					//console.log (this.NumberState)
					//this.CurentState.splice(this.NumberState, 0, state);
				}	else {
					throw error;
				}
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
			if (this.config.states[this.getState()].transitions[event] != undefined){
				this.changeState(this.config.states[this.getState()].transitions[event])
			}	else {
				throw error;
			}
		}

    /**
     * Resets FSM state to initial.
     */
    reset() {
			this.NumberState++;
      this.CurentState.splice(this.NumberState, 0, this.config.initial);
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
			if (event == undefined) {
        return Object.keys(this.config.states);
      }

			//console.log(Object.keys(this.config.states));
			//console.log(Object.keys(this.config.states[this.getStates()[0]].transitions));
			//console.log(Object.keys(this.config.states[this.getStates()[1]].transitions));
			//console.log(Object.keys(this.config.states[this.getStates()[2]].transitions));
			//console.log(Object.keys(this.config.states[this.getStates()[3]].transitions));

			//console.log(Object.keys(this.config.states));


			var StateTime = [];
			for (var i=0; i<(Object.keys(this.config.states)).length; i++){
				if (Object.keys(this.config.states[this.getStates()[i]].transitions).includes(event)){
					StateTime.push(this.getStates()[i]);
				}
			}
  		return StateTime;

		}

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
      if (this.NumberState > 0){
		//		console.log(this.NumberState)
				this.NumberState--;
				/*
				console.log("Уменьшаю")
				console.log(this.NumberState)
			*/	return true;
      }	else{
        return false;
      }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
			if (this.NumberState < this.CurentState.length - 1) {
            this.NumberState++;
            return true;
        } else {
            return false;
        }

		}

    /**
     * Clears transition history
     */
    clearHistory() {
			/*console.log(this.NumberState);
			console.log(this.CurentState.length);
			console.log(this.CurentState[this.NumberState]);	*/
			var SomeTime = this.CurentState[this.NumberState];
			//console.log(SomeTime);
			//this.CurentState.splice(0, this.NumberState, SomeTime)
			this.NumberState = 0;
			for (var i = this.CurentState.length; i>0; i--){
			//	console.log(i);
				this.CurentState.pop();
			}

			this.CurentState.push(SomeTime);
			/*console.log(this.NumberState);
			console.log(this.CurentState.length);
			console.log(this.CurentState[this.NumberState]);
			*/
		}
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
