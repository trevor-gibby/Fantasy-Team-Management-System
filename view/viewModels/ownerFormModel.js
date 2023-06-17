var ownerModel = {
    fields: [
        {
            label: "First Name",
            name: "first_name",   //YOU WILL USE THIS IN THIS LAB
            inputType: "text",
            placeholder: "Enter your first name here",
            validation: {  //YOU WILL USE THIS STRUCTURE IN THIS LAB
                required: true,
                requiredMessage: "First name is required!"
            },
            column: 'col-sm-6'
        },
        {
            label: "Last Name",
            name: "last_name",
            inputType: "text",
            placeholder: "Enter your last name here",
            validation: {
                required: true,
                requiredMessage: "Last name is required!"
            },
            column: 'col-sm-6'
        },
        {
            label: "Team",
            name: "team_id",
            inputType: "select",
            placeholder: "Team Select...",
            validation: {
                required: true,
                requiredMessage: "Team is required!"
            },
            get_options_dynamically: 'teams'
        },
        {
            label: "Address",
            name: "address1",
            inputType: "text",
            placeholder: "Enter your address here",
            validation: {
                required: true,
                requiredMessage: "Address is required!"
            },
            column: 'col-sm-4'
        },
        {
            label: "Address 2",
            name: "address2",
            inputType: "text",
            placeholder: "Enter your address 2 here (optional)",
            validation: {
                required: false,
                requiredMessage: "address is required!"
            },
            column: 'col-sm-4'
        },
        {
            label: "City",
            name: "city",
            inputType: "text",
            placeholder: "Enter your city here",
            validation: {
                required: true,
                requiredMessage: "City is required!"
            },
            column: 'col-sm-4'
        },
        {
            label: "State",
            name: "state",
            inputType: "select",
            placeholder: "State Select...",
            validation: {
                required: true,
                requiredMessage: "State is required!"
            },
            options: [
                {
                    label: '--',
                    value: ''
                },
                {
                    label: 'AL',
                    value: 'AL',
                },
                {
                    label: 'AK',
                    value: 'AK',
                },
                {
                    label: 'AS',
                    value: 'AS',
                },
                {
                    label: 'AZ',
                    value: 'AZ',
                },
                {
                    label: 'AR',
                    value: 'AR',
                },
                {
                    label: 'CA',
                    value: 'CA',
                },
                {
                    label: 'CO',
                    value: 'CO',
                },
                {
                    label: 'CT',
                    value: 'CT',
                },
                {
                    label: 'DE',
                    value: 'DE',
                },
                {
                    label: 'DC',
                    value: 'DC',
                },
                {
                    label: 'FL',
                    value: 'FL',
                },
                {
                    label: 'GA',
                    value: 'GA',
                },
                {
                    label: 'HI',
                    value: 'HI',
                },
                {
                    label: 'ID',
                    value: 'ID',
                },
                {
                    label: 'IL',
                    value: 'IL',
                },
                {
                    label: 'IN',
                    value: 'IN',
                },
                {
                    label: 'IA',
                    value: 'IA',
                },
                {
                    label: 'KS',
                    value: 'KS',
                },
                {
                    label: 'KY',
                    value: 'KY',
                },
                {
                    label: 'LA',
                    value: 'LA',
                },
                {
                    label: 'ME',
                    value: 'ME',
                },
                {
                    label: 'MD',
                    value: 'MD',
                },
                {
                    label: 'MA',
                    value: 'MA',
                },
                {
                    label: 'MI',
                    value: 'MI',
                },
                {
                    label: 'MN',
                    value: 'MN',
                },
                {
                    label: 'MS',
                    value: 'MS',
                },
                {
                    label: 'MO',
                    value: 'MO',
                },
                {
                    label: 'NE',
                    value: 'NE',
                },
                {
                    label: 'NV',
                    value: 'NV',
                },
                {
                    label: 'NH',
                    value: 'NH',
                },
                {
                    label: 'NJ',
                    value: 'NJ',
                },
                {
                    label: 'NM',
                    value: 'NM',
                },
                {
                    label: 'NY',
                    value: 'NY',
                },
                {
                    label: 'NC',
                    value: 'NC',
                },
                {
                    label: 'ND',
                    value: 'ND',
                },
                {
                    label: 'OH',
                    value: 'OH',
                },
                {
                    label: 'OK',
                    value: 'OK',
                },
                {
                    label: 'OR',
                    value: 'OR',
                },
                {
                    label: 'PA',
                    value: 'PA',
                },
                {
                    label: 'RI',
                    value: 'RI',
                },
                {
                    label: 'SC',
                    value: 'SC',
                },
                {
                    label: 'SD',
                    value: 'SD',
                },
                {
                    label: 'TN',
                    value: 'TN',
                },
                {
                    label: 'TX',
                    value: 'TX',
                },
                {
                    label: 'UT',
                    value: 'UT',
                },
                {
                    label: 'VT',
                    value: 'VT',
                },
                {
                    label: 'VA',
                    value: 'VA',
                },
                {
                    label: 'WA',
                    value: 'WA',
                },
                {
                    label: 'WV',
                    value: 'WV',
                },
                {
                    label: 'WI',
                    value: 'WI',
                },
                {
                    label: 'WY',
                    value: 'WY',
                }
            ],
            column: 'col-sm-4'
        },
        {
            label: "Zip Code",
            name: "zip",
            inputType: "text",
            placeholder: "Enter your zip code here",
            validation: {
                required: true,
                requiredMessage: "Zip code is required!",
                invalidMessage: "Invalid Zip Code",
                regex: /^[0-9]{5}$/im
            },
            column: 'col-sm-4'
        },
        {
            label: "Phone Number",
            name: "phone",
            inputType: "tel",
            placeholder: "Enter your phone number here",
            validation: {
                required: true,
                requiredMessage: "Phone Number is required!",
                invalidMessage: "Invalid Phone Number",
                regex: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
            },
            column: 'col-sm-6'
        },
        {
            label: "Email Address",
            name: "email",
            inputType: "email",
            placeholder: "Enter your email here",
            validation: {
                required: true,
                requiredMessage: "Email Address is required!",
                invalidMessage: "Invalid Email address",
                regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            },
            column: 'col-sm-6'
        },
        {
            label: "Username",
            name: "user_name",
            inputType: "text",
            placeholder: "Enter username name here",
            validation: {
                required: true,
                requiredMessage: "Username is required!"
            },
            column: 'col-sm-6'
        },
        {
            label: "Password",
            name: "password",
            inputType: "password",
            placeholder: "Enter your password",
            validation: {
            
                required: true,
                requiredMessage: "Password is required!",
                invalidMessage: "Password must be min 8 chars, one _, one Capital letter",
                
                regex: /^(?=.*[A-Z])(?=.*\_).{8,}$/
            },
            column: 'col-sm-6'
        },
        {
            label: "Retype Password",
            name: "pass2",
            inputType: "password",
            placeholder: "Retype your password",
            validation: {
                matchEl: "password",
                required: true,
                requiredMessage: "Password is required!",
                invalidMessage: "Password must be min 8 chars, one _, one Capital letter",
                mismatchMessage: "Passwords must match",
                regex: /^(?=.*[A-Z])(?=.*\_).{8,}$/
            },
            column: 'col-sm-6'
        }
    ]
}