import { Client, Events, GatewayIntentBits } from "discord.js";
import "jsr:@std/dotenv/load";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (readyClient: Client<true>) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

import docs from "./commands/docs.ts";

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isAutocomplete()) {
    if (interaction.commandName === "docs") {
      await docs.autocomplete(interaction);
    }
  }

  if (!interaction.isCommand()) return;

  const { commandName } = interaction;
  if (commandName === "docs") {
    await docs.execute(interaction);
  }
});

// Log in to Discord with your client's token
client.login(Deno.env.get("TOKEN"));
