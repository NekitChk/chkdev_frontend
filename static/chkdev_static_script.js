//CHKDEV STATIC - 21.07.2021

(function(){
    window.chkdev = {};
    window.chkdev.eventVariables = {};
    window.chkdev.eventVariables.events = {};

    window.chkdev.eventVariables = new Proxy(window.chkdev.eventVariables, {
        set(target, property, value){

            if (target[property]){
                if (target[property] === value){
                    return true;
                }
            }

            target[property] = value;

            if (!target.events[property]){
                target.events[property] = "";
                return true;
            }

            if (target.events[property] === ""){
                return true;
            }

            target.events[property](value);
            return true;


        },

    });

    window.chkdev.setVariableChangeEvent = function(variable, callback){
        if (!(variable in window.chkdev.eventVariables.events)){
            console.error(`Event variable with name "${variable}" doesn't exist`);
        } else{
            window.chkdev.eventVariables.events[variable] = callback;
        }
    }


})();

