import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/database';
import {
  collection,
  doc,
  addDoc,
  getDoc,
  deleteDoc,
  getDocs,
  updateDoc,
  QuerySnapshot,
  CollectionReference,
  DocumentData,
  DocumentSnapshot,
  DocumentReference,
} from "firebase/firestore";

//#region Firebase creds and main variables
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSANGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app: firebase.app.App = firebase.initializeApp(firebaseConfig);
const db: firebase.firestore.Firestore = app.firestore();
//#endregion

//#region Work with Firestore
async function getCollection(
  collectionName: string
): Promise<DocumentData[]> {
  try {
    const querySnapshot: QuerySnapshot = await getDocs(collection(db,
      collectionName));

    const data: DocumentData[] = [];

    querySnapshot.forEach((document) => {
      data.push({
        idPost: document.id,
        ...document.data(),
      });
    });

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

async function getDocInCollection(
  collectionName: string,
  documentId: string,
) {
  try {
    const documentRef = doc(db, collectionName, documentId);
    const documentSnapshot: DocumentSnapshot = await getDoc(documentRef);
    const documentData = documentSnapshot.data();

    return documentData;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

async function setDocumentToCollection(
  collectionName: string,
  newDocument: object,
): Promise<any> {
  try {
    const collectionRef: CollectionReference = collection(db, collectionName);
    const saveResult: DocumentData = await addDoc(collectionRef, newDocument);

    await updateFieldInDocumentInCollection(collectionName, saveResult.id,
      'id', saveResult.id);

    return saveResult.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

async function deleteDocumentFromCollectionWithID (
  collectionName: string,
  documentId: string
): Promise<any> {
  try {
    const result = await deleteDoc(doc(db, collectionName, documentId));

    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

async function updateFieldInDocumentInCollection(
  collectionName: string,
  documentId: string,
  fieldName: string,
  newValue: any): Promise<any> {
  try {
    const documentRef: DocumentReference = doc(db, collectionName, documentId);
    const result = await updateDoc(documentRef, { [fieldName]: newValue });

    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
//#endregion

export const firebaseService = {
  getCollection,
  getDocInCollection,
  setDocumentToCollection,
  deleteDocumentFromCollectionWithID,
  updateFieldInDocumentInCollection,
}
