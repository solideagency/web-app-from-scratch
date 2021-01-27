//no use of global variables, IIFE
(function(){

  //strict mode
  "use strict"

  //design pattern: module
  var app = {
    init: function(){
      console.log("start app");
      routes.init();
      this.eventHandlers();
    },
    eventHandlers: function(){
      var username = document.querySelector("form input");
      var submit = document.querySelector("form button");
      // var select = document.querySelector("form select");

      submit.addEventListener('click', function(e){
        e.preventDefault();
        getData.request(username.value.toString());
    })
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
        },
        'overview/:id': function(id) {
          var route = location.hash
          self.toggle(route)
          getDetails.request(id)
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
      let routeWithoutHash = route.substring(1);

      if(routeWithoutHash.startsWith("overview/")){
        document.querySelector('.detail').classList.add('active')
      }else {
        document.querySelector('.' + route.substring(1)).classList.add('active')
      }
    }
  }

  var getData = {
    url: function(username){
      //keep your code readable
      //where to find API link and how to use it
      //take time to think first about a problem find a solution by chosing an API
      const api = 'http://ws.audioscrobbler.com/2.0/';
      const method = '?method=user.gettoptracks';
      var artist = `&user=${username}`;
      const api_key = '&api_key=da09c53db6c8a9d784b1b7084b1f3a43'
      const format = '&format=json';

      return api + method + artist + api_key + format;
    },
    request: function(username){
      //promise, async
      fetch(this.url(username))
      .then(function (response){
        return response.json();
      })
      .then(function(data){
        renderData.overviewPage(data);
      })
      .catch(function (error){
        console.log("Error " + error);
      })
    }
  }

  var getDetails = {
    url: function(id){
      let trackName = id.split('-')[0];
      let artistName = id.split('-')[1];
      //keep your code readable
      //where to find API link and how to use it
      //take time to think first about a problem find a solution by chosing an API
      const api = 'http://ws.audioscrobbler.com/2.0/';
      const method = '?method=track.getInfo';
      var artist = `&artist=${artistName}`;
      var track = `&track=${trackName}`;
      const api_key = '&api_key=da09c53db6c8a9d784b1b7084b1f3a43'
      const format = '&format=json';

      return api + method + artist + track + api_key + format;
    },
    request: function(id){
      //promise, async
      fetch(this.url(id))
      .then(function (response){
        return response.json();
      })
      .then(function(data){
        renderData.detailPage(data);
      })
      .catch(function (error){
        console.log("Error " + error);
      })
    }
  }

  //render data with a template engine
  var renderData = {
    overviewPage: function(data){
      //transparency library, keep HTMl out of JS
      console.log(data.toptracks.track)

      let directives = {
        id: {
          href: function() {
            return '#overview/' + this.name.replace(/\s/g, '') + '-' + this.artist.name.replace(/\s/g, '')
          }
        }
      }

      Transparency.render(document.querySelector('.tracks'), data.toptracks.track, directives);
    },
    detailPage: function(data){
      console.log(data)
      Transparency.render(document.querySelector('.detail-track'), data.track);
    }
  }

  app.init();

})();

/*

TODO
- add filter/sort/map function on the overview page
- store data locally (LocalStorage)
- what happened on the first visit with no data
- one time api call and reuse it for the overview and detail page
- get artist name with or without space
- fallbacks (what if there is no data, what if we have to wait for the data)

*/
