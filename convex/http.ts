/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { Webhook } from "svix";
import { api, internal } from "./_generated/api";
import type { Id } from "./_generated/dataModel";

interface ClerkWebhookUserEvent {
  type: "user.created" | "user.updated" | "user.deleted";
  data: {
    id: string;
    email_addresses?: Array<{ email_address: string }>;
    first_name?: string;
    last_name?: string;
    image_url?: string;
    username?: string;
  };
}

type ClerkWebhookEvent = ClerkWebhookUserEvent;

const handleClerkWebhook = httpAction(async (ctx, request) => {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("CLERK_WEBHOOK_SECRET is not set");
    return new Response("Webhook secret not configured", { status: 500 });
  }

  // Get headers
  const svix_id = request.headers.get("svix-id");
  const svix_timestamp = request.headers.get("svix-timestamp");
  const svix_signature = request.headers.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Missing svix headers", { status: 400 });
  }

  // Get body
  const body = await request.text();

  // Verify webhook
  const wh = new Webhook(webhookSecret);
  let evt: ClerkWebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as ClerkWebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Invalid signature", { status: 400 });
  }

  const processedEvent = await ctx.runQuery(api.clerkEvents.queryEvent, {
    clerkEventId: evt.data.id,
  });
  if (processedEvent) {
    return new Response("Event already processed", { status: 200 });
  }

  await ctx.runMutation(internal.clerkEvents.handleMembershipCreated, {
    clerkEvent: {
      id: evt.data.id,
      eventType: evt.type,
      eventData: evt.data,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
  });

  //   // Handle the webhook
  const eventType = evt.type;

  try {
    switch (eventType) {
      case "user.created":
        await ctx.runMutation(api.users.createUser, {
          clerkId: evt.data.id,
          email: evt.data.email_addresses?.[0]?.email_address ?? "",
          firstName: evt.data.first_name ?? undefined,
          lastName: evt.data.last_name ?? undefined,
          imageUrl: evt.data.image_url ?? undefined,
          username: evt.data.username ?? undefined,
        });
        break;

      case "user.updated":
        await ctx.runMutation(api.users.updateUser, {
          clerkId: evt.data.id,
          email: evt.data.email_addresses?.[0]?.email_address ?? "",
          firstName: evt.data.first_name ?? undefined,
          lastName: evt.data.last_name ?? undefined,
          imageUrl: evt.data.image_url ?? undefined,
          username: evt.data.username ?? undefined,
        });
        break;

      case "user.deleted":
        await ctx.runMutation(api.users.deleteUser, {
          clerkId: evt.data.id,
        });
        break;

      default:
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        console.log(`Unhandled event type: ${eventType}`);
    }

    await ctx.runMutation(internal.clerkEvents.handleMembershipUpdated, {
      clerkEvent: {
        id: evt.data.id,
        status: "processed",
        updatedAt: Date.now(),
      },
    });

    return new Response("Webhook processed successfully", { status: 200 });
  } catch (error) {
    console.error("Error processing webhook:", error);
    await ctx.runMutation(internal.clerkEvents.handleMembershipUpdated, {
      clerkEvent: {
        id: evt.data.id,
        status: "failed",
        updatedAt: Date.now(),
      },
    });
    return new Response("Error processing webhook", { status: 500 });
  }
});

// define the http router
const http = httpRouter();

// define the webhook route
http.route({
  path: "/clerk-users-webhook",
  method: "POST",
  handler: handleClerkWebhook,
});

export default http;
