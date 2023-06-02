import Avatar from "@/components/Avatar";
import Card from "@/components/Card";
import FriendInfo from "@/components/FriendInfo";
import Layout from "@/components/Layout";
import PostCard from "@/components/PostCard";
import Link from "next/link";
import { useRouter } from "next/router";

export default function ProfilePage() {
    const router = useRouter()
    const { asPath: pathname } = router
    const isPosts = pathname.includes('posts') || pathname === '/profile'
    const isAbout = pathname.includes('about')
    const isFriends = pathname.includes('friends')
    const isPhotos = pathname.includes('photos')

    const tabClasses = 'flex gap-1 px-3 py-1 items-center border-b-4 border-b-white'
    const activeTabClasses = 'flex gap-1 px-3 py-1 items-center border-b-4 border-socialBlue text-socialBlue font-bold'

    return (
        <div >
            <Layout>
                <Card noPadding={true}>
                    <div className="relative">
                        <div className="h-36 overflow-hidden flex items-center justify-center">
                            <img src="https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"></img>
                        </div>
                        <div className="absolute top-24 left-4">
                            <Avatar size={'lg'} />
                        </div>
                        <div className="p-4 pt-0 md:pt-4 pb-0">
                            {/* Name & City */}
                            <div className="ml-24 md:ml-40">
                                <h1 className="text-3xl font-bold">
                                    Ezgi Hocaoğlu
                                </h1>
                                <div className="text-gray-500 leading-4">
                                    Adana, Turkey
                                </div>
                            </div>
                            {/* Name & City */}

                            {/* Info Buttons */}
                            <div className="mt-4 md:mt-10 flex gap-1">
                                <Link href={'/profile/posts'} className={isPosts ? activeTabClasses : tabClasses}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                    </svg>
                                    <span className="hidden sm:block">Posts</span>
                                </Link>
                                <Link href={'/profile/about'} className={isAbout ? activeTabClasses : tabClasses}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                    </svg>
                                    <span className="hidden sm:block">About</span>
                                </Link>
                                <Link href={'/profile/friends'} className={isFriends ? activeTabClasses : tabClasses}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                    </svg>
                                    <span className="hidden sm:block">Friends</span>
                                </Link>
                                <Link href={'/profile/photos'} className={isPhotos ? activeTabClasses : tabClasses}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                                    </svg>
                                    <span className="hidden sm:block">Photos</span>
                                </Link>
                            </div>
                            {/* Info Buttons */}
                        </div>
                    </div>
                </Card>
                {/* POST SECTION */}
                {isPosts && (
                    <div>
                        <PostCard />
                    </div>
                )}
                {/* POST SECTION */}

                {/* ABOUT SECTION */}
                {isAbout && (
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
                {isFriends && (
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
                {isPhotos && (
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
            </Layout>
        </div>
    )
}