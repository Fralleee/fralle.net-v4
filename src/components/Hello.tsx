export function Hello({ name = "world" }: { name?: string }) {
  return <p>hello {name}</p>;
}
