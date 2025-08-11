import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  clerkUsers: defineTable({
    clerkId: v.string(),
    email: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    username: v.optional(v.string()),
    searchIndex: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_email", ["email"])
    .searchIndex("by_search_index", {
      searchField: "searchIndex",
    }),
  clerkEvents: defineTable({
    clerkEventId: v.string(),
    eventType: v.string(),
    eventData: v.any(),
    createdAt: v.optional(v.number()),
    status: v.union(
      v.literal("pending"),
      v.literal("processed"),
      v.literal("failed"),
    ),
    updatedAt: v.optional(v.number()),
  })
    .index("by_event_type", ["eventType"])
    .index("by_clerk_event_id", ["clerkEventId"]),
});

// Add a new table for sharing reviews with non-registered users
