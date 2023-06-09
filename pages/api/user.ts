import type { NextApiRequest, NextApiResponse } from 'next'
import { collection, addDoc, getDocs, getDoc, setDoc, doc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore"
import { db } from "lib/firebase"

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
      const userCollection = collection(db, 'users');
      const newDocRef = await addDoc(userCollection, {
        ...req.body.user,
        createdAt: serverTimestamp()
      });
      const data = { id: newDocRef.id, ...req.body.user };
      res.status(200).json(data);
    } catch (error) {
      console.error('Error adding document: ', error);
      res.status(500).end();
    }
  }

  if (req.method === 'GET') {

    if (req.query.id) {
      try {
        const userDocumentRef = collection(db, 'users', id);
      }
      catch (error) {
        console.log(error);
        res.status(500).end();
      }
    } else {
      const usersCollectionRef = collection(db, 'users');
      try {
        const querySnapshot = await getDocs(usersCollectionRef);
        const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        res.status(200).json(data);
      } catch (error) {
        console.log(error);
        res.status(500).end();
      }

    }
  }

  if (req.method === 'PUT') {
    const userDocumentRef = doc(db, "users", req.body.id);
    const newUserData = { ...req.body, updatedAt: serverTimestamp };
    try {
      await updateDoc(userDocumentRef, newUserData);
      res.status(200).end()
      console.log('成功')
    }
    catch (err) {
      console.log(err)
      res.status(500).end();
    }

  }

  if (req.method === 'DELETE') {
    const userDocumentRef = doc(db, "users", id);
    try {
      await deleteDoc(userDocumentRef);
      res.status(200).end()
      console.log('成功')
    }
    catch (err) {
      console.log(err)
      res.status(500).end()
    }
  }

}