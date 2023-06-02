export default function Avatar({size}) {
    let width = 'w-12'
    if(size === 'lg'){
        width ='w-24 md:w-36'
    }
    return (
        <div className={`${width} rounded-full overflow-hidden`}>
            <img src='https://avatars.githubusercontent.com/u/20560655?v=4' alt='avatar'></img>
        </div>
    )
}