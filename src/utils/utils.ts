export const removeUnwantedData = (
  data: Record<string, unknown>,
  keysToPersist: string[]
) => {
  let updatedData = { ...data };

  Object.keys(data).forEach((key: string) => {
    if (!keysToPersist.includes(key)) {
      delete updatedData[key];
    }
  });

  return updatedData;
};
