import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";

async function uploadFile(file, id) {
  const fileType = file.type.split("/")[0];
  const folder = fileType === "application" ? "documents" : "images";
  const storageRef = ref(storage, `${folder}/${id}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
}

export default uploadFile;
