//CASES WHEN PERSON IS CONNECTED TO ORGANIZATION
     //to cover attribute "employee"
     var organization_employee = getEntities("Organization", "schema:employee", entity);
       for (var i = 0; i < organization_employee.length; i++) {
         rules.push(new Rule("schema:birthDate", ">", x.get("schema:foundingDate"), "employee's birth date must be later than founding date"));
         rules.push(new Rule("schema:deathDate", ">", x.get("schema:foundingDate"), "employee's death date must be later than founding date"));
            
       }


