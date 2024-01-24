import * as ImagePicker from "expo-image-picker";

export const pickImage = async (
  setImage: (img: ImagePicker.ImagePickerAsset) => void,
) => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    setImage(result.assets[0]);
  }
};
