function rulesForOffer() {
  var type = "<http://schema.org/Offer>";
  return [
    new Rule(type, "schema:priceValidUntil", ">=", "schema:seller", "schema:foundingDate")
   
  ];
}
