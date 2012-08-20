function rulesForSoftwareApplication() {
  var type = "<http://schema.org/SoftwareApplication>";
  return [
    new Rule(type, "schema:dateCreated", "<=", "schema:screenshot", "schema:dateCreated"),
    new Rule(type, "schema:dateCreated", "<=", "schema:screenshot", "schema:dateModified"),
    new Rule(type, "schema:dateCreated", "<=", "schema:screenshot", "schema:datePublished"),
    
    new Rule(type, "schema:dateCreated", "<=", "schema:screenshot", "schema:expires"),
    new Rule(type, "schema:dateCreated", "<=", "schema:screenshot", "schema:uploadDate")
        
  ];
}
