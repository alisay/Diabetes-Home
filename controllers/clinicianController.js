const dummyPatientsInfo = [
    {
        "username": "John Doe",
        "glucose": 125, 
        "weight": 70, 
        "steps": 300,
        "insulin": 3,

        "glucoseUpperBound": 170, 
        "stepsUpperBound": 300,
        "insulinUpperBound": 4,

        "glucoseLowerBound": 80, 
        "stepsLowerBound": 0,
        "insulinLowerBound": 0,
    },
    {
        "username": "Larissa Aulus",
        "glucose": 190, 
        "weight": 40, 
        "steps": 10,
        "insulin": null,
        
        "glucoseUpperBound": 170, 
        "stepsUpperBound": 300,
        "insulinUpperBound": 4,
        "weightUpperBound": 80, 

        "glucoseLowerBound": 80, 
        "stepsLowerBound": 0,
        "insulinLowerBound": 0,
        "weightLowerBound": 45, 

    },
    {
        "username": "Kenzō Rudi",
        "glucose": 130, 
        "weight": 90, 
        "steps": 900,
        "insulin": 2,
        
        "glucoseUpperBound": 170, 
        "stepsUpperBound": 300,
        "insulinUpperBound": 4,

        "glucoseLowerBound": 80, 
        "stepsLowerBound": 0,
        "insulinLowerBound": 0,
    },
    {
        "username": "Ephesius Tetyana",
        "glucose": null, 
        "steps": null,
        "weight": null, 
        "insulin": null,
    
        "glucoseUpperBound": 170, 
        "stepsUpperBound": 300,
        "insulinUpperBound": 4,

        "glucoseLowerBound": 80, 
        "stepsLowerBound": 0,
        "insulinLowerBound": 0,
    },
]

const dummyCliName = {
    cliname: 'Chris'
}

export const clinicianDashboard = (req, res) => {
    res.render('clinicianDashboard', {headTitle: "Home", 
                                    css: "stylesheets/clinicianDashboard.css",
                                    clinicianName: dummyCliName.cliname,
                                    patients: dummyPatientsInfo
                                })
}
