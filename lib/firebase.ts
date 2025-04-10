import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  StorageError,
  uploadBytesResumable
} from 'firebase/storage'

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID
}

// Initialize Firebase only if no apps exist
if (getApps().length === 0) {
  initializeApp(firebaseConfig)
}

// Get Firebase instances
const app = getApp()
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

interface UploadResponse {
  downloadUrl: string
  metadata: any
  fullPath: string
}

interface UploadOptions {
  contentType?: string
  customMetadata?: { [key: string]: string }
}

// Upload utility function with progress tracking and improved error handling
const uploadToFirebase = async (
  uri: string,
  path: string,
  onProgress?: (progress: number) => void,
  options?: UploadOptions
): Promise<UploadResponse> => {
  try {
    const fetchResponse = await fetch(uri)
    const theBlob = await fetchResponse.blob()

    // Create storage reference
    const imageRef = ref(storage, path)

    // Create file metadata including the content type
    const metadata = {
      contentType: options?.contentType || 'image/jpeg',
      customMetadata: options?.customMetadata
    }

    // Upload the blob
    const uploadTask = uploadBytesResumable(imageRef, theBlob, metadata)

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          onProgress && onProgress(progress)

          // Log state changes
          console.log('Upload state:', snapshot.state)
        },
        (error: StorageError) => {
          // Handle unsuccessful uploads
          console.error('Upload error:', {
            code: error.code,
            message: error.message,
            serverResponse: error.serverResponse
          })

          let errorMessage = 'Failed to upload file.'
          switch (error.code) {
            case 'storage/unauthorized':
              errorMessage =
                'User does not have permission to access the object.'
              break
            case 'storage/canceled':
              errorMessage = 'User canceled the upload.'
              break
            case 'storage/unknown':
              errorMessage =
                'Unknown error occurred, inspect error.serverResponse'
              break
          }

          reject(new Error(errorMessage))
        },
        async () => {
          try {
            const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref)
            resolve({
              downloadUrl,
              metadata: uploadTask.snapshot.metadata,
              fullPath: uploadTask.snapshot.ref.fullPath
            })
          } catch (error) {
            reject(error)
          }
        }
      )
    })
  } catch (error) {
    console.error('Error preparing upload:', error)
    throw error
  }
}

// Delete file utility
const deleteFile = async (path: string): Promise<void> => {
  const fileRef = ref(storage, path)
  try {
    await deleteObject(fileRef)
  } catch (error) {
    console.error('Error deleting file:', error)
    throw error
  }
}

export { app, auth, db, deleteFile, storage, uploadToFirebase }
