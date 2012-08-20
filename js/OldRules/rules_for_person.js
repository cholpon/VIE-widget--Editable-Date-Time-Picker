function rulesForPerson(entity) {
   var rules = [
      new Rule("schema:birthDate", "<", entity.get("schema:deathDate"), "birth date must be earlier than death date"),
      new Rule("schema:deathDate", ">", entity.get("schema:birthDate"), "death date must be later than birth date"),
      new Rule("schema:birthDate", ">", entity.get("schema:parent").get("schema:birthDate"), "..."),
      new Rule("schema:birthDate", "<", entity.get("schema:parent").get("schema:deathDate"), "..."),
      new Rule("schema:birthDate", "<", entity.get("schema:children").get("schema:birthDate"), "..."),
      new Rule("schema:deathDate", ">", entity.get("schema:children").get("schema:birthDate"), "..."),
      new Rule("schema:birthDate", "<", entity.get("schema:colleague").get("schema:deathDate"), "..."),
      new Rule("schema:deathDate", ">", entity.get("schema:colleague").get("schema:birthDate"), "..."),
      new Rule("schema:birthDate", "<", entity.get("schema:knows").get("schema:deathDate"), "..."),
      new Rule("schema:deathDate", ">", entity.get("schema:knows").get("schema:birthDate"), "..."),
      new Rule("schema:deathDate", ">", entity.get("schema:follows").get("schema:birthDate"), "..."),
      new Rule("schema:birthDate", "<", entity.get("schema:spouse").get("schema:deathDate"), "..."),
      new Rule("schema:deathDate", ">", entity.get("schema:spouse").get("schema:birthDate"), "..."),
      new Rule("schema:deathDate", ">", entity.get("schema:memberOf").get("schema:foundingDate"), "..."),
   ];
        
   //CASES WHEN PERSON IS CONNECTED TO CREATIVE WORK
   var creatives = getEntities("CreativeWork", "schema:author", entity);
   for (var i = 0; i < creatives.length; i++) {
      var x = creatives[i];
      rules.push(new Rule("schema:birthDate", "<", x.get("schema:dateCreated"), "..."));
      rules.push(new Rule("schema:deathDate", ">", x.get("schema:dateCreated"), "..."));
   }

   // to cover attribute "accountablePerson" in CreativeWork, can be only Person
   var creatives_accountablePerson = getEntities("CreativeWork", "schema:accountablePerson", entity);
   for (var i = 0; i < creatives_accountablePerson.length; i++) {
       rules.push(new Rule("schema:birthDate", "<", x.get("schema:dateCreated"), "birth date must be earlier than date created"));
       rules.push(new Rule("schema:deathDate", ">", x.get("schema:dateCreated"), "death date must be later than date created"));
   }
   
   //to cover attribute "contributor" in CreativeWork, can be Person or Organization
   var creatives_contributor = getEntities("CreativeWork", "schema:contributor", entity);
   for (var i = 0; i < creatives_contributor.length; i++){
       rules.push(new Rule("schema:birthDate", "<", x.get("schema:dateCreated"), "birth date must be earlier than date created"));
       rules.push(new Rule("schema:deathDate", ">", x.get("schema:dateCreated"), "death date must later than date created"));
   }
   
   //to cover attribute "copyrightHolder" in CreativeWork, can be Person or Organization
   var creatives_copyrightHolder = getEntities("CreativeWork", "schema:copyrightHolder", entity);
   for (var i = 0; i < creatives_copyrightHolder.length; i++) {
       rules.push(new Rule("schema:birthDate", "<", x.get("schema:dateCreated"), "birth date must be earlier than date created"));
       rules.push(new Rule("schema:deathDate", ">", x.get("schema:dateCreated"), "death date must be later than date created"));
   }
   
   //to cover attribute "editor" in CreativeWork, can be only Person
   var creatives_editor = getEntities("CreativeWork", "schema:editor", entity);
   for (var i = 0; i < creatives_editor.length; i++) {
       rules.push(new Rule("schema:birthDate", "<", x.get("schema:dateCreated"), "birth date must be earlier than date created"));
       rules.push(new Rule("schema:deathDate", ">", x.get("schema:dateCreated"), "death date must be later than date created"));
   }
   
   //to cover attribute "provider" in CreativeWork, can be Person or Organization
   var creatives_provider = getEntities("CreativeWork", "schema:copyrightHolder", entity);
   for (var i = 0; i < creatives_provider.length; i++) {
       rules.push(new Rule("schema:birthDate", "<", x.get("schema:dateCreated"), "birth date must be earlier than date created"));
       rules.push(new Rule("schema:deathDate", ">", x.get("schema:dateCreated"), "death date must be later than date created"));
   }

   var followers = getEntities("Person", "schema:follows", entity);
   for (var i = 0; i < followers.length; i++) {
       var x = followers[i];
       rules.push(new Rule("schema:birthDate", "<", x.get("schema:deathDate"), "..."));
   }
   return rules;    
}