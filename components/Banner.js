import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react"
import { useState } from "react"
import Preloader from "./Proloader"
import { uploadUserProfileImage } from "@/helpers/user"

export default function Banner({ url, editable, onChange }) {
    const supabase = useSupabaseClient()
    const [isUploading, setIsUploading] = useState(false)
    const session = useSession()

async function updateBanner(e) {
  const file = e.target.files?.[0];
  if (!file) return;

  try {
    setIsUploading(true);
    await uploadUserProfileImage(
      supabase,
      session.user.id,
      file,
      'banners',
      'banner'
    );
    if (onChange) onChange();
  } finally {
    setIsUploading(false);
  }
}

    return (
        <div className="relative h-36 overflow-hidden flex items-center justify-center ">
            {isUploading && (
                <div className="absolute flex items-center inset-0 bg-white bg-opacity-80 z-10">
                    <div className="inline-block mx-auto">
                        <Preloader />
                    </div>
                </div>
            )}
            <div>
                <img src={url ? url : "https://images.unsplash.com/photo-1477346611705-65d1883cee1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"} loading="lazy" alt="banner" referrerPolicy="no-referrer"></img>
            </div>
            {editable && (
                <div className="absolute right-0 bottom-0 m-2">
                    <label className="flex items-center gap-2 bg-white p-2 cursor-pointer rounded-full shadow-md shadow-black">
                       <input type="file" onChange={updateBanner} className="hidden"/>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                        </svg>
                    </label>
                </div>
            )}
        </div>
    )
}