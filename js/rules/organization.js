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
