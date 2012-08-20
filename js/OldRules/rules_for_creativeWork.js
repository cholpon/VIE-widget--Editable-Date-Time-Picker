function rulesForCreativeWork(entity) {
    var rules = [
        new Rule("schema:dateCreated", "<", entity.get("schema:dateModified"), "..."),
        new Rule("schema:dateCreated", "<", entity.get("schema:datePublished"), "..."),
        new Rule("schema:dateModified", ">", entity.get("schema:dateCreated"), "..."),
        new Rule("schema:datePublished", ">", entity.get("schema:dateCreated"), "..."),
        new Rule("schema:dateCreated", ">", entity.get("schema:about").get("schema:birthDate"), "In case of about is person"),
        new Rule("schema:dateCreated", "<", entity.get("schema:about").get("schema:deathDate"), "In case of about is person"),
        new Rule("schema:dateCreated", ">", entity.get("schema:about").get("schema:foundingDate"), "..."),
        new Rule("schema:dateCreated", ">", entity.get("schema:about").get("schema:endDate"), "..."),
        new Rule("schema:dateCreated", ">", entity.get("schema:about").get("schema:dateCreated"), "..."),
        new Rule("schema:dateCreated", ">", entity.get("schema:author").get("schema:birthDate"), "..."),
        new Rule("schema:dateCreated", "<", entity.get("schema:author").get("schema:deathDate"), "..."),
        new Rule("schema:dateCreated", ">", entity.get("schema:author").get("schema:foundingDate"), "..."),
        new Rule("schema:dateCreated", ">", entity.get("schema:contributor").get("schema:birthDate"), "..."),
        new Rule("schema:dateCreated", ">", entity.get("schema:contributor").get("schema:foundingDate"), "..."),
        new Rule("schema:dateCreated", ">", entity.get("schema:creator").get("schema:birthDate"), "..."),
        new Rule("schema:dateCreated", ">", entity.get("schema:creator").get("schema:foundingDate"), "..."),
        new Rule("schema:dateCreated", ">", entity.get("schema:editor").get("schema:birthDate"), "..."),
        new Rule("schema:dateCreated", ">", entity.get("schema:provider").get("schema:birthDate"), "..."),
        new Rule("schema:dateCreated", ">", entity.get("schema:provider").get("schema:foundingDate"), "..."),
        new Rule("schema:dateCreated", ">", entity.get("schema:publisher").get("schema:foundingDate"), "..."),
        new Rule("schema:dateCreated", ">", entity.get("schema:sourceOrganization").get("schema:foundingDate"), "..."),
        new Rule("schema:dateCreated", ">", entity.get("schema:accountablePerson").get("schema:birthDate"), "..."),
        new Rule("schema:dateCreated", "<", entity.get("schema:associatedMedia").get("schema:dateCreated"), "..."),
        new Rule("schema:dateCreated", "<", entity.get("schema:encoding").get("schema:dateCreated"), "..."),
        new Rule("schema:dateCreated", "<", entity.get("schema:encodings").get("schema:dateCreated"), "..."),
        new Rule("schema:dateCreated", "<", entity.get("schema:audio").get("schema:dateCreated"), "..."),
        new Rule("schema:dateCreated", "<", entity.get("schema:video").get("schema:dateCreated"), "..."),
        new Rule("schema:dateCreated", "<", entity.get("schema:comment").get("schema:startDate"), "..."),
        new Rule("schema:dateCreated", "<", entity.get("schema:offers").get("schema:priceValidUntil"), "..."),
        new Rule("schema:dateCreated", "<", entity.get("schema:review").get("schema:dateCreated"), "..."),
        new Rule("schema:dateCreated", "<", entity.get("schema:reviews").get("schema:dateCreated"), "...")
    ];
    return rules;
}