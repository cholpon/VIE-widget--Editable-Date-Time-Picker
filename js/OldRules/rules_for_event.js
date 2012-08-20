 // CASES WHEN EVENT IS CONNECTED TO PERSON
 
 //to cover attribute "attendee" (A person or organization attending the event) ">="
 var event_pattendee= getEntities("Person", "schema:attendee", entity);
       for (var i = 0; i < event_attendee.length; i++) {
         var x = event_pattendee[i]
         rules.push(new Rule("schema:startDate", ">", x.get("schema:birthDate"), "startDate of event must be equal/later to attendee's birth date "));
         rules.push(new Rule("schema:endDate", ">", x.get("schema:birthDate"), "endDate of event must be equal/later than attendee's birth date"));
         rules.push(new Rule("schema:startDate", ">", x.get("schema:birthDate"), "startDate of event must be later than attendee's birth date"));
         rules.push(new Rule("schema:endDate", ">", x.get("schema:deathDate"), "startDate of event must be equal/later than attendee's birth date"));
       }
       
 //to cover attribute "attendees" (A person or organization attending the event) ">="
 var event_pattendees= getEntities("Person", "schema:attendees", entity);
       for (var i = 0; i < event_attendee.length; i++) {
         var x = event_pattendees[i]
         rules.push(new Rule("schema:startDate", ">", x.get("schema:birthDate"), "startDate of event must be equal/later to attendees' birth date "));
         rules.push(new Rule("schema:endDate", ">", x.get("schema:birthDate"), "endDate of event must be equal/later than attendees' birth date"));
         rules.push(new Rule("schema:startDate", ">", x.get("schema:birthDate"), "startDate of event must be later than attendees' birth date"));
         rules.push(new Rule("schema:endDate", ">", x.get("schema:deathDate"), "startDate of event must be equal/later than attendees' birth date"));
       }
 
 
//to cover attribute "performer", can be Person or Organization, (A performer at the event—for example, a presenter, musician, musical group or actor. ) ">="
 var event_pperformer= getEntities("Person", "schema:performer", entity);
       for (var i = 0; i < event_performer.length; i++) {
         var x = event_pperformer[i]
         rules.push(new Rule("schema:startDate", ">", x.get("schema:birthDate"), "startDate of event must be equal/later to performer's birth date "));
         rules.push(new Rule("schema:endDate", ">", x.get("schema:birthDate"), "endDate of event must be equal/later than performer's birth date"));
         rules.push(new Rule("schema:startDate", ">", x.get("schema:birthDate"), "startDate of event must be later than performer's birth date"));
         rules.push(new Rule("schema:endDate", ">", x.get("schema:deathDate"), "startDate of event must be equal/later than performer's birth date"));
       }
//to cover attribute "performers"
  var event_pperformers= getEntities("Person", "schema:performers", entity);
       for (var i = 0; i < event_pperformers.length; i++) {
            var x = event_pperformers[i]
         rules.push(new Rule("schema:startDate", ">", x.get("schema:birthDate"), "startDate of event must be equal/later to performers' birth date "));
         rules.push(new Rule("schema:endDate", ">", x.get("schema:birthDate"), "endDate of event must be equal/later than performers' birth date"));
         rules.push(new Rule("schema:startDate", ">", x.get("schema:birthDate"), "startDate of event must be later than performers' birth date"));
         rules.push(new Rule("schema:endDate", ">", x.get("schema:deathDate"), "startDate of event must be equal/later than performers' birth date"));
       }
 
 
 //CASES WHEN EVENT IS RELATED TO ORGANIZATION, subtypes need to be covered later

//to cover attribute "attendee", case Organization
  var event_oattendee= getEntities("Organization", "schema:attendee", entity);
       for (var i = 0; i < event_oattendee.length; i++) {
         var x = event_oattendee[i]
         rules.push(new Rule("schema:startDate", ">", x.get("schema:foundingDate"), "startDate of event must be equal/later than foundingDate of attendee-organization "));
         rules.push(new Rule("schema:endDate", ">", x.get("schema:foundingDate"), "endDate of event must be equal/later than foundingDate of attendee-organization"));
       }
       
       
//to cover attribute "attendee", case Organization
  var event_oattendees= getEntities("Organization", "schema:attendees", entity);
       for (var i = 0; i < event_oattendees.length; i++) {
         var x = event_oattendees[i]
         rules.push(new Rule("schema:startDate", ">", x.get("schema:foundingDate"), "startDate of event must be equal/later than foundingDate of attendees-organization "));
         rules.push(new Rule("schema:endDate", ">", x.get("schema:foundingDate"), "endDate of event must be equal/later than foundingDate of attendees-organization"));
       }
       
//to cover attribute "performer", case Organization
  var event_operformer= getEntities("Organization", "schema:performer", entity);
       for (var i = 0; i < event_operformer.length; i++) {
         var x = event_operformer[i]
         rules.push(new Rule("schema:startDate", ">", x.get("schema:foundingDate"), "startDate of event must be equal/later than foundingDate of performer-organization "));
         rules.push(new Rule("schema:endDate", ">", x.get("schema:foundingDate"), "endDate of event must be equal/later than foundingDate of performer-organization"));
       }
       
       
//to cover attribute "performer", case Organization
  var event_operformer= getEntities("Organization", "schema:performer", entity);
       for (var i = 0; i < event_operformer.length; i++) {
         var x = event_operformer[i]
         rules.push(new Rule("schema:startDate", ">", x.get("schema:foundingDate"), "startDate of event must be equal/later than foundingDate of performer-organization "));
         rules.push(new Rule("schema:endDate", ">", x.get("schema:foundingDate"), "endDate of event must be equal/later than foundingDate of performer-organization"));
       }
 
 //to cover attribute "performers", case Organization
  var event_operformers= getEntities("Organization", "schema:performesr", entity);
       for (var i = 0; i < event_operformers.length; i++) {
         var x = event_operformers[i]
         rules.push(new Rule("schema:startDate", ">", x.get("schema:foundingDate"), "startDate of event must be equal/later than foundingDate of performers-organization "));
         rules.push(new Rule("schema:endDate", ">", x.get("schema:foundingDate"), "endDate of event must be equal/later than foundingDate of performers-organization"));
       }
       
             
//CASES WHEN EVENT IS CONNECTED TO PLACE: subtypes to be covered to later, no date-related attributes in general Place

//CASES WHEN EVENT IS CONNECTED TO POSTAL ADRESS: no subtypes, no date-related attributes

//CASES WhEN EVENT IS CONNECTED TO ANOTHER EVENT:

//to cover attribute "subEvent"
  var event_subEvent= getEntities("Event", "schema:subEvent", entity);
       for (var i = 0; i < event_subEvent.length; i++) {
         var x = event_subEvent[i]
         rules.push(new Rule("schema:startDate", "<", x.get("schema:startEvent"), "startDate of main event must be earlier than startDate of subEvent "));
         rules.push(new Rule("schema:endDate", ">", x.get("schema:foundingDate"), "endDate of main event must be equal/later than endDate of subEvent"));
       }
       
//to cover attribute "subEvents"
  var event_subEvents= getEntities("Event", "schema:subEvents", entity);
       for (var i = 0; i < event_subEvents.length; i++) {
         var x = event_subEvents[i]
         rules.push(new Rule("schema:startDate", "<", x.get("schema:startEvent"), "startDate of main event must be earlier than startDate of subEvents "));
         rules.push(new Rule("schema:endDate", ">", x.get("schema:foundingDate"), "endDate of main event must be equal/later than endDate of subEvents"));
       }

//to cover attribute "superEvent"
  var event_superEvent= getEntities("Event", "schema:superEvent", entity);
       for (var i = 0; i < event_superEvent.length; i++) {
         var x = event_superEvent[i]
         rules.push(new Rule("schema:endDate", ">", x.get("schema:foundingDate"), "endDate of main event must be equal/later than endDate of superEvent"));
       }
              