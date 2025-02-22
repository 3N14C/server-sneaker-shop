import { z } from "zod";

export const formAddUser = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  username: z.string().min(1),
});
