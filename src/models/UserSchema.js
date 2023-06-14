const { Schema, models, model } = require('mongoose');

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },
});

const Users = models.User || model('User', UserSchema);

export default Users;
