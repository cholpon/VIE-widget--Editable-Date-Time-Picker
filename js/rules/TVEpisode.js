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
