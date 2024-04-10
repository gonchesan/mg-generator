# 🌸 mind-gardens-generator

Utilize the command-line interface (CLI) to seamlessly integrate new posts into your Astro project.

## Install

```npm
npm install -g mg-generator
```

## 📝 Adding New Posts (Usage)

To add a new post, run the following command in your project folder:

```bash
mg-generator
```

Follow the instructions and this will generate a new markdown file in the `src/content/<FOLDER>`. Edit the file to add your post content.

## 🛠️ Add a command to your project

In your project built with Astro, add a new script in `package.json`

```scheme
"scripts": {
  ...
    "newpost": "mg-generator",
  },
```
