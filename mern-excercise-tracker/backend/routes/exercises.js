const router = require('express').Router();
let Exercise =require('../models/exercise.model');

router.route('/').get((req,res) => {
    Exercise.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
    });

    newExercise.save()
           .then(() => res.json('Se agrego el ejercicio!'))
           .catch(err => res.status(400).json('Error: ' + err));
});

//agrego mas rutas para que quede crud
router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
            .then(exercise => res.json(exercise))
            .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
            .then(() => res.json('Ejercicio borrado.'))
            .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
            .then(exercise => {
                exercise.username= req.body.username;
                exercise.description=req.body.description;
                exercise.duration=Number(req.body.duration);
                exercise.date= Date.parse(req.body.date);

                exercise.save()
                        .then(() => res.json('Ejercicio actualizado'))
                        .catch(err => res.status(400).json('Error: ' + err));
            })
            .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;