import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import multer from 'multer';

import uploadConfig from '../config/upload';

import TransactionsController from '../controllers/TransactionsController';
import ImportTransactionsController from '../controllers/ImportTransactionsController';

const transactionsRouter = Router();
const transactionsController = new TransactionsController();
const importTransactionsController = new ImportTransactionsController();

const upload = multer(uploadConfig.multer);

transactionsRouter.get('/', transactionsController.index);

transactionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      value: Joi.number().required(),
      type: Joi.string().required(),
      category: Joi.string().required(),
    },
  }),
  transactionsController.create,
);

transactionsRouter.delete('/:id', transactionsController.destroy);

transactionsRouter.post(
  '/import',
  upload.single('file'),
  importTransactionsController.create,
);

export default transactionsRouter;
