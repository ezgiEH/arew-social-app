import { useEffect, useState } from "react";
import Card from "./Card";
import FriendInfo from "./FriendInfo";
import PostCard from "./PostCard";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export default function ProfileContent({activeTab,userId}) {

    const [posts,setPosts] = useState([]);
    const [profile, setProfile] = useState(null);
    const supabase = useSupabaseClient();


    useEffect(() => {
      if (!userId) {
        return
      }
      if (activeTab === 'posts') {
        loadPosts().then(() => {});
      }
    }, [userId])
  
    async function loadPosts() {
      const posts = await userPosts(userId)
      const profile = await userProfile(userId)
      setPosts(posts)
      setProfile(profile)
    }
  
    async function userPosts(userId) {
      const {data} = await supabase.from('posts')
        .select('id, content, created_at, author')
        .eq('author', userId)
        .order('created_at', { ascending: false })
      return data
    }
  
    async function userProfile(userId) {
      const {data} = await supabase.from('profiles')
        .select()
        .eq('id', userId)
        
      return data?.[0]
    }
    
    return (
        <div>
             {/* POST SECTION */}
             {activeTab === 'posts' && (
                    <div>
                    {posts?.length > 0 && posts.map(post => (
                      <PostCard key={post.created_at} {...post} profiles={profile} />
                    ))}
                  </div>
                )}
                {/* POST SECTION */}

                {/* ABOUT SECTION */}
                {activeTab === 'about' && (
                    <div>
                        <Card>
                            <h2 className="text-3xl mb-2">About Me</h2>
                            <p className="mb-2 text-sm">Lorem ipsum</p>
                            <p className="mb-2 text-sm">Lorem ipsum</p>
                        </Card>
                    </div>
                )}
                {/* ABOUT SECTION */}

                {/* FRIENDS SECTION */}
                {activeTab === 'friends' && (
                    <div>
                        <Card>
                            <h2 className="text-3xl mb-2">Friends</h2>
                            <div className="">
                                <div className="border-b border-b-gray-100 p-4 -mx-4">
                                    <FriendInfo />
                                </div>
                                <div className="border-b border-b-gray-100 p-4 -mx-4">
                                    <FriendInfo />
                                </div>
                                <div className="border-b border-b-gray-100 p-4 -mx-4">
                                    <FriendInfo />
                                </div>
                                <div className="border-b border-b-gray-100 p-4 -mx-4">
                                    <FriendInfo />
                                </div>
                                <div className="border-b border-b-gray-100 p-4 -mx-4">
                                    <FriendInfo />
                                </div>
                                <div className="border-b border-b-gray-100 p-4 -mx-4">
                                    <FriendInfo />
                                </div>
                                <div className="border-b border-b-gray-100 p-4 -mx-4">
                                    <FriendInfo />
                                </div>
                            </div>
                        </Card>
                    </div>
                )}
                {/* FRIENDS SECTION */}
                {/* PHOTOS SECTION */}
                {activeTab === 'photos' && (
                    <div>
                        <Card>
                            <h2 className="text-3xl mb-2">Photos <span className="text-sm">(4)</span></h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="rounded-md overflow-hidden h-48 flex items-center justify-center shadow-md">
                                    <img src="https://images.unsplash.com/photo-1685370851243-4b61da3b6015?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"></img>
                                </div>
                                <div className="rounded-md overflow-hidden h-48 flex items-center justify-center shadow-md">
                                    <img src="https://images.unsplash.com/photo-1682687982049-b3d433368cd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"></img>
                                </div>
                                <div className="rounded-md overflow-hidden h-48 flex items-center justify-center shadow-md">
                                    <img src="https://images.unsplash.com/photo-1682685796467-89a6f149f07a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"></img>
                                </div>
                                <div className="rounded-md overflow-hidden h-48 flex items-center justify-center shadow-md">
                                    <img src="https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"></img>
                                </div>
                            </div>
                        </Card>
                    </div>
                )}
                {/* PHOTOS SECTION */}
        </div>
    )
}