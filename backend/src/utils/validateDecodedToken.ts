interface DecodedToken {
  id: number;
  email: string;
}

export const isValidDecodedToken = (decoded: any): decoded is DecodedToken => {
  return (
    decoded &&
    typeof decoded.id === "number" &&
    typeof decoded.email === "string"
  );
};
