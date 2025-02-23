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
import Fuse from "fuse.js";

const allDocs = getDocs(docs as Root);

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
      return await interaction.reply("Please provide a query to search for.");
    }

    const doc = allDocs.find(
      (doc) => doc.title.toLowerCase() === query.toLowerCase(),
    );

    if (!doc) {
      return await interaction.reply("No documentation found for that query.");
    }

    let attachments: AttachmentBuilder[] = [];
    const reg = /\!\[.+\]\((.+)\)\n*/g;
    const matches = doc.body.matchAll(reg);
    matches.forEach((match) => {
      attachments.push(
        new AttachmentBuilder("." + match[1], {
          name: match[1].substring(8) as string,
        }),
      );
    });
    attachments = attachments.slice(0, 10);
    doc.body = doc.body.replaceAll(reg, "");
    doc.body = doc.body.replaceAll("](/", "](https://typst.app/docs");

    const url = `https://typst.app/docs${doc.route}`;

    const embeds: EmbedBuilder[] = [];
    embeds.push(
      new EmbedBuilder()
        .setTitle("Typst Documentation")
        .setColor(0x219dac)
        .setURL(url)
        .setDescription(
          `${doc.body.slice(0, 2045)}${doc.body.length > 2045 ? "..." : ""}`,
        ),
    );
    for (const attachment of attachments) {
      embeds.push(
        new EmbedBuilder()
          .setURL(url)
          .setImage(`attachment://${attachment.name}`),
      );
    }

    await interaction.reply({
      embeds,
      files: attachments,
    });
  },
  async autocomplete(interaction: AutocompleteInteraction) {
    const focusedValue = interaction.options.getFocused();
    const choices = allDocs;

    const filtered = new Fuse(choices, {
      keys: ["title", "description"],
      includeScore: true,
    })
      .search(focusedValue)
      .sort((a, b) => (a.score ?? 0) - (b.score ?? 0))
      .map((i) => i.item)
      .slice(0, 25);

    if (filtered.length === 0) {
      filtered.push(allDocs[0]);
    }

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
          : Turndown.turndown(doc.body.content.details)
        ).replaceAll("\n\n```", "\n\n```rs"),
      },
      ...getDocs(doc.children),
    ]),
  );

  return list.flat();
}
