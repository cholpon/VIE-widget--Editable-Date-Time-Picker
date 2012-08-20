function rulesForEducationalOrganization() {
  var type = "<http://schema.org/EducationalOrganization>";
  return [
    new Rule(type, "schema:foundingDate", "<=", "schema:alumni", "schema:birthDate"),
  ];
  /*
  Subtypes do not contain extra date-related properties
  */
}
