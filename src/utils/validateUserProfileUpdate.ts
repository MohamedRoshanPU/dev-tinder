export const validateUserProfileUpdate = (data: Record<string, unknown>) => {
  const validGenders = ["male", "female", "others"];
  if (
    data.hasOwnProperty("gender") &&
    !validGenders.includes(data.gender as string)
  ) {
    throw new Error("please enter a valid gender");
  }
  if (data.hasOwnProperty("skills")) {
    if (!Array.isArray(data.skills)) {
      throw new Error("Incorrect format to sent skills");
    }
    const isValidSkills = data.skills.every(
      (skill: string) => typeof skill === "string"
    );
    if (!isValidSkills) {
      throw new Error("Invalid skill");
    }
  }
};
