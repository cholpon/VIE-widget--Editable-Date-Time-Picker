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
          vie.use(new vie.RdfaRdfQueryService());
          vie.load({element: jQuery('#content')}).from('rdfardfquery').execute()
              .success(function(entities) {
                  console.log(JSON.stringify(entities));
                  console.log("We got " + entities.length + " editable objects from the page");
              })
              .fail(function (e) {
                  console.warn("failed to load rdfa entities" + e);
              });
          $('#content').vieDatePicker({vie: vie, container: $("#entity-cards")}); 
        },
        error: function (e) {
            console.warn("failed to load schema " + e);
        }
    });

});
