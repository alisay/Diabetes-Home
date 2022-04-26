module.exports =
    [
        {
            id: '999',
            email: 'patient_doctor@dummy.com',
            password: 'hi',
            username: 'Chris',
            createDate: 1650849951713,
            modifyDate: 1650849961916,
            user_type: ['clinician', 'patient'],
            profile: {
                firstname: 'Chris',
                lastname: 'Jones',
            },
            related_users: [
                {
                    id: '6265edce2cc273a8c7c696dc',
                    name: 'Pat Patient',
                    relationship: 'patient',
                    notes: [{date: "25 Jan", text: "Monitor My's blood glucose"}, {date: "27 Jan", text: "I think this patient is annoying"}]
                },
                {
                    id: 997,
                    name: 'Doctor Two',
                    relationship: 'doctor'
                }
            ],
            patient_metrics: [
                {
                    glucose: {required: true, threshold: 7, today: 4.5},
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
                    glucose: {required: false, threshold: 7},
                    weight: false,
                    insulin: false,
                    exercise: false,
                }
            ] 
        },
        {
            id: '6265edce2cc273a8c7c696dc',
            email: 'patient@dummy.com',
            password: 'third',
            username: 'Pat',
            createDate: 1650849951713,
            modifyDate: 1650849961916,
            user_type: ['patient'],
            profile: {
                firstname: 'Pat',
                lastname: 'Patient',
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
                    glucose: {required: true, threshold: 7, today: 4.5},
                    weight: true,
                    insulin: true,
                    exercise: true,
                }
            ] 
        },
    ]


