async function getCountries() {
  const res = await fetch("/api/country", { cache: "no-store" });
  return res.json();
}

export default async function Page() {
  const countries = await getCountries();

  return (
    <ul>
      {countries.map((c, i) => (
        <li key={i}>
          {c.id} - {c.name} - {c.description} - {c.imageURL}
        </li>
      ))}
    </ul>
  );
}
