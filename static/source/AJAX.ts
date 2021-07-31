//CHKDEV STATIC - 31.07.2021

export {};

declare global{
    interface Window{
        chkdev: any;
    }
}

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

    window.chkdev.setVariableChangeEvent = function(variable: any, callback: Function){ // Allows you to set a handler to change a variable.
        if (!(variable in window.chkdev.eventVariables.events)){
            console.error(`Event variable with name "${variable}" doesn't exist`);
        } else{
            window.chkdev.eventVariables.events[variable] = callback;
        }
    }

    window.chkdev.isObject = function(variable: any): boolean{
        if (typeof variable === "object" && variable !== null){
            return true;
        } else{
            return false;
        }
    }

    class AJAX{
        //Chkdev Ajax Request Library;
        protected url: string;
        protected method: string;
        protected payload: {};
        protected responseType: string;
        public options: {postBodyType?: string};
        protected funcMap: Map<string, any> | undefined;
        constructor(sendInfo: {url: string, method?: string},
                    requestPayload: {},
                    options: {postBodyType?: string, responseType?: string}){
            this.url = sendInfo.url;
            this.method = (sendInfo.method || "GET").toUpperCase();
            this.payload = requestPayload;
            this.options = options;
            this.responseType = options.responseType || "text";
            this.initFunc();
            //this.sendRequest();
        }

        protected initFunc(): void{
            this.sendGetRequest = this.sendGetRequest.bind(this);
            this.sendPostRequest = this.sendPostRequest.bind(this);

            this.funcMap = new Map([
                ["GET", this.sendGetRequest],
                ["POST", this.sendPostRequest],
            ]);

        }

        protected async sendRequest(): Promise<any>{
            if (this.funcMap) return this.handleResponse(this.funcMap.get(this.method)());
        }

        protected async sendGetRequest(): Promise<any>{}

        protected async sendPostRequest(): Promise<any>{
            let postPayload: any;
            let payloadType: string | null = null;
            if (this.payload){
                let payloadObjectKeys = Object.keys(this.payload);
                if (payloadObjectKeys.length > 0){
                    postPayload = this.preparePostPayload()[0];
                    payloadType = this.preparePostPayload()[1];
                } else{
                    postPayload = null;
                    payloadType = null;
                }

            }

            if (payloadType === "json"){
                let request = await fetch(this.url, {
                    method: "POST",
                    body: postPayload,
                    headers: {
                        "Content-Type": "application/json",
                        "X-Requested-With": "CRL",
                    }
                })

                return request;

            } else{
                let request = await fetch(this.url, {
                    method: "POST",
                    body: postPayload,
                    headers: {
                        "X-Requested-With": "CRL",
                    }
                });

                return request;
            }



        }

        protected preparePostPayload(): [any, string]{
            switch (this.options.postBodyType){
                case "json":
                    return [JSON.stringify(this.payload), "json"];
                    break;
                case "formdata":
                    let formdata = new FormData();
                    if (window.chkdev.isObject(this.payload)){
                        // @ts-ignore
                        for (let key in this.payload){
                            if (this.payload.hasOwnProperty(key)){
                                // @ts-ignore
                                formdata.append(key, this.payload[key]);
                            }
                        }

                        return [formdata, "formdata"];
                    }
                    break;

            }

            return [null, "null"]
        }

        protected async handleResponse(responsePromise: Promise<any>) {
            responsePromise.catch((error: any) => {
                console.warn("Request failed. Server unavailable");
            });


            let response = await responsePromise;

            if (response.ok) {
                switch (this.responseType) {
                    case "text":
                        let responseTextPromise = response.text();
                        responseTextPromise.catch((error: any) => {
                            console.warn("Text convertation failed.");
                        })

                        let responseText = await responseTextPromise;
                        return responseText;
                        break;

                    case "json":
                        let responseJsonPromise = response.json();
                        responseJsonPromise.catch((error: any) => {
                            console.warn("Json convertation failed.");
                        })

                        let responseJson = await responseJsonPromise;
                        return responseJson;
                        break;
                }
            } else{
                return "error";
            }

        }

    }

    window.chkdev.ajax = AJAX;


})();