async function main() {
  console.log("Hello From JavaScript!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
