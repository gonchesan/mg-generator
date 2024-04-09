const fs = require("node:fs");
const path = require("node:path");
const inquirer = require("inquirer");
const { colorize } = require("./utils");

const DIRECTORY = "./src/content";

function createTable({ title, isPrivate, description, minRead, tags }) {
  const updatedDate = new Date().toISOString();

  return `
  ---
  title: ${title}
  description: ${description}
  heroImage: '/blog-placeholder.jpg'
  updatedDate: ${updatedDate}
  tags: ${tags}
  minRead: ${minRead}
  isPrivate: ${isPrivate}
  ---
  `;
}

function slugify(string) {
  string = string.replace(/^\s+|\s+$/g, ""); // trim leading/trailing white space
  string = string.toLowerCase(); // convert string to lowercase
  string = string
    .replace(/[^a-z0-9 -]/g, "") // remove any non-alphanumeric characters
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/-+/g, "-"); // remove consecutive hyphens
  return string;
}

function generateMarkdownFile() {
  fs.readdir(DIRECTORY, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error(colorize("Error reading the directory:", err).red);
      return;
    }

    const folders = files
      .filter((file) => file.isDirectory())
      .map((file) => file.name);

    if (!folders.length) {
      console.log(colorize("No folders found in the directory.").yellow);
      return;
    }

    const questions = [
      {
        type: "list",
        name: "folder",
        message: "Choose a folder:",
        choices: folders,
      },
      {
        type: "input",
        name: "title",
        message: "Enter a name for the new file (without extension): ",
        validate(value) {
          const hasExtension = value.match(
            /\.([0-9a-z]+)(?=[?#])|(\.)(?:[\md]+)(?:[\mdx]+)$/i
          );
          if (!hasExtension) {
            return true;
          }

          return "Please enter a valid name without extension";
        },
      },
      {
        type: "input",
        name: "description",
        message: "Enter a description for the new post",
        validate(value) {
          if (value.length < 160) {
            return true;
          }

          return "Please enter a description more shorter";
        },
      },
      {
        type: "number",
        name: "minRead",
        message: "Enter an approximate reading minutes",
        default: 5,
      },
      {
        type: "checkbox",
        name: "tags",
        message: "Select tags related to the post",
        choices: [
          {
            name: "HTML",
          },
          {
            name: "CSS",
          },
          {
            name: "Javascript",
          },
          {
            name: "React",
          },
          {
            name: "Angular",
          },
          {
            name: "Astro",
          },
          {
            name: "Material UI",
          },
        ],
        default: ["other"],
      },
      {
        type: "confirm",
        name: "isPrivate",
        message: "Do you want to mark your file as private?",
        default: true,
      },
    ];

    program.action(() => {
      inquirer.prompt(questions).then((result) => {
        const { title, isPrivate, folder, description, minRead, tags } = result;

        const fileSlug = slugify(title);
        const filePath = path.join(DIRECTORY, folder, `${fileSlug}.md`);

        const content = createTable({
          title,
          isPrivate,
          description,
          minRead,
          tags,
        });

        try {
          fs.writeFileSync(filePath, content, "utf-8");
          console.log(
            colorize(
              `The file '${fileSlug}.md' has been created and saved in the folder ${DIRECTORY}/${folder}/.`
            ).green
          );
        } catch (error) {
          console.log(colorize(`Something wrong is happened: ${error}`).red);
        }
      });
    });

    program.parse(process.argv);
  });
}

module.exports = {
  generateMarkdownFile,
};
