const { Router } = require('express');
const { asyncHandlerWrapper } = require('../../helpers/async.handler.wrapper');
const { formatResponse } = require('../../helpers/response.formatter');

const createUsersRouter = (userService) => {
  const router = Router();

  router.post(
    '/:id',
    asyncHandlerWrapper(async (req, res) => {
      const { id } = req.params;
      const data = req.body;

      const user = await userService.createUser(id, data);

      res.status(201).send(formatResponse(user));
    }),
  );

  router.put(
    '/:id',
    asyncHandlerWrapper(async (req, res) => {
      const { id } = req.params;
      const data = req.body;

      const user = await userService.updateUser(id, data);

      res.status(200).send(formatResponse(user));
    }),
  );

  router.delete(
    '/:id',
    asyncHandlerWrapper(async (req, res) => {
      const { id } = req.params;

      await userService.deleteUser(id);

      res.status(200).send(formatResponse());
    }),
  );

  router.get(
    '/:ids',
    asyncHandlerWrapper(async (req, res) => {
      const ids = req.params.ids.split(',');
      const { sort_by, order } = req.query;

      const users = await userService.getUsers(ids, { sort_by, order });

      res.status(200).json(formatResponse(users));
    }),
  );

  return router;
};

module.exports = createUsersRouter;
