import { createUserService } from '@services/SignUpServices';
import connectMongo from 'src/database/config';

export default async function handler(req, res) {
  connectMongo().catch((error) => res.json({ error }));

  if (req.method === 'POST') {
    if (!req.body) {
      res.status(404).json({ error: "Don't Have Form Data" });
    }

    const { username, email, password } = req.body;
    try {
      const result = await createUserService(email, username, password);
      if (result) {
        return res.status(200).json({ message: true });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: error, message: 'Internal server error' });
    }
  }
}
