import Avatar from "@/components/Avatar";
import Banner from "@/components/Banner";
import Card from "@/components/Card";
import Layout from "@/components/Layout";
import ProfileContent from "@/components/PorfileContent";
import ProfileTabs from "@/components/ProfileTabs";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ProfilePage() {
    const router = useRouter()
    const userId = router.query.id
    const [profile, setProfile] = useState(null)
    const [editMode, setEditMode] = useState(false)
    const [name, setName] = useState('')
    const [place, setPlace] = useState('')
    const session = useSession()
    const isMyUser = userId === session?.user?.id
    const supabase = useSupabaseClient()

    const tab = router?.query.tab?.[0] || 'posts'


    useEffect(() => {
        if (!userId) {
            return
        } else {
            fetchUser()
        }
    }, [userId])

    async function fetchUser() {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select()
                .eq('id', userId)
            if (error) {
                throw error
            }
            if (data) {
                setProfile(data[0])
            }
        } catch (error) {
            console.error(error)
        }
    }

    function saveProfile() {
        supabase.from('profiles')
            .update({
                name: name,
                place: place
            })
            .eq('id', session?.user?.id)
            .then((result) => {
                if (!result.error) {
                    setProfile(prev => ({ ...prev, name, place }))
                }
                setEditMode(false)
            })
    }


  

    return (
        <div >
            <Layout>
                <Card noPadding={true}>
                    <div className="relative overflow-hidden rounded-md">
                        <Banner url={profile?.banner} editable={isMyUser} onChange={fetchUser()} />
                        <div className="absolute top-24 left-4 z-20">
                            {profile && (
                                <Avatar size={'lg'} url={profile.avatar} editable={isMyUser} />
                            )}
                        </div>
                        <div className="p-4 pt-0 md:pt-4 pb-0">
                            {/* Name & City */}
                            <div className="flex justify-between items-start ml-32 md:ml-40">
                                <div>
                                    {/* Name */}
                                    {editMode && (
                                        <div>
                                            <input type="text"
                                                className="border py-2 px-3 rounded-md"
                                                placeholder="Your name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>
                                    )}
                                    {!editMode && (
                                        <h1 className="text-2xl md:text-3xl font-bold">
                                            {profile?.name}
                                        </h1>
                                    )}
                                    {/* Name */}

                                    {/* Place */}
                                    {editMode && (
                                        <div>
                                            <input type="text"
                                                className="border py-2 px-3 rounded-md mt-1"
                                                placeholder="Your Location"
                                                value={place}
                                                onChange={(e) => setPlace(e.target.value)}
                                            />
                                        </div>
                                    )}
                                    {!editMode && (
                                        <div className="text-gray-500 leading-4">
                                            {profile?.place || 'From Mars!'}
                                        </div>
                                    )}
                                    {/* Place */}

                                </div>
                                <div className="flex gap-1 ">
                                    {isMyUser && !editMode && (
                                        <button
                                            onClick={() => {
                                                setEditMode(true)
                                                setName(profile?.name)
                                                setPlace(profile?.place)
                                            }}
                                            className="flex gap-1 items-center py-1 px-2 cursor-pointer shadow-sm shadow-gray-400 rounded-md">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                            </svg>
                                            edit
                                        </button>
                                    )}
                                    {isMyUser && editMode && (
                                        <button onClick={() => { saveProfile() }}
                                            className="flex gap-1 text-green-500 items-center py-1 px-2 cursor-pointer shadow-sm shadow-gray-400 rounded-md">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                            save
                                        </button>
                                    )}
                                    {isMyUser && editMode && (
                                        <button onClick={() => setEditMode(false)}
                                            className="flex gap-1 text-red-500 items-center py-1 px-2 cursor-pointer shadow-sm shadow-gray-400 rounded-md">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            </div>
                            {/* Name & City */}

                            {/* Info Buttons */}
                                <ProfileTabs active={tab} userId={profile?.id}/>
                            {/* Info Buttons */}
                        </div>
                    </div>
                </Card>
               <ProfileContent activeTab={tab} userId={profile?.id}/>
            </Layout>
        </div>
    )
}