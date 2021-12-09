import { NextApiRequest, NextApiResponse } from "next";

export default (request: NextApiRequest, response: NextApiResponse) => {
  const users = [
    { id: 1, name: "Luiz" },
    { id: 2, name: "Eduardo" },
    { id: 3, name: "Dudu" },
  ];

  return response.json(users);
};
