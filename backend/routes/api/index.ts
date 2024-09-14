import { Router } from 'express';
import placeRoutes from './place-routes';
import commentRoutes from './comment-routes';

const router: Router = Router();

router.use('/place', placeRoutes);
router.use('/comment', commentRoutes);

export default router;
