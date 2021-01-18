//no use of global variables, IIFE
(function(){

  //strict mode
  "use strict"

  //design pattern: module
  var app = {
    init: function(){
      console.log("start app");
      getData.init();
    }
  }

  var getData = {
    init: function(){
      //this keyword
      this.request();
    },
    url: function(){
      //keep your code readable
      //where to find API link and how to use it
      //take time to think first about a problem find a solution by chosing an API
      const api = 'http://api.github.com/';
      const method = 'users/solideagency';

      return api + method;
    },
    request: function(){
      //promise, async
      fetch(this.url())
      .then(function (response){
        return response.json();
      })
      .then(function(data){
        renderData.template(data);
      })
      .catch(function (error){
        console.log("Error " + error);
      })
      //async
      console.log("I'm the last one in the row")

    }
  }

  //render data with template literals
  var renderData = {
    template: function(data){
      var html = document.querySelector('body');
      html.insertAdjacentHTML("afterbegin", `<p>${data.login}</p>`)
    }
  }

  app.init();

})();
