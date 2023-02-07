//checks that the req has the properis
function hasProperties(...properties) {
    return function (req, res, next) {
      const {data = {}}= req.body;
      try {
        properties.forEach((property) => {
          const value = data[property];
          if (!value) {
            const error = new Error(`A '${property}' property is required.`);
            error.status = 400;
            let message = `A '${property}' property is required.`;
            return next({status:400, message})
          }
        });
        return next();
      } catch (error) {
        next(error);
      }
    };
  }

  module.exports=hasProperties;