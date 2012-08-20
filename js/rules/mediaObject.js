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
