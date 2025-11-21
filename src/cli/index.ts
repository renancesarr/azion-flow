import { banner } from "./banner";
import { bootstrap } from "./bootstrap";
import { routeCommand } from "./router";

async function main(): Promise<void> {
  console.log(banner());
  await bootstrap();
  const args = process.argv.slice(2);
  await routeCommand(args);
}

main();
