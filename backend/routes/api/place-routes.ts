import { Router } from 'express';
import { body } from 'express-validator';
import {
    getAllPlaces,
    getSpecificPlace,
    createNewPlace,
    editPlace,
    deletePlace
} from '../../controllers/place-controller';

const router: Router = Router();
const currentYear: number = new Date().getFullYear();

const placeValidationRules = [
    body('cuisines').notEmpty().withMessage('Cuisines is required'),
    body('name').notEmpty().withMessage('Name is required'),
    body('founded')
        .notEmpty()
        .withMessage('Founded year is required')
        .isInt({ min: 1673, max: currentYear })
        .withMessage(`Founded year must be a number between 1673 and ${currentYear}`)
];

router.get('/', getAllPlaces);
router.get('/:id', getSpecificPlace);
router.post('/', placeValidationRules, createNewPlace);
router.put('/:id', placeValidationRules, editPlace);
router.delete('/:id', deletePlace);

export default router;
