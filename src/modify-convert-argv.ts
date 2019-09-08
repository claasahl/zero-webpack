import { readFileSync } from "fs";

export const patch = (content: string) => {
  // match: function processConfiguredOptions() {....}
  const regex = /^([ \t]*)function processConfiguredOptions\([^{]+{(\n[^\n]*)+?\n\1}\n/gm;

  return content.replace(regex, (match) => {
    const hookedFunction = readFileSync(require.resolve("./process-configured-options"));

    // rename original function: processConfiguredOptions => $processConfiguredOptions
    // inject customized function processConfiguredOptions from ./process-configured-options
    return hookedFunction + match.replace(/processConfiguredOptions/g, "$processConfiguredOptions");
  });
};
