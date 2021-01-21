//no use of global variables, IIFE
(function(){

  //strict mode
  "use strict"

  //design pattern: module
  var app = {
    init: function(){
      console.log("start app");
      routes.init();
    }
  }

  //why create a SPA?
  //using routes for creating different pages
  var routes = {
    init: function(){
      //this
      const self = this;

      //micro library
      routie({
        'overview': function() {
          var route = location.hash
          self.toggle(route)
          getData.init();

        },
        'detail': function() {
          var route = location.hash
          self.toggle(route)
        }
      });
    },
    toggle: function(route){
      this.hide()
      this.show(route)
    },
    hide: function(){
      var sections = document.querySelectorAll('section')
      sections.forEach(function(element) {
        //keep CSS out of JS
        element.classList.remove('active')
      })
    },
    show: function(route){
      document.querySelector('.' + route.substring(1)).classList.add('active')
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

  //render data with a template engine
  var renderData = {
    template: function(data){
      var html = document.querySelector('.overview');
      //transparency library, keep HTMl out of JS
      Transparency.render(document.querySelector('.overview'), data);
    }
  }

  app.init();

})();
