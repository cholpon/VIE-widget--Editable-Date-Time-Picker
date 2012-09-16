function Rule(type, date1, label, reference, date2) {
  this.type = type;
  this.date1 = date1;
  this.label = label;
  this.reference = reference;
  this.date2 = date2;
}

function hideCard(button) {
  $(button).parent().model.isClicked=false;
  $(button).parent().hide();
}



(function($, undefined) {
  $.widget("view.vieDatePicker", {
    _create: function () {
      // initialize all 
              
    },
    
    _init:   function () {
      // do work
      
    },
   
    options: {
      myVIE: undefined
      
    }
  });
  
  SchemaView = Backbone.View.extend( {
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
      
      //added to remove '@en' message at the end of the entity name
      function removeLangSign (str) {
        for (var i=0; i < str.length; i++) {
          if (str[i]== "@") {
            str= str.slice(0, i);
          }
        }
        //str = str.slice (0, -3);
        return str;
      }

      // var type = getRealType(this.model); 
      var type = this.model.get ('@type');
      
      var attributes = type.attributes.list();
      var schemaName = this.model.get ("schema:name");
      //$(this.el).html("<h2>" + this.model.get("schema:name"));
      $(this.el).html("<h2>" + removeLangSign (schemaName));

      //new: added button for entity card
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

      //end new
   
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
              //new
               var validRanges= (function (model, id) {
                  return function () {
                     var rules = getDateRange(model, "schema:" + id, allRules);
                     var lower = rules[0] ? rules[0] : "any";
                     var upper = rules[1] ? rules[1] : "any";
                     var fromDate= "From: " + lower;
                     fromDate= removeLangSign(fromDate);
                     var toDate= "To: " + upper;
                     toDate=removeLangSign(toDate);
                     var message= new Array(fromDate, toDate);
                     return (message);
                   }
                 })(this.model, id);
              //end new
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
              //new
                if (!contains(value,"@")) {
                  value = value.getSubject();
                  input.attr("value", value);
                  } else {
                  input.attr("value", removeLangSign(value));
                  }
                  //input.attr("value", value);
                  //input.attr("value", removeLangSign(value));
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
})(jQuery);
