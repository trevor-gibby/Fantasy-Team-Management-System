var teamModel = {
    fields: [
        {
            label: "Team Name",
            name: "name",   //YOU WILL USE THIS IN THIS LAB
            inputType: "text",
            placeholder: "Enter your Team Name here",
            validation: {  //YOU WILL USE THIS STRUCTURE IN THIS LAB
                required: true,
                requiredMessage: "Team name is required!"
            },
            column: 'col-sm-6'
        },
        {
            label: "Notes",
            name: "notes",   //YOU WILL USE THIS IN THIS LAB
            inputType: "text",
            placeholder: "Enter any notes here",
            validation: {  //YOU WILL USE THIS STRUCTURE IN THIS LAB
                required: false,
                requiredMessage: "Notes are required!"
            },
            column: 'col-sm-10'
        }
    ]
}