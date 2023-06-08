import Layout from "@/components/Layout";
import PostCard from "@/components/PostCard";
import { UserContextProvider } from "@/contexts/userContext";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

export default function SavedPostPage() {
    const [posts, setPosts] = useState([])
    const supabase = useSupabaseClient()
    const session = useSession()

    useEffect(() => {
        if (!session?.user?.id) {
          return;
        }
        supabase
          .from('saved_posts')
          .select('post_id')
          .eq('user_id', session.user.id)
          .then(result => {
            const postsIds = result.data.map(item => item.post_id);
            supabase
              .from('posts')
              .select('*, profiles(*)').in('id', postsIds)
              .then(result => setPosts(result.data));
          });
      }, [session?.user?.id, posts]);


    return (
        <Layout>
            <UserContextProvider>
                <h1 className="text-6xl mb-4 text-gray-300">Saved Posts</h1>
                {posts?.length > 0 && posts.map(post => (
                    <div key={post.id}>
                        <PostCard {...post} />
                    </div>
                ))}
            </UserContextProvider>
        </Layout>
    )
}