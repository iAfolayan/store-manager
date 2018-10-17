const getMessage = () => 'Welcome to Store Manager 1.0';

const home = (req, res) => {
  res.status(200).send({
    message: getMessage()
  });
};

export default home;
