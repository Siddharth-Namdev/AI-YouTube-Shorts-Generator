import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// this is for create a table schema in convex - > like create a schema in mongoose
export default defineSchema({  // create a table name user 
    users:defineTable({
        name:v.string(),
        email:v.string(),
        pictureURL:v.string(),
        credits:v.number()
    })
})