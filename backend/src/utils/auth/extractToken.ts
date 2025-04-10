export const extractTokenFromHeader = (
  authorizationHeader?: string
): string | null => {
  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return null;
  }

  return authorizationHeader.replace("Bearer ", "");
};
