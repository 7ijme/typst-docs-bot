import {
  AutocompleteInteraction,
  CommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  AttachmentBuilder,
} from "discord.js";
import docs from "../docs.json" with { type: "json" };
import { Root } from "../types.d.ts";
import turndown from "npm:turndown";
const Turndown = new turndown({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
});

export default {
  data: new SlashCommandBuilder()
    .setName("docs")
    .setDescription("Gives documentation for Typst")
    .addStringOption((option) =>
      option
        .setName("query")
        .setDescription("The query to search for")
        .setAutocomplete(true)
        .setRequired(true),
    ),
  async execute(interaction: CommandInteraction) {
    const query = interaction.options.get("query")?.value as string;
    if (!query) {
      return interaction.reply("Please provide a query to search for.");
    }

    const doc = getDocs(docs as Root).find(
      (doc) => doc.title.toLowerCase() === query.toLowerCase(),
    );

    if (!doc) {
      return interaction.reply("No documentation found for that query.");
    }

    const attachments: AttachmentBuilder[] = [];
    const reg = /\!\[.+\]\((.+)\)\n*/g;
    const matches = doc.body.matchAll(reg);
    matches.forEach((match) => {
      console.log(match[1]);
      attachments.push(new AttachmentBuilder("." + match[1]));
    });
    doc.body = doc.body.replaceAll(reg, "");
    doc.body = doc.body.replaceAll("](/", "](https://typst.app/docs");
    console.log(doc.body);

    const url = `https://typst.app/docs${doc.route}`;

    const embed = new EmbedBuilder()
      .setTitle("Typst Documentation")
      .setColor(0x219dac)
      .setURL(url)
      .setDescription(
        `${doc.body.slice(0, 2045)}${doc.body.length > 2045 ? "..." : ""}`,
      );

    interaction.reply({
      embeds: [embed],
      files: attachments.slice(0, 10),
    });
  },
  async autocomplete(interaction: AutocompleteInteraction) {
    const focusedValue = interaction.options.getFocused();
    const choices = getDocs(docs as Root);

    const filtered = choices
      .filter((choice) =>
        choice.title.toLowerCase().startsWith(focusedValue.toLowerCase()),
      )
      .slice(0, 25);

    await interaction.respond(
      filtered.map((choice) => ({
        name: `${choice.title}: ${choice.description}`.slice(0, 100),
        value: choice.title,
      })),
    );
  },
};

function getDocs(
  docs: Root,
): { title: string; description: string; route: string; body: string }[] {
  const list = [];
  list.push(
    ...docs.map((doc) => [
      {
        title: doc.title,
        description: doc.description,
        route: doc.route,
        body: (doc.body.kind === "html"
          ? Turndown.turndown(doc.body.content)
          : doc.body.kind === "type"
            ? Turndown.turndown(doc.body.content.details)
            : "no"
        ).replaceAll("\n\n```", "\n\n```rs"),
      },
      ...getDocs(doc.children),
    ]),
  );

  return list.flat();
}
