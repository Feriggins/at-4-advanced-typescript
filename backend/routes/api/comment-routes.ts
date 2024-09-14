import { Router } from 'express';
import { body } from 'express-validator';
import { addComment, deleteComment } from '../../controllers/comment-controller';

const router: Router = Router();

const commentValidationRules = [
    body('stars').isNumeric().withMessage('Number of stars is required'),
];

router.post('/:id', commentValidationRules, addComment);
router.delete('/:id', deleteComment);

export default router;
