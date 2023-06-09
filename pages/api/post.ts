import type { NextApiRequest, NextApiResponse } from 'next'
import { collection, addDoc, getDocs, getDoc, setDoc, doc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore"
import { db } from "lib/firebase"

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
    if (!req.body.title || !req.body.release) {
      res.status(400).end();
      return;
    }
    try {
      const collectionRef = collection(db, "posts", req.body.uid, "post")
      const docRef = doc(collectionRef);
      const pid = docRef.id;
      await setDoc(docRef, { ...req.body.post, pid, createdAt: serverTimestamp() });
      const data = { id: docRef.id, ...req.body.post };
      res.status(200).json(data);
    } catch (error) {
      console.error('Error adding document: ', error);
      res.status(500).end()
    }
  }

  if (req.method === 'GET') {
    if (id && uid) {
      const userDocumentRef = doc(db, 'posts', uid);
      const subCollectionRef = collection(userDocumentRef, 'post');
      const subDocumentRef = doc(subCollectionRef, id);
      try {
        const querySnapshot = await getDoc(subDocumentRef);
        const data = querySnapshot.data()
        res.status(200).json(data)
      }
      catch (err) {
        console.log(err)
        res.status(500).end()
      }
    } else {
      const userDocumentRef = doc(db, 'posts', id);
      const subCollectionRef = collection(userDocumentRef, 'post');
      try {
        const querySnapshot = await getDocs(subCollectionRef);
        const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        res.status(200).json(data)
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
    const userDocumentRef = doc(db, "posts", uid);
    const subCollectionRef = collection(userDocumentRef, "post");
    const subDocumentRef = doc(subCollectionRef, id);
    try {
      await updateDoc(subDocumentRef, { ...req.body, updatedAt: serverTimestamp() });
      res.status(200).end()
      console.log('成功')
    }
    catch (err) {
      console.log(err)
      res.status(500).end();
    }

  }

  if (req.method === 'DELETE') {
    if (!uid || !id) {
      res.status(400).end();
      return;
    }
    const userDocumentRef = doc(db, "posts", uid);
    const subCollectionRef = collection(userDocumentRef, 'post');
    const subDocumentRef = doc(subCollectionRef, id);

    try {
      await deleteDoc(subDocumentRef);
      res.status(200).end();
      console.log('成功');
    } catch (err) {
      console.log(err);
      res.status(500).end();
    }
  }



}