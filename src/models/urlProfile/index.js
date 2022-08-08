import schema from 'schm';

const urlProfile = schema({
  raw       : { type: String, required: true },
  profileVar: { type: String, required: true }
});



export default urlProfile;