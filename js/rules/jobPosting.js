function rulesForJobPosting() {
  var type = "<http://schema.org/JobPosting>";
  return [
    new Rule(type, "schema:datePoste", ">=", "schema:hiringOrganization", "schema:foundingDate")
   ];
   /*
   There are no subtypes
   */
}
