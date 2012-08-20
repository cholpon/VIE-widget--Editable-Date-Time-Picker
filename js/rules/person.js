
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
