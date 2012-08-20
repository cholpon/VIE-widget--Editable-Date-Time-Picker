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
