
(function(){
  "use strict"

  var app = {
    init: function(){
      console.log("start app");
      getData.init();
    }
  }

  var getData = {
    init: function(){
      this.request();
    },
    url: function(){
      const api = 'http://api.github.com/';
      const method = 'users/solideagency';

      return api + method;
    },
    request: function(){
      fetch(this.url())
      .then(function (response){
        return response.json();
      })
      .then(function(data){
        console.log(data)
      })
      .catch(function (error){
        console.log("Error " + error);
      })
    }
  }

  app.init();

})();
