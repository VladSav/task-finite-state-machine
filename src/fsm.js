class FSM {

    constructor(config) {
      if (config == null) {
				throw error; }
      this.config = config;
      this.CurentState = [this.config.initial];
      this.NumberState = 0;
    }

    getState() {
      return this.CurentState[this.NumberState];
    }

    changeState(state) {
				if (Object.keys(this.config.states).includes(state)){
					this.CurentState.splice(this.NumberState+1, 0, state)
					for (var i=this.CurentState.length-1; i>this.NumberState; i--){
						this.CurentState.pop();
					}
					this.CurentState.push(state);
					this.NumberState++;
				}	else {
					throw error;
				}
    }

    trigger(event) {
			if (this.config.states[this.getState()].transitions[event] != undefined){
				this.changeState(this.config.states[this.getState()].transitions[event])
			}	else {
				throw error;
			}
		}

    reset() {
			this.NumberState++;
      this.CurentState.splice(this.NumberState, 0, this.config.initial);
    }

    getStates(event) {
			if (event == undefined) {
        return Object.keys(this.config.states);
      }

			var StateTime = [];
			for (var i=0; i<(Object.keys(this.config.states)).length; i++){
				if (Object.keys(this.config.states[this.getStates()[i]].transitions).includes(event)){
					StateTime.push(this.getStates()[i]);
				}
			}
  		return StateTime;

		}

    undo() {
      if (this.NumberState > 0){
				this.NumberState--;
				return true;
      }	else{
        return false;
      }
    }

    redo() {
			if (this.NumberState < this.CurentState.length - 1) {
            this.NumberState++;
            return true;
        } else {
            return false;
        }
		}

    clearHistory() {
			var SomeTime = this.CurentState[this.NumberState];
			this.NumberState = 0;
			for (var i = this.CurentState.length; i>0; i--){
				this.CurentState.pop();
			}
			this.CurentState.push(SomeTime);
		}
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
