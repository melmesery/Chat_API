import { roles } from "../../middleware/auth.js";

const endpoint = {
  profile: [roles.User],
};

export default endpoint;
