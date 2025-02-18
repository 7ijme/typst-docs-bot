import { REST, Routes } from "discord.js";
import "jsr:@std/dotenv/load";

// Construct and prepare an instance of the REST module
const token = Deno.env.get("TOKEN");
const clientId = Deno.env.get("CLIENT_ID");
const guildId = Deno.env.get("GUILD_ID");
if (!token) {
  throw new Error("Missing token");
}
if (!clientId) {
  throw new Error("Missing client ID");
}
if (!guildId) {
  throw new Error("Missing guild ID");
}

const rest = new REST().setToken(token);

import docs from "./commands/docs.ts";

const commands = [docs.data.toJSON()];

// and deploy your commands!
(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`,
    );

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = (await rest.put(
      Routes.applicationCommands(clientId),
      { body: commands },
    )) as Array<unknown>;

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`,
    );
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();
