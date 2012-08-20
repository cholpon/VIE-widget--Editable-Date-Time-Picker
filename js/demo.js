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

        vie.use(new vie.RdfaRdfQueryService());
        vie.load({element: jQuery('#content')}).from('rdfardfquery').execute()
            .success(function(entities) {
                _.forEach(entities, function(entity) {
                    var element = $("<div class='entity-card'> </div>");
                    container.append(element);
                    var view = new SchemaView({model: entity, vie: vie, el: element});
                    view.render();
                });
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
