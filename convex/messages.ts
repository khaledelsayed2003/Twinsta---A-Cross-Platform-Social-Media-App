import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

// Mutation to send a message
export const sendMessage = mutation({
  args: {
    senderId: v.id("users"),
    recipientId: v.id("users"),
    content: v.string(),
    postId: v.optional(v.id("posts")), 
  },
  handler: async (ctx, { senderId, recipientId, content, postId }) => {
    await ctx.db.insert("messages", {
      senderId,
      recipientId,
      content,
      postId, 
      timestamp: Date.now(),
    });
  },
});

// Query to fetch messages between two users
export const getMessages = query({
  args: {
    senderId: v.id("users"),
    recipientId: v.id("users"),
  },
  handler: async (ctx, { senderId, recipientId }) => {
    const messages = await ctx.db.query("messages").collect();
    return messages.filter(
      (msg) =>
        (msg.senderId === senderId && msg.recipientId === recipientId) ||
        (msg.senderId === recipientId && msg.recipientId === senderId)
    ).sort((a, b) => a.timestamp - b.timestamp);
  },
});

// Query to fetch all conversations for a user
export const getConversations = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    const messages = await ctx.db.query("messages").collect();
    const userMessages = messages.filter(
      (msg) => msg.senderId === userId || msg.recipientId === userId
    );

    // Use a sorted key of both user IDs to group conversations
    const conversations: Record<string, any> = {};
    userMessages.forEach((msg) => {
      const ids = [msg.senderId, msg.recipientId].sort();
      const convoKey = ids.join("_");
      const partnerId = ids[0] === userId ? ids[1] : ids[0];
      if (
        !conversations[convoKey] ||
        msg.timestamp > conversations[convoKey].lastMessage.timestamp
      ) {
        conversations[convoKey] = { lastMessage: msg, partnerId };
      }
    });

    const sortedConversations = Object.values(conversations).sort(
      (a: any, b: any) => b.lastMessage.timestamp - a.lastMessage.timestamp
    );

    const conversationsWithDetails = await Promise.all(
      sortedConversations.map(async (convo: any) => {
        const partner = await ctx.db.get(convo.partnerId) as { username?: string; imageUrl?: string } | null;
        return {
          partnerId: convo.partnerId,
          partnerUsername: partner?.username || "Unknown User",
          partnerImage: partner?.imageUrl || "",
          lastMessageContent: convo.lastMessage.content,
          lastMessageTimestamp: convo.lastMessage.timestamp,
        };
      })
    );

    return conversationsWithDetails;
  },
});

// Query to get Convex user by Clerk ID
export const getUserByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, { clerkId }) => {
    return await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", clerkId))
      .unique();
  },
});

