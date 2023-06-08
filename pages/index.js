import Layout from '@/components/Layout'
import PostCard from '@/components/PostCard'
import PostFormCard from '@/components/PostFormCard'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import LoginPage from './login'
import { useEffect, useState } from 'react'
import { UserContext } from '@/contexts/userContext'



export default function Home() {
  const session = useSession()
  const [posts, setPosts] = useState()
  const supabase = useSupabaseClient()
  const [profile, setProfile] = useState(null)

  useEffect(() =>{
    fetchPosts()
  })

  useEffect(()=>{
    if(!session?.user?.id){
      return
    }
    supabase.from('profiles')
        .select()
        .eq('id',session.user.id)
        .then(result=>{
            if(result.data.length){
                setProfile(result.data[0])
            }
        })
  },[session?.user?.id])

async function fetchPosts() {
  const { data } = await supabase
    .from('posts')
    .select(`
      id,
      content,
      created_at,
      photos,
      profiles (
        id,
        avatar,
        name
      )
    `)
    .order('created_at', { ascending: false })
  setPosts(data)
}

  if(!session){
    return <LoginPage/>
  }

  return (
    <Layout>
      <UserContext.Provider value={{profile:profile}}>
        <PostFormCard onPost={fetchPosts} />
        {posts?.map(post => (
          <PostCard key={post.created_at} {...post} />
        ))}
      </UserContext.Provider>
    </Layout>
  )
}
