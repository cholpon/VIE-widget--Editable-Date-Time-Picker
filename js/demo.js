var allRules = ([]).concat(rulesForCreativeWork(),
               rulesForEducationalOrganization(),
               rulesForEvent(),
               rulesForJobPosting(),
               rulesForMediaObject(),
               rulesForMovie(),
               rulesForMusicPlaylist(),
               rulesForOffer(),
               rulesForOrganization(),
               rulesForPerson(),
               rulesForSoftwareApplication(),
               rulesForTVEpisode(),
               rulesForTVSeason(), 
               rulesForTVSeries(),
               rulesForWebPage());


$ (function ()  {
    var vie = window.vie = new VIE({
       baseNamespace: 'http://schema.org'
    });

    vie.loadSchema("http://schema.rdfs.org/all.json", {
        baseNS : "http://schema.org/",
        success: function () {
        
        var container = $("#entity-cards")
        //new
        $('[property="schema:name"]').addClass("clickable");
        //end of new
        vie.use(new vie.RdfaRdfQueryService());
        vie.load({element: jQuery('#content')}).from('rdfardfquery').execute()
            .success(function(entities) {
                  //new
                  _.forEach(entities, function(entity) {
                    entity.isClicked = false;
                  }); 
                 $('[property="schema:name"]').click( function() {
                    //console.log ($(this).text());
                      var clickedName=($(this).text());  
                      var fixName = function(name) {
                          for (var i=0; i < name.length; i++) {
                              if (name[i]== "@") {
                              name= name.slice(0,i);
                              }
                          }
                          return name.slice(1,name.length-1);
                       } ;
                      var currentEntity = _.find(entities, function(entity) {
                          var name = entity.get("schema:name");
                          return (fixName(name) == clickedName);
                       });
                      if (currentEntity.isClicked==false) {
                          currentEntity.isClicked=true;
                          var element = $("<div class='entity-card'> </div>");
                          container.append(element);
                          var view = new SchemaView({model: currentEntity, vie: vie, el: element});
                          view.render();
                        }
                     
                  });
                 //end of new

                console.log(JSON.stringify(entities));
                console.log("We got " + entities.length + " editable objects from the page");
            })
            .fail(function (e) {
                console.warn("failed to load rdfa entities" + e);
            });
        },
        error: function (e) {
            console.warn("failed to load schema " + e);
        }
    });

});
