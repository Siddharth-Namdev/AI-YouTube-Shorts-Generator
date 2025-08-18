import { v } from "convex/values";
import { mutation } from "./_generated/server";

// mutation is use for create,update,delete user
export const createNewUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    pictureURL: v.string(),
  },

  handler: async (ctx, args) => {
    //if User Already Exist
    const user = await ctx.db // this user give a list of info of user , like name , mail ....
      .query("users") // query is use for fetch data
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

    if (!user[0]?.email) {
      // if user is not , insert a user
      const result = await ctx.db.insert("users", {
        name: args.name,
        email: args.email,
        pictureURL: args?.pictureURL,
        credits: 10, // user can generate 10 video free
      });
      return result;
    }
    return user[0];
  },
});
