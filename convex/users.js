import { v } from "convex/values";
import { mutation } from "./_generated/server";

  // mutation is use for create,update,delete user
export const createNewUser = mutation({
    args:{
        name:v.string(),
        email:v.string(),
        pictureURL:v.string()
    }

});
