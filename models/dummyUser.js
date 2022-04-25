module.exports =
    [
        {
            id: '999',
            email: 'whatever@email.com',
            password: 'hi',
            username: 'Jones',
            createDate: 1650849951713,
            modifyDate: 1650849961916,
            user_type: ['clinician', 'patient'],
            profile: {
                firstname: 'Doctor',
                lastname: 'Jones',
            },
            related_users: [
                {
                    id: 998,
                    username: 'My Patient',
                    relationship: 'patient'
                },
                {
                    id: 997,
                    username: 'My Doctor',
                    relationship: 'doctor'
                }
            ],
            patient_metrics: [
                {
                    glucose: false,
                    weight: true,
                    insulin: false,
                    exercise: false,
                }
            ] 
        },
    ]


