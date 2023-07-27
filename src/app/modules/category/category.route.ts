import express from 'express';
import { CategoryControllers } from './category.controller';

const router = express.Router();

router.post('/create-category', CategoryControllers.creteCategory);

router.get('/:id');

router.patch('/:id', CategoryControllers.updateCategory);

router.delete('/:id', CategoryControllers.deleteCategory);

router.get('/', CategoryControllers.getCategories);

export const CategoryRoutes = router;
