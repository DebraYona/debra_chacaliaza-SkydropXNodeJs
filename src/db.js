const mongoose = require('mongoose');

const connectToMongo = async (uri) => {
  if (!uri) throw new Error('MongoDB url is undefined');
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.info('MongoDB connected');
};

module.exports = {
  connectToMongo,
};
