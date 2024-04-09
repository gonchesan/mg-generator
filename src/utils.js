const colorize = (...args) => ({
  black: `\x1b[30m${args.join(" ")}\x1b[0m`,
  red: `\x1b[31m${args.join(" ")}\x1b[0m`,
  green: `\x1b[32m${args.join(" ")}\x1b[0m`,
  yellow: `\x1b[33m${args.join(" ")}\x1b[0m`,
  blue: `\x1b[34m${args.join(" ")}\x1b[0m`,
  magenta: `\x1b[35m${args.join(" ")}\x1b[0m`,
  cyan: `\x1b[36m${args.join(" ")}\x1b[0m`,
  white: `\x1b[37m${args.join(" ")}\x1b[0m`,
});

module.exports = {
  colorize,
};
