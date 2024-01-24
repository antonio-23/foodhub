import { ImagePickerAsset } from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { decode } from "base64-arraybuffer";

import supabase from "../services/supabase";

/**
 * Function to send a photo to supabase storage and return the public URL of the photo
 * @param {ImagePickerAsset} img
 * @param [fileName]
 * @returns photoUrl
 */
export const uploadImageToSupabase = async (
  img: ImagePickerAsset,
  fileName?: string,
) => {
  const slug = convertSentenceToSlug(fileName);

  const fileExtension = img.uri.split(".").pop();
  if (!fileExtension) {
    throw new Error("Unable to determine the file extension.");
  }

  const encodedImage = await FileSystem.readAsStringAsync(img.uri, {
    encoding: "base64",
  });
  const filePath = `${slug}-${new Date().getTime()}.${fileExtension}`;
  const mimeType = getMimeType(fileExtension);
  await supabase.storage
    .from("recipe_photo")
    .upload(filePath, decode(encodedImage), {
      contentType: mimeType,
    });

  const photoUrl = await generateSignedUrl(filePath);

  return photoUrl;
};

// Funkcja pomocnicza do wyciągnięcia typu pliku
const getMimeType = (fileExt: string): string => {
  const mimeTypes: { [key: string]: string } = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
  };
  return mimeTypes[fileExt.toLowerCase()] || "application/octet-stream";
};

// Funkcja tworząca slug, np: "jakas-nazwa-przepisu"
const convertSentenceToSlug = (sentence?: string): string => {
  if (sentence) {
    return sentence
      .replace(/[^a-zA-Z0-9]/g, " ")
      .trim()
      .replace(/\s+/g, " ")
      .replace(/\s/g, "-")
      .toLowerCase();
  } else {
    return "recipe-photo";
  }
};

// Nasz bucket z plikami jest prywatny to trzeba dla każdego pliku ogarnąć token
const generateSignedUrl = async (filePath: string) => {
  // Ustawienie czasu ważności tokenu - na 3 lata
  // 3 lata = 3 * 365 dni * 24 godziny * 60 minuty * 60 sekundy
  const expiresIn = 3 * 365 * 24 * 60 * 60;

  const { data, error } = await supabase.storage
    .from("recipe_photo")
    .createSignedUrl(filePath, expiresIn);

  if (error) {
    console.error("Error creating signed URL:", error);
    return null;
  }

  return data.signedUrl;
};
