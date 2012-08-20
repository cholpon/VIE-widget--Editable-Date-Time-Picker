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
