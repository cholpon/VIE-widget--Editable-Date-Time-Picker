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
