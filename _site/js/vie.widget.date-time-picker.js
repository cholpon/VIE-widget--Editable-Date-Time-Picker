// VIE Widgets - Vienna IKS Editable Widgets
// (c) 2012 Cholpon Degenbaeva
// VIE Widgets may be freely distributed under the MIT license.
// (see LICENSE)
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

function Rule(type, date1, label, reference, date2) {
  this.type = type;
  this.date1 = date1;
  this.label = label;
  this.reference = reference;
  this.date2 = date2;
}

(function($, undefined) {
  // Date Picker Widget starts.
  $.widget("view.vieDatePicker", {
    _create: function () {
      var widget = this;
      $(widget.element).find('[property="schema:name"]').addClass("clickable");
      $(widget.element).find('[property="schema:name"]').click(function() {
          var clickedName = ($(this).text());  
          var entities = widget.options.vie.entities;
          var currentEntity = _.find(entities.models, function(entity) {
            var name = entity.get("schema:name");
            return (normalizedSchemaName(name) == clickedName);
          });
          if (!currentEntity.isClicked) {
            currentEntity.isClicked = true;
            var element = $("<div class='entity-card'> </div>");
            widget.options.container.append(element);
            var view = new SchemaView({model: currentEntity, vie: vie, el: element});
            view.render();
          }
      });
    },
    
    _init: function () {
    },

    options: {
      vie: undefined,
      container: undefined
    }
  });
  // Date Picker Widget ends.

  var SchemaView = Backbone.View.extend( {
    initialize: function (opt) {
      this.vie = opt.vie;
    },

    render: function () {
       

      function fixSchemaId(str) {
        // Converts for example:
        // "<http://schema.orgactor>" to "actor".
        return str.slice(19, str.length-1);
      }

      function isDateAttribute(id) {
        if (id.search("date") >= 0) return true;
        if (id.search("Date") >= 0) return true;
        if (id.search("year") >= 0) return true;
        if (id.search("Year") >= 0) return true;
        if (id.search("month") >= 0) return true;
        if (id.search("Month") >= 0) return true;
        if (id.search("day") >= 0) return true;
        if (id.search("Day") >= 0) return true;
        return false;
      }

      function worthShowing(id, value) {
        // attribute is worth showing if 
        // id contains date related words or value is not undefined.
        return isDateAttribute(id) || (typeof value != "undefined");
      }
      
      var type = this.model.get ('@type');
      
      var attributes = type.attributes.list();
      var schemaName = this.model.get ("schema:name");
      $(this.el).html("<h2>" + normalizedSchemaName(schemaName));

      var button = $("<button type='button' class='close-btn'></button>");
      
      button.click(
        (function (model) {
            return function () {
              model.isClicked = false;
              $(this).parent().hide();
            }
        })(this.model) 
      );
      
      $(this.el).prepend(button);
   
      var html_list = $("<ul class='entity-attributes'> </ul>");
      for (var i = 0; i < attributes.length; i++) {
        var attribute = attributes[i];
        var id = fixSchemaId(attribute.id);
        var value = this.model.get("schema:" + id);
        if (id != "name" && worthShowing(id, value)) {
          var input = $("<input type=text></input>");
          if (isDateAttribute(id)) {
            if (typeof value != "undefined") {
              var date = Kalendae.moment(value);
              input.attr("value", date.format("MM-DD-YYYY"));
            }
            var validRanges= (function (model, id) {
                return function () {
                   var rules = getDateRange(model, "schema:" + id, allRules);
                   var lower = rules[0] ? rules[0] : "any";
                   var upper = rules[1] ? rules[1] : "any";
                   var fromDate = "From: " + lower;
                   fromDate = normalizedSchemaName(fromDate);
                   var toDate = "To: " + upper;
                   toDate = normalizedSchemaName(toDate);
                   var message = new Array(fromDate, toDate);
                   return (message);
                 }
            })(this.model, id);
            function installKalendar(model, input, id) {
              new Kalendae.Input(input[0], {
                                              format: "MM-DD-YYYY",
                                              subscribe: {
                                                'change': function () {
                                                   var value = this.getSelected();
                                                   model.set("schema:" + id, value);
                                                }
                                              },
                                              message: validRanges()
                                            });
            }
            installKalendar(this.model, input, id);
            // Install click handler.
            // Pass model (which is entity) and id (attribute name).
            input.click(
               (function (model, id) {
                 return function () {
                   var rules = getDateRange(model, "schema:" + id, allRules);
                   var lower = rules[0] ? rules[0] : "any";
                   var upper = rules[1] ? rules[1] : "any";
                   //console.log("valid ranges: [" + lower + " ... " + upper + "]");
                 }
               })(this.model, id) 
            
            );
          } else {
            if (!contains(value,"@")) {
              value = value.getSubject();
              input.attr("value", value);
            } else {
              input.attr("value", normalizedSchemaName(value));
            }
          }
          var list_item = $("<li>" + id + ": </li>");
          list_item.append(input);
          html_list.append(list_item);
        }
      }
      $(this.el).append(html_list);
      return this;
    }
  });



  function collectSuperTypes(type) {
     if (typeof(type.supertypes) == "undefined") return [];
     var result = [type.toString()];
     var supertypes = type.supertypes.toArray();
     for (var i = 0; i < supertypes.length; i++) {
        result.concat(collectSuperTypes(supertypes[i]));
     }
     return result;
  }

  function contains(a, b) {
     for (var i = 0; i < a.length; i++) {
        if (a[i] == b) return true;
     }
     return false;
  }

  function findRulesForEntity(entity, rules) {
     var result = [];
     var type = entity.get("@type");
     //var type = entity.get('rdfs:type');
     var typeNames = collectSuperTypes(type);
     for (var i = 0; i < rules.length; i++) {
       var rule = rules[i];
       if (contains(typeNames, rule.type)) {
         result.push(rule);
       }
     }
     return result;
  }

  function VertexId(entity, attribute) {
     this.entity = entity;
     this.attribute = attribute;
     this.isEqual = function (other) { 
       return (other.entity === this.entity) &&
              (other.attribute === this.attribute);
     }
  }

  function Vertex(vertexId, value) {
    this.id = vertexId;
    this.value = value;
    this.edges = [];
    this.addEdge = function (other) {
      this.edges.push(other);
    }
    this.visited = false;
  }

  function Graph(entities, rules, label) {
    this.vertices = [];
    this.findVertex = function (vertexId, value) {
       // Try to find vertex with vertexId:
       for (var i = 0; i < this.vertices.length; i++) {
          if (this.vertices[i].id.isEqual(vertexId)) {
            return this.vertices[i];
          }
       }
       // The vertex is not found, create a new one:
       var vertex = new Vertex(vertexId, value)
       this.vertices.push(vertex);
       return vertex;
    }

    this.findReachable = function (vertex) {
      if (vertex.visited) return [];
      vertex.visited = true;
      var result = [vertex];
      for (var i = 0; i < vertex.edges.length; i++) {
         var new_vertex = vertex.edges[i];
         result = result.concat(this.findReachable(new_vertex));
      }
      return result;
    }
    for (var i = 0; i < entities.length; i++) {
       var entity = entities.models[i];
       var entity_rules = findRulesForEntity(entity, rules);
       for (var j = 0; j < entity_rules.length; j++) {
         var rule = entity_rules[j];
         var startVertexId = new VertexId(entity, rule.date1);
         var otherEntity = (rule.reference === "self" ? entity : entity.get(rule.reference));
         if (!otherEntity) {
            continue;
         }
         var endVertexId = new VertexId(otherEntity, rule.date2);
         var startVertex = this.findVertex(startVertexId, entity.get(rule.date1));
         var endVertex = this.findVertex(endVertexId, otherEntity.get(rule.date2));
         if (rule.label === label) {
            startVertex.addEdge(endVertex);
         } else {
            endVertex.addEdge(startVertex);
         }
       }
    }
  }

  function findMin(vertices) {
     var result = null;
     for (var i = 0; i < vertices.length; i++) {
        if (vertices[i].value) {
           if (!result || result > vertices[i].value) {
              result = vertices[i].value;
           }
        }
     }
     return result;
  }

  function findMax(vertices) {
     var result = null;
     for (var i = 0; i < vertices.length; i++) {
        if (vertices[i].value) {
           if (!result || result < vertices[i].value) {
              result = vertices[i].value;
           }
        }
     }
     return result;
  }

  function getDateRange(entity, attribute, rules) {
    var entities = vie.entities;
    var graphLess = new Graph(entities, rules, "<=");
    var graphGreater = new Graph(entities, rules, ">=");
    var vertexId = new VertexId(entity, attribute);
    var reachableLess = graphLess.findReachable(graphLess.findVertex(vertexId));
    var reachableGreater = graphGreater.findReachable(graphGreater.findVertex(vertexId));
    return [findMin(reachableGreater), findMax(reachableLess)];
  }

  function normalizedSchemaName(name) {
    name = name.replace(/"/g, '');
    name = name.replace(/@.*$/, '');
    return name;
  }


})(jQuery);

function rulesForCreativeWork() {
  var type = "<http://schema.org/CreativeWork>";
  return [
    new Rule(type, "schema:datePublished", ">=", "self", "schema:dateCreated"),
    new Rule(type, "schema:dateModified", ">=", "self", "schema:dateCreated"),
    new Rule(type, "schema:copyrightYear", ">=", "self", "schema:dateCreated"),
    new Rule(type, "schema:dateCreated", ">=", "schema:accountablePerson", "schema:birthDate"),
    new Rule(type, "schema:dateCreated", "<=", "schema:associatedMedia", "schema:dateCreated"),
    new Rule(type, "schema:dateCreated", "<=", "schema:associatedMedia", "schema:expires"),
    new Rule(type, "schema:dateCreated", "<=", "schema:associatedMedia", "schema:uploadDate"),
    new Rule(type, "schema:dateCreated", "<=", "schema:audioObject", "schema:dateCreated"),
    new Rule(type, "schema:dateCreated", "<=", "schema:audioObject", "schema:expires"),
    new Rule(type, "schema:dateCreated", "<=", "schema:audioObject", "schema:uploadDate"),
    
    //author can be Person or Organization
    new Rule(type, "schema:dateCreated", ">=", "schema:author", "schema:birthDate"),
    new Rule(type, "schema:dateCreated", ">=", "schema:author", "schema:foundingDate"),
        
    
    new Rule(type, "schema:dateCreated", "<=", "schema:comment", "schema:startDate"),
    new Rule(type, "schema:dateCreated", "<=", "schema:comment", "schema:commentTime"),
    
    
    //contributor can Person or Organization
    new Rule(type, "schema:dateCreated", ">=", "schema:contributor", "schema:birthDate"),
    new Rule(type, "schema:dateCreated", "<=", "schema:contributor", "schema:deathDate"),
    new Rule(type, "schema:dateCreated", ">=", "schema:contributor", "schema:foundingDate"),
    
    
    //copyrightHolder can Person or Organization
    new Rule(type, "schema:dateCreated", ">=", "schema:copyrightHolder", "schema:birthDate"),
    new Rule(type, "schema:dateCreated", "<=", "schema:copyrightHolder", "schema:deathDate"),
    new Rule(type, "schema:dateCreated", ">=", "schema:copyrightHolder", "schema:foundingDate"),
    
    
    //creator can Person or Organization
    new Rule(type, "schema:dateCreated", ">=", "schema:creator", "schema:birthDate"),
    new Rule(type, "schema:dateCreated", "<=", "schema:creator", "schema:deathDate"),
    new Rule(type, "schema:dateCreated", ">=", "schema:creator", "schema:foundingDate"),
    
        
    //editor can be only Person
    new Rule(type, "schema:dateCreated", ">=", "schema:editor", "schema:birthDate"),
    new Rule(type, "schema:dateCreated", "<=", "schema:editor", "schema:deathDate"),
    
    new Rule(type, "schema:dateCreated", "<=", "schema:encoding", "schema:dateCreated"),
    new Rule(type, "schema:dateCreated", "<=", "schema:encoding", "schema:expires"),
    new Rule(type, "schema:dateCreated", "<=", "schema:encoding", "schema:uploadDate"),
    //new Rule(type, "schema:dateCreated", "<=", "schema:encodings", "schema:dateCreated"),
    
    
    new Rule(type, "schema:dateCreated", "<=", "schema:offers", "schema:priceValidUntil"),
 
    
    //provider can Person or Organization
    new Rule(type, "schema:dateCreated", ">=", "schema:provider", "schema:birthDate"),
    new Rule(type, "schema:dateCreated", "<=", "schema:provider", "schema:deathDate"),
    new Rule(type, "schema:dateCreated", ">=", "schema:provider", "schema:foundingDate"),
    
    //publisher can be only Organization
    new Rule(type, "schema:dateCreated", ">=", "schema:publisher", "schema:foundingDate"),
    
    
    new Rule(type, "schema:dateCreated", "<=", "schema:review", "schema:dateCreated"),
    //new Rule(type, "schema:dateCreated", "<=", "schema:reviews", "schema:dateCreated"),
    
    new Rule(type, "schema:dateCreated", "<=", "schema:sourceOrganization", "schema:foundingDate"),
    
    new Rule(type, "schema:dateCreated", "<=", "schema:videoObject", "schema:dateCreated"),
    new Rule(type, "schema:dateCreated", "<=", "schema:videoObject", "schema:expires"),
    new Rule(type, "schema:dateCreated", "<=", "schema:videoObject", "schema:uploadDate")
       
  ];
  
  /*
    Subtypes:
    Article
    Blog
    Book
    Comment
    Diet
    ExercisePlan
    ItemList
    Map
    MediaObject - extra: expires, uploadDate
    Movie
    MusicPlaylist
    MusicRecording
    Painting
    Photograph
    Recipe
    Review
    Sculpture
    SoftwareApplication
    TVEpisode
    TVSeason
    TVSeries
    WebPage
    WebPageElement
*/
}

function rulesForEducationalOrganization() {
  var type = "<http://schema.org/EducationalOrganization>";
  return [
    new Rule(type, "schema:foundingDate", "<=", "schema:alumni", "schema:birthDate"),
  ];
  /*
  Subtypes do not contain extra date-related properties
  */
}


function rulesForEvent() {
  var type = "<http://schema.org/Event>";
  return [
    new Rule(type, "schema:startDate", "<=", "self", "schema:endDate"), 
    new Rule(type, "schema:startDate", ">=", "schema:attendee", "schema:birthDate"),
    //new Rule(type, "schema:startDate", ">=", "schema:attendees", "schema:birthDate"), 
    new Rule(type, "schema:startDate", ">=", "schema:performer", "schema:birthDate"),
    //new Rule(type, "schema:startDate", ">=", "schema:performers", "schema:birthDate"),
    new Rule(type, "schema:startDate", "<=", "schema:subEvent", "schema:startDate"),
    new Rule(type, "schema:endDate", ">=", "schema:subEvent", "schema:endDate")
    //new Rule(type, "schema:startDate", "<=", "schema:subEvents", "schema:startDate"),
    //new Rule(type, "schema:endDate", ">=", "schema:subEvents", "schema:endDate"),
    ];
}

/*
Subtypes do not contain other date-properties

Subtypes:
BusinessEvent
ChildrensEvent
ComedyEvent
DanceEvent
EducationEvent
Festival
FoodEvent
LiteraryEvent
MusicEvent
SaleEvent
SocialEvent
SportsEvent
TheaterEvent
UserInteraction
VisualArtsEvent

*/


function rulesForJobPosting() {
  var type = "<http://schema.org/JobPosting>";
  return [
    new Rule(type, "schema:datePoste", ">=", "schema:hiringOrganization", "schema:foundingDate")
   ];
   /*
   There are no subtypes
   */
}


function rulesForMediaObject() {
  var type = "<http://schema.org/MediaObject>";
  return [
    new Rule(type, "schema:dateCreated", "<=", "self", "schema:uploadDate"),
    new Rule(type, "schema:dateCreated", "<=", "self", "schema:expires"),
    
    new Rule(type, "schema:dateModified", "<=", "self", "schema:uploadDate"),
    new Rule(type, "schema:dateMOdified", "<=", "self", "schema:expires"),
    
    new Rule(type, "schema:datePublished", "<=", "self", "schema:uploadDate"),
    new Rule(type, "schema:datePublished", "<=", "self", "schema:expires"),
    
    
    new Rule(type, "schema:uploadDate", "<=", "associatedArticle", "schema:dateCreated"),
    new Rule(type, "schema:uploadDate", "<=", "associatedArticle", "schema:dateModified"),
    new Rule(type, "schema:uploadDate", "<=", "associatedArticle", "schema:datePublished"),
    
    
    new Rule(type, "schema:dateCreated", ">=", "encodesCreativeWork", "schema:dateCreated"),
    new Rule(type, "schema:dateCreated", ">=", "encodesCreativeWork", "schema:dateModified"),
    new Rule(type, "schema:dateCreated", ">=", "encodesCreativeWork", "schema:datePublished")
    
  ];
}


function rulesForMovie() {
  var type = "<http://schema.org/Movie>";
  return [
    new Rule(type, "schema:datePublished", ">=", "self", "schema:dateCreated"),
    new Rule(type, "schema:dateModified", ">=", "self", "schema:dateCreated"),
    new Rule(type, "schema:copyrightYear", ">=", "self", "schema:dateCreated"),
    
    new Rule(type, "schema:dateCreated", ">=", "schema:director", "schema:birthDate"),    
    new Rule(type, "schema:dateCreated", "<=", "schema:director", "schema:deathDate"),
    
    new Rule(type, "schema:dateCreated", ">=", "schema:actor", "schema:birthDate"),
    //new Rule(type, "schema:dateCreated", ">=", "schema:actors", "schema:birthDate"),
    new Rule(type, "schema:dateCreated", "<=", "schema:actor", "schema:deathDate"),
    
    //musicBy can be Person or MusicGroup
    new Rule(type, "schema:dateCreated", ">=", "schema:musicBy", "schema:birthDate"),
    new Rule(type, "schema:dateCreated", ">=", "schema:musicBy", "schema:foundingDate"),
    
    new Rule(type, "schema:dateCreated", ">=", "schema:producer", "schema:birthDate"),
    new Rule(type, "schema:dateCreated", "<=", "schema:producer", "schema:deathDate"),
    
    new Rule(type, "schema:dateCreated", ">=", "schema:productionCompany", "schema:foundingDate"),
    
    new Rule(type, "schema:dateCreated", "<=", "schema:trailor", "schema:dateCreated"),
    new Rule(type, "schema:dateCreated", "<=", "schema:trailor", "schema:dateModified"),
    new Rule(type, "schema:dateCreated", "<=", "schema:trailor", "schema:datePublished"),
    new Rule(type, "schema:dateCreated", "<=", "schema:trailor", "schema:expires"),
    new Rule(type, "schema:dateCreated", "<=", "schema:trailor", "schema:uploadDate")
    

  ];
}


function rulesForMusicPlaylist() {
  var type = "<http://schema.org/MusicPlaylist>";
  return [
    new Rule(type, "schema:dateCreated", ">=", "schema:track", "schema:dateCreated"),
    //new Rule(type, "schema:dateCreated", ">=", "schema:tracks", "schema:dateCreated"),
    new Rule(type, "schema:dateCreated", ">=", "schema:track", "schema:datePublished")
  ];
}


function rulesForOffer() {
  var type = "<http://schema.org/Offer>";
  return [
    new Rule(type, "schema:priceValidUntil", ">=", "schema:seller", "schema:foundingDate")
   
  ];
}


function rulesForOrganization() {
  var type = "<http://schema.org/Organization>";
  return [
    new Rule(type, "schema:foundingDate", ">=", "schema:employee", "schema:birthDate"),
    //new Rule(type, "schema:foundingDate", ">=", "schema:employees", "schema:birthDate"),
    
    new Rule(type, "schema:foundingDate", "<=", "schema:employee", "schema:deathDate"),
    //new Rule(type, "schema:foundingDate", "<=", "schema:employees", "schema:deathDate"),
    
    // founder is only of type Person
    new Rule(type, "schema:foundingDate", ">=", "schema:founder", "schema:birthDate"),
    //new Rule(type, "schema:foundingDate", ">=", "schema:founders", "schema:birthDate"),
    
    new Rule(type, "schema:foundingDate", "<=", "schema:founder", "schema:deaththDate"),
    //new Rule(type, "schema:foundingDate", "<=", "schema:founders", "schema:deaththDate"),
    
    //member is of type Person or Organization
    new Rule(type, "schema:foundingDate", ">=", "schema:member", "schema:birthDate"),
    //new Rule(type, "schema:foundingDate", ">=", "schema:members", "schema:birthDate"),
    
    new Rule(type, "schema:foundingDate", "<=", "schema:member", "schema:deathDate"),
    //new Rule(type, "schema:foundingDate", "<=", "schema:member", "schema:deathDate"),
    
    new Rule(type, "schema:foundingDate", "<=", "schema:review", "schema:dateCreated"),
    new Rule(type, "schema:foundingDate", "<=", "schema:review", "schema:dateModified"),
    new Rule(type, "schema:foundingDate", "<=", "schema:review", "schema:datePublished")
    // plural case: reviews
   
  ];
  
  /*
  Subtypes: Corportation, NGO, GovernmentOrganization, SportsTeam do not contain other date-related properties.
  
  Subtype: EducationalOrganization contatins date-related propety "Alumni" of type Person. 
  Subtypes of EducationalOrganization do not contain other date-related propeties.
  
  Subtype: LocalBusiness contains date-realted property "branchOf" of type Organization.
  TODO: check subtypes of LocalBusiness
  
  TODO: check subtype of PerformingGroup
  */  
}



function rulesForPerson() {
  var type = "<http://schema.org/Person>";
  return [
    new Rule(type, "schema:birthDate", "<=", "self", "schema:deathDate"),
    new Rule(type, "schema:deathDate", ">=", "schema:affiliation", "schema:foundingDate"),
    new Rule(type, "schema:birthDate", ">=", "schema:alumniOf", "schema:foundingDate"),
    new Rule(type, "schema:birthDate", "<=", "schema:children", "schema:birthDate"),
    new Rule(type, "schema:deathDate", ">=", "schema:colleague", "schema:birthDate"),
    //new Rule(type, "schema:deathDate", ">=", "schema:colleagues", "schema:birthDate"),
    new Rule(type, "schema:deathDate", ">=", "schema:follows", "schema:birthDate"),
    new Rule(type, "schema:deathDate", ">=", "schema:knows", "schema:birthDate"),
    new Rule(type, "schema:deathDate", ">=", "schema:memberOf", "schema:foundingDate"),
    new Rule(type, "schema:birthDate", ">=", "schema:parent", "schema:birthDate"),
    //new Rule(type, "schema:birthDate", ">=", "schema:parents", "schema:birthDate"),
    new Rule(type, "schema:birthDate", "<=", "schema:performerIn", "schema:startDate"),
    new Rule(type, "schema:deathDate", ">=", "schema:spouse", "schema:birthDate"),
    new Rule(type, "schema:birthDate", ">=", "schema:worksFor", "schema:foundingDate")     
  
  ];
   /*
    There are no subtypes for Person
    */
}


function rulesForSoftwareApplication() {
  var type = "<http://schema.org/SoftwareApplication>";
  return [
    new Rule(type, "schema:dateCreated", "<=", "schema:screenshot", "schema:dateCreated"),
    new Rule(type, "schema:dateCreated", "<=", "schema:screenshot", "schema:dateModified"),
    new Rule(type, "schema:dateCreated", "<=", "schema:screenshot", "schema:datePublished"),
    
    new Rule(type, "schema:dateCreated", "<=", "schema:screenshot", "schema:expires"),
    new Rule(type, "schema:dateCreated", "<=", "schema:screenshot", "schema:uploadDate")
        
  ];
}


function rulesForTVEpisode() {
  var type = "<http://schema.org/TVEpisode>";
  return [
    new Rule(type, "schema:dateCreated", ">=", "schema:actor", "schema:birthDate"),
    //new Rule(type, "schema:dateCreated", ">=", "schema:actors", "schema:birthDate"),    
    new Rule(type, "schema:dateCreated", "<=", "schema:actor", "schema:deathDate"),
    
    new Rule(type, "schema:dateCreated", ">=", "schema:director", "schema:birthDate"),
    new Rule(type, "schema:dateCreated", "<=", "schema:director", "schema:deathDate"),
    
    //musicBy can be Person or Organization
    new Rule(type, "schema:dateCreated", ">=", "schema:musicBy", "schema:birthDate"),
    new Rule(type, "schema:dateCreated", "<=", "schema:musicBy", "schema:deathDate"),
    //new Rule(type, "schema:dateCreated", ">=", "schema:musicBy", "schema:foundingDate"),
    
    new Rule(type, "schema:dateCreated", "<=", "schema:partOfSeason", "schema:startDate"),
    new Rule(type, "schema:dateCreated", "<=", "schema:partOfSeason", "schema:endDate"),
    new Rule(type, "schema:dateCreated", "<=", "schema:partOfSeason", "schema:dateCreated"),
    new Rule(type, "schema:dateCreated", "<=", "schema:partOfSeason", "schema:dateModified"),
    new Rule(type, "schema:dateCreated", "<=", "schema:partOfSeason", "schema:datePublished"),
    
    new Rule(type, "schema:dateCreated", "<=", "schema:partOfTVSeries", "schema:startDate"),
    new Rule(type, "schema:dateCreated", "<=", "schema:partOfTVSeries", "schema:endDate"),
    new Rule(type, "schema:dateCreated", "<=", "schema:partOfTVSeries", "schema:dateCreated"),
    new Rule(type, "schema:dateCreated", "<=", "schema:partOfTVSeries", "schema:dateModified"),
    new Rule(type, "schema:dateCreated", "<=", "schema:partOfTVSeries", "schema:datePublished"),
    
    new Rule(type, "schema:dateCreated", ">=", "schema:producer", "schema:birthDate"),
    new Rule(type, "schema:dateCreated", "<=", "schema:producer", "schema:deathDate"),
    
    new Rule(type, "schema:dateCreated", ">=", "schema:productionCompany", "schema:foundingDate"),
    
    new Rule(type, "schema:dateCreated", "<=", "schema:trailer", "schema:dateCreated"),
    new Rule(type, "schema:dateCreated", "<=", "schema:trailer", "schema:dateModified"),
    new Rule(type, "schema:dateCreated", "<=", "schema:trailer", "schema:datePublished"),
    new Rule(type, "schema:dateCreated", "<=", "schema:trailer", "schema:expires"),
    new Rule(type, "schema:dateCreated", "<=", "schema:trailer", "schema:uploadDate")
  
        
  ];
}


function rulesForTVSeason() {
  var type = "<http://schema.org/TVSeason>";
  return [
    new Rule(type, "schema:startDate", "<=", "self", "schema:endDate"),
    
    new Rule(type, "schema:startDate", ">=", "schema:trailer", "schema:dateCreated"),
    new Rule(type, "schema:startDate", ">=", "schema:trailer", "schema:dateModified"),
    new Rule(type, "schema:startDate", ">=", "schema:trailer", "schema:datePublished"),
    new Rule(type, "schema:startDate", ">=", "schema:trailer", "schema:expires"),
    new Rule(type, "schema:startDate", ">=", "schema:trailer", "schema:uploadDate")  
        
  ];
}


function rulesForTVSeries() {
  var type = "<http://schema.org/TVSeries>";
  return [
    new Rule(type, "schema:startDate", "<=", "self", "schema:endDate"),
    
    new Rule(type, "schema:dateCreated", ">=", "schema:actor", "schema:birthdate"),
    //new Rule(type, "schema:dateCreated", ">=", "schema:actors", "schema:birthdate"),
    new Rule(type, "schema:dateCreated", "<=", "schema:actor", "schema:deathdate"),
    
    new Rule(type, "schema:dateCreated", ">=", "schema:director", "schema:birthdate"),
    new Rule(type, "schema:dateCreated", "<=", "schema:director", "schema:deathdate"),
    
    //musicBy can be Person or Organization
    new Rule(type, "schema:dateCreated", ">=", "schema:musicBy", "schema:birthDate"),
    new Rule(type, "schema:dateCreated", "<=", "schema:musicBy", "schema:deathDate"),
    //new Rule(type, "schema:dateCreated", ">=", "schema:musicBy", "schema:foundingDate"),
    
    new Rule(type, "schema:dateCreated", "<=", "schema:season", "schema:startDate"),
    new Rule(type, "schema:dateCreated", "<=", "schema:season", "schema:endDate"),
    new Rule(type, "schema:dateCreated", "<=", "schema:season", "schema:dateCreated"),
    new Rule(type, "schema:dateCreated", "<=", "schema:season", "schema:dateModified"),
    new Rule(type, "schema:dateCreated", "<=", "schema:season", "schema:datePublished"),
    //new Rule(type, "schema:dateCreated", "<=", "schema:seasons", "schema:startDate"),
    
    new Rule(type, "schema:dateCreated", "<=", "schema:trailer", "schema:dateCreated"),
    new Rule(type, "schema:dateCreated", "<=", "schema:trailer", "schema:dateModified"),
    new Rule(type, "schema:dateCreated", "<=", "schema:trailer", "schema:datePublished"),
    new Rule(type, "schema:dateCreated", "<=", "schema:trailer", "schema:expires"),
    new Rule(type, "schema:dateCreated", "<=", "schema:trailer", "schema:uploadDate")
    ];
}


function rulesForWebPage() {
  var type = "<http://schema.org/WebPage>";
  return [
        
    new Rule(type, "schema:dateCreated", "<=", "self", "schema:lastReviewed"),
    
    new Rule(type, "schema:dateCreated", "<=", "schema:mainContentOfPage", "schema:dateCreated"),
    new Rule(type, "schema:dateCreated", "<=", "schema:mainContentOfPage", "schema:dateModified"),
    new Rule(type, "schema:dateCreated", "<=", "schema:mainContentOfPage", "schema:datePublished"),
    
    new Rule(type, "schema:dateCreated", "<=", "schema:primaryImageOfPage", "schema:dateCreated"),
    new Rule(type, "schema:dateCreated", "<=", "schema:primaryImageOfPage", "schema:dateModified"),
    new Rule(type, "schema:dateCreated", "<=", "schema:primaryImageOfPage", "schema:datePublished"),
    new Rule(type, "schema:dateCreated", "<=", "schema:primaryImageOfPage", "schema:expires"),
    new Rule(type, "schema:dateCreated", "<=", "schema:primaryImageOfPage", "schema:uploadDate"),
    
    //reviewedBy can be Person or Organization
    new Rule(type, "schema:dateCreated", ">=", "schema:reviewedBy", "schema:birthdate"),
    new Rule(type, "schema:dateCreated", "<=", "schema:reviewedBy", "schema:deathdate"),
    new Rule(type, "schema:dateCreated", ">=", "schema:reviewedBy", "schema:foundingDate")
    ];
}



