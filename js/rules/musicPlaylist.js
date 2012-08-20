function rulesForMusicPlaylist() {
  var type = "<http://schema.org/MusicPlaylist>";
  return [
    new Rule(type, "schema:dateCreated", ">=", "schema:track", "schema:dateCreated"),
    //new Rule(type, "schema:dateCreated", ">=", "schema:tracks", "schema:dateCreated"),
    new Rule(type, "schema:dateCreated", ">=", "schema:track", "schema:datePublished")
  ];
}
