
export async function uploadUserProfileImage(supabase, userId, file, bucket, profileColumn) {
  // Generate a new name for the file using the current timestamp and the original file name
  const newName = Date.now() + file.name;
  
  // Upload the file to the specified bucket in Supabase storage
  const { data, error } = await supabase.storage.from(bucket).upload(newName, file);
  
  // If there was an error uploading the file, throw the error
  if (error) throw error;
  
  // If the upload was successful, update the user's profile with the new image URL
  if (data) {
    // Construct the public URL for the uploaded file using the Supabase URL and the bucket and path from the upload result
    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${data.path}`;
    
    // Update the user's profile with the new image URL using the Supabase client object and the provided profile column name
    const result = await supabase.from('profiles')
      .update({ [profileColumn]: url })
      .eq('id', userId);
      
    // If there was an error updating the user's profile, throw the error
    if (result.error) throw result.error;
    
    // If the update was successful, return a resolved Promise
    return Promise.resolve();
  }
}
