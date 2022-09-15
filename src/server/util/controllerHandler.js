const MYSQL_ER_NO_REFERENCED_ROW_2 = 1452;

const controllerHandler = (promise) =>
  async (req, res, next) => {
    try {
      await promise(req, res, next);
    } catch (error) {
      if (error.errno === MYSQL_ER_NO_REFERENCED_ROW_2) {
        return res.status(422).json({errors: error});
      }
      return res.status(500).json({errors: error});
    }
  };

module.exports = {
  controllerHandler,
};
