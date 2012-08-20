function rulesForCreativeWork() {
  var type = "<http://schema.org/CreativeWork>";
  return [
    new Rule(type, "schema:datePublished", ">=", "self", "schema:dateCreated"),
    new Rule(type, "schema:dateModified", ">=", "self", "schema:dateCreated"),
    new Rule(type, "schema:copyrightYear", ">=", "self", "schema:dateCreated"),
    new Rule(type, "schema:dateCreated", ">=", "schema:accountablePerson", "schema:birthDate"),
    new Rule(type, "schema:dateCreated", "<=", "schema:associatedMedia", "schema:dateCreated"),
    new Rule(type, "schema:dateCreated", "<=", "schema:associatedMedia", "schema:expires"),
    new Rule(type, "schema:dateCreated", "<=", "schema:associatedMedia", "schema:uploadDate"),
    new Rule(type, "schema:dateCreated", "<=", "schema:audioObject", "schema:dateCreated"),
    new Rule(type, "schema:dateCreated", "<=", "schema:audioObject", "schema:expires"),
    new Rule(type, "schema:dateCreated", "<=", "schema:audioObject", "schema:uploadDate"),
    
    //author can be Person or Organization
    new Rule(type, "schema:dateCreated", ">=", "schema:author", "schema:birthDate"),
    new Rule(type, "schema:dateCreated", ">=", "schema:author", "schema:foundingDate"),
        
    
    new Rule(type, "schema:dateCreated", "<=", "schema:comment", "schema:startDate"),
    new Rule(type, "schema:dateCreated", "<=", "schema:comment", "schema:commentTime"),
    
    
    //contributor can Person or Organization
    new Rule(type, "schema:dateCreated", ">=", "schema:contributor", "schema:birthDate"),
    new Rule(type, "schema:dateCreated", "<=", "schema:contributor", "schema:deathDate"),
    new Rule(type, "schema:dateCreated", ">=", "schema:contributor", "schema:foundingDate"),
    
    
    //copyrightHolder can Person or Organization
    new Rule(type, "schema:dateCreated", ">=", "schema:copyrightHolder", "schema:birthDate"),
    new Rule(type, "schema:dateCreated", "<=", "schema:copyrightHolder", "schema:deathDate"),
    new Rule(type, "schema:dateCreated", ">=", "schema:copyrightHolder", "schema:foundingDate"),
    
    
    //creator can Person or Organization
    new Rule(type, "schema:dateCreated", ">=", "schema:creator", "schema:birthDate"),
    new Rule(type, "schema:dateCreated", "<=", "schema:creator", "schema:deathDate"),
    new Rule(type, "schema:dateCreated", ">=", "schema:creator", "schema:foundingDate"),
    
        
    //editor can be only Person
    new Rule(type, "schema:dateCreated", ">=", "schema:editor", "schema:birthDate"),
    new Rule(type, "schema:dateCreated", "<=", "schema:editor", "schema:deathDate"),
    
    new Rule(type, "schema:dateCreated", "<=", "schema:encoding", "schema:dateCreated"),
    new Rule(type, "schema:dateCreated", "<=", "schema:encoding", "schema:expires"),
    new Rule(type, "schema:dateCreated", "<=", "schema:encoding", "schema:uploadDate"),
    //new Rule(type, "schema:dateCreated", "<=", "schema:encodings", "schema:dateCreated"),
    
    
    new Rule(type, "schema:dateCreated", "<=", "schema:offers", "schema:priceValidUntil"),
 
    
    //provider can Person or Organization
    new Rule(type, "schema:dateCreated", ">=", "schema:provider", "schema:birthDate"),
    new Rule(type, "schema:dateCreated", "<=", "schema:provider", "schema:deathDate"),
    new Rule(type, "schema:dateCreated", ">=", "schema:provider", "schema:foundingDate"),
    
    //publisher can be only Organization
    new Rule(type, "schema:dateCreated", ">=", "schema:publisher", "schema:foundingDate"),
    
    
    new Rule(type, "schema:dateCreated", "<=", "schema:review", "schema:dateCreated"),
    //new Rule(type, "schema:dateCreated", "<=", "schema:reviews", "schema:dateCreated"),
    
    new Rule(type, "schema:dateCreated", "<=", "schema:sourceOrganization", "schema:foundingDate"),
    
    new Rule(type, "schema:dateCreated", "<=", "schema:videoObject", "schema:dateCreated"),
    new Rule(type, "schema:dateCreated", "<=", "schema:videoObject", "schema:expires"),
    new Rule(type, "schema:dateCreated", "<=", "schema:videoObject", "schema:uploadDate")
       
  ];
  
  /*
    Subtypes:
    Article
    Blog
    Book
    Comment
    Diet
    ExercisePlan
    ItemList
    Map
    MediaObject - extra: expires, uploadDate
    Movie
    MusicPlaylist
    MusicRecording
    Painting
    Photograph
    Recipe
    Review
    Sculpture
    SoftwareApplication
    TVEpisode
    TVSeason
    TVSeries
    WebPage
    WebPageElement
*/
}

