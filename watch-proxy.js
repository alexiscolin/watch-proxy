/**
/*  WATCH - create a proxy watcher in order to listen for properties changes */
/*  @param {object} obj - object with properties you wan to listen */
/*  @return {object} proxy - proxy object you can change to be listened */
/* */
export default watch = function(obj){
    const restricted = function(){};
    let proxy = new restricted();
    proxy.values = {};
    proxy.listening = {};

    // define getter/setter in proxy
    for(let prop in obj){
      if(obj.hasOwnProperty(prop)){
        proxy.values[prop] = obj[prop];

        Object.defineProperty(proxy, prop, {
          set: function(newValue){
            this.values[prop] = newValue;
            this.listening[prop] && this.listening[prop](newValue);
          },
          get: function(){
            return this.values[prop];
          }
        });
      }
    }

    // allocation listener function
    restricted.prototype.addListener = function(property, handler){
      for(let prop in proxy.values){
        if(!proxy.values.hasOwnProperty(property)) throw "Watch function - listener variable '"+ property +"' don't exist on the proxy watcher";
        proxy.values.hasOwnProperty(prop) && prop == property && (proxy.listening[prop] = handler);
        return proxy.listening[prop];
      }
    };

    // remove listener function
    restricted.prototype.removeListener = function(listener){
      for(let listened in proxy.listening){
        if(proxy.listening.hasOwnProperty(listened) && proxy.listening[listened] === listener){
          proxy.listening[listened] = null;
          delete proxy.listening[listened];
        }
      }
    };

    return proxy
};
	
