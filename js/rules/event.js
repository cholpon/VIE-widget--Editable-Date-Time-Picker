function rulesForEvent() {
  var type = "<http://schema.org/Event>";
  return [
    new Rule(type, "schema:startDate", "<=", "self", "schema:endDate"), 
    new Rule(type, "schema:startDate", ">=", "schema:attendee", "schema:birthDate"),
    //new Rule(type, "schema:startDate", ">=", "schema:attendees", "schema:birthDate"), 
    new Rule(type, "schema:startDate", ">=", "schema:performer", "schema:birthDate"),
    //new Rule(type, "schema:startDate", ">=", "schema:performers", "schema:birthDate"),
    new Rule(type, "schema:startDate", "<=", "schema:subEvent", "schema:startDate"),
    new Rule(type, "schema:endDate", ">=", "schema:subEvent", "schema:endDate")
    //new Rule(type, "schema:startDate", "<=", "schema:subEvents", "schema:startDate"),
    //new Rule(type, "schema:endDate", ">=", "schema:subEvents", "schema:endDate"),
    ];
}

/*
Subtypes do not contain other date-properties

Subtypes:
BusinessEvent
ChildrensEvent
ComedyEvent
DanceEvent
EducationEvent
Festival
FoodEvent
LiteraryEvent
MusicEvent
SaleEvent
SocialEvent
SportsEvent
TheaterEvent
UserInteraction
VisualArtsEvent

*/


