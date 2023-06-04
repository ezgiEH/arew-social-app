import Layout from '@/components/Layout'
import PostCard from '@/components/PostCard'
import PostFormCard from '@/components/PostFormCard'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import LoginPage from './login'
import { useEffect, useState } from 'react'



export default function Home() {
  const session = useSession()
  const [posts, setPosts] = useState()
  const supabase = useSupabaseClient()


  useEffect(()=>{
    supabase.from('posts')
    .select()
    .then(result =>{
      setPosts(result.data)
    })
  },[])


  if(!session){
    return <LoginPage/>
  }

  return (
    <Layout>
      <PostFormCard />
      {posts?.map(post => (
        <PostCard key={post.id} {...post} />
      ))}
    </Layout>
  )
}
