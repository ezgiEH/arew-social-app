import NavigationCard from '@/components/NavigationCard'

export default function Layout({ children, hideNavigation }) {
    let rightColumnClasses= '';

    if (hideNavigation) {
        rightColumnClasses += 'w-full'
    }else{
        rightColumnClasses += 'mx-4 md:mx-0 md:w-3/4'

    }
    return (
        <main className={`md:flex mt-4 max-w-4xl mx-auto gap-6 mb-24 md:mb-0`}>
            {!hideNavigation && (
                <div className=' w-full fixed bottom-0 -mb-5 md:static md:w-1/4 '>
                    <NavigationCard />
                </div>
            )}
            <div className={rightColumnClasses}>
                {children}
            </div>
        </main>
    )
}