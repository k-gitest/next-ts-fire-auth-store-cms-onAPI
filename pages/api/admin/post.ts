import type { NextApiRequest, NextApiResponse } from 'next'
import { db, serverTimeStamp } from "lib/fireadmin"

type Query = {
  id: string;
  uid?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, uid } = req.query as Query;

  if (req.method === 'POST') {
    if (!req.body.post.title || !req.body.post.release) {
      res.status(400).end();
      return;
    }
    try {
      const collectionRef = db.collection('posts');
      const documentRef = collectionRef.doc(req.body.uid);
      const subCollectionRef = documentRef.collection('post');
      const docRef = subCollectionRef.doc();
      const pid = docRef.id;
      await docRef.set({ ...req.body.post, uid: req.body.uid, pid, createdAt: serverTimeStamp });
      const data = { id: docRef.id, ...req.body.post };
      res.status(200).json(data);
    } catch (error) {
      console.error('Error adding document: ', error);
      res.status(500).end()
    }
  }

  if (req.method === 'GET') {
    if (id && uid) {
      const subDocumentRef = db.collection('posts').doc(uid).collection('post').doc(id);
      try {
        const querySnapshot = await subDocumentRef.get();
        const data = querySnapshot.data()
        res.status(200).json(data)
      }
      catch (err) {
        console.log(err)
        res.status(500).end()
      }
    }
    if (id && !uid) {
      const subDocumentRef = db.collection('posts').doc(id).collection('post');
      try {
        const querySnapshot = await subDocumentRef.get();
        const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        res.status(200).json(data)
      }
      catch (err) {
        console.log(err)
        res.status(500).end()
      }
    }
    else {
      try {
        const collectionRef = db.collection('posts');
        const snapshot = await collectionRef.get();
        const promises = snapshot.docs.map(async (collec) => {
          const postSnapshot = await collectionRef.doc(collec.id).collection('post').get();
          return postSnapshot.docs.map((post) => post.data());
        });
        const results = await Promise.all(promises);
        const allData = results.flat();
        res.status(200).json(allData)
      }
      catch (err) {
        console.log(err)
        res.status(500).end()
      }
    }

  }

  if (req.method === 'PUT') {
    if (!uid) {
      res.status(400).end();
      return;
    }
    const subDocumentRef = db.collection('posts').doc(uid).collection('post').doc(req.body.pid)
    try {
      await subDocumentRef.update({ ...req.body, updatedAt: serverTimeStamp });
      res.status(200).end()
      console.log('成功')
    }
    catch (err) {
      console.log(err)
      res.status(500).end();
    }

  }

  if (req.method === 'DELETE') {
    if (uid === undefined || id === undefined) {
      res.status(400).end();
      return;
    }
    const subDocumentRef = db.collection('posts').doc(uid).collection('post').doc(id);

    try {
      await subDocumentRef.delete();
      res.status(200).end();
      console.log('成功');
    } catch (err) {
      console.log(err);
      res.status(500).end();
    }
  }



}