import * as v from "valibot";

export const CreadentialsSchema = v.object({
  email: v.pipe(v.string(), v.email()),
  password: v.string(),
});
