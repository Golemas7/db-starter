export function adaptNpmRegistryPackage(response) {
  const { homepage, name, description, time, keywords } = response;
  return {
    homepage,
    name,
    description,
    keywords,
    creationTime: time?.created,
  };
}
