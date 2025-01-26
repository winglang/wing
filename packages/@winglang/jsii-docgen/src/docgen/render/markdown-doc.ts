import { Language } from "../..";
import { DocsSchema } from "../schema";

/**
 * Options for defining a markdown header.
 */
export interface MarkdownHeaderOptions {
  /**
   * Title to be displayed.
   */
  readonly title?: string;

  /**
   * Superscript.
   *
   * @default - No superscript
   */
  readonly sup?: string;

  /**
   * Preformat the header.
   *
   * @default false
   */
  readonly pre?: boolean;

  /**
   * Strikethough the title.
   *
   * @default false
   */
  readonly strike?: boolean;
}

/**
 * Options for defining a markdown element.
 */
export interface MarkdownOptions {
  /**
   * Markdown header.
   *
   * @default - No header.
   */
  readonly header?: MarkdownHeaderOptions;

  /**
   * Id of the element.
   *
   * @default - The title will be used.
   */
  readonly id?: string;
}

/**
 * Markdown element.
 */
export class MarkdownDocument {
  /**
   * An empty markdown element.
   */
  public static readonly EMPTY = new MarkdownDocument();

  /**
   * Sanitize markdown reserved characters from external input.
   */
  public static sanitize(line: string): string {
    let sanitized = line.trim();

    if (line.startsWith("-")) {
      sanitized = sanitized.substring(1, line.length).trim();
    }

    // JSDoc tags that use "@" must be escaped with backticks to
    // avoid getting parsed as another JSDoc tag. Sanitize away
    // these backticks to avoid double escaping.
    if (line.startsWith("`") && line.endsWith("`")) {
      sanitized = sanitized.substring(1, line.length - 1).trim();

      // unescape < and > inside code lines
      sanitized = sanitized.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    }

    return sanitized;
  }

  /**
   * Remove newlines from markdown.
   */
  public static removeNewlines(line: string): string {
    return line.replace(/\n/g, " ");
  }

  public static bold(text: string): string {
    return `**${text}**`;
  }

  public static pre(text: string): string {
    // using <code> instead of backticks since this allows links
    return `<code>${text}</code>`;
  }

  public static italic(text: string) {
    return `*${text}*`;
  }

  private readonly _lines = new Array<string>();
  private readonly _sections = new Array<MarkdownDocument>();

  private readonly id?: string;
  private readonly header?: string;

  constructor(private readonly options: MarkdownOptions = {}) {
    this.id = options.id ?? options.header?.title;
    this.header = this.formatHeader();
  }

  /**
   * Render a docs element into the markdown.
   */
  public docs(docs: DocsSchema, language?: Language) {
    if (docs.inflight && docs.inflight !== "true") {
      const sanitized = MarkdownDocument.sanitize(docs.inflight);
      this.lines(
        MarkdownDocument.bold("Inflight client:") +
          " [" +
          sanitized +
          "](#" +
          sanitized +
          ")",
      );
      this.lines("");
    }
    if (docs.summary) {
      this.lines(MarkdownDocument.sanitize(docs.summary));
      this.lines("");
    }
    if (docs.remarks) {
      this.lines(MarkdownDocument.sanitize(docs.remarks));
      this.lines("");
    }

    if (docs.links) {
      for (const link of docs.links) {
        this.quote(`[${link}](${link})`);
      }
    }

    if (docs.example) {
      if (!language) {
        throw new Error(
          "language must be provided if docs.example has been specified",
        );
      }
      const example = new MarkdownDocument({
        id: `${this.options.id}.example`,
      });
      example.lines(MarkdownDocument.italic("Example"), "");
      example.code(language.toString(), docs.example);
      example.lines("");
      this.section(example);
    }
  }

  public table(data: string[][]) {
    const numColumns = data[0].length;
    const header = data[0];
    const rows = data.slice(1);
    this.lines("| " + header.map(this.escapePipes).join(" | ") + " |");
    this.lines("|" + " --- |".repeat(numColumns));
    for (const row of rows) {
      this.lines("| " + row.map(this.escapePipes).join(" | ") + " |");
    }
    this.lines("");
  }

  public quote(line: string) {
    this.lines(`> ${line}`);
    this.lines("");
  }

  public title(line: string, headerSize: number) {
    this.lines(`${"#".repeat(headerSize)} ${line}`);
    this.lines("");
  }

  public bullet(line: string) {
    this.lines(`- ${line}`);
  }

  public code(language: string, ...snippet: string[]) {
    this.lines(
      `\`\`\`${language}`,
      ...snippet.map((s) => s.replace(/&lt;/g, "<").replace(/&gt;/g, ">")),
      "```",
    );
    this.lines("");
  }

  public lines(...lines: string[]) {
    this._lines.push(...lines);
  }

  public split() {
    this.lines("---");
    this.lines("");
  }

  public section(section: MarkdownDocument) {
    this._sections.push(section);
  }

  public render(headerSize: number = 0): string {
    const content: string[] = [];

    if (this.header) {
      if (headerSize > 6) {
        // headers are mapped to `h1-h6` html elements.
        // passed that, markdown just renders `#` signs.
        // lets see if and when we'll hit this limit.
        throw new Error("Unable to render markdown. Header limit (6) reached.");
      }

      const heading = `${"#".repeat(headerSize)} ${this.header}`;

      // temporary hack to avoid breaking Construct Hub
      const headerSpan = !!process.env.HEADER_SPAN;
      if (headerSpan) {
        content.push(
          `${heading} <span data-heading-title="${this.options.header?.title}" data-heading-id="${this.id}"></span>`,
        );
      } else {
        content.push(
          `${heading} <a name="${this.options.header?.title}" id="${this.id}"></a>`,
        );
      }
      content.push("");
    }

    for (const line of this._lines) {
      content.push(`${line}`);
    }

    for (const section of this._sections) {
      content.push(section.render(headerSize + 1));
    }
    return content.join("\n");
  }

  private formatHeader(): string | undefined {
    if (!this.options.header?.title) {
      return undefined;
    }
    let caption = this.options.header.title;

    if (this.options.header?.pre ?? false) {
      caption = `\`${caption}\``;
    }

    if (this.options.header?.strike ?? false) {
      caption = `~~${caption}~~`;
    }

    if (this.options.header?.sup) {
      caption = `${caption}<sup>${this.options.header?.sup}</sup>`;
    }

    return caption;
  }

  private escapePipes(line: string): string {
    return line.replace(/\|/g, "\\|");
  }
}
