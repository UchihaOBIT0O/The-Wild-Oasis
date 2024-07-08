import supabase, { SUPABASE_URL } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(SUPABASE_URL);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${SUPABASE_URL}/storage/v1/object/public/cabin-images/${imageName}`;

  //1. first create cabin/ edit cabin
  let query = supabase.from("cabins");

  //A. create Cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //B. EDIT cabin
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    throw new Error("Cabin could not be deleted");
  }

  if (hasImagePath) return data;

  //2. creating success ?? upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //3. delete the cabin if there is error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}
