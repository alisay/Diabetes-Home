module.exports =
    [
        {
            id: '999',
            email: 'patient_doctor@dummy.com',
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
                    // metrics:
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
        {
            id: '997',
            email: 'doctor@dummy.com',
            password: 'second',
            username: 'My Doctor',
            createDate: 1650846951713,
            modifyDate: 1650849961916,
            user_type: ['clinician'],
            profile: {
                firstname: 'Doctor',
                lastname: 'Two',
            },
            related_users: [
                {
                    id: 999,
                    username: 'Doctor Jones',
                    relationship: 'patient'
                    // metrics:
                },
            ],
            patient_metrics: [
                {
                    glucose: false,
                    weight: false,
                    insulin: false,
                    exercise: false,
                }
            ] 
        },
        {
            id: '997',
            email: 'patient@dummy.com',
            password: 'third',
            username: 'My Patient',
            createDate: 1650849951713,
            modifyDate: 1650849961916,
            user_type: ['patient'],
            profile: {
                firstname: 'Patient',
                lastname: 'One',
            },
            related_users: [
                {
                    id: 999,
                    username: 'My Doctor',
                    relationship: 'doctor'
                },
            ],
            patient_metrics: [
                {
                    glucose: true,
                    weight: true,
                    insulin: true,
                    exercise: true,
                }
            ] 
        },
    ]


