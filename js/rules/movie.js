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
