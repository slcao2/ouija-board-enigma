export const controllerHandler = (promise) =>
  async (req, res, next) => {
    try {
      await promise(req, res, next);
    } catch (error) {
      return res.status(500).json({errors: error});
    }
  };
