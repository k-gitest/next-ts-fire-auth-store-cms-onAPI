import type { NextApiRequest, NextApiResponse } from 'next'
import { db, serverTimeStamp } from "lib/fireadmin"

type Query = {
  id: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query as Query;

  if (req.method === 'POST') {
    try {
      const userCollection = db.collection('users');
      const userDocument = userCollection.doc(req.body.uid)
      const newDocRef = await userDocument.set({
        ...req.body.user,
        createdAt: serverTimeStamp
      });
      const data = { newDocRef };
      res.status(200).json(data);
    } catch (error) {
      console.error('Error adding document: ', error);
      res.status(500).end();
    }
  }

  if (req.method === 'GET') {

    if (req.query.id) {
      try {
        const userDocumentRef = db.collection('users').doc(id);
        const documentSnapshot = await userDocumentRef.get();
        const data = { ...documentSnapshot.data() };
        res.status(200).json(data);
      }
      catch (error) {
        console.log(error);
        res.status(500).end();
      }
    } else {
      const usersCollectionRef = db.collection('users');
      try {
        const querySnapshot = await usersCollectionRef.get();
        const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        res.status(200).json(data);
      } catch (error) {
        console.log(error);
        res.status(500).end();
      }

    }
  }

  if (req.method === 'PUT') {
    const userCollectionRef = db.collection('users')
    const userDocumentRef = userCollectionRef.doc(req.body.id);
    const newUserData = { ...req.body, updatedAt: serverTimeStamp };
    try {
      await userDocumentRef.update(newUserData);
      res.status(200).end()
      console.log('成功')
    }
    catch (err) {
      console.log(err)
      res.status(500).end();
    }

  }

  if (req.method === 'DELETE') {
    const userDocumentRef = db.collection('users').doc(id);
    try {
      await userDocumentRef.delete();
      res.status(200).end()
      console.log('成功')
    }
    catch (err) {
      console.log(err)
      res.status(500).end()
    }
  }

}