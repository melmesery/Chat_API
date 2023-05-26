import { roles } from "../../middleware/auth.js";

const endpoint = {
  createChat: [roles.User],
  getChat: [roles.User],
};

export default endpoint;