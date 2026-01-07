async function getCountries() {
  const res = await fetch("/api/country", { cache: "no-store" });
  return res.json();
}

async function getPackage(params) {
  const res = await fetch("/api/packages", { cache: "no-store" });
  return res.json();
}

async function getPackageById(id) {
  const res = await fetch(`/api/packageById?id=${id}`, { cache: "no-store" });
  return res.json();
}

async function getPackagesByCountry(countryId) {
  const res = await fetch(`/api/packagesByCountry?countryId=${countryId}`, { cache: "no-store" });
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

export default async function PackagePage({ params }) {
  const packages = await getPackage(params);

  return (
    <ul>
      {packages.map((p, i) => (
        <li key={i}>
          {p.id} - {p.countryId} - {p.title} - {p.subtitle} - {p.mainTitle} - {p.description} - {p.price} - {p.imageURL} - {p.duration} - {JSON.stringify(p.details)}
        </li>
      ))}
    </ul>
  );
}

export async function PackageDetailPage({ params }) {
  const packageData = await getPackageById(params.id);

  if (packageData.length === 0) {
    return <div>Package not found</div>;
  }

  const pkg = packageData;

  return (
    <div>
      {pkg.id} - {pkg.countryId} - {pkg.title} - {pkg.subtitle} - {pkg.mainTitle} - {pkg.description} - {pkg.price} - {pkg.imageURL} - {pkg.duration} - {JSON.stringify(pkg.details)}
    </div>
  );
}

export async function PackagesByCountryPage({ params }) {
  const packageData = await getPackagesByCountry(params.countryId);

  if (packageData.length === 0) {
    return <div>No packages found for this country</div>;
  }

  const pkg = packageData;

  return (
    <ul>
      {pkg.map((p, i) => (
        <li key={i}>
          {p.id} - {p.countryId} - {p.title} - {p.subtitle} - {p.mainTitle} - {p.description} - {p.price} - {p.imageURL} - {p.duration} - {JSON.stringify(p.details)}
        </li>
      ))}
    </ul>
  );
}